// server.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;
const FINNHUB_KEY = process.env.FINNHUB_KEY;

app.use(cors());

// Quote
app.get('/api/quote', async (req, res) => {
  const { symbol } = req.query;
  const r = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`);
  const data = await r.json();
  res.json(data);
});

// Profile
app.get('/api/profile', async (req, res) => {
  const { symbol } = req.query;
  const r = await fetch(`https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_KEY}`);
  const data = await r.json();
  res.json(data);
});

// General news
app.get('/api/general-news', async (req,res) => {
  const r = await fetch(`https://finnhub.io/api/v1/news?category=general&token=${FINNHUB_KEY}`);
  const data = await r.json();
  res.json(data);
});

// Company news
app.get('/api/company-news', async (req,res) => {
  const { symbol } = req.query;
  const today = new Date();
  const prior = new Date(); prior.setMonth(prior.getMonth()-1);
  const r = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${prior.toISOString().slice(0,10)}&to=${today.toISOString().slice(0,10)}&token=${FINNHUB_KEY}`);
  const data = await r.json();
  res.json(data);
});

// Earnings
app.get('/api/earnings', async (req,res) => {
  const { symbol } = req.query;
  const r = await fetch(`https://finnhub.io/api/v1/stock/earnings?symbol=${symbol}&token=${FINNHUB_KEY}`);
  const data = await r.json();
  res.json(data);
});

app.listen(PORT, ()=> console.log(`Backend server running on port ${PORT}`));
