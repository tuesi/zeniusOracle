const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");
const emoji = require('../utils/emojiFinder');

const TAIP = "Taip";
const NE = "Ne";
const GALBUT = "Galbut";

const ANSWERS = [TAIP, NE, GALBUT];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("buciuojuzeniu")
        .setDescription("Pabuciuok Zeniu"),
        async execute(interaction) {
            if(pabuciuokStatus === true && pabuciuokUser === interaction.member.user) {
                var galbut = emoji.getEmoji(interaction, "ohno"); //ohno
                var taip = emoji.getEmoji(interaction, "vo"); //vo
                var ne = emoji.getEmoji(interaction, "auge2"); //auge2
                var EMOJI = [taip, ne, galbut];
                let number = Math.floor(Math.random() * ANSWERS.length);
                interaction.reply(`Atsakymas i ${interaction.member.user} uzduota klausima \'${pabuciuokValue}\' yra: \n` + `**${ANSWERS[number]}** ${EMOJI[number]}`);
                pabuciuokStatus = false;
                pabuciuokValue = '';
                pabuciuokUser = '';
            } else {
                interaction.reply(`Ar zinojote, kad ${interaction.member.user} yra gejus`);
            }
        }
}