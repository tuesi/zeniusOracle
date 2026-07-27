const { SlashCommandBuilder } = require("@discordjs/builders");
const { AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel } = require("@discordjs/voice");
const globalVoiceConnection = require('../utils/voiceConnection');
const fetch = require('node-fetch');

const RADIO_URL = 'https://stream.goldfm.lt/goldfm.mp3';
const audioPlayer = new AudioPlayer();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("radio")
        .setDescription("Groja Gold FM radija voice chate")
        .addBooleanOption(option =>
            option.setName("sustabdyti")
                .setDescription("Sustabdyti radija")
                .setRequired(false)
        ),
    async execute(interaction) {
        const stop = interaction.options.getBoolean("sustabdyti");

        if (stop) {
            audioPlayer.stop();
            return await interaction.reply({ content: 'Radijas sustabdytas!', ephemeral: true });
        }

        if (!interaction.member.voice.channel) {
            return await interaction.reply({ content: 'Reikia buti voice chate', ephemeral: true });
        }

        await interaction.reply({ content: 'Jungiamas Gold FM...', ephemeral: true });

        try {
            globalVoiceConnection.checkActivity();
            let voiceConnection = globalVoiceConnection.getVoiceConnection();

            const response = await fetch(RADIO_URL);
            const audioResource = createAudioResource(response.body, { inputType: StreamType.Arbitrary });

            if (!voiceConnection || voiceConnection.status === VoiceConnectionStatus.Disconnected) {
                voiceConnection = joinVoiceChannel({
                    channelId: interaction.member.voice.channelId,
                    guildId: interaction.guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator,
                });
                voiceConnection = await entersState(voiceConnection, VoiceConnectionStatus.Ready, 10_000);
            }

            if (voiceConnection.status === VoiceConnectionStatus.Ready) {
                voiceConnection.subscribe(audioPlayer);
                globalVoiceConnection.setVoiceConnection(voiceConnection);
                globalVoiceConnection.updateLastInteractionTime();
                audioPlayer.play(audioResource);
            }
        } catch (e) {
            console.log(e);
            console.log("Radio error");
        }
    }
}
