import { Sale } from "../models/Sales.js";

export const addSale = async (req, res) => {
  try {
    console.log(req.body);
    const sale = await Sale.create(req.body);

    return res
      .status(201)
      .json({ message: "Sale recorded successfully", data: sale });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(", ") });
    }
    return res.status(500).json({ error: error.message || "Server error" });
  }
};
