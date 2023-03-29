const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJS } = require("discord.js");
const tts = require("discord-tts");
const { Client, Intents } = require("discord.js");
const { AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel, AudioPlayerStatus } = require("@discordjs/voice");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("zeniausbalsas")
        .setDescription("Zeniaus tikras balsas")
        .addStringOption(option => {
            return option
                .setName("tekstas")
                .setDescription("Tekstas")
                .setRequired(true)
        })
        .addStringOption(option =>
            option.setName('kalba')
                .setDescription('Pasirink kalba')
                .setRequired(false)
                .addChoices(
                    { name: 'Lenku', value: 'pl' },
                    { name: 'Anglu', value: 'en' },
                    { name: 'Ceku', value: 'cs' },
                    { name: 'Vokieciu', value: 'de' },
                    { name: 'Ispanu', value: 'es' },
                    { name: 'Italu', value: 'it' },
                    { name: 'Kinieciu', value: 'cmn' },
                    { name: 'Arabu', value: 'ar' },
                    { name: 'Svedu', value: 'sv' },
                    { name: 'Norvegu', value: 'nb' },
                    { name: 'Latviu', value: 'lv' },
                    { name: 'Afrikieciu', value: 'af' },
                    { name: 'japonu', value: 'ja' },
                    { name: 'Ukrainieciu', value: 'uk' },
                    { name: 'Rumunu', value: 'ro' },
                )),
    async execute(interaction) {
        const text = interaction.options.getString("tekstas");
        var language = "pl";
        if (interaction.options.getString("kalba")) {
            language = interaction.options.getString("kalba");
        }

        let voiceConnection;
        let audioPlayer = new AudioPlayer();

        if (!interaction.member.voice.channel) {
            return await interaction.reply({ content: 'Reikia buti voice chate', ephemeral: true })
        }

        await interaction.reply({ content: '‎', ephemeral: true });


        const audioStream = await tts.getVoiceStream(text, { lang: language });
        const audioResource = createAudioResource(audioStream, { inputType: StreamType.Arbitrary, inlineVolume: true });
        if (!voiceConnection || voiceConnection?.status === VoiceConnectionStatus.Disconnected) {
            voiceConnection = joinVoiceChannel({
                channelId: interaction.member.voice.channelId,
                guildId: interaction.guildId,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            voiceConnection = await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000);
        }

        if (voiceConnection.status === VoiceConnectionStatus.Connected) {
            voiceConnection.subscribe(audioPlayer);
            audioPlayer.play(audioResource);
            audioPlayer.on("stateChange", (oldState, newState) => {
                if (newState.status === AudioPlayerStatus.Idle) {
                    voiceConnection.disconnect();
                }
            });
        }
    }
}