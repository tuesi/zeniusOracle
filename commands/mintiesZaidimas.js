const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJs } = require("discord.js");
const emoji = require('../utils/emojiFinder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("minties")
        .setDescription("Zeniaus zaidimas minties"),
    async execute(interaction) {

        const emoji1 = emoji.getEmoji(interaction, "test1");
        const emoji2 = emoji.getEmoji(interaction, "sausginis");
        const emoji3 = emoji.getEmoji(interaction, "trusabanis");
        const emoji4 = emoji.getEmoji(interaction, "obuo");
        const emoji5 = emoji.getEmoji(interaction, "zinios");
        const emoji6 = emoji.getEmoji(interaction, "zverioga");
        const emoji7 = emoji.getEmoji(interaction, "black");
        const emoji8 = emoji.getEmoji(interaction, "fokume");
        const emoji9 = emoji.getEmoji(interaction, "song");

        const buttons = [];

        const emojis = [emoji2, emoji3, emoji4, emoji5, emoji6, emoji7, emoji8, emoji9];

        let currentEmojis = [...emojis];
        let emojiUsedCount = [0, 0, 0, 0, 0, 0, 0, 0];

        const pairs = [];
        let pairsFound = [];
        let currentSelected = 0;

        for(var i = 0; i < 16; i++) {
            let currentIndex = Math.floor(Math.random() * currentEmojis.length);
            if(emojiUsedCount[currentIndex] === 0) {
                emojiUsedCount[currentIndex] = 1;
                pairs.push(currentEmojis[currentIndex]);
            } else if(emojiUsedCount[currentIndex] === 1) {
                pairs.push(currentEmojis[currentIndex]);
                emojiUsedCount.splice(currentIndex, 1);
                currentEmojis.splice(currentIndex, 1);
            }
        }

        let moves = 0;
        let currentMoves = 0;

        for(var i = 0; i < 16; i++) {
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
        .addComponents(buttons[0], buttons[1], buttons[2], buttons[3]);

        const row2 = new ActionRowBuilder()
        .addComponents(buttons[4], buttons[5], buttons[6], buttons[7]);

        const row3 = new ActionRowBuilder()
        .addComponents(buttons[8], buttons[9], buttons[10], buttons[11]);

        const row4 = new ActionRowBuilder()
        .addComponents(buttons[12], buttons[13], buttons[14], buttons[15]);

        await interaction.reply({content:`Ejimas: ${moves}` ,components: [row, row2, row3, row4]});

        const filter = i => i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter });

        collector.on('collect', async button => {
            let buttonClickedIndex = buttons.findIndex(el => el.data.custom_id === button.customId);
            moves++;
            currentMoves++;
            buttons[buttonClickedIndex].data.emoji = {id:pairs[buttonClickedIndex].id};
            if(currentMoves < 3) {
                if(currentSelected === pairs[buttonClickedIndex].id) {
                    pairsFound.push(pairs[buttonClickedIndex]);
                }
            }
            else {
                currentMoves = 1;
                for(var i = 0; i < 16; i++) {
                    if((pairsFound.findIndex(el => el.id === buttons[i].data.emoji.id) === -1) && (i !== buttonClickedIndex)){
                        buttons[i].data.emoji = {id:emoji1.id};
                    }
                }
            }
            currentSelected = pairs[buttonClickedIndex].id;
            
            if(pairsFound.length === 8 || moves === 28) {
                await button.update({content:`BANDYK RYTOJ`});
                collector.stop();
            } else {
                await button.update({content:`Ejimas: ${moves}`, components:[row, row2, row3, row4]});
            }
            // for(var i = 0; i < 9; i++) {
            //     if(i === luckyButtonIndex) {
            //         buttons[i].data.emoji = {id:emoji2.id};
            //     } else {
            //         buttons[i].data.emoji = {id:emoji3.id};
            //     }
            // }
            // if(buttonClickedIndex === luckyButtonIndex) {
            //     await button.update({content: `LAIMEJAI!`, components:[row, row2, row3]});
            // } else {
            //     await button.update({content: `BANDYK RYTOJ`, components:[row, row2, row3]});
            // }
        });
    }
}