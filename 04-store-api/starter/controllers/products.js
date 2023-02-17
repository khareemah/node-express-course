const Product = require('../models/product');
const getProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true, company: 'ikea' });
  res.status(200).json({ products, nbHits: products.length });
};

const getProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '<': '$lt',
      '<=': '$lte',
      '=': '$eq',
    };
    const regEx = /\b(>|>=|<|<=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }
  let results = Product.find(queryObject);

  if (sort) {
    const sortList = sort.split(',').join(' ');
    results = results.sort(sortList);
  } else {
    results = results.sort('-name -price');
  }
  if (fields) {
    const fieldsList = fields.split(',').join(' ');
    results = results.select(fieldsList);
  }

  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;
  results = results.skip(skip).limit(limit);

  const products = await results;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getProducts, getProductsStatic };
