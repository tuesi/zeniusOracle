const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");
const emoji = require('../utils/emojiFinder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kiekvalandu")
        .setDescription("Paklausk Zeniaus kiek dabar valandu"),
        async execute(interaction) {
            var aurimts = emoji.getEmoji(interaction, "aurimts");
            interaction.reply(`Nesakysiu ${aurimts}`);
        }
}