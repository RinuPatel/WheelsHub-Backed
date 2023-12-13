const nameValidation = (name) =>{
    const REG_NAME_FORMAT = /^[a-zA-Z]+$/;
    if (  name.length > 3 && name.length < 20 && REG_NAME_FORMAT.test(name)) {
        return true
    }

}

module.exports = nameValidation;