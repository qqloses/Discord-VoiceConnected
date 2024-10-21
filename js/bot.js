const { Client } = require('discord.js-selfbot-v13');
const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const config = require('../json/config.json');

async function connectBot() {
  const client = new Client({ checkUpdate: false });

  const { channelid: channelId, guildid: guildId, selfdeaf: selfDeaf, selfmute: selfMute } = config;

  client.on('ready', async () => {
    console.log(`Bot connected. Username: ${client.user.username}`);

    const connectToVoiceChannel = () => {
      const connection = getVoiceConnection(guildId);

      if (connection) {
        if (connection.joinConfig.channelId !== channelId) {
          connection.destroy();
        } else {
          return; 
        }
      }

      const voiceChannel = client.channels.cache.get(channelId);

      if (voiceChannel.members.size >= voiceChannel.userLimit && voiceChannel.userLimit > 0) {
        console.log(`Voice channel '${voiceChannel.name}' is full.`);
        return;
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
