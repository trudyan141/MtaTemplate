import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load environment variables from the .env file
dotenv.config({ path: `${__dirname}/../.env` });

// Initialize Telegraf
import { Markup, Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
const token = process.env.BOT_TOKEN;
console.log('Environment Variables:', process.env);
console.log("🚀 ~ token:", token)
const bot = new Telegraf(process.env.BOT_TOKEN || '7188272101:AAG-3YWtC_DFqcJN_1gVwZA8mkpoChmAWaw')
bot.start((ctx) => {
  ctx.reply(
    'Welcome! Click the button below to start the mini app.',
      Markup.inlineKeyboard([
        Markup.button.webApp("LaunchApp", process.env.WEB_APP_URL || 'https://tma.internal:443/reactjs-template/'),
        Markup.button.url('Open tab web app',process.env.WEB_APP_URL || 'https://tma.internal:443/reactjs-template/')
    ])
  );
});
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))