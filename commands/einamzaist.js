const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");
const emoji = require('../utils/emojiFinder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("einamzaist")
        .setDescription("Paprasyk Zeniaus, kad pakviestu darugus zaisti tavo pasirinkta zaidima")
        .addStringOption(option => {
            return option
                .setName("ZAIDIMAS")
                .setDescription("ZAIDIMAS")
                .setRequired(true)
                .addChoices(
                    { name: 'CSGO', value: 'CSGO' },
                    { name: 'LOL', value: 'LOL' },
                    { name: 'OSRS', value: 'OSRS' },
                    { name: 'ROTMG', value: 'ROTMG' },
                )
        }),
    async execute(interaction) {

        switch (interaction.options.getString('ZAIDIMAS')) {
            case 'CSGO':
                let csgoUsers = interaction.guild.roles.cache.get('814166322770346056').members.map(m => m.user).join(' ');
                var ct1 = emoji.getEmoji(interaction, "ct1");
                var t2 = emoji.getEmoji(interaction, "t2");
                interaction.reply(`Einam cesa! <@&814166322770346056> ${ct1} ${csgoUsers} ${t2}`);
                break;
            case 'LOL':
                let lolUsers = interaction.guild.roles.cache.get('814167393869496331').members.map(m => m.user).join(' ');
                var fedora1 = emoji.getEmoji(interaction, "tipsfedora");
                var fedora2 = emoji.getEmoji(interaction, "tipsfedora2");
                interaction.reply(`Einam lola! <@&814167393869496331> ${fedora1} ${lolUsers} ${fedora2}`);
                break;
            case 'OSRS':
                let osrsUsers = interaction.guild.roles.cache.get('814184887358849064').members.map(m => m.user).join(' ');
                var senelis1 = emoji.getEmoji(interaction, "senelis1");
                var senelis2 = emoji.getEmoji(interaction, "senelis2");
                interaction.reply(`Einam runezkeipa! <@&814184887358849064> ${senelis1} ${osrsUsers} ${senelis2}`);
                break;
            case 'ROTMG':
                let rotmgUsers = interaction.guild.roles.cache.get('814167438500954133').members.map(m => m.user).join(' ');
                var tez = emoji.getEmoji(interaction, "tez");
                var patrik = emoji.getEmoji(interaction, "yepatrik");
                interaction.reply(`Einam realma! <@&814167438500954133> ${tez} ${rotmgUsers} ${patrik}`);
                break;
        }
    }
}