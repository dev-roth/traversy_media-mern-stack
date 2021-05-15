const express = require('express');
const router = express.Router();

// Load the Item Model
const Item = require('../../models/item');

// Routes //
// => root route: /api/items (see server.js)
router.get('/', (req, res) => {
    // documents are fetched from the MongoDB collection
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

router.post('/', (req, res) => {
    // creating a new document (instance of a model)
    const newItem = new Item({
        name: req.body.name
    });
    // document is saved/ added to the MongoDB collection
    newItem.save()
        .then(item => res.json(item));
});

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        // document is deleted/ removed from the MongoDB collection
        .then(item => item.remove())
            .then(() => res.json({ message: `${req.params.id} deleted`, success: true }))
        .catch(err => res.status(404).json({ message: `${req.params.id} not found`, success: false }))
});

// old faschioned export (new approach via "export default router" only workds in newer browsers)
module.exports = router;
