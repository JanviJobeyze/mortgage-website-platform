const express = require('express');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(require('cors')());

app.get('/', (req, res) => {
  res.send('✅ Backend API is working!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
