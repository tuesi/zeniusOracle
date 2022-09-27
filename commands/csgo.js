const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");
const emoji = require('../utils/emojiFinder');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("zeniaucsgo")
        .setDescription("Paklausk Zeniaus, kas zais csgo")
        .addUserOption(option => {
            return option
                .setName("zaidejas1")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(true)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas2")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(true)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas3")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(true)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas4")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(true)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas5")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(true)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas6")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(true)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas7")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas8")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas9")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas10")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas11")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas12")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas13")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas14")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas15")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas16")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas17")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas18")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas19")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        })
        .addUserOption(option => {
            return option
                .setName("zaidejas20")
                .setDescription("Zaidejas norintis zaisti csgo")
                .setRequired(false)
        }),
        async execute(interaction) {
            var steniu = emoji.getEmoji(interaction, "steniu");

            var zaidejuArray = [interaction.options.getUser("zaidejas1"),
            interaction.options.getUser("zaidejas2"),interaction.options.getUser("zaidejas3"),
            interaction.options.getUser("zaidejas4"),interaction.options.getUser("zaidejas5"),
            interaction.options.getUser("zaidejas6"),interaction.options.getUser("zaidejas7"),
            interaction.options.getUser("zaidejas8"),interaction.options.getUser("zaidejas9"),
            interaction.options.getUser("zaidejas10"),interaction.options.getUser("zaidejas11"),
            interaction.options.getUser("zaidejas12"),interaction.options.getUser("zaidejas13"),
            interaction.options.getUser("zaidejas14"),interaction.options.getUser("zaidejas15"),
            interaction.options.getUser("zaidejas16"),interaction.options.getUser("zaidejas17"),
            interaction.options.getUser("zaidejas18"),interaction.options.getUser("zaidejas19"),
            interaction.options.getUser("zaidejas20")];

            var activePlayers = [];

            await interaction.reply('ZENIUS SAKO KAD CSGO ZAIS.......');
            await wait(4000);
            zaidejuArray.forEach(player => {
                if(player) {
                    activePlayers.push(player);
                }
            });

            for(var i = 0; i <= 5; i++) {
                if(i === 4) {
                    await interaction.followUp({content: `IR..... ${steniu}`, ephemeral: false});
                    await wait(5000);
                } else {
                    let number = Math.floor(Math.random() * activePlayers.length);
                    await interaction.followUp({content: `${activePlayers[number]}`, ephemeral: false});
                    activePlayers.splice(number,1);
                    await wait(5000);
                }
            }
        }
}