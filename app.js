const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

//accessing the middle ware morgan
const morgan = require('morgan')
const { result } = require('lodash')
//new middleware urlencoded it will attach the data of the from with the name
app.use(express.urlencoded({extended: true}))

//connect to mongodb
const dbURI = 'mongodb+srv://netninja:auth123@cluster0.rntqeu5.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(dbURI).then((result) => app.listen(port, () => {console.log(`Started listenig ${port}`)})).catch((err) => console.log(err)) //models is for database

// to use req.body.name we need to add app.use(express.json()); which is a middle ware
app.use(express.json())

// View Engine
app.set('view engine', 'ejs');

//static files access using static middleware of express(css, js, images)
app.use(express.static('public'))


//access the morgan, and is give output like: GET /all-blogs 200 105.836 ms - 435
app.use(morgan('dev'))

app.use((req, res, next) => {
    res.locals.path = req.path
    next()
})


app.get('/', (req, res) => {
    res.redirect('/blogs')
    // ////sending an array as an object
    // const blogs = [
    //     {title: 'Tahzib finds the water', snippet: 'Lorem ipsum dolor sit amet.'},
    //     {title: 'Mahmud finds the Towel', snippet: 'Lorem ipsum dolor sit amet.'},
    //     {title: 'How to defeat the satan', snippet: 'Lorem ipsum dolor sit amet.'}
    // ]
    // res.render('index', { title: 'Rifat', blogs}) //Here this titile is been passed and we can receive this using <%= %> , using res.body we can get the requested url and pass that using object
})


app.get('/:aobut', (req, res) => {
    res.render('about', {title: req.params.about})
})

app.get('/about-us', (req, res) => {
    res.render('/about')
})


//save data in mongodb, first have to create models file and save blog.js
app.get('/add-blog', (req, res) =>{
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'About my self blog',
        body: 'more is waiting for the new version'//be carefull about the comas
    })

    blog.save().then((result) =>{
        res.send(result)
    }).catch((err) => {console.log(err)})///*which is ascyncronous so we are going to use then, and catch for erro */
})

//accessing the data from mongodb
app.get('/all-blogs', (req, res) => {
    Blog.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
})

//Access a single blog using their id
app.get('/single-blog', (req, res) => {
    Blog.findById('662c4214e7cf806dbcb2d8ef').then((result) => {
        res.send(result)
    }).catch((err) => {console.log(err)})
})

// using middleware and next() method 

// app.use((req, res, next) => {
//     console.log('new resuest made: ')
//     console.log('host: ', req.hostname)
//     console.log('path: ', req.path)
//     console.log('method: ', req.method)
//     next()
// })
// app.use((req, res, next) => {
//     console.log('we are in next middleware')
//     next()
// })



//blog routes
app.use('/blogs', blogRoutes)

//jodi vull input day tahole error 404 page load hobe , er jonno aita
app.use((req, res) => {
    res.status(404).render('404', {title: '404'})
})


const port = process.env.PORT || 3000
