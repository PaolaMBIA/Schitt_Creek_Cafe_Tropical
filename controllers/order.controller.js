const OrderModel= require('../models/order.model');
const ObjectID = require('mongoose').Types.ObjectId;
const mongoose = require("mongoose");


let date = new Date();
date.setHours(date.getHours()-144);

//get all the order
module.exports.getAllorder = (req, res) => {
    OrderModel.find((err, docs)=>{
        if(!err)
            res.send(docs);
        else 
            console.log("error: " + err);
    })
}

//insert new order
module.exports.createOrder = (req, res)=> {
    const newOrder = new OrderModel({
        _id: new mongoose.Types.ObjectId(),
        menu_item: [],
        tone: req.body.tone,
        nbr_customer: req.body.nbr_customer,
        split_bill: req.body.split_bill,
        feedback: req.body.feedback
    });
    newOrder.save((err, docs)=>{
        if (err) return handleError(err);
        res.send(docs);
    })
}

//patch customer's order
module.exports.menuAdd = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)
    try{
        return OrderModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    menu_item: {
                        customerId: req.body.customerId,
                        food: req.body.food,
                        drink: req.body.drink,
                        priceFood:  req.body.priceFood,
                        priceDrink: req.body.priceDrink,
                        level_cookedness: req.body.level_cookedness,
                        tone: req.body.tone,
                    }
                }   
            },
            {new: true},
            (err,docs) => {
                if(!err)
                    
                    res.send(docs);
                else 
                    console.log('error: ' + err);
            }
        )
    }catch(err){
        return res.status(400).send(err);
    }
}

//update order
module.exports.updateOrder = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
      return res.status(400).send("ID unknown : " + req.params.id);
  
    const updatedRecord = {
        split_bill: req.body.split_bill,
        feedback: req.body.feedback
    };
  
    OrderModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Update error : " + err);
      }
    );
};

//get order's info
module.exports.orderInfo = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)
    
        OrderModel.findById(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    }).select();
};

//get the total bill
module.exports.totalBill = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknown : ' + req.params.id)

    OrderModel.aggregate([
        {
            $match: {
                _id: ObjectID(req.params.id),
            }
        },
        {
            $project : {   
                total: {$sum: "$menu_item.priceFood" },
                total2: {$sum: "$menu_item.priceDrink" },
            }
        },
        {
            $addFields: {
                totalBill: {$sum: ["$total", "$total2"]}
            }
        }
    ],
    function(err, docs){
        if(!err)
            res.send(docs);
        else 
            console.log("error: " + err);
    })
};

//get all the 8-rated overcooked diner did serve in the last 144 hours
module.exports.dinerInfo = (req, res) => {
    OrderModel.aggregate([
            {
                $match : {
                    "menu_item.level_cookedness": 8,
                    createdAt: {$gte: date}
                }
            },
            {
                $project : {
                    menu_item: {
                        $filter: {
                            input: "$menu_item",
                            as: "menu_item",
                            cond: {$eq: ["$$menu_item.level_cookedness", 8]}
                        }
                    },   
                    createdAt: {$dateToString: {'format': '%Y-%m-%d à %Hh%M', 'date': '$createdAt'}}
                }
            },
            {
                $addFields: {
                    total: {$sum: "$menu_item.priceFood" }, 
                     
                }
            }
        ],
        // function numMedian(docs) {
        //     docs = docs.slice(0).sort(function(x, y) {
        //       return x - y;
        //     });
        //     let b = (docs.length + 1) / 2;
        //     return (docs.length % 2) ? a[b - 1] : (a[b - 1.5] + a[b - 0.5]) / 2;
        //   }

        function(err, docs){
        if(!err)
            res.send(docs);
        else 
            console.log("error: " + err);
    })
}