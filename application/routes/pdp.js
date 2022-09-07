const products = require('../public/javascripts/products')

const express = require('express')

const router = express.Router();

router.get('/', async function(req, res, next) {
        let pdpProd = await products.getPDP('1')
        let allProds = await products.getProducts()
    
        res.render('pdp', { 
            title: `Kelty Rumpus | ABODE`,
            sectionName: 'Similar products',
            singleProd: pdpProd[0],
            prods: allProds.slice(0, 3),
            isSecondary: true,
            navSearchBar: true,
            prodsContainerClass: 'featured__container'
        }) 
});

module.exports = router