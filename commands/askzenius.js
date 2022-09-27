const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");

const EIK_NX = "Eik naxui";
const PASAUDYSIU = "Pasaudysiu tau i strele";
const PABUCIUOK = "Pabuciuok pasakysiu";
const DEBILAS = "Tu debilas";
const DRAKULA = "DRAKULA!";
const APSISIKAU = "Apsisikau pazasti, negaliu sneket";
const NESKAMBINK = "Nebeskambink, isvazeves";
const KUR_DINGES = "Ooo Zeniau, kur tiek dinges buvai?";
const KAS_SKAITYS = "Kas skaitys tas gaidys";

const ANSWERS = [EIK_NX, PASAUDYSIU, PABUCIUOK, DEBILAS, DRAKULA, 
    APSISIKAU, NESKAMBINK, KUR_DINGES, KAS_SKAITYS];

module.exports = {
    data: new SlashCommandBuilder()
        .setName("zeniaupasakyk")
        .setDescription("Uzduok klausima Zeniui")
        .addStringOption(option => {
            return option
                .setName("klausimas")
                .setDescription("Tavo klausimas Zeniui")
                .setRequired(true)
        }),
        async execute(interaction) {
            let number = Math.floor(Math.random() * ANSWERS.length);
            // console.log(number);
            // console.log(interaction.options.getString("klausimas"));
            if(number === 2) {
                pabuciuokStatus = true;
                pabuciuokValue = interaction.options.getString("klausimas");
                pabuciuokUser = interaction.member.user;
            } else {
                pabuciuokStatus = false;
                pabuciuokValue = '';
                pabuciuokUser = '';
            }
            interaction.reply(`${ANSWERS[number]} ${interaction.member.user}`);
        }
}