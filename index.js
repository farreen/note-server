const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(bodyParser.json());

app.post("/api/insert", (req, res) => {
    console.log(req.body)
    var obj = req.body;
    var content = obj.value;
    console.log(content);
    fs.writeFile('file.txt', content, (err) => {
        if(err) throw err;
        console.log('file saved');
    })    
})

app.get("/api/get",(req, res) => {
    fs.readFile('file.txt', 'utf8', (err, data) => {
        res.send(data)
        console.log('file read', data)
    }) 
})

app.listen(8080, () => {
    console.log('Server running')
})
