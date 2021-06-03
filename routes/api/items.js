const express = require('express');
const router = express.Router();
// Import the middleware for protected access
const auth = require('../../middleware/auth');
// Load the Item Model
const Item = require('../../models/item');

/* api/items is the "root path" for this API, set by the using code (server.js) */

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
    // documents are fetched from the MongoDB collection (req not used here, but could have)
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items)) // Response API: send(), status(), json(),...
});

// @route POST api/items
// @desc Create an item
// @access Private
router.post('/', auth, (req, res) => {
    // creating a new document (instance of a model)
    const newItem = new Item({
        // using request body
        name: req.body.name // Request API: body, params, header...
    });
    // document is saved/ added to the MongoDB collection
    newItem.save()
        .then(item => res.json(item));
});

// @route DELETE api/items/{id}
// @desc Removes an item
// @access Private
router.delete('/:id', auth, (req, res) => {
    // 1. find the item (using request parameter/ path variable)
    Item.findById(req.params.id)
        // 2. delete the item resp. document from the MongoDB collection
        .then(item => item.remove())
            .then(() => res.json({ message: `${req.params.id} deleted`, success: true }))
        .catch(err => res.status(404).json({ message: `${req.params.id} not found`, success: false }))
});

// old fashioned export (new approach via "export default router" only workds in newer browsers)
module.exports = router;
