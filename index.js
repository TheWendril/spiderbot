require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const { EpicFreeGames } = require('epic-free-games')
const GameStringfy = require('./src/GameStringfy.js')

const token = process.env.BOT_TOKEN;
const epicFreeGames = new EpicFreeGames({country: 'BR', locale: 'pt-BR', includeAll: false}) 

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
    
    const chatId = msg.chat.id

    if(msg.text == '/help'){
        bot.sendMessage(chatId, 'Seja bem vindo ao bot de jogos Spider!\n')
    }
    
    else if(msg.text == '/free'){

        epicFreeGames.getGames().then((res) => {

            bot.sendMessage(chatId, 'Aqui estão os jogos grátis da semana na Epic Games: ').then(() => {

                for(let i = 0; i < res.currentGames.length; i++){
                    bot.sendPhoto(chatId, GameStringfy.getImageFromObject(res.currentGames[i]), 
                                    {caption: GameStringfy.freeGamesToMessage(res.currentGames[i])})
                }

            })

        }).catch((err) => console.log(err))
        
    }

    else if(msg.text == '/next'){

        epicFreeGames.getGames().then((res) => {

            bot.sendMessage(chatId, 'Aqui estão os jogos que ficarão grátis na Epic Games: ').then(() => {

                for(let i = 0; i < res.nextGames.length; i++){
                    bot.sendPhoto(chatId, GameStringfy.getImageFromObject(res.nextGames[i]), 
                                    {caption: GameStringfy.freeGamesToMessage(res.nextGames[i])})
                }
                
            })

        }).catch((err) => console.log(err))

    }
})