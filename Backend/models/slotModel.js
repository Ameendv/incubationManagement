const mongoose= require('mongoose')


 
const Slots = new mongoose.Schema({
        isBooked:{type:Boolean,default:false},
        section:{type:String,required:true},
        companyName:{type:String},
        name:{type:String}
        

       
    },{collection:'slots'})

const model=mongoose.model('slotData',Slots) 

module.exports = model; 