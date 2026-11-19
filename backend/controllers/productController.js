const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const { productName, productDescription, productImage, productPrice } = req.body;

    if (!productName || !productDescription || !productImage || !productPrice) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    // req.userId is set by userAuthenticate from the token
    const product = await Product.create({
      productName,
      productDescription,
      productImage,
      productPrice,
      user: req.userId,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProductsOld = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { search, minPrice, maxPrice, sort, limit, page } = req.query;



    const query = {};

    if (search) {
      query.productName = {
        $regex: search,
        $options: "i"
      };

      if (minPrice !== undefined || maxPrice !== undefined) {
        query.productPrice = {};
        if (minPrice !== undefined) {
          query.productPrice.$gte = minPrice;
        }
        if (maxPrice !== undefined) {
          query.productPrice.$lte = maxPrice;
        }

      }
    }
      const sortOptions = {};
      
      if (sort === "price_asc") {
        sortOptions.productPrice = 1;
      } else if (sort === "price_des") {
        sortOptions.productPrice = -1;
      } else if (sort === "name_asc") {
        sortOptions.productName = 1;
      } else if (sort === "name_des") {
        sortOptions.productName = -1
      } else {
        sortOptions.createdAt = -1;
      }

      const pageNumber = Math.max(1, parseInt(page,10) || 1);

      const limitNumber = Math.min(100, Math.max(1, parseInt(limit,10)|| 10));
    
      const skip = ( pageNumber - 1)* limitNumber;

    console.log("req.query---------", req.query);

    const [products, totalProductsCount]= await Promise.all([Product.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNumber),
    Product.find(query).countDocuments()
  ]);


    res.status(200).json({
      success: true,
      currentPage:page,
      products,
      totalProductsCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, productDescription, productImage, productPrice } = req.body;

    if (!productName || !productDescription || !productImage || !productPrice) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    // const product = await Product.findByIdAndUpdate(id, req.body);


    console.log("userId-----", req.userId);


    const product = await Product.findOneAndUpdate({
      _id: id,
      user: req.userId
    }, req.body);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or wrong product id or you don't have permission to update this product!"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOneAndDelete({ _id: id, user: req.userId });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.userId });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};