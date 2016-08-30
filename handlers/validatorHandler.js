function Validator() {
    const validator = require('validator');
    // const mongoose = require('mongoose');
    // const googleLibphonenumber = require('google-libphonenumber');







    // const ObjectId = mongoose.Schema.Types.ObjectId;
    // const mongoObjectID = mongoose.mongo.ObjectID;
    // const phoneUtil = googleLibphonenumber.PhoneNumberUtil.getInstance();

    const nameRegExp = /^[a-zA-Z1-9_\-\s]+$/,
        // invalidCharsRegExp = /[~<>\^\*₴]/,
        // skypeRegExp = /^[\w\._@]{6,100}$/,
        // passRegExp = /^[\w\.@]{3,100}$/,
        cleenUpText = /(?:[\n\s]) +|^ +|[\n\s]$/mg,
        zipPatt = /^\d{5}$/;
    // loginRegExp = /[\w\.@]{6,100}$/;




    this.email = (email, errors, required, fildName = 'Email') => {
        if (required && !email) {
            return errors.push(new Error(`please insert your email address for ${fildName}`));
        } else if (!email) {
            return;
        } else if (!validator.isEmail(email)) {
            return errors.push(new Error(`wrong email address for ${fildName}`));
        }
    };

    // this.phone = (phone, errors, required) => {
    //     if (required && !phone) {
    //         return errors.push(new Error('please insert your phone number'));
    //     } else if (!phone) {
    //         return;
    //     }
    //
    //     var tel = phoneUtil.parse(phone);
    //
    //     try {
    //         if (!phoneUtil.isValidNumber(tel)) {
    //             errors.push(new Error('Invalid phone number'));
    //         }
    //     } catch (e) {
    //         errors.push(new Error('Invalid phone number'));
    //     }
    // };

    this.emailAndName = (email, errors, required, fildName = 'Email') => {
        if (required && !email) {
            return errors.push(new Error(`please insert your email address for ${fildName}`));
        } else if (!email) {
            return;
        } else if (!validator.isEmail(email, {
                allow_display_name: true,
            })) {
            return errors.push(new Error(`wrong email address for ${fildName}`));
        }
    };

    this.password = (password, errors, required) => {
        if (required && !password) {
            return errors.push(new Error(`please insert your password address`));
        } else if (!password) {
            return;
        } else if (typeof password !== 'string') {
            return errors.push(new Error(`wrong password`));
        } else if (password.length < 6 || password.length > 64) {
            return errors.push(new Error(`wrong password length mast by > 6, < 64`));
        }
    };

    // this.mongoId = (id, errors, required, fildName = 'ID') => {
    //     if (id instanceof mongoObjectID || id instanceof ObjectId) {
    //         id = id.toString(); // convet to string if its mongoose object id
    //     }
    //
    //     if (required && !id) {
    //         return errors.push(new Error(`id is missing for ${fildName}`));
    //     } else if (!id) {
    //         return;
    //     } else if (!validator.isMongoId(id + '')) {
    //         return errors.push(new Error(`wrong id for ${fildName}`));
    //     }
    // };

    this.isMongoId = validator.isMongoId;

    this.name = (name, errors, required, fildName = 'Name') => {
        if (required && !name) {
            return errors.push(new Error(`name is missing for ${fildName}`));
        } else if (!name) {
            return;
        } else if (name.length < 2) {
            return errors.push(new Error(`${fildName} is too short`));
        } else if (!nameRegExp.test(name)) {
            return errors.push(new Error(`wrong name... allowed characters is "a-zA-Z1-9_- " for ${fildName}`));
        }
    };

    this.zip = (zip, errors, required) => {
        console.log('-=>', zip);
        if (required && !zip) {
            return errors.push(new Error('zip code is missing'));
        } else if (!zip) {
            return;
        } else if (!zipPatt.test(zip)) {
            return errors.push(new Error('wrong zip code'));
        }
    };

    this.textNormailize = (text) => {
        // text = text.trim();
        text = validator.escape(text);
        text = text.replace(cleenUpText, "");
        return text;
    };
}


module.exports = new Validator();
