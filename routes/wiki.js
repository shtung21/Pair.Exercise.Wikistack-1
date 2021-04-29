const express = require('express');
const wikiRouter = express.Router();
const  { addPage } = require('../views')
const { Page } = require("../models");


wikiRouter.get('/', (req,res, next) => {
  console.log('meow')
  res.send('meow');
});

wikiRouter.post('/', async(req,res, next) => {
  // res.json(req.body)
  try {
    console.log(req.body.title.replace(' ','_'))
    const page = await Page.create({
      title: req.body.title,
      slug: req.body.title.replace(' ','_'),
      content: req.body.content
    });

    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect('/');
  } catch (error) { next(error) }
});
// });

wikiRouter.get('/add', (req,res, next) => {
  console.log('hihi')
  res.send(addPage())
});












module.exports = wikiRouter
