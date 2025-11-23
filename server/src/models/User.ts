const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const ticketSchema = new mongoose.Schema(
  {
    eventId: { type: Number, required: true },
    ticketType: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
    purchaseDate: { type: Date, required: true, default: () => new Date() },
  },
  { _id: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    passwordHash: { type: String, required: true },
    savedEventIds: { type: [Number], default: [] },
    tickets: { type: [ticketSchema], default: [] },
    // Login security fields
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function (plain: string) {
  return bcrypt.compare(plain, this.passwordHash);
};

userSchema.statics.hashPassword = async function (plain: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
};

// Helper methods for account lockout
userSchema.methods.isLocked = function (): boolean {
  const until: Date | null = this.lockUntil ?? null;
  return Boolean(until && until.getTime() > Date.now());
};

userSchema.methods.resetLoginAttempts = function (): void {
  this.failedLoginAttempts = 0;
  this.lockUntil = null;
};

userSchema.methods.registerFailedAttempt = function (
  threshold: number,
  lockMinutes: number
): { locked: boolean; lockUntil?: Date } {
  const newCount: number = (this.failedLoginAttempts || 0) + 1;
  this.failedLoginAttempts = newCount;
  if (newCount >= threshold) {
    const until = new Date(Date.now() + lockMinutes * 60 * 1000);
    this.lockUntil = until;
    this.failedLoginAttempts = 0; // reset after locking
    return { locked: true, lockUntil: until };
  }
  return { locked: false };
};

// Extra layer of protection: AES-256-GCM record encryption
const KEY = crypto.createHash("sha256").update(process.env.RECORD_ENC_KEY || "dev-key").digest();

userSchema.statics.encryptRecord = function (plain: string) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", KEY, iv);
  const data = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return { iv: iv.toString("base64"), tag: tag.toString("base64"), data: data.toString("base64") };
};

userSchema.statics.decryptRecord = function (enc: { iv: string; tag: string; data: string }) {
  try {
    const decipher = crypto.createDecipheriv("aes-256-gcm", KEY, Buffer.from(enc.iv, "base64"));
    decipher.setAuthTag(Buffer.from(enc.tag, "base64"));
    const plain = Buffer.concat([decipher.update(Buffer.from(enc.data, "base64")), decipher.final()]);
    return plain.toString("utf8");
  } catch (error) {
    throw new Error("Decryption failed: Invalid or corrupted data");
  }
};

interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  savedEventIds: number[];
  tickets: any[];
  failedLoginAttempts: number;
  lockUntil: Date | null;
  comparePassword(plain: string): Promise<boolean>;
  isLocked(): boolean;
  resetLoginAttempts(): void;
  registerFailedAttempt(threshold: number, lockMinutes: number): { locked: boolean; lockUntil?: Date };
}

module.exports = mongoose.model("User", userSchema);


