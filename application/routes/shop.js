const express = require('express')
const bodyParser = require('body-parser');
const products = require('../public/javascripts/products');

const router = express.Router();

router.get('/', async function(req, res, next) {
    let allProds = await products.getProducts()

    res.render('shop', { 
        title: 'Shop & compare | ABODE',
        isSecondary: true,
        prods: products.sortProducts(allProds, 'top-rated'),
        prodsContainerClass: 'products__container',
        productsSearchBar: true,
        filterState: {
            sortBy: {
                topRated: false,
                minPrice: false,
                maxPrice: false, 
            },
            brandCheck: {
                kelty: false,
                marmot: false,
                northFace: false,
                rei: false,
            },
            capacityCheck: {
                one: false,
                two: false,
                three: false,
                four: false,
                five: false,
                six: false,
                seven: false,
            }
        } 
    })
});

router.post('/', async function(req, res, next) {
    let searchedProds = await products.searchProducts(req.body.q)
    
    res.render('shop', {
        title: req.body.q + " | ABODE",
        isSecondary: true,
        prods: products.sortProducts(searchedProds, 'top-rated'),
        prodsContainerClass: 'products__container',
        productsSearchBar: true,
        isSearch: true,
        filterState: {
            sortBy: {
                topRated: false,
                minPrice: false,
                maxPrice: false, 
            },
            brandCheck: {
                kelty: false,
                marmot: false,
                northFace: false,
                rei: false,
            },
            capacityCheck: {
                one: false,
                two: false,
                three: false,
                four: false,
                five: false,
                six: false,
                seven: false,
            }
        } 
    })
});

module.exports = router