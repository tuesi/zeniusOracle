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
        })
        .addStringOption(option =>
            option.setName('kalba')
                .setDescription('Pasirink kalba')
                .setRequired(false)
                .addChoices(
                    { name: 'Lenku', value: 'pl' },
                    { name: 'Anglu', value: 'en' },
                    { name: 'Ceku', value: 'cs' },
                    { name: 'Vokieciu', value: 'de' },
                    { name: 'Ispanu', value: 'es' },
                    { name: 'Italu', value: 'it' },
                    { name: 'Kinieciu', value: 'cmn' },
                    { name: 'Arabu', value: 'ar' },
                    { name: 'Svedu', value: 'sv' },
                    { name: 'Norvegu', value: 'nb' },
                    { name: 'Latviu', value: 'lv' },
                    { name: 'Afrikieciu', value: 'af' },
                    { name: 'japonu', value: 'ja' },
                    { name: 'Ukrainieciu', value: 'uk' },
                    { name: 'Rumunu', value: 'ro' },
                )),
    async execute(interaction) {
        const text = interaction.options.getString("tekstas");
        var language = "pl";
        if (interaction.options.getString("kalba")) {
            language = interaction.options.getString("kalba");
        }
        const audioStream = await tts.getVoiceStream(text, { lang: language });
        interaction.reply({ content: `${text}`, files: [{ attachment: audioStream, name: "tts.mp3" }] });
        //await interaction.reply({ content: `${text}`, tts: true });
    }
}