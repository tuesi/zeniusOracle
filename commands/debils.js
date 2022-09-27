const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");
const emoji = require('../utils/emojiFinder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kasyradebilas")
        .setDescription("Paklausk Zeniaus, kas yra servo debilas"),
        async execute(interaction) {
            let user = interaction.guild.members.cache.random().user;
            var trusabaka = emoji.getEmoji(interaction, "trusabaka");
            interaction.reply(`Sitam serve debilas yra ${user} ${trusabaka}`);
        }
}