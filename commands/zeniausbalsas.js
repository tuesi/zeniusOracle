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

        const tu_esi_sudas = createAudioResource('./assets/tu_esi_sudas.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const as_kasiaka_rukau = createAudioResource('./assets/AS_KASIAKA_RUKAU.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const as_tave_sveikinu = createAudioResource('./assets/as_tave_sveikinu.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const atsiradau = createAudioResource('./assets/atsiradaus.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const auksinis_pydaras = createAudioResource('./assets/AUKSINIS_PYD.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const balas_desimt = createAudioResource('./assets/BALAS_DESIMT.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const drakula = createAudioResource('./assets/DRAKULA.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const how_du_du = createAudioResource('./assets/How_di_du_du.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const kebabas = createAudioResource('./assets/kebabas.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const labai_malonu = createAudioResource('./assets/labai_malonu.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const manaroska = createAudioResource('./assets/manaroska.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const medis = createAudioResource('./assets/medis.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const myliu_tave = createAudioResource('./assets/myliu_tave.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const obuoly = createAudioResource('./assets/obuoly.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const plikai_sneka = createAudioResource('./assets/plikai_sneka.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const pydariau = createAudioResource('./assets/pydariau.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const sikni = createAudioResource('./assets/sikni.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const suesiu_tave = createAudioResource('./assets/suesiu_tave.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const tau_i_strele = createAudioResource('./assets/tau_i_strele.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const tava_pimpala = createAudioResource('./assets/pava_pimpala.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const tu_kaip_kriaukle = createAudioResource('./assets/TU_KAIP_KRIAUKLE.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const viena_pratyba = createAudioResource('./assets/viena_pratyba.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });
        const zombis = createAudioResource('./assets/zombis.mp3', { inputType: StreamType.Arbitrary, inlineVolume: true });

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
                    audioResource = tu_esi_sudas;
                    break;
                case zeniusAudioEnum.as_kasiaka_rukau:
                    audioResource = as_kasiaka_rukau;
                    break;
                case zeniusAudioEnum.as_tave_sveikinu:
                    audioResource = as_tave_sveikinu;
                    break;
                case zeniusAudioEnum.atsiradau:
                    audioResource = atsiradau;
                    break;
                case zeniusAudioEnum.auksinis_pydaras:
                    audioResource = auksinis_pydaras;
                    break;
                case zeniusAudioEnum.balas_desimt:
                    audioResource = balas_desimt;
                    break;
                case zeniusAudioEnum.drakula:
                    audioResource = drakula;
                    break;
                case zeniusAudioEnum.how_du_du:
                    audioResource = how_du_du;
                    break;
                case zeniusAudioEnum.kebabas:
                    audioResource = kebabas;
                    break;
                case zeniusAudioEnum.labai_malonu:
                    audioResource = labai_malonu;
                    break;
                case zeniusAudioEnum.manaroska:
                    audioResource = manaroska;
                    break;
                case zeniusAudioEnum.medis:
                    audioResource = medis;
                    break;
                case zeniusAudioEnum.myliu_tave:
                    audioResource = myliu_tave;
                    break;
                case zeniusAudioEnum.obuoly:
                    audioResource = obuoly;
                    break;
                case zeniusAudioEnum.plikai_sneka:
                    audioResource = plikai_sneka;
                    break;
                case zeniusAudioEnum.pydariau:
                    audioResource = pydariau;
                    break;
                case zeniusAudioEnum.sikni:
                    audioResource = sikni;
                    break;
                case zeniusAudioEnum.suesiu_tave:
                    audioResource = suesiu_tave;
                    break;
                case zeniusAudioEnum.tau_i_strele:
                    audioResource = tau_i_strele;
                    break;
                case zeniusAudioEnum.tava_pimpala:
                    audioResource = tava_pimpala;
                    break;
                case zeniusAudioEnum.tu_kaip_kriaukle:
                    audioResource = tu_kaip_kriaukle;
                    break;
                case zeniusAudioEnum.viena_pratyba:
                    audioResource = viena_pratyba;
                    break;
                case zeniusAudioEnum.zombis:
                    audioResource = zombis;
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