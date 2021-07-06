const express = require('express')
const uuid = require('uuid')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// Get all comments
let allComments = null
fs.readFile(path.join(__dirname, "comments.json"), "utf8", (err, comments) => {
    allComments = JSON.parse(comments)
})
router.get('/', (req, res) => res.json(allComments))

// Add a comment
router.post('/', (req, res) => {
    const newComment = {
        ...req.body,
        id: uuid.v4(),
    }
    let json = JSON.stringify(allComments)
    fs.readFile(path.join(__dirname, "comments.json"), 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            allComments = JSON.parse(data)
            allComments.data.push(newComment)
            json = JSON.stringify(allComments)
            fs.writeFile(path.join(__dirname, "comments.json"), json, 'utf8', () => console.log('Comment added'))
        }
    })
    res.redirect('/')
});

module.exports = router;