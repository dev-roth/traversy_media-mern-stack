const express = require('express');
const router = express.Router();

// Load Item Model
const Item = require('../../models/item');

// Routes (root route: /api/items)
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
});

router.post('/', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save()
        .then(item => res.json(item));
});

router.delete('/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove())
            .then(() => res.json({ message: `${req.params.id} deleted`, success: true }))
        .catch(err => res.status(404).json({ message: `${req.params.id} not found`, success: false }))
});

module.exports = router;
