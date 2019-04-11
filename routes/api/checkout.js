const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Checkout = require('../../models/Checkout');

router.post("/checkout", (req,res)=>{
    Checkout.create(req.body, function(err, result){
    if (err) throw err;


    User.update({email:req.body.email}, {$set:{cart:[]}}, function(err,res){
      if(err) throw err;
      console.log("Updated")
    })
  })
  res.send("added")
})



module.exports = router;
