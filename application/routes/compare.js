const express = require('express')
const bodyParser = require('body-parser');
const products = require('../public/javascripts/products');

const router = express.Router();

router.post('/', async function(req, res, next) {
    const filteredProds = await products.filterProducts(req.body)

    res.render('shop', {
        title: "Compare tents | ABODE",
        isSecondary: true,
        prods: products.sortProducts(filteredProds, req.body.sortBy),
        prodsContainerClass: 'products__container',
        productsSearchBar: true,
        filterState: {
            sortBy: products.parseSortBy(req.body.sortBy),
            brandCheck: products.parseBrand(req.body.brand),
            capacityCheck: products.parseCapacity(req.body.capacity)
        } 
    });
});

module.exports = router