const { format } = require('date-fns');


const now = ()  => {
    return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
}


module.exports = now;