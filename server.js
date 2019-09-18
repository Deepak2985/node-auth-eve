const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 3000
const route = require('./routes/route');
const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use('/', route);


app.listen(port, function(){
    console.log(`Server running on port: ${port}`);
})