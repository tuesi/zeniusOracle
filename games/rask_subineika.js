const { ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJS } = require("discord.js");
const emoji = require('../utils/emojiFinder');

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

async function raskSubineika(interaction, emojiList, playingUsers) {

    try {
        const subineika = emoji.getEmoji(interaction, "pirst");

        const aurimts = emoji.getEmoji(interaction, "aurimts");

        const ojtu = emoji.getEmoji(interaction, "ojtu");

        let gameOutcome;

        let movesLeft = 2;

        const buttons = [];
        let emojiToUse = [...emojiList];

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Loterėja')
            .setDescription('Rask subineiką!')
            .addFields({ name: 'Liko spėjimų', value: `${movesLeft}`, inline: true });

        for (var i = 0; i < 9; i++) {
            let button = new ButtonBuilder()
                .setCustomId('primary' + i)
                .setStyle(ButtonStyle.Secondary)
                .setEmoji({ id: aurimts.id });

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
                        buttons[buttonClickedIndex].data.emoji = { id: subineika.id };
                    } else {
                        buttons[buttonClickedIndex].setStyle(ButtonStyle.Danger);
                        buttons[buttonClickedIndex].data.emoji = { id: ojtu.id };
                    }
                    movesLeft -= 1;
                    if (movesLeft > 0 && buttonClickedIndex !== luckyButtonIndex) {
                        const embed = new EmbedBuilder()
                            .setColor(0x0099FF)
                            .setTitle('Loterėja')
                            .setDescription('Rask subineiką!')
                            .addFields({ name: 'Liko spėjimų', value: `${movesLeft}`, inline: true });
                        await button.update({ embeds: [embed], components: [row, row2, row3] });
                    } else {
                        for (var i = 0; i < 9; i++) {
                            if (i === luckyButtonIndex) {
                                buttons[i].data.emoji = { id: subineika.id };
                            } else {
                                buttons[i].data.emoji = { id: ojtu.id };
                            }
                        }
                    }
                }

                if (buttonClickedIndex === luckyButtonIndex) {
                    const embed = new EmbedBuilder()
                        .setColor(0x00FF99)
                        .setTitle('Loterėja')
                        .setDescription('Rask subineiką!')
                        .addFields({ name: 'Liko spėjimų', value: `${movesLeft}`, inline: true })
                        .addFields({ name: 'Rezultatas', value: 'Laimėjai', inline: false })
                        .addFields({ name: 'Gavai 1 gyvybę', value: 'www.debils.gay', inline: true });
                    await button.update({ embeds: [embed], components: [row, row2, row3] });
                    gameOutcome = true;

                } else if (movesLeft === 0) {
                    const embed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('Loterėja')
                        .setDescription('Rask subineiką!')
                        .addFields({ name: 'Liko spėjimų', value: `${movesLeft}`, inline: true })
                        .addFields({ name: 'Rezultatas', value: 'Pralaimėjai', inline: false });
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
    } catch (e) {
        console.log(e);
    }

}

module.exports = { raskSubineika }