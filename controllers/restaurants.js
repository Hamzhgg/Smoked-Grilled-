const express = require('express')
const router = express.Router()

const Restaurant = require('../models/restaurants')

// render a list of all the listings (READ ALL)
router.get('/', async (req, res) => {
  try {
    const populatedRestaurants = await Restaurant.find({}).populate('owner')
    console.log('restaurants: ', populatedRestaurants)
    res.render('restaurants/index.ejs', {
      restaurants: populatedRestaurants,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

// render a new listing form (CREATE part 1)
router.get('/new', (req, res) => {
  res.render('restaurants/new.ejs')
})

// create (submit new listing form) (CREATE part 2)
router.post('/', async (req, res) => {
  req.body.owner = req.session.user._id
  console.log(req.body);
  await Restaurant.create(req.body)
  res.redirect('/restaurants')
})

// show route (READ ONE)
router.get('/:restaurantId', async (req, res) => {
  try {
    const populatedRestaurant = await Restaurant.findById(
      req.params.restaurantId
    ).populate('owner')


    res.render('restaurants/show.ejs', {
      restaurant: populatedRestaurant,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

// delete (DELETE)
router.delete('/:restaurantId', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId)

    if (restaurant.owner.equals(req.session.user._id)) {
      await restaurant.deleteOne()
      res.redirect('/restaurants')
    } else {
      res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

// render the edit form (UPDATE part 1)
router.get('/:restaurantId/edit', async (req, res) => {
  try {
    const currentRestaurant = await Restaurant.findById(req.params.restaurantId)
    res.render('restaurants/edit.ejs', {
      restaurant: currentRestaurant,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

// submit the edit form (UPDATE part 2)
router.put('/:restaurantId', async (req, res) => {
  try {
    const currentRestaurant = await Restaurant.findById(req.params.restaurantId)
    if (currentRestaurant.owner.equals(req.session.user._id)) {
      await currentRestaurant.updateOne(req.body)
      res.redirect(`/restaurants/${req.params.restaurantId}`)
    } else {
        res.send("You don't have permission to do that.")
    }
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})


module.exports = router