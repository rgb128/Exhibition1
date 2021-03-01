'use strict';

const express = require('express');
const app = express();

const PORT = 8080;

app.use(express.static('www'));

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${ PORT }`);
});
