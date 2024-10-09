// Import required modules
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const express = require("express");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Initialize the app
const app = express();

// Simple route to confirm the bot is running
app.get("/", (req, res) => {
    res.send("Bot is alive");
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Replace the value below with the Telegram token from BotFather
const token = process.env.BOT;

if (!token) {
    console.error("Error: BOT token is not defined in the environment variables.");
    process.exit(1);
}

// Create a new Telegram bot instance with polling enabled
const bot = new TelegramBot(token, { polling: true });

// Handle incoming messages
bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const userInput = msg.text;
    const msg_id = msg.message_id;

    // Echo the received message back to the user
    await bot.sendMessage(chatId, userInput, {
        reply_to_message_id: msg_id,
    });
});

// Export the app module (if needed)
module.exports = app;
