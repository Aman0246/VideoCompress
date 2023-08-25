const express = require('express');
const app = express();
require('dotenv').config()

const { router } = require('./Routes');
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/',router);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
