require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api')
const StrategyMenu = require('./src/StrategyMenu')

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, {polling: true});

const options = {
    reply_markup: {
      inline_keyboard: [
        [{ text: StrategyMenu['freegamesepic'].menuLabel, callback_data: 'freegamesepic' }],
        [{ text: StrategyMenu['nextfreegamesepic'].menuLabel, callback_data: 'nextfreegamesepic' }]
      ]
    }
  };


bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, "Suas opções: ", options)
})

bot.on('callback_query', (callbackQuery) => {

  const chatId = callbackQuery.from.id
  const data = callbackQuery.data

  StrategyMenu[data].process(bot, chatId)

  setTimeout(()=>{
      bot.sendMessage(chatId, "Suas opções: ", options)
  }, 1300)

})
