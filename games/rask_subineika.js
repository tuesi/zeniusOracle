const { ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJS } = require("discord.js");

async function raskSubineika(interaction, emojiList, playingUsers) {

    let gameOutcome;

    let movesLeft = 2;

    const buttons = [];
    let emojiToUse = [...emojiList];

    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Lotereja')
        .setDescription('Rask subineika!')
        .addFields({ name: 'Liko spejimu', value: `${movesLeft}`, inline: true });

    while (emojiToUse.length > 9) {
        let number = Math.floor(Math.random() * emojiToUse.length);
        emojiToUse.splice(number, 1);
    }

    //shuffle emojis every time since there will only be one extra
    //Take out subineika emoji
    // or take one random or not random emoji (just use one simple emoji and one subineika)

    for (var i = 0; i < 9; i++) {
        let button = new ButtonBuilder()
            .setCustomId('primary' + i)
            .setStyle(ButtonStyle.Primary)
            .setEmoji({ id: emojiToUse[0].id });

        buttons.push(button);
    }

    const luckyButtonIndex = Math.floor(Math.random() * buttons.length);

    const row = new ActionRowBuilder()
        .addComponents(buttons[0], buttons[1], buttons[2]);

    const row2 = new ActionRowBuilder()
        .addComponents(buttons[3], buttons[4], buttons[5]);

    const row3 = new ActionRowBuilder()
        .addComponents(buttons[6], buttons[7], buttons[8]);

    await interaction.reply({ embeds: [embed], components: [row, row2, row3] });

    const filter = i => i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({ filter });

    const promise = new Promise((resolve, reject) => {
        collector.on('collect', async button => {
            let buttonClickedIndex = buttons.findIndex(el => el.data.custom_id === button.customId);
            if (movesLeft > 0) {
                if (buttonClickedIndex === luckyButtonIndex) {
                    buttons[buttonClickedIndex].setStyle(ButtonStyle.Success);
                    buttons[buttonClickedIndex].data.emoji = { id: emojiToUse[1].id };
                } else {
                    buttons[buttonClickedIndex].setStyle(ButtonStyle.Danger);
                    buttons[buttonClickedIndex].data.emoji = { id: emojiToUse[2].id };
                }
                movesLeft -= 1;
                if (movesLeft > 0 && buttonClickedIndex !== luckyButtonIndex) {
                    const embed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('Lotereja')
                        .setDescription('Rask subineika!')
                        .addFields({ name: 'Liko spejimu', value: `${movesLeft}`, inline: true });
                    await button.update({ embeds: [embed], components: [row, row2, row3] });
                } else {
                    for (var i = 0; i < 9; i++) {
                        if (i === luckyButtonIndex) {
                            buttons[i].data.emoji = { id: emojiToUse[1].id };
                        } else {
                            buttons[i].data.emoji = { id: emojiToUse[2].id };
                        }
                    }
                }
            }

            if (buttonClickedIndex === luckyButtonIndex) {
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Lotereja')
                    .setDescription('Rask subineika!')
                    .addFields({ name: 'Liko spejimu', value: `${movesLeft}`, inline: true })
                    .addFields({ name: 'Rezultatas', value: 'Laimėjai', inline: true });
                await button.update({ embeds: [embed], components: [row, row2, row3] });
                gameOutcome = true;

            } else if (movesLeft === 0) {
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Lotereja')
                    .setDescription('Rask subineika!')
                    .addFields({ name: 'Liko spejimu', value: `${movesLeft}`, inline: true })
                    .addFields({ name: 'Rezultatas', value: 'Pralaimėjai', inline: true });
                await button.update({ embeds: [embed], components: [row, row2, row3] });
                gameOutcome = false;
            }
            if (movesLeft === 0 || gameOutcome === true) {
                playingUsers.splice(playingUsers.indexOf(interaction.user.id), 1);
                collector.stop();
                resolve(gameOutcome);
            }
        });
    });
    return promise;
}

module.exports = { raskSubineika }