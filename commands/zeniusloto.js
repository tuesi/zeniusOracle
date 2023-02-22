const { SlashCommandBuilder } = require("@discordjs/builders");
const { DiscordJS } = require("discord.js");
const emoji = require('../utils/emojiFinder');
const fetch = require('node-fetch');
const { raskLaiminga } = require('../games/rask_laiminga');
const { raskSubineika } = require('../games/rask_subineika');
const { raskVienodus } = require('../games/rask_vienodus');

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
games = [raskLaiminga, raskSubineika, raskVienodus];

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
            let hasNoPendingMessages = false;
            //const wasGiven = await getLivesSet(interaction.user.id);
            const wasGiven = false;
            if (playingUsers.indexOf(interaction.user.id) == -1) {
                playingUsers.push(interaction.user.id);
                hasNoPendingMessages = true;
            } else {
                await interaction.reply({
                    content: `Pabaik paskutini zaidima amare tu!`
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

                const result = await games[1](interaction, emojiList, playingUsers);
                console.log(result);
                if (result === true) {
                    console.log('GIVE THE PRIZE!');
                    //addLives(interaction.user.id);
                } else if (result === false) {
                    console.log('YOU ARE SHIT!');
                    //setWasGiven(interaction.user.id);
                }
            }
        } else {
            await interaction.reply({
                content: `Sita komanda galima naudoti tik zeniusloto chate!`,
                ephemeral: true
            });
        }
    }
}