const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");
const emoji = require('../utils/emojiFinder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("zeniauparodykpasa")
        .setDescription("Paprasyk ir tau zenius parodys pasa"),
        async execute(interaction) {
            var ginispasport = emoji.getEmoji(interaction, "ginispassport");
            interaction.reply(`${ginispasport}`);
        }
}