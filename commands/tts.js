const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJS } = require("discord.js");
const tts = require("discord-tts");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("tts")
        .setDescription("Zeniaus balsas")
        .addStringOption(option => {
            return option
                .setName("tekstas")
                .setDescription("Tekstas")
                .setRequired(true)
        }),
    async execute(interaction) {
        const text = interaction.options.getString("tekstas");
        const audioStream = await tts.getVoiceStream(text, { lang: "en" });
        interaction.reply({ content: `${text}`, files: [{ attachment: audioStream, name: "tts.mp3" }] });
        //await interaction.reply({ content: `${text}`, tts: true });
    }
}