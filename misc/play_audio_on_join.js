const { AudioPlayer, entersState, joinVoiceChannel, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus } = require('@discordjs/voice');

module.exports = (client) => {
    client.on('voiceStateUpdate', async (oldState, newState) => {
        if (newState.member.user.id === '305028139514593291' && newState.channel) {
            const audioPlayer = new AudioPlayer();
            let voiceConnection;
            try {
                const audioResource = createAudioResource('./assets/obuoly.mp3');

                if (!voiceConnection || voiceConnection?.status === VoiceConnectionStatus.Disconnected) {
                    voiceConnection = joinVoiceChannel({
                        channelId: newState.channel.id,
                        guildId: newState.guild.id,
                        adapterCreator: newState.guild.voiceAdapterCreator,
                    });
                    voiceConnection = await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 10_000);
                }
                if (voiceConnection.status === VoiceConnectionStatus.Connected) {
                    voiceConnection.subscribe(audioPlayer);
                    audioPlayer.play(audioResource);

                    audioPlayer.on(AudioPlayerStatus.Idle, () => {
                        voiceConnection.destroy();
                    });
                    voiceConnection.on(VoiceConnectionStatus.Disconnected, () => {
                        audioPlayer.stop();
                    });
                }
            } catch (e) {
                voiceConnection.disconnect();
                audioPlayer.stop();
                console.log(e);
                console.log("Something whent wrong");
            }
        }
    });
}