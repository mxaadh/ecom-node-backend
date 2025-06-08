import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  // Extract all possible query parameters
  const {
    category,
    limit,
    sort,
    minPrice,
    maxPrice,
    inStock, // boolean
    search, // text search
  } = req.query;

  // Build the query object dynamically
  const query = {};

  if (category) {
    query.category = category;
  }

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (inStock === "true") {
    query.stockQuantity = { $gt: 0 };
  }

  // Build the options object for sorting and limiting
  const options = {};

  if (sort) {
    options.sort = sort.split(",").join(" "); // Converts "price,-rating" to "price -rating"
  }

  if (limit) {
    options.limit = Number(limit);
  }

  // Text search (requires text index in MongoDB)
  if (search) {
    query.$text = { $search: search };
  }

  // Execute the query with all conditions
  const products = await Product.find(query, null, options);

  res.json({
    success: true,
    count: products.length,
    data: products,
  });
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
