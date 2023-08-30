const express = require('express');
let axios = require('axios');
var app = express();
const ExpressError = require("./expressError")
const bodyParser = require('body-parser')

app.use(bodyParser.json());

// app.post('/', function(req, res, next) {
//   try {
//     let results = req.body.developers.map(async d => {
//       return await axios.get(`https://api.github.com/users/${d}`);
//     });
//     let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

//     return res.json(out);
//   } catch(err) {
//     next(err);
//   }
// });


// extract name and bio of developers from githubapi
app.post('/', async (req, res, next)=>{
  try {
    const {developers} = req.body
    const devs = developers
    const data = [];
    // loop over each dev and push data into array
    if (!devs) throw new ExpressError('No devs provided', 404)
    for (const dev of devs) {
      const res = await axios.get(`https://api.github.com/users/${dev}`)
      data.push({
        bio : res.data.bio,
        name : res.data.name
      })
    }
    // return jsonified data
    return res.json({
      data
    })    
  }
  catch(err){
    next(err)
  }
})

module.exports = app;
