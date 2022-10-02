const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");
const topdebils = require("../lists/topdebils");
const emoji = require('../utils/emojiFinder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("topdebilas")
        .setDescription("Serverio debilu top 10!"),
        async execute(interaction) {
            var auge = emoji.getEmoji(interaction, "auge");
            var aurimts = emoji.getEmoji(interaction, "aurimts");
            var debiluString = '';
            var count = 1;
            var top = topdebils.slice(0);
            top.sort(function(a,b) {
                return b.count - a.count;
            })
            var topNumber = top.length > 10 ? 10 : top.length;
            for(var i = 0; i < topNumber; i++) {
                if(i === 0) {
                    debiluString = debiluString + `${aurimts} ` + "<@"+top[i].tag+">" + ` ${aurimts}` + "\n";
                } else {
                    debiluString = debiluString + `Nr: ${count} ` + "<@"+top[i].tag+">" + "\n";
                }
                
                count ++;
            }
            interaction.reply(`Debilu Top 10 ${auge} \n ${debiluString}`);
            count = 1;
        }
}