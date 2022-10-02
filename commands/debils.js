const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");
const emoji = require('../utils/emojiFinder');
const topdebils = require('../lists/topdebils.js');
const saveDebils = require('../mongodb/saveDebils.js');
const debilsObject = require('../models/debilsObject.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kasyradebilas")
        .setDescription("Paklausk Zeniaus, kas yra servo debilas"),
        async execute(interaction) {
            let user = interaction.guild.members.cache.filter(user => !user.bot).random().user;
            console.log(user);
            var trusabaka = emoji.getEmoji(interaction, "trusabaka");
            interaction.reply(`Sitam serve debilas yra ${user} ${trusabaka}`);

            const objectIndex = topdebils.findIndex(el => el.tag === user.id);
            if(objectIndex != -1) {
                topdebils[objectIndex].count = topdebils[objectIndex].count + 1;
            } else {
                const debils = Object.create(debilsObject);
                debils.tag = user.id;
                debils.count = 1;
                topdebils.push(debils);
            }
            saveDebils();
        }
}