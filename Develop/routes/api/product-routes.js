const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  try {
    const productData = await Product.findAll({
      // Add Product as a second model to JOIN with
      include: [Category,{ model: Tag, through: ProductTag }],
    });
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  try {
    const oneProduct = await findByPk(req.params.id);
    if (!oneProduct) {  
      res.status(404).json({ message: 'No Product found with that id!' });
    return;
  }
    else {
      res.status(200).json(oneProduct)
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// create new product
router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
  try {
    const deletedProduct = await Product.destroy({
      where: {
        product_id: req.params.id,
      },
    })
    if (!deletedProduct) { 
      res.status(404).json({ message: 'No Product found with that id!' })
     }
    else { 
      res.status(200).json({message: `Product with id: ${req.params.id} deleted`}) 
    }
  }
  catch { ((err) => res.json(err)); }

});

module.exports = router;
