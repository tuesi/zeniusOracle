const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("zeniauparodykpasa")
        .setDescription("Paprasyk ir tau zenius parodys pasa"),
        async execute(interaction) {
            var ginispasport;
            if(interaction.client.emojis.cache.find(emoji => emoji.name === "ginispassport")){
                ginispasport = interaction.client.emojis.cache.find(emoji => emoji.name === "ginispassport");
            }
            interaction.reply(`${ginispasport}`);
        }
}