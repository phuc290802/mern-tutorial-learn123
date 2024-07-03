const express = require('express');
const router =express.Router()

const verifyToken = require('../middleware/auth')
const Post = require('../models/Post');
const { model } = require('mongoose');

// @route get api/posts
// @desc get post
// @access Private

router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username']);
        res.json({ success: true, posts: posts });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
});


// @route POST api/posts
// @desc Create post
// @access Private

router.post('/', verifyToken,async (req, res) => {
    const {title ,description , url , status} = req.body

    // Simple validation
    if(!title)
        return res
       .status(400)
       .json({success:false ,message: 'missing title , description , url or status'})


    try {
        const newPost = new Post({
            title,
            description,
            url: (url.startsWith('http://')) ? url :`http://${url}`,
            status: status || 'TO LEARN',
            user: req.userId
        });
        const post = await newPost.save();
        res.json({
            success: true,
            message: 'happy learning',
            post: newPost
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});


// @route PUT api/posts/:id
// @desc Update post by ID
// @access Private (requires authentication)
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    // Simple validation: Ensure at least title is provided
    if (!title) {
        return res.status(400).json({ success: false, message: 'Missing title field to update' });
    }

    try {
        // Construct the updated post object based on provided fields
        let updatedPost = {
            title,
            description: description || '',
            url: (url && url.startsWith('https://')) ? url : `https://${url}`,
            status: status || 'TO LEARN'
        };

        // Define the condition to find and update the post
        const postUpdateCondition = { _id: req.params.id, user: req.userId };

        // Find and update the post in the database
        updatedPost = await Post.findOneAndUpdate(postUpdateCondition, updatedPost, { new: true });

        // If no post is found matching the condition, return 404 Not Found
        if (!updatedPost) {
            return res.status(404).json({ success: false, message: 'Post not found or user not authorized' });
        }

        // Return success response with the updated post
        res.json({
            success: true,
            message: 'Post updated successfully',
            post: updatedPost
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route DELETE api/posts/:id
// @desc Delete post by ID
// @access Private

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        // Define the condition to find and delete the post
        const postDeleteCondition = { _id: req.params.id, user: req.userId };

        // Find and delete the post in the database
        const deletedPost = await Post.findOneAndDelete(postDeleteCondition);

        // If no post is found matching the condition, return 404 Not Found
        if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Post not found or user not authorized' });
        }

        // Return success response with the deleted post
        res.json({
            success: true,
            message: 'Post deleted successfully',
            post: deletedPost
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
