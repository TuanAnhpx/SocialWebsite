class SuccessResponse{
    constructor(code, message, success = true){
        this.success = success;
        this.code = code;
        this.message = message;
    }
}

module.exports = SuccessResponse;