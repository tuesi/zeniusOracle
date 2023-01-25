const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");
const emoji = require('../utils/emojiFinder');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName("zeniauslotereja")
        .setDescription("Zeniaus lotereja"),
    async execute(interaction) {
        const message = await interaction.reply({
            content: `Zenius tau sako pasirinkti laiminga Emoji!`,
            fetchReply: true
        });

        // const emoji1 = emoji.getEmoji(interaction, "kiss~1");
        // const emoji2 = emoji.getEmoji(interaction, "pirst");
        // const emoji3 = emoji.getEmoji(interaction, "aurimts");
        // const emoji4 = emoji.getEmoji(interaction, "trusabaka");
        // const emoji5 = emoji.getEmoji(interaction, "fifidleiplaukas");
        // const emoji6 = emoji.getEmoji(interaction, "ojtu");
        // const emoji7 = emoji.getEmoji(interaction, "aurim2");
        // const emoji8 = emoji.getEmoji(interaction, "chicago");
        // const emoji9 = emoji.getEmoji(interaction, "ginispassport");
        // const emoji10 = emoji.getEmoji(interaction, "ct2");

        const emoji1 = emoji.getEmoji(interaction, "sausginis");
        const emoji2 = emoji.getEmoji(interaction, "trusabanis");
        const emoji3 = emoji.getEmoji(interaction, "test1");

        //console.log(emoji1.name);
        //console.log(emoji2);
        //console.log(emoji3);

        //const emojiList = [emoji1, emoji2, emoji3, emoji4, emoji5, emoji6, emoji7, emoji8, emoji9, emoji10];
        const emojiList = [emoji1, emoji2, emoji3];

        let emojiToUse = emojiList;

        while (emojiToUse.length > 3) {
            let number = Math.floor(Math.random() * emojiList.length);
            emojiToUse.splice(number, 1);
        }

        const luckyNumber = Math.floor(Math.random() * emojiToUse.length);
        let luckyEmoji = emojiToUse[luckyNumber];
        console.log(luckyEmoji.name);

        emojiToUse.forEach(emoji => {
            message.react(emoji);
        });

        const filter = (reaction, user) => {
            return user.id == interaction.user.id;
        }

        const collector = message.createReactionCollector({ filter, time: 600000 });

        collector.on('collect', (reaction, user) => {
            console.log(reaction.emoji.name);
            console.log(luckyEmoji.name);
            if (reaction.emoji === luckyEmoji) {
                interaction.followUp(`Laimejai blechamucha`);
            } else {
                interaction.followUp(`Bandyk dar karta vaikas`);
            }
        });
    }
}