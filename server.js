const express = require('express');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost:';
const app = express();

app.use(express.static('dist'))

app.listen(port, (err) => {
        if (err) {
            console.error(err);
            return process.exit(1);
        }
        console.log(`Listening on: ${host}${port}`)
    })
