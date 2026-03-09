const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true },
    type: { type: String, enum: ['AFFILIATE', 'SPONSOR'], default: 'AFFILIATE' },
    category: { type: String, default: 'General' },
    active: { type: Boolean, default: true }
}, {
    timestamps: true
});

module.exports = mongoose.model('Sponsor', sponsorSchema);
