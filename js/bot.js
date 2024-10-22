const { Client } = require('discord.js-selfbot-v13');
const connectToVoiceChannel = require('./voice');
const { token } = require('./config');

async function connectBot() {
  const client = new Client({ checkUpdate: false });

  client.on('ready', async () => {
    console.log(`Bot connected. Username: ${client.user.username}`); 

    connectToVoiceChannel(client);
  });

  await client.login(token);
}

module.exports = connectBot;
