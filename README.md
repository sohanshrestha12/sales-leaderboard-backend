# Sales Leaderboard Backend

A backend system to record sales and generate a leaderboard ranking agents by total sales. Handles tie ranks and multiple sales per agent. Uses **MongoDB indexing** on `agentName` for faster aggregation and leaderboard queries.

## API Routes

- **POST /api/sales** – Add a new sale  
  - Body: `{ "agentName": "John Doe", "amount": 150, "salesCount": 3 }`

- **GET /api/leaderboard** – Get the ranked leaderboard  

## Live Deployment

[Live Demo](https://api-sales-leaderboard-backend.onrender.com/)