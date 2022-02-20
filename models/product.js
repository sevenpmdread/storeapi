const mongoose = require('mongoose')

const Product = mongoose.Schema({
  name:{
    type:String,
    required:[true,'Product Name must be provided']
  },
  featured:{
    type:Boolean,
    default:false
  },
  rating:{
    type:Number,
    default:2.2
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  price:{
    type:Number,
    required:[true,'Price must be provided']
  },
  company:{
    type:String,
    enum:{
      values:['ikea','marcos','liddy','caressa'],
      message:'{VALUE} is not supported'
    }
  }
})

module.exports = mongoose.model('Product',Product)
