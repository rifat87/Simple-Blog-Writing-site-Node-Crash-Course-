const Blog = require('../models/blog')

//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete

const blog_index = (req, res) => {
    Blog.find().sort({createdAt: -1 /* -1 for decending order meand newest to oldest */})
        .then((result) => {
            //query by using find and output the data using result
            res.render('index', {title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err)
        })
}

//blog_details
const blog_details = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
    .then((result => {
        res.render('details', { blog: result , title: 'Blog Details'})
    }))
    .catch((err) => {console.log(err)})
}

const blog_create_get = (req, res) => {
    res.render('create', {title: 'Create a new blog'})
}


const blog_create_post = (req, res) => {
    console.log(req.body)
    //now we are going to create a new instance of blog which is going to store the new data
    const blog = new Blog(req.body)

    blog.save().then((result) => {
        res.redirect('/blogs')
    }).catch((err) => {
        console.log(err)
    })
}


const blog_delete = (req, res) => {
    const id = req.params.id

    //delete query
    Blog.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/blogs'})
    })
    .catch((err) => {
        console.log(err)
    })
}

module.exports = {
    blog_index, blog_details, blog_create_get, blog_create_post, blog_delete
}
