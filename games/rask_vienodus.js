const { ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJS } = require("discord.js");

async function raskVienodus(interaction, emojiList, playingUsers) {

    let gameOutcome;

    const buttons = [];
    let emojiUsedCount = [0, 0, 0, 0, 0, 0, 0, 0];
    let emojiToUse = [...emojiList];

    const pairs = [];
    let pairsFound = [];
    let currentSelected = 0;

    for (var i = 0; i < 16; i++) {
        let currentIndex = Math.floor(Math.random() * emojiToUse.length);
        if (emojiUsedCount[currentIndex] === 0) {
            emojiUsedCount[currentIndex] = 1;
            pairs.push(emojiToUse[currentIndex]);
        } else if (emojiUsedCount[currentIndex] === 1) {
            pairs.push(emojiToUse[currentIndex]);
            emojiUsedCount.splice(currentIndex, 1);
            emojiToUse.splice(currentIndex, 1);
        }
    }

    let moves = 0;
    let currentMoves = 0;

    for (var i = 0; i < 16; i++) {
        let button = new ButtonBuilder()
            .setCustomId('primary' + i)
            .setStyle(ButtonStyle.Secondary)
            .setEmoji({ id: emoji1.id });

        buttons.push(button);
    }

    const row = new ActionRowBuilder()
        .addComponents(buttons[0], buttons[1], buttons[2], buttons[3]);

    const row2 = new ActionRowBuilder()
        .addComponents(buttons[4], buttons[5], buttons[6], buttons[7]);

    const row3 = new ActionRowBuilder()
        .addComponents(buttons[8], buttons[9], buttons[10], buttons[11]);

    const row4 = new ActionRowBuilder()
        .addComponents(buttons[12], buttons[13], buttons[14], buttons[15]);

    await interaction.reply({ content: `Ejimas: ${moves}`, components: [row, row2, row3, row4] });

    const filter = i => i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({ filter });

    collector.on('collect', async button => {
        let buttonClickedIndex = buttons.findIndex(el => el.data.custom_id === button.customId);
        moves++;
        currentMoves++;
        buttons[buttonClickedIndex].data.emoji = { id: pairs[buttonClickedIndex].id };
        if (currentMoves < 3) {
            if (currentSelected === pairs[buttonClickedIndex].id) {
                pairsFound.push(pairs[buttonClickedIndex]);
            }
        }
        else {
            currentMoves = 1;
            for (var i = 0; i < 16; i++) {
                if ((pairsFound.findIndex(el => el.id === buttons[i].data.emoji.id) === -1) && (i !== buttonClickedIndex)) {
                    buttons[i].data.emoji = { id: emoji1.id };
                }
            }
        }
        currentSelected = pairs[buttonClickedIndex].id;

        if (pairsFound.length === 8 || moves === 28) {
            await button.update({ content: `BANDYK RYTOJ` });
            collector.stop();
        } else {
            await button.update({ content: `Ejimas: ${moves}`, components: [row, row2, row3, row4] });
        }
    });
}

module.exports = { raskVienodus }