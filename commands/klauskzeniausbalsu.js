const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, EmbedBuilder } = require("@discordjs/builders");
const { ButtonStyle, DiscordJS } = require("discord.js");
const tts = require("discord-tts");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
});
const openai = new OpenAIApi(configuration);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("klauskbalsu")
        .setDescription("Zenius atsako balsu")
        .addStringOption(option => {
            return option
                .setName("klausimas")
                .setDescription("Zeniau pasakyk")
                .setRequired(true)
        }),
    async execute(interaction) {
        const text = interaction.options.getString("tekstas");
        var language = "lv";

        var prompt = `You are a drunk old man and your name is Zenius. \n\
        You speak and understand lithuanian perfectly also only speak lithuanian and use a lot of slurs and curse words. You are angry and unfriendly. Always end your response with lithuanian curse word and do not use more that 2 curse words in your answer. \n\
        You do not speak English. you can use these lithuanian curse words from array: [blet, kurva, naxui, debile, pyzda, ubage, pydare]\n\
        Yous know that Ginis has found a tooth in a ball of meat. \n\
        You will now answer a question as Zenius and only speak lithuanian`;

        await interaction.reply('Duok pagalvot...');

        const gptResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: prompt,
                },
                {
                    role: "user",
                    content: `Zeniau pasakyk ${interaction.options.getString("klausimas")}`,
                }],
            temperature: 0.1
        });

        //interaction.reply(`${ANSWERS[number]} ${interaction.member.user}`);
        const audioStream = await tts.getVoiceStream(gptResponse.data.choices[0].message.content, { lang: language });
        interaction.editReply({ content: ``, files: [{ attachment: audioStream, name: "zenius atsako.mp3" }] });
        //await interaction.reply({ content: `${text}`, tts: true });
    }
}