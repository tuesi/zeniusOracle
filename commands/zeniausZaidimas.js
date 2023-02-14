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

        const buttons = [];

        for(var i = 0; i < 9; i++) {
            let button = new ButtonBuilder()
                .setCustomId('primary'+i)
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({id:emoji1.id});

                buttons.push(button);
        }

        const luckyButtonIndex = Math.floor(Math.random() * buttons.length);

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

        const row = new ActionRowBuilder()
        .addComponents(buttons[0], buttons[1], buttons[2]);

        const row2 = new ActionRowBuilder()
        .addComponents(buttons[3], buttons[4], buttons[5]);

        const row3 = new ActionRowBuilder()
        .addComponents(buttons[6], buttons[7], buttons[8]);

        await interaction.reply({components: [row, row2, row3]});

        const filter = i => i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter });

        collector.on('collect', async button => {
            let buttonClickedIndex = buttons.findIndex(el => el.data.custom_id === button.customId);
            for(var i = 0; i < 9; i++) {
                if(i === luckyButtonIndex) {
                    buttons[i].data.emoji = {id:emoji2.id};
                } else {
                    buttons[i].data.emoji = {id:emoji3.id};
                }
            }
            if(buttonClickedIndex === luckyButtonIndex) {
                await button.update({content: `LAIMEJAI!`, components:[row, row2, row3]});
            } else {
                await button.update({content: `BANDYK RYTOJ`, components:[row, row2, row3]});
            }
            collector.stop();
        });
    }
}