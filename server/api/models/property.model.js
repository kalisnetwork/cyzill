import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    personalDetails: {
        type: String,
        enum: ['owner', 'agent'],
        required: true
    },
    forDetails: {
        type: String,
        enum: ['sell', 'buy', 'rent']
    },
    propertyType: {
        type: String,
        enum: ['flat', 'residentailhouse', 'Villa', 'residentialland', 'penthouse', 'commercialoffice', 'commercialshop', 'commercialland', 'warehouse', 'industialland', 'industrialbuilding']
    },
    flatsInSociety: {
        type: String,
        enum: ['less_than_50', 'between_50_and_100', 'more_than_100']
    },
    location: {
        type: String
    },
    description: {
        type: String
    },
    bedrooms: {
        type: Number
    },
    bathrooms: {
        type: Number
    },
    furnishedStatus: {
        type: String,
        enum: ['furnished', 'semi_furnished', 'unfurnished']
    },
    coveredArea: {
        type: Number
    },
    carpetArea: {
        type: Number
    },
    constructionYear: {
        type: Number
    },
    expectedPrice: {
        type: Number,
        required: true
    },
    priceIncludes: {
        type: String,
        enum: ['fixed', 'negotiable', 'call_for_price'],
        required: true
    },
    otherCharges: {
        type: Number
    },
    bookingAmount: {
        type: Number
    },
    maintenanceCharges: {
        type: Number
    },
    photos: [{
        type: String
    }]
}, { timestamps: true });

const Property = mongoose.model('Property', propertySchema);

export default Property;
