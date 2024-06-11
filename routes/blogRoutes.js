const express = require('express')
const blogController = require('../controllers/blogController')

const router = express.Router()


//blog routes

router.get('/create', blogController.blog_create_get )

router.get('/', blogController.blog_index)
//POST method for new blog and use urlencoded for adding the data to the req.body
router.post('/', blogController.blog_create_post)
//getting the get request by the blogs id
router.get('/:id', blogController.blog_details)

// NOw time to delete some blogs
router.delete('/:id', blogController.blog_delete )


module.exports = router 
