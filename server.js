const express = require('express');
const app = express();
require('dotenv').config()


// Other configurations and middleware setup...

// Include the upload and download routes
// const uploadRoute = require('./routes/upload');
// const downloadRoute = require('./routes/download');
const { router } = require('./Routes');
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/',router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
