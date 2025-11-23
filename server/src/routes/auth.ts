const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { rateLimitLogin } = require("../middleware/rateLimit");

const router = Router();

const signToken = (payload: object, secret: string, expiresIn: string) =>
  jwt.sign(payload, secret, { expiresIn });

router.post("/register", async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body as { name: string; email: string; password: string };
    if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const passwordHash = await (User as any).hashPassword(password);
    const user = await User.create({ name, email, passwordHash });

    const token = signToken({ sub: user._id, email: user.email }, process.env.JWT_SECRET!, process.env.JWT_EXPIRES || "7d");
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.COOKIE_SECURE === "true",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// Visible security: IP rate limit for login attempts
const LOGIN_RATE_LIMIT_MAX = Number(process.env.LOGIN_RATE_LIMIT_MAX || 5);
const LOGIN_RATE_LIMIT_WINDOW_MS = Number(process.env.LOGIN_RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000);
const LOGIN_LOCK_MINUTES = Number(process.env.LOGIN_LOCK_MINUTES || 15);

router.post("/login", rateLimitLogin({ windowMs: LOGIN_RATE_LIMIT_WINDOW_MS, max: LOGIN_RATE_LIMIT_MAX }), async (req: any, res: any) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await User.findOne({ email });
    
    // Security: Always perform password check to prevent email enumeration
    // Use a dummy hash comparison if user doesn't exist to maintain consistent timing
    let valid = false;
    if (user) {
      // Enforce account lockout if active
      if ((user as any).isLocked && (user as any).isLocked()) {
        const unlockAt = (user as any).lockUntil as Date | null;
        return res.status(423).json({ message: "Account locked due to too many failed attempts.", unlockAt });
      }

      valid = await (user as any).comparePassword(password);
      if (!valid) {
        if ((user as any).registerFailedAttempt) {
          const result = (user as any).registerFailedAttempt(LOGIN_RATE_LIMIT_MAX, LOGIN_LOCK_MINUTES);
          await user.save();
          if (result.locked) {
            return res.status(423).json({ message: "Account locked due to too many failed attempts.", unlockAt: result.lockUntil });
          }
        }
      }
    } else {
      // Dummy comparison to prevent timing attacks and email enumeration
      await bcrypt.compare(password, "$2b$10$dummy.hash.to.prevent.timing.attacks.and.email.enumeration");
    }

    if (!valid || !user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Success: reset counters/lock
    if ((user as any).resetLoginAttempts) {
      (user as any).resetLoginAttempts();
      await user.save();
    }
    const token = signToken({ sub: user._id, email: user.email }, process.env.JWT_SECRET!, process.env.JWT_EXPIRES || "7d");
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.COOKIE_SECURE === "true",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/logout", (_req: any, res: any) => {
  res.clearCookie("token");
  res.json({ ok: true });
});

router.get("/me", async (req: any, res: any) => {
  try {
    const token = (req as any).cookies?.token as string | undefined;
    if (!token) return res.status(401).json({ message: "Unauthenticated" });
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const user = await User.findById(payload.sub).select("_id name email");
    if (!user) return res.status(401).json({ message: "Unauthenticated" });
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch {
    res.status(401).json({ message: "Unauthenticated" });
  }
});

module.exports = router;


