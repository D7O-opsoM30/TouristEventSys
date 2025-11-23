type NextFunction = any;
type Request = any;
type Response = any;

type WindowConfig = {
  windowMs: number; // e.g., 10 * 60_000
  max: number; // e.g., 5
};

type Attempt = number; // epoch millis

const ipToAttempts: Map<string, Attempt[]> = new Map();

function cleanupOldAttempts(now: number, attempts: Attempt[], windowMs: number): Attempt[] {
  const threshold = now - windowMs;
  let startIndex = 0;
  for (let i = 0; i < attempts.length; i++) {
    if (attempts[i]! >= threshold) {
      startIndex = i;
      break;
    }
  }
  return attempts.slice(startIndex);
}

function rateLimitLogin(config: WindowConfig) {
  const windowMs = config.windowMs;
  const max = config.max;

  return function (req: Request, res: Response, next: NextFunction) {
    const now = Date.now();
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || req.socket?.remoteAddress || "unknown";

    const prior = ipToAttempts.get(ip) || [];
    const recent = cleanupOldAttempts(now, prior, windowMs);
    recent.push(now);
    ipToAttempts.set(ip, recent);

    const remaining = Math.max(0, max - recent.length);
    const resetInMs = recent.length > 0 ? windowMs - (now - recent[0]!) : windowMs;

    res.setHeader("X-RateLimit-Limit", String(max));
    res.setHeader("X-RateLimit-Remaining", String(remaining));
    res.setHeader("X-RateLimit-Reset", String(Math.ceil((now + resetInMs) / 1000))); // epoch seconds

    if (recent.length > max) {
      const retryAfterSec = Math.ceil(resetInMs / 1000);
      res.setHeader("Retry-After", String(retryAfterSec));
      return res.status(429).json({ message: "Too many login attempts. Please try again later." });
    }

    next();
  };
}

module.exports = { rateLimitLogin };
