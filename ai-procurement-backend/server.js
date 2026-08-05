const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Enable CORS for your frontend
app.use(cors());
app.use(express.json());

// Health check – this must always work
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: '🚀 Backend is alive!' });
});

// Mock AI chat – works without any API key
app.post('/api/ai/chat', (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  // Simple smart replies
  const replies = [
    `I analyzed your question. Based on procurement best practices, you should consider consolidating suppliers.`,
    `Your spending patterns suggest you could save ~12% by renegotiating contracts with top vendors.`,
    `I found 2 contracts expiring soon. Review them for better terms.`,
    `AI recommendation: focus on supplier performance metrics to reduce risk.`,
  ];
  const reply = replies[Math.floor(Math.random() * replies.length)];
  res.json({ response: `${reply} (Mock AI – add Gemini for real intelligence)` });
});

// Mock dashboard data
app.get('/api/dashboard', (req, res) => {
  res.json({
    totalSpend: 184000,
    suppliers: 23,
    contracts: 45,
    riskAlerts: 3,
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});