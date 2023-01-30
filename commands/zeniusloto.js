const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");
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

module.exports = {
    data: new SlashCommandBuilder()
        .setName("zeniauslotereja")
        .setDescription("Zeniaus lotereja"),
    async execute(interaction) {
        if (interaction.channel.id === '1069524416729456680') {
            let message = null;
            const wasGiven = await getLivesSet(interaction.user.id);
            if (wasGiven) {
                await interaction.reply({
                    content: `Bandyk rytoj, siandien jau sisi baba!`
                });
            } else {
                message = await interaction.reply({
                    content: `Zenius tau sako pasirinkti laiminga Emoji!`,
                    fetchReply: true
                });
            }

            if (message !== null) {
                const emoji1 = emoji.getEmoji(interaction, "kiss~1");
                const emoji2 = emoji.getEmoji(interaction, "pirst");
                const emoji3 = emoji.getEmoji(interaction, "aurimts");
                const emoji4 = emoji.getEmoji(interaction, "trusabaka");
                const emoji5 = emoji.getEmoji(interaction, "fifidleiplaukas");
                const emoji6 = emoji.getEmoji(interaction, "ojtu");
                const emoji7 = emoji.getEmoji(interaction, "aurim2");
                const emoji8 = emoji.getEmoji(interaction, "chicago");
                const emoji9 = emoji.getEmoji(interaction, "ginispassport");
                const emoji10 = emoji.getEmoji(interaction, "ct2");

                if (emoji1) {
                    console.log(emoji1.name);
                }
                if (emoji2) {
                    console.log(emoji2.name);
                }
                if (emoji3) {
                    console.log(emoji3.name);
                }
                if (emoji4) {
                    console.log(emoji4.name);
                }
                if (emoji5) {
                    console.log(emoji5.name);
                }
                if (emoji6) {
                    console.log(emoji6.name);
                }
                if (emoji7) {
                    console.log(emoji7.name);
                }
                if (emoji8) {
                    console.log(emoji8.name);
                }
                if (emoji9) {
                    console.log(emoji9.name);
                }
                if (emoji10) {
                    console.log(emoji10.name);
                }

                // const emoji1 = emoji.getEmoji(interaction, "sausginis");
                // const emoji2 = emoji.getEmoji(interaction, "trusabanis");
                // const emoji3 = emoji.getEmoji(interaction, "test1");

                const emojiList = [emoji1, emoji2, emoji3, emoji4, emoji5, emoji6, emoji7, emoji8, emoji9, emoji10];
                //const emojiList = [emoji1, emoji2, emoji3];

                let emojiToUse = [...emojiList];

                while (emojiToUse.length > 5) {
                    let number = Math.floor(Math.random() * emojiToUse.length);
                    emojiToUse.splice(number, 1);
                }

                const luckyNumber = Math.floor(Math.random() * emojiToUse.length);
                let luckyEmoji = emojiToUse[luckyNumber];

                emojiToUse.forEach(emoji => {
                    message.react(emoji);
                });

                const filter = (reaction, user) => {
                    return user.id == interaction.user.id;
                }

                const collector = message.createReactionCollector({ filter, time: 600000 });

                collector.on('collect', (reaction, user) => {
                    if (reaction.emoji === luckyEmoji) {
                        interaction.followUp(`Laimejai blechamucha ir gavai 1 gyvybe dzimio kazino NACHER! www.debils.gay`);
                        addLives(interaction.user.id);
                    } else {
                        interaction.followUp(`Bandyk rytoj vaikas, nes tau nepa EJO!`);
                        setWasGiven(interaction.user.id);
                    }
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