const mongoose = require('mongoose');

//Part1 : Connect with Databse

mongoose.connect(process.env.DATABASE_URL , {
    useNewUrlParser : true,
    useUnifiedTopology : true
})


DBConnect();

//Part 2 : Create Schema and make connection Between Them
const productSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    SKU : {
        type : String,
        required : true
    },
    category_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "product_category"
    },
    inventory_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "product_inventory"
    },
    price : {
        type : Number,
        required : true,
    },
    discount_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "discount"
    },
    created_at : {
        type : Date,
        default : Date.now()
    },
    modified_at : {
        type : Date
    },
    deleted_at : {
        type : Date
    },
})

const product_categorySchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    },
    product_id : {//Here we store multiple ids of the products which comes under this category
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
    },
    name : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    created_at : {
        type : Date,
        default : Date.now()
    },
    modified_at : {
        type : Date
    },
    deleted_at : {
        type : Date
    }
})

const product_inventorySchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    },
    product_id : [{ //Here we store multiple ids of the products which comes under this inventory
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
    }],
    quantity : {
        type : Number,
    },
    created_at : {
        type : Date,
        default : Date.now()
    },
    modified_at : {
        type : Date
    },
    deleted_at : {
        type : Date
    }
})

const discountSchema = new mongoose.Schema({
    id : {
        type : Number,
        required : true,
        unique : true
    },
    product_id : { //Here we store multiple ids of the products which comes under this Discount
        type : mongoose.Schema.Types.ObjectId,
        ref : "product"
    },
    name : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    discount_percent : {
        type : Number,
        required : true
    },
    active : {
        type: Boolean,
        required : true,
        default : false
    },
    created_at : {
        type : Date,
        default : Date.now()
    },
    modified_at : {
        type : Date
    },
    deleted_at : {
        type : Date
    }
})

// Create models
const Product = mongoose.model('product', productSchema);
const ProductCategory = mongoose.model('product_category', product_categorySchema);
const ProductInventory = mongoose.model('product_inventory', product_inventorySchema);
const Discount = mongoose.model('discount', discountSchema);

// Export the models for use in other parts of our application
module.exports = {
  ProductCategory,
  Product,
  ProductInventory,
  Discount,
};