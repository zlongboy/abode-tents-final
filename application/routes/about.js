const express = require('express')

const router = express.Router()

router.get('/', function(req, res) {
    res.render('contact', { 
        title: 'Contact us | ABODE',
        isSecondary: true,
        navSearchBar: true 
    })
});

module.exports = router