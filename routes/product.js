var express = require('express');
var router = express.Router();
var pool= require('./pool');
var upload= require('./multer');



/* GET home page. */
router.get('/fetch_all_categories', function(req, res, next) {
  pool.query("select * from category", function(error,result){
    if (error){
      res.status(500).json([]);
    } else{
      res.status(200).json({category:result});
    }
    
  });
});



//fetch data of subcate4gories
router.get('/fetch_all_subcategories', function(req, res, next) {
  pool.query("select * from subcategory where categoryid=?",[req.query.categoryid], function(error,result){
    if (error){
      res.status(500).json([]);
    } else{
      res.status(200).json({subcategory:result});
    }
    
  });
});




//fetch data of brands
router.get('/fetch_all_brands', function(req, res, next) {
  pool.query("select * from brand where categoryid=?",[req.query.categoryid], function(error,result){
    if (error){
      res.status(500).json([]);
    } else{
      res.status(200).json({brand:result});
    }
    
  });
});




//send data to productinterface
router.get('/product', function(req, res, next) {
  res.render('productinterface',{'message':""});
});



//send data to server
router.post('/submitproduct',upload.any(), function(req, res, next) {
  // console.log('Form data:',req.body)
  // console.log('xxxxxx:',req.files)
  pool.query("insert into products( categoryid, subcategoryid, brandid, productname, description, price, offerprice, ratings, stock, status , picture) values(?,?,?,?,?,?,?,?,?,?,?)",
  [req.body.categoryid, 
    req.body.subcategoryid, 
    req.body.brandid, 
    req.body.productname, 
    req.body.description, 
    req.body.price, 
    req.body.offerprice, 
    req.body.stock, 
    req.body.ratings, 
    req.body.status , 
    req.files[0].filename],
    function(error,result){
    if (error) {
      console.log('Error:',error)
      res.render('productinterface',{message:"Server error"});
    } else {
      console.log('Result:',result)
      res.render('productinterface',{message:'Record submitted successfully'});
    }
  });
});




//display database or sending data 
router.get('/display_all_product',function(req,res,next){
  pool.query("select P.*,(select C.categoryname from category C where C.categoryid=P.categoryid) as categoryname,(select S.subcategoryname from subcategory S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brand B where B.brandid=P.brandid) as brandname from products P",function(error,result){
    if (error) {
      console.log('Error:',error)
      res.render('displaydatabase',{status:false,data:'Server error'})
    } 
    else
    {
     if(result.length==0)
     { res.render('displaydatabase',{status:false,data:'No record found...'})}
     else
     {
      res.render('displaydatabase',{status:true,data:result})
     }
    }
  });
});


router.get('/editproduct',  function(req, res, next) {
  // console.log('Form data:',req.body)
  // console.log('xxxxxx:',req.files)
  pool.query("update products set categoryid=?, subcategoryid=?, brandid=?, productname=?, description=?, price=?, offerprice=?, ratings=?, stock=?, status=? where productid=?)",
  [req.query.categoryid, 
    req.query.subcategoryid, 
    req.query.brandid, 
    req.query.productname, 
    req.query.description, 
    req.query.price, 
    req.query.offerprice, 
    req.query.status , 
    req.query.stock, 
    req.query.ratings, 
    req.query.productid], 
    function(error,result){
    if (error) {
      console.log('Error:',error)
      res.status(500).json({status:false,message:"Server error"});
    } else {
      console.log('Result:',result)
      res.status(200).json({status:true,message:'Record edited successfully'});
    }
  });
});


router.get("/deleteproductdata", function (req, res, next) {
     pool.query("delete from products  where productid=?",
      [
        req.query.productid,
        
      ],
      function (error, result) {
        if (error) {
          console.log("Error:", error);
          res.status(500).json({status:false, message: "Server Error...." });
        } else {
        
          res.status(200).json({status:true,message: "Record Deleted Successfully....",});
        }
      });
  });
 

module.exports = router;