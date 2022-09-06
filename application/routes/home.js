const products = require('../public/javascripts/products')

const express = require('express')

const router = express.Router();

router.get('/', async function(req, res) {
        let allProds = await products.getProducts()
    
        res.render('home', { 
            title: 'Buy tents online | ABODE',
            sectionName: 'Trending now',
            prods: products.sortProducts(allProds, 'top-rated').slice(0, 3),
            sectionBtn: true,
            navSearchBar: true,
            prodsContainerClass: 'featured__container'
        }) 
});

module.exports = router