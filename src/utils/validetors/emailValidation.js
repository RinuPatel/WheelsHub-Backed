const emailValid = (email) =>{
    const REG_EMAIL_FORMAT = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    if(REG_EMAIL_FORMAT.test(email)){
        return true;
    }
}
module.exports = emailValid;