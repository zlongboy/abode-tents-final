const axios = require('axios')

const url = 'http://api'

async function getProducts() { 
    try {
        const response = await axios(`${url}:3030/products`, {
            method: 'get',
            // headers: {
            //     "Authorization": process.env.API_KEY
            // },
            timeout: 5000
        })
        const { results } = await response.data
        return results
    } catch (err) {
        return console.log(err);
    };
};

async function getPDP(sku) { 
    const queryString = `?sku=${sku}`
    try {
        const response = await axios(`${url}:3030/products${queryString}`, {
            method: 'get',
            // headers: {
            //     "Authorization": process.env.API_KEY
            // },
            timeout: 5000
        })
        const { results } = await response.data
        return results
    } catch (err) {
        return console.log(err);
    };
};

async function searchProducts(q) { 
    const queryString = `?q=${q}`
    try {
        const response = await axios(`${url}:3030/products/search${queryString}`, {
            method: 'post',
            // headers: {
            //     "Authorization": process.env.API_KEY
            // },
            timeout: 5000
        })
        const { results } = await response.data
        return results
    } catch (err) {
        // console.log("Application Request Error")
        return console.log("Application Request Error");
    };
};

const sortProducts = function(allProducts, by) {
    switch (by) {
        case 'top-rated':
            return allProducts.sort((a, b) => { return b.score - a.score });
        case 'max-price':
            return allProducts.sort((a, b) => { return b.price - a.price });
        case 'min-price':
            return allProducts.sort((a, b) => { return a.price - b.price });
        default:
            return allProducts
    }
};


async function filterProducts(body) { 
    
    function prepareValue(val, param) {
        if (Array.isArray(val)) {
            return val.join("&" + param + "=")
        }
        else return val
    }
    
    let queryString = '?'
    if (body.brand) {
        queryString = queryString + "brand=" + prepareValue(body.brand, 'brand') + "&"
    }

    if (body.capacity) {
        queryString = queryString + "capacity=" + prepareValue(body.capacity, 'capacity')
    }
    
    try {
        const response = await axios(`${url}:3030/products/filter${queryString}`, {
            method: 'get',
            // headers: {
            //     "Authorization": process.env.API_KEY
            // },
            timeout: 5000
        })
        const { results } = await response.data
        return results
    } catch (err) {
        return console.log(err);
    };
};

class SortBy {
    constructor(opt1, opt2, opt3) {
        this.topRated = opt1
        this.minPrice = opt2
        this.maxPrice = opt3
    }
}

function parseSortBy(reqBodyProperty) {
    let sortBy = new SortBy(false, false, false)
    switch(reqBodyProperty) {
        case 'top-rated':
            sortBy.topRated = true
            break
        case 'min-price':
            sortBy.minPrice = true
            break
        case 'max-price':
            sortBy.maxPrice = true
            break
    }
    return sortBy
}

class BrandCheck {
    constructor(ck1, ck2, ck3, ck4) {
        this.kelty = ck1
        this.marmot = ck2
        this.northFace = ck3
        this.rei = ck4
    }
}

function parseBrand(reqBodyProperty) {
    let brand = new BrandCheck(false, false, false, false)
    if (reqBodyProperty) {
        brand.kelty = reqBodyProperty.includes('Kelty')
        brand.marmot = reqBodyProperty.includes('Marmot')
        brand.northFace = reqBodyProperty.includes('The North Face')
        brand.rei = reqBodyProperty.includes('REI Co-op')
    }
    return brand
}

class CapacityCheck {
    constructor(ck1, ck2, ck3, ck4, ck5, ck6, ck7) {
        this.one = ck1
        this.two = ck2
        this.three = ck3
        this.four = ck4
        this.five = ck5
        this.six = ck6
        this.seven = ck7
    }
}

function parseCapacity(reqBodyProperty) {
    let cap = new CapacityCheck(false, false, false, false, false, false, false)
    if (reqBodyProperty) {
        cap.one = reqBodyProperty.includes('1')
        cap.two = reqBodyProperty.includes('2')
        cap.three = reqBodyProperty.includes('3')
        cap.four = reqBodyProperty.includes('4')
        cap.five = reqBodyProperty.includes('5')
        cap.six = reqBodyProperty.includes('6')
        cap.seven = reqBodyProperty.includes('7')
    }
    return cap
}

module.exports = { getProducts, sortProducts, getPDP, searchProducts, filterProducts, parseSortBy, parseBrand, parseCapacity }