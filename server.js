const express = require('express');
const helmet = require('helmet')
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost:';
const app = express();

app.use(express.static('dist'))
app.use(helmet());

app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "https://fonts.googleapis.com"],
        scriptSrc: ["'self'", "https://cdnjs.cloudflare.com/"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "https://cdn.jsdelivr.net"]
    }
}))

app.listen(port, (err) => {
        if (err) {
            console.error(err);
            return process.exit(1);
        }
        console.log(`Listening on: ${host}${port}`)
    })
