const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("buciuojuzeniu")
        .setDescription("Pabuciuok Zeniu"),
        async execute(interaction) {
            interaction.reply(`Ar zinojote, kad ${interaction.member.user} yra gejus`);
        }
}