const Product = require('../models/product')

const getProductsAll = async (req,res) => {
  const {featured,company,name,sort,fields,numericFilters} = req.query
  const queryObject = {}
  if(featured)
  {
    queryObject.featured = featured === "true" ? true : false
  }
  if(company)
  queryObject.company = company
  if(name)
  {
    queryObject.name = {$regex: name, $options:'g'}
    //queryObject.name = newname
  }
  console.log(queryObject)
  let result =  Product.find(queryObject)
  if(sort)
  {
    const sortList = sort.split(',').join(' ')
    result = result.sort(sortList)
    console.log('sort')
  }
  else {
    result = result.sort('createdAt')
  }
  if(fields)
  {
    const fieldsList = fields.split(',').join(' ')
    result = result.select(fieldsList)
  }
  if(numericFilters)
  {
    const opeatorMap = {
      ">":"$gt",
      ">=":"$gte",
      "<":"$lt",
      "<=":"$lte",
      "=":"$eq",
    }
    const regex = /\b(< | >| = | <= | >=)\b/g
    let filters = numericFilters.replace(regex,(match) => `-${opeatorMap[match]}`)
    const options = ['rating','price']
    filters = filter.split(',').forEach((item) =>{
    const [field,operator,value]  = item.split('-')
    if(options.includes(field))
    {
      queryObject[field] = {[operator] : Number(value)}
    }
    })
    console.log(queryObject)
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page  - 1)* limit
  result.skip(skip).limit(limit)
  const products = await result
  res.status(200).json({products,nbHits:products.length})
}

const getProductsStatic = async (req,res) => {
  const search = 'a'
  console.log('in static')
  const products = await Product.find({
    name: {$regex: search,  $options:'i'}
  })
  res.status(200).json({products,nbHits:products.length})
}

module.exports = {getProductsAll,getProductsStatic}
