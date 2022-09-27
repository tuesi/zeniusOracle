module.exports = {
    getEmoji(interaction, emojiName) {
        if(interaction.client.emojis.cache.find(emoji => emoji.name === emojiName)){
            return interaction.client.emojis.cache.find(emoji => emoji.name === emojiName);
        }
    }
}