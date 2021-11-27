const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      // Add Product as a second model to JOIN with
      include: [{ model: Product }],
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!oneCategory) {  
      res.status(404).json({ message: 'No Category found with that id!' });
    return;
  }
    else {
      res.status(200).json(oneCategory)
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const oneCategory = await findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!oneCategory) {  
      res.status(404).json({ message: 'No Category found with that id!' });
    return;
  }
    else {
      res.status(200).json(oneCategory)
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
