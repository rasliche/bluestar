const mongoose = require('mongoose')
const Joi = require('joi')
const _ = require('lodash')
const slug = require('slugs')

const shopSchema = new mongoose.Schema({
    // TODO: Shape data better (min lengths, max lengths)
    name: {
        type: String,
        required: "A shop name is required.",
        trim: true,
    },
    password: {
        type: String,
        required: "A shop password is required."
    },
    email: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    slug: String,
    records: [
        { 
            year: Number,
            isComplete: Boolean,
            conservationActivity: {
                name: String,
                description: String,
                date: Date
            }
        }
    ],
    managers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    region: {
        type: String,
        enum: [ 'upper', 'middle', 'lower', 'keywest']
    },
    website: {
        type: String
    }
})

shopSchema.pre('save', async function(next) {
    if (!this.isModified('name')) {
      next(); // skip it
      return; // stop this function from running
    }
    this.slug = slug(this.name);
    // find other stores that have a slug of wes, wes-1, wes-2
    const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
    const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
    if (storesWithSlug.length) {
      this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
    }
    next();
    // TODO make more resiliant so slugs are unique
  });

function validateShop(shop) {
    const schema = {
        name: Joi.string().required(),
        password: Joi.string().required(),
        email: Joi.string(),
        phone: Joi.string(),
        website: Joi.string()
    }

    return Joi.validate(shop, schema)
}

const Shop = mongoose.model('Shop', shopSchema)

module.exports.Shop = Shop
module.exports.validateShop = validateShop