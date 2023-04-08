const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJS } = require("discord.js");
const tts = require("discord-tts");
const { Client, Intents } = require("discord.js");
const { AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel, AudioPlayerStatus } = require("@discordjs/voice");
const zeniusAudioEnum = require("../utils/zeniusAudioEnum.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("maksas")
        .setDescription("Maksas tau pasakys kaip draugui")
        .addStringOption(option =>
            option.setName('frazes1')
                .setDescription('Makso frazes 1 tomas')
                .setRequired(false)
                .addChoices(
                    { name: zeniusAudioEnum.tu_esi_sudas, value: zeniusAudioEnum.tu_esi_sudas },
                    { name: zeniusAudioEnum.as_kasiaka_rukau, value: zeniusAudioEnum.as_kasiaka_rukau },
                    { name: zeniusAudioEnum.as_tave_sveikinu, value: zeniusAudioEnum.as_tave_sveikinu },
                    { name: zeniusAudioEnum.atsiradau, value: zeniusAudioEnum.atsiradau },
                    { name: zeniusAudioEnum.auksinis_pydaras, value: zeniusAudioEnum.auksinis_pydaras },
                    { name: zeniusAudioEnum.balas_desimt, value: zeniusAudioEnum.balas_desimt },
                    { name: zeniusAudioEnum.drakula, value: zeniusAudioEnum.drakula },
                    { name: zeniusAudioEnum.how_du_du, value: zeniusAudioEnum.how_du_du },
                    { name: zeniusAudioEnum.kebabas, value: zeniusAudioEnum.kebabas },
                    { name: zeniusAudioEnum.labai_malonu, value: zeniusAudioEnum.labai_malonu },
                    { name: zeniusAudioEnum.manaroska, value: zeniusAudioEnum.manaroska },
                    { name: zeniusAudioEnum.medis, value: zeniusAudioEnum.medis },
                    { name: zeniusAudioEnum.myliu_tave, value: zeniusAudioEnum.myliu_tave },
                    { name: zeniusAudioEnum.obuoly, value: zeniusAudioEnum.obuoly },
                    { name: zeniusAudioEnum.plikai_sneka, value: zeniusAudioEnum.plikai_sneka },
                    { name: zeniusAudioEnum.pydariau, value: zeniusAudioEnum.pydariau },
                    { name: zeniusAudioEnum.sikni, value: zeniusAudioEnum.sikni },
                    { name: zeniusAudioEnum.suesiu_tave, value: zeniusAudioEnum.suesiu_tave },
                    { name: zeniusAudioEnum.tau_i_strele, value: zeniusAudioEnum.tau_i_strele },
                    { name: zeniusAudioEnum.tava_pimpala, value: zeniusAudioEnum.tava_pimpala },
                    { name: zeniusAudioEnum.tu_kaip_kriaukle, value: zeniusAudioEnum.tu_kaip_kriaukle },
                    { name: zeniusAudioEnum.viena_pratyba, value: zeniusAudioEnum.viena_pratyba },
                    { name: zeniusAudioEnum.zombis, value: zeniusAudioEnum.zombis },
                    { name: zeniusAudioEnum.hau_hau, value: zeniusAudioEnum.hau_hau },
                    { name: zeniusAudioEnum.gandashoks, value: zeniusAudioEnum.gandashoks }
                ))
                .addStringOption(option =>
                    option.setName("frazes2")
                    .setDescription("Makso frazes 2 tomas")
                    .setRequired(false)
                    .addChoices(
                        { name: zeniusAudioEnum.toki_ziauru, value: zeniusAudioEnum.toki_ziauru },
                        { name: zeniusAudioEnum.tu_dabar_esi_berniukas, value: zeniusAudioEnum.tu_dabar_esi_berniukas },
                        { name: zeniusAudioEnum.geda, value: zeniusAudioEnum.geda },
                        { name: zeniusAudioEnum.masinas_nebereikia, value: zeniusAudioEnum.masinas_nebereikia },
                        { name: zeniusAudioEnum.nuo_sirdies, value: zeniusAudioEnum.nuo_sirdies },
                        { name: zeniusAudioEnum.pavalgai_atsisedes, value: zeniusAudioEnum.pavalgai_atsisedes },
                        { name: zeniusAudioEnum.sunkoka_atsakyti, value: zeniusAudioEnum.sunkoka_atsakyti },
                        { name: zeniusAudioEnum.svarstukai, value: zeniusAudioEnum.svarstukai },
                        { name: zeniusAudioEnum.smegenys_is_proto_iseja, value: zeniusAudioEnum.smegenys_is_proto_iseja },
                        { name: zeniusAudioEnum.savarma, value: zeniusAudioEnum.savarma }
                    )),
    async execute(interaction) {

        var phrase;
        if (interaction.options.getString("frazes1")) {
            phrase = interaction.options.getString("frazes1");
        } else if (interaction.options.getString("frazes2")) {
            phrase = interaction.options.getString("frazes2");
        } else {
            return await interaction.reply({ content: 'Nieko neivedei gandashoke!', ephemeral: true })
        }

        const audioPlayer = new AudioPlayer();
        let voiceConnection;

        try {

            if (!interaction.member.voice.channel) {
                return await interaction.reply({ content: 'Reikia buti voice chate', ephemeral: true })
            }

            await interaction.reply({ content: '‎', ephemeral: true });

            let audioResource;
            switch (phrase) {
                case zeniusAudioEnum.tu_esi_sudas:
                    audioResource = createAudioResource('./assets/tu_esi_sudas.mp3');
                    break;
                case zeniusAudioEnum.as_kasiaka_rukau:
                    audioResource = createAudioResource('./assets/AS_KASIAKA_RUKAU.mp3');
                    break;
                case zeniusAudioEnum.as_tave_sveikinu:
                    audioResource = createAudioResource('./assets/as_tave_sveikinu.mp3');
                    break;
                case zeniusAudioEnum.atsiradau:
                    audioResource = createAudioResource('./assets/ATSIRADAU.mp3');
                    break;
                case zeniusAudioEnum.auksinis_pydaras:
                    audioResource = createAudioResource('./assets/AUKSINIS_PYD.mp3');
                    break;
                case zeniusAudioEnum.balas_desimt:
                    audioResource = createAudioResource('./assets/BALAS_DESIMT.mp3');
                    break;
                case zeniusAudioEnum.drakula:
                    audioResource = createAudioResource('./assets/DRAKULA.mp3');
                    break;
                case zeniusAudioEnum.how_du_du:
                    audioResource = createAudioResource('./assets/How_di_du_du.mp3');
                    break;
                case zeniusAudioEnum.kebabas:
                    audioResource = createAudioResource('./assets/kebabas.mp3');
                    break;
                case zeniusAudioEnum.labai_malonu:
                    audioResource = createAudioResource('./assets/labai_malonu.mp3');
                    break;
                case zeniusAudioEnum.manaroska:
                    audioResource = createAudioResource('./assets/manaroska.mp3');
                    break;
                case zeniusAudioEnum.medis:
                    audioResource = createAudioResource('./assets/medis.mp3');
                    break;
                case zeniusAudioEnum.myliu_tave:
                    audioResource = createAudioResource('./assets/myliu_tave.mp3');
                    break;
                case zeniusAudioEnum.obuoly:
                    audioResource = createAudioResource('./assets/obuoly.mp3');
                    break;
                case zeniusAudioEnum.plikai_sneka:
                    audioResource = createAudioResource('./assets/plikai_sneka.mp3');
                    break;
                case zeniusAudioEnum.pydariau:
                    audioResource = createAudioResource('./assets/pydariau.mp3');
                    break;
                case zeniusAudioEnum.sikni:
                    audioResource = createAudioResource('./assets/sikni.mp3');
                    break;
                case zeniusAudioEnum.suesiu_tave:
                    audioResource = createAudioResource('./assets/suesiu_tave.mp3');
                    break;
                case zeniusAudioEnum.tau_i_strele:
                    audioResource = createAudioResource('./assets/tau_i_strele.mp3');
                    break;
                case zeniusAudioEnum.tava_pimpala:
                    audioResource = createAudioResource('./assets/tava_pimpala.mp3');
                    break;
                case zeniusAudioEnum.tu_kaip_kriaukle:
                    audioResource = createAudioResource('./assets/TU_KAIP_KRIAUKLE.mp3');
                    break;
                case zeniusAudioEnum.viena_pratyba:
                    audioResource = createAudioResource('./assets/viena_pratyba.mp3');
                    break;
                case zeniusAudioEnum.zombis:
                    audioResource = createAudioResource('./assets/zombis.mp3');
                    break;
                case zeniusAudioEnum.hau_hau:
                    audioResource = createAudioResource('./assets/HAU_HAU.mp3');
                    break;
                case zeniusAudioEnum.gandashoks:
                    audioResource = createAudioResource('./assets/gandashokas.mp3');
                    break;
                case zeniusAudioEnum.toki_ziauru:
                    audioResource = createAudioResource('./assets/toki_ziauru.mp3');
                    break;
                case zeniusAudioEnum.tu_dabar_esi_berniukas:
                    audioResource = createAudioResource('./assets/tu_dabar_esi_berniukas.mp3');
                    break;
                case zeniusAudioEnum.geda:
                    audioResource = createAudioResource('./assets/geda.mp3');
                    break;
                case zeniusAudioEnum.masinas_nebereikia:
                    audioResource = createAudioResource('./assets/masinas_nebereikia.mp3');
                    break;
                case zeniusAudioEnum.nuo_sirdies:
                    audioResource = createAudioResource('./assets/nuo_sirdies.mp3');
                    break;
                case zeniusAudioEnum.pavalgai_atsisedes:
                    audioResource = createAudioResource('./assets/pavalgai_atsisedes.mp3');
                    break;
                case zeniusAudioEnum.savarma:
                    audioResource = createAudioResource('./assets/savarma.mp3');
                    break;
                case zeniusAudioEnum.sunkoka_atsakyti:
                    audioResource = createAudioResource('./assets/sunkoka_atsakyti.mp3');
                    break;
                case zeniusAudioEnum.smegenys_is_proto_iseja:
                    audioResource = createAudioResource('./assets/smegenys_is_proto_iseja.mp3');
                    break;
                case zeniusAudioEnum.svarstukai:
                    audioResource = createAudioResource('./assets/svarstukai.mp3');
                    break;
                default:
                    return await interaction.reply({ content: 'Sugadino man reikalus drakula!', ephemeral: true });
            }

            if (!voiceConnection || voiceConnection?.status === VoiceConnectionStatus.Disconnected) {
                voiceConnection = joinVoiceChannel({
                    channelId: interaction.member.voice.channelId,
                    guildId: interaction.guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator,
                });
                voiceConnection = await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 10_000);
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
            voiceConnection.disconnect();
            audioPlayer.stop();
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