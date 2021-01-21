const CustomerModel= require('../models/customer.model');
const OrderModel= require('../models/order.model');
const ObjectID = require('mongoose').Types.ObjectId;
const mongoose = require("mongoose");
const Menu =  require('../models/menu.model');

//get all the customer
module.exports.getAllCustomer = (req, res) => {
    CustomerModel.find(req.params, (err, docs)=>{
        if(!err)
            res.send(docs);
        else 
            console.log("error: " + err);
    }).select();
}

//insert new customer
module.exports.createCustomer = (req, res) => {
    const newCustomer = new CustomerModel({
        _id: new mongoose.Types.ObjectId(),
        name_customer : req.body.name_customer,
        type_customer : req.body.type_customer,
        drink_preference : [],
        food_preference : []
    }
    );
    console.log(req.body);

    newCustomer.save((err, docs) => {
        if (err) return handleError(err);
        res.send(docs);    
    })
}

//get customer's info
module.exports.customerInfo = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)
    
    CustomerModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    }).select();
}

//get the query data
module.exports.typeInfo = (req, res) => {
    const typeCustomer = req.params.type;

    //recherche la donnée saisit dans l'input sans prendre en compte les majuscules et minuscules
    const query = { 'type_customer': { $regex: new RegExp(`^${typeCustomer}`), $options: 'i' } };

    CustomerModel.find(query, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('unknown : ' + err);
    }).select();
    
}