const GameStringfy = require('./GameStringfy.js')
const { EpicFreeGames } = require('epic-free-games')

const epicFreeGames = new EpicFreeGames({country: 'BR', locale: 'pt-BR', includeAll: false}) 

const StrategyMenu = {

    freegamesepic: {
        menuLabel: 'Jogos Grátis na Epic',
        process: (bot, chatId) => {
            
            epicFreeGames.getGames().then((res) => {

                bot.sendMessage(chatId, 'Aqui estão os jogos grátis da semana na Epic Games: ').then(() => {
    
                    for(let i = 0; i < res.currentGames.length; i++){
                        bot.sendPhoto(chatId, GameStringfy.getImageFromObject(res.currentGames[i]), 
                                        {caption: GameStringfy.freeGamesToMessage(res.currentGames[i])})
                    }
                })
    
            }).catch((err) => console.log(err))
        }
    },

    nextfreegamesepic:  {
        menuLabel: 'Próximos Jogos Grátis na Epic',
        process: (bot, chatId) => {

            epicFreeGames.getGames().then((res) => {
       
                if(res.nextGames.length == 0)
                    bot.sendMessage(chatId, 'Ainda não há registros de jogos para próxima semana!')            
                
                else                
                    bot.sendMessage(chatId, 'Aqui estão os jogos que ficarão grátis na Epic Games: ').then(() => {

                        for(let i = 0; i < res.nextGames.length; i++){
                            bot.sendPhoto(chatId, GameStringfy.getImageFromObject(res.nextGames[i]), 
                                            {caption: GameStringfy.freeGamesToMessage(res.nextGames[i])})
                        }
                        
                    })
            }).catch((err) => console.log(err))
        }
    }
}


module.exports = StrategyMenu