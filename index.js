require("dotenv").config();

const BOT_API       = process.env.BOT_API || '';
const PORT          = process.env.PORT || 3000;
const URL           = process.env.URL || 'https://your-heroku-app.herokuapp.com';

const { Telegraf } = require('telegraf')
const bot       = new Telegraf(BOT_API);

const config = require('./config');

// Bota start verdiğinizde atılan ilk mesaj
bot.start((ctx) => {
    return ctx.reply("Salamm /fox ");
});

// Təyin etidiyimiz sözə avtomatik cavab atar
bot.hears(/Salam/ig, async (ctx, next) => {
    await ctx.telegram.sendPhoto(ctx.chat.id,
        'https://telegra.ph/file/b6d46ca9d253032306c9c.jpg',
        { caption:  `<b>Necəsən? ${ctx.from.first_name} , Mən @SirinCayBoss'un Test Botuyam🤖\nTanışdığımıza Məmnun Oldum🥰</b>`,  parse_mode: 'HTML' })
    return next();
});

//Əmrlər təyin edirik
bot.command('fox', async (ctx, next) => {
    
    await bot.telegram.sendDocument(ctx.chat.id, {
        source: './fotolar/fox.jpg'
    }, {
        filename: 'fox.jpg',
        caption: 'NodeJs-JavaScript Hazırlanmış Sadə Telegram Botuyam, Gruplarda Yetki Versən, Söyüş Söyənlərin Mesajlarını Silə Bilirəm!'
    })
    return next()
    
})


bot.command('ad', async (ctx, next) => {
    await ctx.telegram.sendMessage(ctx.chat.id, `<b>${ctx.from.first_name}</b>`, { parse_mode: 'HTML' })
    return next();
});


bot.use(
    require('./handlers/middlewares'),
    require('./plugin')
);

// Kodlarda bir səhv varsa, bunun sayəsində işləməyə davam edər.
bot.catch((err) => {
    console.log('Error: ', err)
})

// Botun adını alan kod
bot.telegram.getMe().then(botInfo => {
    bot.options.username = botInfo.username
    console.log(`Bot Başlatıldı! => ${bot.options.username}`)
})

// Heroku saytında log yerində botunuzun adını göstərər -> sadebot.herokuapp.com
const cb = function(req, res) {
    res.end(`${bot.options.username}`)
}

// Botun weebhook ilə işləməsinə imkan verir.
bot.launch({
    webhook: {
        domain: `${URL}`,
        port: `${PORT}`,
        cb
    }
})

// Bu, botumuzu yavaşca dayandırmağa imkan verir.
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
