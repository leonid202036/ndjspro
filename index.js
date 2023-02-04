'use strict';
const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs');




const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
express.static.mime.define({'application/octet-stream': ['csv']})

function generateRandom(min = 111111, max = 1000000) {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}

app.post('/api/saveSession', (req,res) => {
	let text = Buffer.from(JSON.stringify(req.body), 'base64').toString('utf8');
	
	const pl2 = decodeURIComponent(text);
	console.log(pl2);
	fs.writeFile('logs/' + generateRandom() +'.txt', pl2, err => {
		if (err) {
		  console.error(err);
		}
		// file written successfully
	  });
	res.send('1');
	
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
