const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
  });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag}],
    });
    if (!oneTag) {
      res.status(404).json({ message: 'No Tag found with that id!' });
      return;
    }
    else {
      res.status(200).json(oneTag)
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updatedTag = await Tag.update({
        tag_name: req.body.tag_name,
    }, {
        where: {
            id: req.params.id,
        },
    })

    if (!updatedTag[0]) {
        res.status(404).json({
            message: `No Tag found with that id `,
        })
        return;
    }
    res.status(200).json({
        message: `Tag with id: ${req.params.id} successfully updated with: ${req.body.tag_name}`
    });
} catch (err) {
    res.status(400).json(err);
}

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (!deletedTag) { 
      res.status(404).json({ message: 'No Tag found with that id!' })
     }
    else { 
      res.status(200).json({message: `Tag with id: ${req.params.id} deleted`}) 
    }
  }
  catch { 
    res.status(500).json(err); }

});

module.exports = router;
