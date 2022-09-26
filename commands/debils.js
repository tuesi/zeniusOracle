const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kasyradebilas")
        .setDescription("Paklausk Zeniaus, kas yra servo debilas"),
        async execute(interaction) {
            let user = interaction.guild.members.cache.random().user;
            var trusabaka;
            if(interaction.client.emojis.cache.find(emoji => emoji.name === "trusabaka")){
                trusabaka = interaction.client.emojis.cache.find(emoji => emoji.name === "trusabaka");
            }
            interaction.reply(`Sitam serve debilas yra ${user} ${trusabaka}`);
        }
}