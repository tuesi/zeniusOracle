const { ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJS } = require("discord.js");

async function raskVienodus(interaction, emojiList, playingUsers) {

    const maxMoves = 24;

    let gameOutcome;

    const buttons = [];
    let emojiUsedCount = [0, 0, 0, 0, 0, 0, 0, 0];
    let emojiToUse = [...emojiList];
    let mainEmoji = emojiToUse[2].id;

    //Remove emoji ant index 2, because it is the main game emoji
    emojiToUse.splice(2, 1);

    while (emojiToUse.length > 8) {
        let number = Math.floor(Math.random() * emojiToUse.length);
        emojiToUse.splice(number, 1);
    }

    const pairs = [];
    let pairsFound = [];
    let currentSelected = 0;

    let moves = maxMoves;
    let currentMoves = 0;

    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Loterėja')
        .setDescription('Rask visus vienodus!')
        .addFields({ name: 'Liko ėjimų', value: `${moves}`, inline: true });

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

    for (var i = 0; i < 16; i++) {
        let button = new ButtonBuilder()
            .setCustomId('primary' + i)
            .setStyle(ButtonStyle.Secondary)
            .setEmoji({ id: mainEmoji });

        buttons.push(button);
    }

    const quitButton = new ButtonBuilder()
        .setCustomId('quit')
        .setStyle(ButtonStyle.Danger)
        .setLabel('Pasiduoti');

    const quitRow = new ActionRowBuilder()
        .addComponents(quitButton);

    const row = new ActionRowBuilder()
        .addComponents(buttons[0], buttons[1], buttons[2], buttons[3]);

    const row2 = new ActionRowBuilder()
        .addComponents(buttons[4], buttons[5], buttons[6], buttons[7]);

    const row3 = new ActionRowBuilder()
        .addComponents(buttons[8], buttons[9], buttons[10], buttons[11]);

    const row4 = new ActionRowBuilder()
        .addComponents(buttons[12], buttons[13], buttons[14], buttons[15]);

    await interaction.reply({ embeds: [embed], components: [row, row2, row3, row4, quitRow] });

    const filter = i => i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({ filter });

    const promise = new Promise((resolve, reject) => {
        collector.on('collect', async button => {
            if (button.customId === 'quit') {
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Loterėja')
                    .setDescription('Rask visus vienodus!')
                    .addFields({ name: 'Liko ėjimų', value: `0`, inline: true })
                    .addFields({ name: 'Rezultatas', value: 'Pralaimėjai', inline: false });
                await button.update({ embeds: [embed], components: [row, row2, row3, row4] });
                playingUsers.splice(playingUsers.indexOf(interaction.user.id), 1);
                collector.stop();
                resolve(false);
            } else {
                let buttonClickedIndex = buttons.findIndex(el => el.data.custom_id === button.customId);
                moves--;
                currentMoves++;
                buttons[buttonClickedIndex].data.emoji = { id: pairs[buttonClickedIndex].id };
                if (currentMoves < 3) {
                    if (currentSelected === pairs[buttonClickedIndex].id) {
                        pairsFound.push(pairs[buttonClickedIndex]);
                        pairs.forEach((item, index) => {
                            if (pairsFound.indexOf(item) !== -1) {
                                buttons[index].setStyle(ButtonStyle.Success);
                            }
                        })
                    }
                }
                else {
                    currentMoves = 1;
                    for (var i = 0; i < 16; i++) {
                        if ((pairsFound.findIndex(el => el.id === buttons[i].data.emoji.id) === -1) && (i !== buttonClickedIndex)) {
                            buttons[i].data.emoji = { id: mainEmoji };
                        }
                    }
                }
                currentSelected = pairs[buttonClickedIndex].id;

                if (pairsFound.length === 8) {
                    const embed = new EmbedBuilder()
                        .setColor(0x00FF99)
                        .setTitle('Loterėja')
                        .setDescription('Rask visus vienodus!')
                        .addFields({ name: 'Liko ėjimų', value: `${moves}`, inline: true })
                        .addFields({ name: 'Rezultatas', value: 'Laimėjai', inline: false })
                        .addFields({ name: 'Gavai 1 gyvybę', value: 'www.debis.gay', inline: true });
                    await button.update({ embeds: [embed], components: [row, row2, row3, row4] });
                    gameOutcome = true;
                }
                else if (moves === 0) {
                    const embed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('Loterėja')
                        .setDescription('Rask visus vienodus!')
                        .addFields({ name: 'Liko ėjimų', value: `${moves}`, inline: true })
                        .addFields({ name: 'Rezultatas', value: 'Pralaimėjai', inline: false });
                    await button.update({ embeds: [embed], components: [row, row2, row3, row4] });
                    gameOutcome = false;
                } else {
                    const embed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('Loterėja')
                        .setDescription('Rask visus vienodus!')
                        .addFields({ name: 'Liko ėjimų', value: `${moves}`, inline: true });
                    await button.update({ embeds: [embed], components: [row, row2, row3, row4, quitRow] });
                    lastMove = false;
                }
                if (pairsFound.length === 8 || moves === 0) {
                    playingUsers.splice(playingUsers.indexOf(interaction.user.id), 1);
                    collector.stop();
                    resolve(gameOutcome);
                }
            }
        });
    });

    return promise;
}

module.exports = { raskVienodus }