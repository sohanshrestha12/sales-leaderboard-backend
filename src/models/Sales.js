import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
  agentName: {
    type: String,
    required: [true, "Agent name is required"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
    min: [0, "Amount must be a non-negative number"],
  },
  salesCount: {
    type: Number,
    required: [true, "Sales count is required"],
    min: [0, "Sales count must be a non-negative number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

saleSchema.index({ agentName: 1 });

saleSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  return obj;
};

export const Sale = mongoose.model("Sale", saleSchema);
