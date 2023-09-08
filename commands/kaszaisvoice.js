const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJS } = require("discord.js");
const tts = require("discord-tts");
const { Client, Intents } = require("discord.js");
const { AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel, AudioPlayerStatus, createAudioPlayer, AudioPlayerError } = require("@discordjs/voice");
const { Readable } = require('stream');
const { Silence } = require('prism-media')
const globalVoiceConnection = require('../utils/voiceConnection');

const audioPlayer = new AudioPlayer();
const pauseSymbol = ";";
const pauseDuration = 300000; // 30 seconds

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kaszaisbalsu")
        .setDescription("Zeniaus pasakys kas zais balsu")
        .addUserOption(option => {
            return option
                .setName("zaidejas1")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(true)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas2")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(true)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas3")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(true)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas4")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(true)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas5")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(true)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas6")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(true)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas7")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas8")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas9")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas10")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas11")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas12")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas13")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas14")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas15")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas16")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas17")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas18")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas19")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas20")
                .setDescription("Zaidejas norintis zaisti")
                .setRequired(false)
        }),
    async execute(interaction) {

        var zaidejuArray = [interaction.options.getUser("zaidejas1"),
        interaction.options.getUser("zaidejas2"), interaction.options.getUser("zaidejas3"),
        interaction.options.getUser("zaidejas4"), interaction.options.getUser("zaidejas5"),
        interaction.options.getUser("zaidejas6"), interaction.options.getUser("zaidejas7"),
        interaction.options.getUser("zaidejas8"), interaction.options.getUser("zaidejas9"),
        interaction.options.getUser("zaidejas10"), interaction.options.getUser("zaidejas11"),
        interaction.options.getUser("zaidejas12"), interaction.options.getUser("zaidejas13"),
        interaction.options.getUser("zaidejas14"), interaction.options.getUser("zaidejas15"),
        interaction.options.getUser("zaidejas16"), interaction.options.getUser("zaidejas17"),
        interaction.options.getUser("zaidejas18"), interaction.options.getUser("zaidejas19"),
        interaction.options.getUser("zaidejas20")];

        var activePlayers = [];
        var chosenPlayers = [];

        zaidejuArray.forEach(player => {
            if (player) {
                activePlayers.push(player);
                chosenPlayers.push(player);
            }
        });

        let number = Math.floor(Math.random() * activePlayers.length);
        activePlayers.splice(number, 1);

        let playerNames = [];

        for (var i = 0; i <= 5; i++) {
            if (i === 4) {
                playerNames.push("iiiiir palaukit tuoj sugalvosiu, paskutinis žaideejas yra");
            } else {
                let number = Math.floor(Math.random() * chosenPlayers.length);
                const guildMember = interaction.guild.members.cache.get(chosenPlayers[number].id);
                playerNames.push(guildMember.displayName);
                chosenPlayers.splice(number, 1);
            }
        }

        const text = "Zenius sako kad Siandien syy žaidimukaa smaguu žais;" + playerNames.join(";");
        var language = "pl";

        if (!interaction.member.voice.channel) {
            return await interaction.reply({ content: 'Reikia buti voice chate', ephemeral: true })
        }

        await interaction.reply(`ZENIUS SAKO, KAD BUVO IVESTA ${activePlayers}`);

        let voiceConnection = globalVoiceConnection.getVoiceConnection();
        try {
            const textParts = text.split(pauseSymbol);
            const audioResources = [];

            for (let i = 0; i < textParts.length; i++) {
                if (i !== 0) {
                    audioResources.push(createSilentAudioResource(pauseDuration));
                }

                const part = textParts[i].trim();
                if (!part) continue;

                const audioStream = await tts.getVoiceStream(part, { lang: language });
                const audioResource = createAudioResource(audioStream, { inputType: StreamType.Arbitrary, inlineVolume: true });

                audioResources.push(audioResource);
            }

            if (!voiceConnection || voiceConnection.status === VoiceConnectionStatus.Disconnected) {
                voiceConnection = joinVoiceChannel({
                    channelId: interaction.member.voice.channelId,
                    guildId: interaction.guildId,
                    adapterCreator: interaction.guild.voiceAdapterCreator,
                });
                voiceConnection = await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000);
            }
            if (voiceConnection.status === VoiceConnectionStatus.Connected) {
                voiceConnection.subscribe(audioPlayer);
                globalVoiceConnection.setVoiceConnection(voiceConnection);

                for (const audioResource of audioResources) {
                    try {
                        audioPlayer.play(audioResource);
                        await new Promise((resolve) => {
                            const checkPlayer = setInterval(() => {
                                if (audioPlayer.state.status === AudioPlayerStatus.Idle) {
                                    clearInterval(checkPlayer);
                                    resolve();
                                }
                            }, 1000);
                        });
                    } catch (e) {
                        console.error('Error occurred during playback:', e);
                    }

                    // add a delay after each pause command
                    if (audioResource.metadata?.isPause) {
                        await new Promise((resolve) => setTimeout(resolve, pauseDuration));
                    }
                }

                //voiceConnection.disconnect();
                globalVoiceConnection.updateLastInteractionTime();
            }
        } catch (e) {
            console.log(e);
        }
    }
}

function truncate(str, length) {
    if (str.length > length) {
        return str.slice(0, length);
    } else return str;
}


function createSilentAudioResource(duration) {
    const silenceStream = new Readable();
    silenceStream._read = () => { };
    silenceStream.push(Buffer.alloc(duration));
    silenceStream.push(null);
    return createAudioResource(silenceStream, { inputType: StreamType.Raw });
}

globalVoiceConnection.checkActivity();