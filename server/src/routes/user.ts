const { Router } = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middleware/auth");

const router = Router();

router.get("/saved", requireAuth, async (req: any, res: any) => {
  const user = await User.findById(req.userId).select("savedEventIds");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ savedEventIds: user.savedEventIds });
});

router.post("/saved/:eventId", requireAuth, async (req: any, res: any) => {
  const eventId = Number(req.params.eventId);
  if (Number.isNaN(eventId)) return res.status(400).json({ message: "Invalid event id" });
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  if (!user.savedEventIds.includes(eventId)) user.savedEventIds.push(eventId);
  await user.save();
  res.json({ savedEventIds: user.savedEventIds });
});

router.delete("/saved/:eventId", requireAuth, async (req: any, res: any) => {
  const eventId = Number(req.params.eventId);
  if (Number.isNaN(eventId)) return res.status(400).json({ message: "Invalid event id" });
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.savedEventIds = user.savedEventIds.filter((id: number) => id !== eventId);
  await user.save();
  res.json({ savedEventIds: user.savedEventIds });
});

// Tickets
router.get("/tickets", requireAuth, async (req: any, res: any) => {
  const user = await User.findById(req.userId).select("tickets");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ tickets: user.tickets });
});

router.post("/tickets", requireAuth, async (req: any, res: any) => {
  const { eventId, ticketType, ticketPrice } = req.body as { eventId: number; ticketType: string; ticketPrice: number };
  if (!eventId || !ticketType || typeof ticketPrice !== 'number') {
    return res.status(400).json({ message: "Missing fields" });
  }
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  user.tickets.push({ eventId, ticketType, ticketPrice, purchaseDate: new Date() } as any);
  await user.save();
  res.status(201).json({ tickets: user.tickets });
});

module.exports = router;
