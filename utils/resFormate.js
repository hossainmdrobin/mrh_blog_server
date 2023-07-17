exports.success = (message, data)=>{
    return {
        message,
        data,
        success:true
    }
}

exports.fail = (message, code) => {
    return {
        message,
        code:code || 500,
        success:false
    }
}