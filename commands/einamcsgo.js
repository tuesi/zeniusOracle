const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");
const emoji = require('../utils/emojiFinder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("einamcesa")
        .setDescription("Paprasyk Zeniaus, kad pakviestu darugus zaisti csgo"),
        async execute(interaction) {
            let csgoUsers = interaction.guild.roles.cache.get('814166322770346056').members.map(m=>m.user).join(' ');
            var ct1 = emoji.getEmoji(interaction, "ct1");
            var t2 = emoji.getEmoji(interaction, "t2");
            interaction.reply(`Einam cesa! <@&814166322770346056 ${ct1} ${csgoUsers} ${t2}`);
        }
}