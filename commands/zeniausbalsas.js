const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJS } = require("discord.js");
const tts = require("discord-tts");
const { Client, Intents } = require("discord.js");
const { AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel, AudioPlayerStatus } = require("@discordjs/voice");
const zeniusAudioEnum = require("../utils/zeniusAudioEnum.js");

let audioPlayer;

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

        const text = truncate(interaction.options.getString("tekstas"), 100);
        var language = "pl";
        if (interaction.options.getString("kalba")) {
            language = interaction.options.getString("kalba");
        }

        audioPlayer = new AudioPlayer();
        let voiceConnection;

        if (!interaction.member.voice.channel) {
            return await interaction.reply({ content: 'Reikia buti voice chate', ephemeral: true })
        }

        await interaction.reply({ content: '‎', ephemeral: true });

        try {
            let audioResource;
            switch (text) {
                case zeniusAudioEnum.tu_esi_sudas:
                    audioResource = createAudioResource('./assets/tu_esi_sudas.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.as_kasiaka_rukau:
                    audioResource = createAudioResource('./assets/AS_KASIAKA_RUKAU.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.as_tave_sveikinu:
                    audioResource = createAudioResource('./assets/as_tave_sveikinu.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.atsiradau:
                    audioResource = createAudioResource('./assets/atsiradaus.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.auksinis_pydaras:
                    audioResource = createAudioResource('./assets/AUKSINIS_PYD.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.balas_desimt:
                    audioResource = createAudioResource('./assets/BALAS_DESIMT.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.drakula:
                    audioResource = createAudioResource('./assets/DRAKULA.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.how_du_du:
                    audioResource = createAudioResource('./assets/How_di_du_du.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.kebabas:
                    audioResource = createAudioResource('./assets/kebabas.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.labai_malonu:
                    audioResource = createAudioResource('./assets/labai_malonu.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.manaroska:
                    audioResource = createAudioResource('./assets/manaroska.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.medis:
                    audioResource = createAudioResource('./assets/medis.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.myliu_tave:
                    audioResource = createAudioResource('./assets/myliu_tave.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.obuoly:
                    audioResource = createAudioResource('./assets/obuoly.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.plikai_sneka:
                    audioResource = createAudioResource('./assets/plikai_sneka.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.pydariau:
                    audioResource = createAudioResource('./assets/pydariau.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.sikni:
                    audioResource = createAudioResource('./assets/sikni.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.suesiu_tave:
                    audioResource = createAudioResource('./assets/suesiu_tave.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.tau_i_strele:
                    audioResource = createAudioResource('./assets/tau_i_strele.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.tava_pimpala:
                    audioResource = createAudioResource('./assets/pava_pimpala.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.tu_kaip_kriaukle:
                    audioResource = createAudioResource('./assets/TU_KAIP_KRIAUKLE.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.viena_pratyba:
                    audioResource = createAudioResource('./assets/viena_pratyba.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                case zeniusAudioEnum.zombis:
                    audioResource = createAudioResource('./assets/zombis.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
                default:
                    const audioStream = await tts.getVoiceStream(text, { lang: language });
                    audioResource = createAudioResource(audioStream, { inputType: StreamType.Arbitrary, inlineVolume: true });
                    break;
            }

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
        } catch (e) {
            console.log(e);
            console.log("Something whent wrong");
        }
    }
}

function truncate(str, length) {
    if (str.length > length) {
        return str.slice(0, length);
    } else return str;
}