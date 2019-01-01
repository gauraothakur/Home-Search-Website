var mongoose = require('mongoose')
var Schema = mongoose.Schema

var propertySchema = new mongoose.Schema({
    latitute:String,
    longitute:String,
    address: String,
    zipcode: String,
    price:String,
    propertyType:String,
    dateAvailable: String,
    beds: String,
    bath: String,
    leaseDuration:String,
    securityDeposit:String,
    isForRent:Boolean,
    sqaureFeet: String,
    amenities: [],
    laundry: String,
    contactName: String,
    contactEmail: String,
    contactPhone: String,
    images: [],
    addedBy: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
})
propertySchema.index({address: "text", zipcode: "text"});
module.exports = mongoose.model('Property', propertySchema)