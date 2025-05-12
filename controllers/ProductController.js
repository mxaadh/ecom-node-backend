import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product
      ? res.json(product)
      : res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(400).json({ message: "Invalid product ID" });
  }
};

export const createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.status(201).json(savedProduct);
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    product
      ? res.json(product)
      : res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(400).json({ message: "Invalid update" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    product
      ? res.json({ message: "Product deleted" })
      : res.status(404).json({ message: "Product not found" });
  } catch (error) {
    res.status(400).json({ message: "Invalid delete" });
  }
};
