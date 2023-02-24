const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJs } = require("discord.js");
const emoji = require('../utils/emojiFinder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rasksubineika")
        .setDescription("Zeniaus zaidimas rask subineika"),
    async execute(interaction) {

        const emoji1 = emoji.getEmoji(interaction, "test1");
        const emoji2 = emoji.getEmoji(interaction, "sausginis");
        const emoji3 = emoji.getEmoji(interaction, "trusabanis");



        // const button1 = new ButtonBuilder()
        // .setCustomId('primary1')
        // .setStyle(ButtonStyle.Secondary)
        // .setEmoji({id:emoji1.id});

        // const button2 = new ButtonBuilder()
        // .setCustomId('primary2')
        // .setLabel('‎')
        // .setStyle(ButtonStyle.Secondary)
        // .setDisabled(true);

        // const button3 = new ButtonBuilder()
        // .setCustomId('primary3')
        // .setStyle(ButtonStyle.Secondary)
        // .setEmoji({id:emoji1.id});

        // const button4 = new ButtonBuilder()
        // .setCustomId('primary4')
        // .setLabel('‎')
        // .setStyle(ButtonStyle.Secondary)
        // .setDisabled(true);

        // const button5 = new ButtonBuilder()
        // .setCustomId('primary5')
        // .setStyle(ButtonStyle.Secondary)
        // .setEmoji({id:emoji1.id});

        // const button6 = new ButtonBuilder()
        // .setCustomId('primary6')
        // .setLabel('‎')
        // .setStyle(ButtonStyle.Secondary)
        // .setDisabled(true);

        // const button7 = new ButtonBuilder()
        // .setCustomId('primary7')
        // .setStyle(ButtonStyle.Secondary)
        // .setEmoji({id:emoji1.id});

        // const button8 = new ButtonBuilder()
        // .setCustomId('primary8')
        // .setLabel('‎')
        // .setStyle(ButtonStyle.Secondary)
        // .setDisabled(true);

        // const button9 = new ButtonBuilder()
        // .setCustomId('primary9')
        // .setStyle(ButtonStyle.Secondary)
        // .setEmoji({id:emoji1.id});


    }
}