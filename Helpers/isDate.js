const moment = require("moment");

const isDate = ( value, { req, location, path } ) => {
    const fecha = moment( value );
    if( fecha.isValid() && value ){
        return true;
    }

    return false;
}

module.exports = { isDate };