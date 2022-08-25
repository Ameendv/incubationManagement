const express = require('express');
const User = require('../models/userModel')
const router = express.Router();
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
const multer = require('multer')
const fs = require('fs');
const path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('des')
    cb(null, './public')
  },
  filename: function (req, file, cb) {
    console.log('des')
    cb(null, 'companyLogo.jpg')
  }
})
let upload = multer({ storage: storage }).single('logo')

/* GET users listing. */ 
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/userSignup', async (req, res) => {
  const newPassword=await bcrypt.hash(req.body.password,10)
  try {
    console.log(newPassword)
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword
    }).then((response) => { 
      res.json({status:'ok'})
     })
  } catch (error) { 
    console.log(error)
     res.json({status:'error'}) 
  }
 
}) 

router.post('/login',async (req,res)=>{
  try {
    const user=await User.findOne({email:req.body.email})
    if(!user){
      return res.json({status:'User not registered'})
    }
    else{
      const isValidPassword=await bcrypt.compare(req.body.password,user.password)

      if(isValidPassword){
            const token = jwt.sign({
              name:user.name,
              email:user.email
            },process.env.JWT_KEY)
            console.log(user,'user')

            return res.json({status:'ok',token:token,user:{username:user.name,email:user.email}})
      }else{
        return res.json({status:'Incorrect Password'})
      }
    }
  } catch (error) {
    console.log(error)
    return res.json({status:'user password incorrect'})
  }
})

router.post('/registration',async (req,res)=>{
  upload(req,res,async (err)=>{
  if(err){
    console.log(err)
  }
  let formData=JSON.parse(req.body.data)
  
 
try{ 
  const userData=await User.findOne({email:req.body.email})
  console.log(userData,req.body)
  if(userData.formSubmitted){
    return res.json({status:'Duplicate form submission'})
  }
  
  User.updateOne({email:req.body.email,formSubmitted:false},{$set:{form:{...formData},formSubmitted:true},upsert:true}).then((response)=>{
    if(response){
      console.log(userData)
      const currentPath =path.join(__dirname,"../public","companyLogo.jpg");
        const destinationPath =path.join(__dirname, "../public/logoImages", userData._id + ".jpg");

        fs.rename(currentPath, destinationPath, function (err) {
         
          if (err) {
            
            throw err
          } else {
            console.log("Successfully moved the file!");
          }
        });

      return res.json({status:'ok'})
    }
  })}catch(error){
    console.log(error);
  } 
    
})   

})  

module.exports = router;  
    