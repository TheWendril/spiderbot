const GameStringfy = {

    freeGamesToMessage: function(jsonobject){
        
        let message = ''

        message = message + jsonobject.title + '\n\n'
        message = message + jsonobject.description + '\n\n'
        message = message + jsonobject.status + '\n'
    
        return message;
    },

    getImageFromObject: function(jsonobject){
        return jsonobject.keyImages[0].url
    }

}

module.exports = GameStringfy