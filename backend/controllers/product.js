const Product = require('../models/product');

const create = async (req, res) => {
    if(!req.body.name || !req.body.price || !req.body.codigo || !req.body.description) 
        return res.status(401).send({message: 'process failed: Incomplete data'});
    const existing = await Product.findOne({ codigo: req.body.codigo });
    if(existing)
        return res.status(401).send("preccess failed: the product code is already registered");
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        codigo: req.body.codigo,
        description: req.body.description,
        status: true
    });
    const result = product.save();
    if(result) return res.status(200).send({message: 'Product create', data: product});
    return res.status(401).send({message: 'Fail to register product'});
};

const list = async (req, res) => {
    const products = await Product.find();
    if(products.length === 0) return res.status(401).send({message: 'Not products found'});
    return res.status(200).send(products);   
}
module.exports = {create, list};