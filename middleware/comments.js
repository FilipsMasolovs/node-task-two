const express = require('express');
const uuid = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();


router.get('/', async (req, res, next) => {
    try{
        let allComments = await fs.readFile(path.join(__dirname, 'comments.json'), 'utf8');

        allComments = JSON.parse(allComments);
    
        return res.json(allComments);
    } catch (e) {
        return next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const newComment = {
            ...req.body,
            id: uuid.v4(),
        }

        let allComments = await fs.readFile(path.join(__dirname, "comments.json"), 'utf8');

        allComments = JSON.parse(allComments);

        allComments.data.push(newComment);

        allComments = JSON.stringify(allComments);

        await fs.writeFile(path.join(__dirname, "comments.json"), allComments, 'utf8');

        return res.redirect('/');
    } catch (e) {
        return next(e);
    }
});

module.exports = router;