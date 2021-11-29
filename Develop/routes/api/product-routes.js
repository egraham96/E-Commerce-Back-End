const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
  // update product data
  try{
    const productInfo= await Product.update(req.body, {
     where: {
       id: req.params.id,
     }})
     if (!productInfo) { 
       res.status(404).json({ message: 'No Product found with that id!' })
      }
     else { 
       res.status(200).json({message: `Product with id: ${req.params.id} deleted`}) 
     }
   }
   catch { 
     res.status(500).json(err); }
 
 });

router.delete('/:id', async (req, res) => {
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
