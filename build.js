const path = require('path')
const express = require('express');
const shrinkRay = require('shrink-ray-current')
const app = express();
app.use(shrinkRay());
app.use(express.static(path.join(__dirname, './dist')));

app.get('*', (req, res) => {

})

const listener = app.listen(8000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});