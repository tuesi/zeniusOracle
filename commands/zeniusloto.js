const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJS } = require("discord.js");
const emoji = require('../utils/emojiFinder');
const fetch = require('node-fetch');

function addLives(discordId) {
    fetch(process.env.ADD_LIVES_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: `${process.env.SECRET}`, discordId: `${discordId}` })
    });
}

function setWasGiven(discordId) {
    fetch(process.env.SET_GIVEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: `${process.env.SECRET}`, discordId: `${discordId}` })
    });
}

async function getLivesSet(discordId) {
    const response = await fetch(process.env.GET_LIVES_SET_URL + '/?' + new URLSearchParams({
        discordId: discordId
    }), {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    if (response.status === 204) {
        return false;
    } else {
        const data = await response.json();
        return data.isSet;
    }
}

playingUsers = [];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("zeniauslotereja")
        .setDescription("Zeniaus lotereja"),
    async execute(interaction) {

        // const emoji1 = emoji.getEmoji(interaction, "noo");
        // const emoji2 = emoji.getEmoji(interaction, "pirst");
        // const emoji3 = emoji.getEmoji(interaction, "aurimts");
        // const emoji4 = emoji.getEmoji(interaction, "trusabaka");
        // const emoji5 = emoji.getEmoji(interaction, "fifidleiplaukas");
        // const emoji6 = emoji.getEmoji(interaction, "ojtu");
        // const emoji7 = emoji.getEmoji(interaction, "aurim2");
        // const emoji8 = emoji.getEmoji(interaction, "chicago");
        // const emoji9 = emoji.getEmoji(interaction, "ginispassport");
        // const emoji10 = emoji.getEmoji(interaction, "ct2");

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Lotereja')
            .setDescription('Pasirink laiminga emoji');

        const emoji1 = emoji.getEmoji(interaction, "test1");
        const emoji2 = emoji.getEmoji(interaction, "sausginis");
        const emoji3 = emoji.getEmoji(interaction, "trusabanis");
        const emoji4 = emoji.getEmoji(interaction, "obuo");
        const emoji5 = emoji.getEmoji(interaction, "zinios");
        const emoji6 = emoji.getEmoji(interaction, "zverioga");
        const emoji7 = emoji.getEmoji(interaction, "black");
        const emoji8 = emoji.getEmoji(interaction, "fokume");
        const emoji9 = emoji.getEmoji(interaction, "song");

        if (interaction.channel.id !== '1069524416729456680') {
            let message = null;
            let hasNoPendingMessages = false;
            //const wasGiven = await getLivesSet(interaction.user.id);
            const wasGiven = false;
            if (playingUsers.indexOf(interaction.user.id) == -1) {
                playingUsers.push(interaction.user.id);
                hasNoPendingMessages = true;
            } else {
                await interaction.reply({
                    content: `Rinkis Emoji amare tu!`
                });
            }

            if (wasGiven && hasNoPendingMessages) {
                playingUsers.splice(playingUsers.indexOf(interaction.user.id), 1);
                await interaction.reply({
                    content: `Bandyk rytoj, siandien jau sisi baba!`
                });
            } else if (hasNoPendingMessages) {

                // const emoji1 = emoji.getEmoji(interaction, "sausginis");
                // const emoji2 = emoji.getEmoji(interaction, "trusabanis");
                // const emoji3 = emoji.getEmoji(interaction, "test1");

                //const emojiList = [emoji1, emoji2, emoji3, emoji4, emoji5, emoji6, emoji7, emoji8, emoji9, emoji10];
                const emojiList = [emoji1, emoji2, emoji3, emoji4, emoji5, emoji6, emoji7, emoji8, emoji9];

                let emojiToUse = [...emojiList];
                const buttons = [];

                while (emojiToUse.length > 5) {
                    let number = Math.floor(Math.random() * emojiToUse.length);
                    emojiToUse.splice(number, 1);
                }

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

                const collector = interaction.channel.createMessageComponentCollector({ filter });

                collector.on('collect', async button => {
                    let buttonClickedIndex = buttons.findIndex(el => el.data.custom_id === button.customId);
                    console.log(buttonClickedIndex);
                    console.log(luckyNumber);
                    if (buttonClickedIndex === luckyNumber) {
                        buttons[buttonClickedIndex].setStyle(ButtonStyle.Success);
                        embed.addFields({ name: 'Rezultatas', value: 'Laimėjai', inline: true })
                        await button.update({ embeds: [embed], components: [row] });
                        //addLives(interaction.user.id);
                    } else {
                        buttons[buttonClickedIndex].setStyle(ButtonStyle.Danger);
                        buttons[luckyNumber].setStyle(ButtonStyle.Success);
                        embed.addFields({ name: 'Rezultatas', value: 'Pralaimėjai', inline: true })
                        await button.update({ embeds: [embed], components: [row] });
                        //setWasGiven(interaction.user.id);
                    }
                    // if (reaction.emoji === luckyEmoji) {
                    //     interaction.followUp(`Laimejai blechamucha ir gavai 1 gyvybe dzimio kazino NACHER! www.debils.gay`);
                    //     addLives(interaction.user.id);
                    // } else {
                    //     interaction.followUp(`Bandyk rytoj vaikas, nes tau nepa EJO! Laimingas Emoji buvo ${luckyEmoji}`);
                    //     setWasGiven(interaction.user.id);
                    // }
                    playingUsers.splice(playingUsers.indexOf(interaction.user.id), 1);
                    collector.stop();
                });
            }
        } else {
            await interaction.reply({
                content: `Sita komanda galima naudoti tik zeniusloto chate!`,
                ephemeral: true
            });
        }
    }
}