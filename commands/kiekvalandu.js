const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kiekvalandu")
        .setDescription("Paklausk Zeniaus kiek dabar valandu"),
        async execute(interaction) {
            var aurimts;
            if(interaction.client.emojis.cache.find(emoji => emoji.name === "aurimts")){
                aurimts = interaction.client.emojis.cache.find(emoji => emoji.name === "aurimts");
            }
            interaction.reply(`Nesakysiu ${aurimts}`);
        }
}