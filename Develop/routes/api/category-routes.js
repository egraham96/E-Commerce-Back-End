const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
 try{
   const categoryInfo= await Category.update(req.body, {
    where: {
      id: req.params.id,
    }})
    if (!categoryInfo) { 
      res.status(404).json({ message: 'No Category found with that id!' })
     }
    else { 
      res.status(200).json({message: `Category with id: ${req.params.id} deleted`}) 
    }
  }
  catch { 
    res.status(500).json(err); }

});


router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        category_id: req.params.id,
      },
    })
    if (!deletedCategory) { 
      res.status(404).json({ message: 'No Category found with that id!' })
     }
    else { 
      res.status(200).json({message: `Category with id: ${req.params.id} deleted`}) 
    }
  }
  catch { 
    res.status(500).json(err); }

});

module.exports = router;
