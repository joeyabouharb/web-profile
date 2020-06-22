const express = require('express');
const helmet = require('helmet')
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost:';
const app = express();
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
app.use(express.static('dist'))

app.use((req, res) => {
    res.status(404).send('404 Not Found 🤭');
})

app.use((err, req, res, next) => {
    console.log(err)
    if (err) {
        console.log(err);
        res.status(400).send('Bad Request... 🤭🤭🤭');
      } else {
        next();
      }
});

app.listen(port, (err) => {
        if (err) {
            console.error(err);
            return process.exit(1);
        }
        console.log(`Listening on: http://${host}${port}`)
    })
