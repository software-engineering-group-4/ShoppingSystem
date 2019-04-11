const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.post("/add", (req,res)=>{
  User.findOne({"email":req.body.customer}, function(err, result){
    if (err) throw err;
    var item={"itemName": req.body.itemName,"itemQuantity": req.body.itemQuantity,"itemPrice": req.body.itemPrice}
    if(result.cart.length!=0){
      var cartUpdate = result.cart;
      var update=false;
      for(x=0;x<cartUpdate.length;x++){
        if(cartUpdate[x].itemName==item.itemName){
          console.log(item.itemQuantity)
          cartUpdate[x].itemQuantity=parseInt(cartUpdate[x].itemQuantity)+parseInt(item.itemQuantity)
          update=true
          break;
        }
      }
      if(update==false){
        console.log(item.itemQuantity)
        cartUpdate=[...cartUpdate,item]
        console.log(cartUpdate)
      }
    }else{
      var cartUpdate=[item]
    }

    User.update({email:req.body.customer}, {$set:{cart:cartUpdate}}, function(err,res){
      if(err) throw err;
      console.log("Updated")
    })
  })
  res.send("added")
})

router.post("/edit", (req,res)=>{
  User.findOne({"email":req.body.customer}, function(err, result){
    if (err) throw err;
    var item={"itemName": req.body.itemName,"itemQuantity": req.body.itemQuantity,"itemPrice": req.body.itemPrice}
    if(result.cart.length!=0){
      var cartUpdate = result.cart;
      var update=false;
      for(x=0;x<cartUpdate.length;x++){
        if(cartUpdate[x].itemName==item.itemName){
          console.log(item.itemQuantity)
          cartUpdate[x].itemQuantity=parseInt(item.itemQuantity)
          update=true
          break;
        }
      }
      if(update==false){
        console.log(item.itemQuantity)
        cartUpdate=[...cartUpdate,item]
        console.log(cartUpdate)
      }
    }else{
      var cartUpdate=[item]
    }

    User.update({email:req.body.customer}, {$set:{cart:cartUpdate}}, function(err,res){
      if(err) throw err;
      console.log("Updated")
    })
  })
  res.send("edited")
})

router.post("/getCart", (req,res)=>{
  User.findOne({"email":req.body.customer}, function(err, result){
    if (err) throw err;
    if(result==null){
      res.send("no account")
      return
    }
    if(result.cart.length!=0){
      var cart=result.cart;
      res.send(cart)
    } else {
      res.send([])
    }
  }
)
})

router.post("/delete", (req,res)=>{
  User.findOne({"email":req.body.customer}, function(err, result){
    if (err) throw err;
    var item=req.body.itemName
    var newCart=[];
    for(x=0;x<result.cart.length;x++){
      if(result.cart[x].itemName!=item){
        newCart.push(result.cart[x])
      }
    }
    console.log(newCart)
    User.update({email:req.body.customer}, {$set:{cart:newCart}}, function(err,res){
      if(err) throw err;
      console.log("Updated")
    })
  })
  res.send("deleted")
})


module.exports = router;
