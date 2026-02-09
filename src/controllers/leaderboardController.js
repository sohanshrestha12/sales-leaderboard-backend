import { Sale } from "../models/Sales.js";

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Sale.aggregate([
      {
        $group: {
          _id: "$agentName",
          totalAmount: { $sum: "$amount" },
          totalSales: { $sum: "$salesCount" },
        },
      },
      {
        $sort: { totalAmount: -1, totalSales: -1 },
      },
    ]);

    let currentRank = 1;
    let prevAmount = null;
    let prevRank = 1;

    const rankedLeaderboard = leaderboard.map((agent, index) => {
      if (agent.totalAmount === prevAmount) {
        agent.rank = prevRank;
      } else {
        agent.rank = currentRank;
        prevRank = currentRank;
      }

      prevAmount = agent.totalAmount;
      currentRank += 1;

      return {
        rank: agent.rank,
        agentName: agent._id,
        totalAmount: agent.totalAmount,
        totalSales: agent.totalSales,
      };
    });

    return res.status(200).json({ leaderboard: rankedLeaderboard });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
