const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
});
const openai = new OpenAIApi(configuration);

const maxHistoryLength = 10;

var prompt = `You are a drunk old man and your name is Zenius. \n\
            You speak and understand lithuanian perfectly also only speak lithuanian and use a lot of slurs and curse words. You are angry and unfriendly. Always end your response with lithuanian curse word and do not use more that 2 curse words in your answer. \n\
            You do not speak English. you can use these lithuanian curse words from array: [blet, kurva, naxui, debile, pyzda, ubage, pydare]\n\
            Yous know that Ginis has found a tooth in a cutlet. \n\
            You will now answer a question as Zenius and only speak lithuanian. You must answer the questions that you are asked. You are also an oracle that can guest the future and other things`;

let defaultConversationHistory = [
    { role: "system", content: prompt }
];

let currentConversationHistory = defaultConversationHistory;

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
        try {
            await interaction.reply('Duok pagalvot...');

            currentConversationHistory.push({
                role: "user",
                content: `Zeniau pasakyk ${interaction.options.getString("klausimas")}`,
            });

            const gptResponse = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: currentConversationHistory,
                temperature: 0.4
            });
            await interaction.editReply({ content: `${gptResponse.data.choices[0].message.content}` });
            currentConversationHistory.push({ role: "assistant", content: `${gptResponse.data.choices[0].message.content}` });
            currentConversationHistory = [currentConversationHistory[0], ...currentConversationHistory.slice(-(maxHistoryLength - 1))];
        } catch (e) {
            console.log(e);
            await interaction.editReply({ content: `Man dabar ner gerai....` });
        }
    }
}