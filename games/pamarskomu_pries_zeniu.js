const { ActionRowBuilder, EmbedBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJS, ButtonBuilder } = require("discord.js");

async function pamarskomuPriesZeniu(interaction, emojiList, playingUsers) {

    let gameOutcome;

    const roundsToWin = 5;

    let playerWin = 0;
    let zeniusWin = 0;
    let playerChoice = 0;

    const emoji = ["🪨", "🧻", "✂️"];

    let prviousPlayerChoices = [];

    const embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Loterėja')
        .setDescription(`Pamarskomu pries Zeniu! Iki ${roundsToWin} laimėjimų.`)
        .addFields({ name: `${interaction.member.nickname}`, value: `${playerWin}`, inline: true })
        .addFields({ name: 'ㅤVS', value: '‎', inline: true })
        .addFields({ name: 'ㅤㅤZenius', value: `ㅤㅤ${zeniusWin}`, inline: true });

    const rock = new ButtonBuilder()
        .setCustomId('rock')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji({ name: "🪨" });

    const paper = new ButtonBuilder()
        .setCustomId('paper')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji({ name: "🧻" });

    const scissors = new ButtonBuilder()
        .setCustomId('scissors')
        .setStyle(ButtonStyle.Secondary)
        .setEmoji({ name: "✂️" });

    const row = new ActionRowBuilder()
        .addComponents(rock, paper, scissors);

    await interaction.reply({ embeds: [embed], components: [row] });

    let zeniusPick = Math.floor(Math.random() * 3);

    const filter = i => i.user.id === interaction.user.id;

    const collector = await interaction.channel.createMessageComponentCollector({ filter });

    const promise = new Promise((resolve, reject) => {
        collector.on('collect', async button => {

            //0 rock
            //1 paper
            //2 scissors

            if (button.customId === 'rock') {
                playerChoice = 0;
            } else if (button.customId === 'paper') {
                playerChoice = 1;
            } else if (button.customId === 'scissors') {
                playerChoice = 2;
            }

            prviousPlayerChoices.push(playerChoice);

            if (prviousPlayerChoices[prviousPlayerChoices.length - 1] === prviousPlayerChoices[prviousPlayerChoices.length - 2]) {
                if (prviousPlayerChoices[prviousPlayerChoices.length - 1] === 0) {
                    let pick = Math.floor(Math.random() * 2);
                    zeniusPick = pick;
                } else if (prviousPlayerChoices[prviousPlayerChoices.length - 1] === 1) {
                    let pick = Math.floor(Math.random() * 2) + 1;
                    zeniusPick = pick;
                } else if (prviousPlayerChoices[prviousPlayerChoices.length - 1] === 2) {
                    let pick = Math.floor(Math.random() * 2);
                    zeniusPick = pick === 0 ? pick : 2;
                }
            } else {
                zeniusPick = Math.floor(Math.random() * 3);
            }

            if ((playerChoice + 1) % 3 === zeniusPick) {
                zeniusWin++;
                if (zeniusWin === roundsToWin) {
                    gameOutcome = false;
                    const embed = new EmbedBuilder()
                        .setColor(0xFF0000)
                        .setTitle('Loterėja')
                        .setDescription(`Pamarskomu pries Zeniu! Iki ${roundsToWin} laimėjimų.`)
                        .addFields({ name: `${emoji[playerChoice]}`, value: '‎', inline: true })
                        .addFields({ name: 'ㅤ❌', value: '‎', inline: true })
                        .addFields({ name: `ㅤㅤ${emoji[zeniusPick]}`, value: '‎', inline: true })
                        .addFields({ name: `${interaction.member.nickname}`, value: `${playerWin}`, inline: true })
                        .addFields({ name: 'ㅤVS', value: '‎', inline: true })
                        .addFields({ name: 'ㅤㅤZenius', value: `ㅤㅤ${zeniusWin}`, inline: true })
                        .addFields({ name: 'Rezultatas', value: 'Pralaimėjai', inline: false });
                    await button.update({ embeds: [embed], components: [row] });
                } else {
                    const embed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('Loterėja')
                        .setDescription(`Pamarskomu pries Zeniu! Iki ${roundsToWin} laimėjimų.`)
                        .addFields({ name: `${emoji[playerChoice]}`, value: '‎', inline: true })
                        .addFields({ name: 'ㅤ❌', value: '‎', inline: true })
                        .addFields({ name: `ㅤㅤ${emoji[zeniusPick]}`, value: '‎', inline: true })
                        .addFields({ name: `${interaction.member.nickname}`, value: `${playerWin}`, inline: true })
                        .addFields({ name: 'ㅤVS', value: '‎', inline: true })
                        .addFields({ name: 'ㅤㅤZenius', value: `ㅤㅤ${zeniusWin}`, inline: true });
                    await button.update({ embeds: [embed], components: [row] });
                }
            } else if (playerChoice === zeniusPick) {
                const embed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Loterėja')
                    .setDescription(`Pamarskomu pries Zeniu! Iki ${roundsToWin} laimėjimų.`)
                    .addFields({ name: `${emoji[playerChoice]}`, value: '‎', inline: true })
                    .addFields({ name: 'ㅤ🏳️', value: '‎', inline: true })
                    .addFields({ name: `ㅤㅤ${emoji[zeniusPick]}`, value: '‎', inline: true })
                    .addFields({ name: `${interaction.member.nickname}`, value: `${playerWin}`, inline: true })
                    .addFields({ name: 'ㅤVS', value: '‎', inline: true })
                    .addFields({ name: 'ㅤㅤZenius', value: `ㅤㅤ${zeniusWin}`, inline: true });
                await button.update({ embeds: [embed], components: [row] });
            } else {
                playerWin++;
                if (playerWin === roundsToWin) {
                    gameOutcome = true;
                    const embed = new EmbedBuilder()
                        .setColor(0x00FF99)
                        .setTitle('Loterėja')
                        .setDescription(`Pamarskomu pries Zeniu! Iki ${roundsToWin} laimėjimų.`)
                        .addFields({ name: `${emoji[playerChoice]}`, value: '‎', inline: true })
                        .addFields({ name: 'ㅤ✅', value: '‎', inline: true })
                        .addFields({ name: `ㅤㅤ${emoji[zeniusPick]}`, value: '‎', inline: true })
                        .addFields({ name: `${interaction.member.nickname}`, value: `${playerWin}`, inline: true })
                        .addFields({ name: 'ㅤVS', value: '‎', inline: true })
                        .addFields({ name: 'ㅤㅤZenius', value: `ㅤㅤ${zeniusWin}`, inline: true })
                        .addFields({ name: 'Rezultatas', value: 'Laimėjai', inline: false })
                        .addFields({ name: 'Gavai 1 gyvybę', value: 'www.debils.gay', inline: true });
                    await button.update({ embeds: [embed], components: [row] });
                } else {
                    const embed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('Loterėja')
                        .setDescription(`Pamarskomu pries Zeniu! Iki ${roundsToWin} laimėjimų.`)
                        .addFields({ name: `${emoji[playerChoice]}`, value: '‎', inline: true })
                        .addFields({ name: 'ㅤ✅', value: '‎', inline: true })
                        .addFields({ name: `ㅤㅤ${emoji[zeniusPick]}`, value: '‎', inline: true })
                        .addFields({ name: `${interaction.member.nickname}`, value: `${playerWin}`, inline: true })
                        .addFields({ name: 'ㅤVS', value: '‎', inline: true })
                        .addFields({ name: 'ㅤㅤZenius', value: `ㅤㅤ${zeniusWin}`, inline: true });
                    await button.update({ embeds: [embed], components: [row] });
                }
            }
            if (playerWin === roundsToWin || zeniusWin === roundsToWin) {
                playingUsers.splice(playingUsers.indexOf(interaction.user.id), 1);
                collector.stop();
                resolve(gameOutcome);
            }
        });
    });

    return promise;
}

module.exports = { pamarskomuPriesZeniu }