const Product = require("../models/Product");
const { uploadImage, deleteImage } = require("../utils/cloudinary");
const fs = require("fs");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      discount,
      costPrice,
      salePrice,
      stock,
      categoryId,
    } = req.body;

    let imageUrl = "";

    if (req.file) {
      const localPath = req.file.path;
      imageUrl = await uploadImage(localPath, "products");
    }

    const newProduct = new Product({
      productName,
      description,
      discount,
      costPrice,
      salePrice,
      stock,
      categoryId,
      productImage: imageUrl,
      isActive: true,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(400).json({ error: "Failed to create product", details: err.message });
  }
};

// Get all active products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).populate("categoryId");
    res.status(200).json(products);
  } catch (err) {
    console.error("Fetch products error:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get single product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categoryId");
    if (!product || !product.isActive) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Fetch product by ID error:", err);
    res.status(400).json({ error: "Invalid product ID" });
  }
};

// Update product by ID
exports.updateProduct = async (req, res) => {
  try {
    const {
      productName,
      description,
      discount,
      costPrice,
      salePrice,
      stock,
      categoryId,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Handle image replacement if a new file is uploaded
    if (req.file) {
      const localPath = req.file.path;

      // Delete old image if it exists
      if (product.productImage) {
        const matches = product.productImage.match(/\/([^/]+)\.(jpg|jpeg|png|gif)$/i);
        if (matches && matches[1]) {
          const publicId = `products/${matches[1]}`;
          await deleteImage(publicId);
        }
      }

      const newImageUrl = await uploadImage(localPath, "products");
      product.productImage = newImageUrl;
    }

    // Update fields
    product.productName = productName;
    product.description = description;
    product.discount = discount;
    product.costPrice = costPrice;
    product.salePrice = salePrice;
    product.stock = stock;
    product.categoryId = categoryId;

    await product.save();
    res.status(200).json(product);
  } catch (err) {
    console.error("Update product error:", err);
    res.status(400).json({ error: "Failed to update product", details: err.message });
  }
};

// Soft delete (mark as inactive)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.isActive = false;
    await product.save();

    res.status(200).json({ message: "Product marked as inactive successfully" });
  } catch (err) {
    console.error("Delete product error:", err);
    res.status(400).json({ error: "Failed to delete product" });
  }
};
