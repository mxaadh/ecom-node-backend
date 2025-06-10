import Bid from "../models/Bid.js";
import Wishlist from "../models/Wishlist.js";

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

    // console.log(bids, "<< bids");
    bids.length > 0
      ? res.json({ data: bids })
      : res.status(404).json({
          data: [],
          message: "Bid not found",
        });
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
};

// Create a new Wishlist
export const createWishlist = async (req, res) => {
  try {
    const newWish = new Wishlist(req.body);
    await newWish.save();
    res.status(201).json({
      message: "Recored Created Successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
