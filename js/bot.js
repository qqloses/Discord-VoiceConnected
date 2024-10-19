const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const config = require('../json/config.json');

async function connectBot() {
  const client = new Client({ checkUpdate: false });

  const channelId = config.channelid;
  const guildId = config.guildid;
  const selfDeaf = config.selfdeaf;
  const selfMute = config.selfmute;

  client.on('ready', async () => {
    console.log(`Bot connected. username: ${client.user.username}`);

    const connectToVoiceChannel = () => {
      const connection = getVoiceConnection(guildId);
      
      if (connection) {
        if (connection.joinConfig.channelId !== channelId) {
          connection.destroy(); 
        } else {
          return; 
        }
      }

      joinVoiceChannel({
        channelId,
        guildId,
        adapterCreator: client.guilds.cache.get(guildId).voiceAdapterCreator,
        selfDeaf,
        selfMute,
        group: client.user.id,
      });
    };

    connectToVoiceChannel();
    setInterval(connectToVoiceChannel, 60000);
  });

  await client.login(config.TOKEN);
}

module.exports = connectBot;
