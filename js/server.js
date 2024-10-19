const express = require('express');
const config = require('../json/config.json');

const app = express();
const PORT = process.env.PORT || config.PORT;

app.get('/', (req, res) => {
  res.send('🎃');
});

app.listen(PORT, () => {
  console.log(`Server is running. Port: ${PORT}`);
});
