const mongoose = require('mongoose')



const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    form: { type: Object },
    formSubmitted: { type: Boolean, default: false },
    status: { type: String, default: 'new' },

    booked: { type: Boolean, default: false }

}, { collection: 'users' })

const model = mongoose.model('UserData', User)

module.exports = model; 