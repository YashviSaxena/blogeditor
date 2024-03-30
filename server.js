const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

const DATABASE_URI = 'mongodb+srv://yashvi4ys:blogEditor123@cluster0.935r8qh.mongodb.net/blogdb?retryWrites=true&w=majority'

mongoose.connect(process.env.DATABASE_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)