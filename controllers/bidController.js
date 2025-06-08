import Bid from "../models/Bid.js";

// Create a new bid
export const createBid = async (req, res) => {
  try {
    const newBid = new Bid(req.body);
    await newBid.save();
    res.status(201).json(newBid);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all bids
export const getBids = async (req, res) => {
  try {
    const bids = await Bid.find().sort({ createdAt: -1 });
    res.json({ data: bids });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBidsByProductId = async (req, res) => {
  try {
    const bids = await Bid.find({ product: req.params.productId }).sort({
      createdAt: -1,
    }); // Newest first

    bids.length > 0
      ? res.json({ data: bids })
      : res.status(404).json({ message: "Bid not found" });
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
};
