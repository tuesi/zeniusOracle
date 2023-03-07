const { ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJS } = require("discord.js");

async function raskLaiminga(interaction, emojiList, playingUsers) {

    let gameOutcome;

    const buttons = [];
    let emojiToUse = [...emojiList];

    while (emojiToUse.length > 5) {
        let number = Math.floor(Math.random() * emojiToUse.length);
        emojiToUse.splice(number, 1);
    }

    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Loterėja')
        .setDescription('Rask laimingą emoji!');

    for (var i = 0; i < 5; i++) {
        let button = new ButtonBuilder()
            .setCustomId('primary' + i)
            .setStyle(ButtonStyle.Secondary)
            .setEmoji({ id: emojiToUse[i].id });
        buttons.push(button);
    }

    const row = new ActionRowBuilder()
        .addComponents(buttons[0], buttons[1], buttons[2], buttons[3], buttons[4]);

    await interaction.reply({ embeds: [embed], components: [row] });

    const luckyNumber = Math.floor(Math.random() * emojiToUse.length);

    const filter = i => i.user.id === interaction.user.id;

    const collector = await interaction.channel.createMessageComponentCollector({ filter });

    const promise = new Promise((resolve, reject) => {
        collector.on('collect', async button => {
            let buttonClickedIndex = buttons.findIndex(el => el.data.custom_id === button.customId);
            if (buttonClickedIndex === luckyNumber) {
                buttons[buttonClickedIndex].setStyle(ButtonStyle.Success);
                embed.setColor(0x00FF99);
                embed.addFields({ name: 'Rezultatas', value: 'Laimėjai', inline: true });
                embed.addFields({ name: 'Gavai 1 gyvybę', value: 'www.debils.gay', inline: true });
                await button.update({ embeds: [embed], components: [row] });
                gameOutcome = true;
            } else {
                buttons[buttonClickedIndex].setStyle(ButtonStyle.Danger);
                buttons[luckyNumber].setStyle(ButtonStyle.Success);
                embed.setColor(0xFF0000);
                embed.addFields({ name: 'Rezultatas', value: 'Pralaimėjai', inline: true });
                await button.update({ embeds: [embed], components: [row] });
                gameOutcome = false;
            }
            playingUsers.splice(playingUsers.indexOf(interaction.user.id), 1);
            collector.stop();
            resolve(gameOutcome);
        });
    });

    return promise;
}

module.exports = { raskLaiminga }