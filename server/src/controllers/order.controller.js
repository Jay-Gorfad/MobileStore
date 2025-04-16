const Order = require("../models/Order"); // Assuming path to Order model
const OrderItem = require("../models/OrderItem"); // Assuming path to OrderItem model
const Product = require("../models/Product"); // Assuming path to Product model
const Address = require("../models/Address"); // Assuming path to Address model
const User = require("../models/User"); // Assuming path to User model
const mongoose = require("mongoose");

// Add a new order with multiple products
exports.addOrder = async (req, res) => {
  const { userId, orderDate, orderStatus, delAddressId, shippingCharge, products, paymentMode } = req.body;

  try {
    // Validate if products are provided
    if (!products || products.length === 0) {
      return res.status(400).json({ message: "At least one product is required." });
    }

    // Calculate the total order price
    let totalAmount = 0;
    for (let product of products) {
      const { productId, quantity } = product;
      const foundProduct = await Product.findById(productId);

      if (!foundProduct) {
        return res.status(400).json({ message: `Product with id ${productId} not found.` });
      }

      totalAmount += foundProduct.price * quantity;
    }

    // Create the order
    const newOrder = new Order({
      userId,
      orderDate,
      orderStatus: orderStatus || "Pending",
      delAddressId,
      shippingCharge,
      total: totalAmount + parseFloat(shippingCharge),
      paymentMode: paymentMode || "Cash on Delivery",
      paymentStatus: "Pending",
    });

    // Save the order
    const savedOrder = await newOrder.save();

    // Create order items for each product
    const orderItems = products.map(product => {
      return {
        orderId: savedOrder._id,
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
      };
    });

    // Save order items
    await OrderItem.insertMany(orderItems);

    res.status(201).json({
      message: "Order created successfully.",
      order: savedOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch multiple orders (supporting filtering by deleted status)
exports.getOrders = async (req, res) => {
  const { includeDeleted = "false" } = req.query; // Exclude deleted orders by default
  const deletedFilter = includeDeleted === "true" ? {} : { isDeleted: false };

  try {
    const orders = await Order.find(deletedFilter)
      .populate("userId", "name email") // Populate user info if needed
      .populate("delAddressId", "street city state zipCode") // Populate address info if needed
      .populate({
        path: "products",
        populate: {
          path: "productId",
          select: "name price",
        },
      })
      .exec();

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Mark an order as deleted (soft delete)
exports.markOrderAsDeleted = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    order.isDeleted = true;
    await order.save();

    res.status(200).json({ message: "Order marked as deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch only non-deleted orders
exports.getActiveOrders = async (req, res) => {
  try {
    const activeOrders = await Order.find({ isDeleted: false })
      .populate("userId", "name email")
      .populate("delAddressId", "street city state zipCode")
      .exec();

    res.status(200).json({ orders: activeOrders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch a single order by ID (include products and address)
exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId)
      .populate("userId", "name email")
      .populate("delAddressId", "street city state zipCode")
      .populate({
        path: "products",
        populate: {
          path: "productId",
          select: "name price",
        },
      })
      .exec();

    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.hasUserPurchasedProduct = async (req, res) => {
    const { userId, productId } = req.params;
  
    try {
      // Step 1: Find all non-deleted orders by the user
      const userOrders = await Order.find({ userId, isDeleted: false }).select("_id");
  
      const orderIds = userOrders.map(order => order._id);
  
      if (orderIds.length === 0) {
        return res.status(200).json({ purchased: false });
      }
  
      // Step 2: Check if any order items match the productId and belong to those orders
      const orderItem = await OrderItem.findOne({
        orderId: { $in: orderIds },
        productId: productId,
      });
  
      const hasPurchased = !!orderItem;
  
      res.status(200).json({ purchased: hasPurchased });
    } catch (error) {
      console.error("Error checking product purchase:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  