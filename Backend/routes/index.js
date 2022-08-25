var express = require('express');
const Admin = require('../models/adminModel')
const User = require('../models/userModel')
const Slots = require('../models/slotModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var router = express.Router();

const checkToken = (req, res, next) => {

  let token = req.headers.authorization

  if (token) {
    let auth = jwt.verify(token, process.env.JWT_KEY)
    if (auth) {
      console.log("verified")
      next()
    }
  } else {
    res.status(400).json({ errorMessage: "Authentication error" })
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', async (req, res) => {



  await Admin.findOne({ email: req.body.email }).then(async (response) => {
    if (response) {
      const isValid = await bcrypt.compare(req.body.password, response.password)
      if (isValid) {
        console.log(response)
        const token = jwt.sign({ email: response.email, id: response._id }, process.env.JWT_KEY);
        return res.json({ status: 'ok', id: response._id, email: response.email, token: token })
      }
      else {
        return res.json({ status: "password invalid" })
      }
    } else {
      return res.json({ status: 'invalid admin ' })
    }

  })
})

router.get('/getApplicants', checkToken, async (req, res) => {
  try {
    await User.find({ }).then((response) => {
      
      
     
      const newAppl=response.filter((data)=>{
        return data.status==='new'
      })

      const all=response.filter((data)=>{
        return data.status==='pending' || data.status==='approved' || data.status==='declined'
      })
      console.log(newAppl,'new')
      console.log(all,'all') 

      res.json({ new:newAppl,all:all })
    })
  } catch (error) {
    console.log(error)
  }
})

router.put('/changeStatus', checkToken, async (req, res) => {
  console.log(req.body.id)

  try {
    await User.updateOne({ _id: req.body.id }, { $set: { status: 'pending' } }).then((response) => {
      res.status('200').json({ status: 'ok' })
    })
  } catch (error) {
    console.log(error)
  }

  User.updateOne({ _id: req.body.id }, { $set: { status: 'pending' } })
})


router.post('/getCompanyDetails',checkToken,async(req,res)=>{
   

   try{
    const details=await User.findOne({_id:req.body.id})
    
     res.status('200').json(details)

   }catch(error){
    console.log(error)
   }

   
})


// router.get('/getPendings', async (req, res) => {
//   console.log('check')
//   try {

//     User.find({ status: 'pending',status:'approved' }).then((response) => {
//       res.status('200').json({ response })
//     })

//   } catch (error) {

//   }


// })

router.put('/approveStatus',checkToken,async(req,res)=>{
  try{
    User.updateOne({_id:req.body.id},{$set:{status:'approved'}}).then((response)=>{
      res.status('200').json({status:'ok'})
    })
  }catch(error){
    console.log(error)
  }
})


router.put('/declineStatus',checkToken,async(req,res)=>{
  try{

User.updateOne({_id:req.body.id},{$set:{status:'declined'}}).then((response)=>{
  res.status('200').json({status:'ok'})
})

  }catch(error){
    console.log(error)
  }
})

router.get('/getAllUsers',checkToken,async(req,res)=>{
  try{

const users=await User.find({})
    res.json({users})

  }catch(error){
    console.log(error)
  }
})


router.get('/getSlots',async(req,res)=>{
 
  try{

    Slots.find({}).then((response)=>{
      const slotA=response.filter((data)=>{
        return data.section==='A'
      })
  
      const slotB=response.filter((data)=>{
        return data.section==='B'
      })
  
      const slotC=response.filter((data)=>{
        return data.section==='C'
      })
  
      const slotD=response.filter((data)=>{
        return data.section==='D'
      })
  
      const slotE=response.filter((data)=>{
        return data.section==='E'
      })
  
      const slotF=response.filter((data)=>{
        return data.section==='F'
      })
  
     return res.status('200').json({slotA:slotA,slotB:slotB,slotC:slotC,slotD:slotD,slotE:slotE,slotF:slotF})
       
    })

  }catch(error){
    console.log(error)
  }
 
 
})

router.get('/getApproved',async(req,res)=>{

  try{
    User.find({status:'approved',booked:false}).then((response)=>{
      return res.status('200').json({response})
     })
  }catch(error){
    console.log(error)
  }
 
})

router.post('/bookSlot',async(req,res)=>{
  try{
    await Slots.updateOne({_id:req.body.id},{$set:{isBooked:true}})
    await User.updateOne({_id:req.body.company},{$set:{booked:true,bookedSlot:req.body.slot}})
    const companyName=await User.findOne({_id:req.body.company})
    await Slots.updateOne({_id:req.body.id},{$set:{companyName:companyName.name}})

    console.log('done')
    res.json({status:'ok',message:'Booking success'})
  }catch(error){
    console.log(error)
  }
})


module.exports = router;
