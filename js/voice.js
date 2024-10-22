const { joinVoiceChannel, getVoiceConnection } = require('@discordjs/voice');
const { channelId, guildId, selfDeaf, selfMute } = require('./config');

function connectToVoiceChannel(client) {
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
  
}

module.exports = connectToVoiceChannel;
