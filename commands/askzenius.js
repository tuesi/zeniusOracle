const { SlashCommandBuilder } = require("@discordjs/builders");
const DiscordJS = require("discord.js");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY
});
const openai = new OpenAIApi(configuration);

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
        //let number = Math.floor(Math.random() * ANSWERS.length);
        // console.log(number);
        // console.log(interaction.options.getString("klausimas"));
        // if (number === 2) {
        //     pabuciuokStatus = true;
        //     pabuciuokValue = interaction.options.getString("klausimas");
        //     pabuciuokUser = interaction.member.user;
        // } else {
        //     pabuciuokStatus = false;
        //     pabuciuokValue = '';
        //     pabuciuokUser = '';
        // }
        //console.log(interaction.options.getString("klausimas"));

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
            temperature: 0.4
        });

        //interaction.reply(`${ANSWERS[number]} ${interaction.member.user}`);
        await interaction.editReply({ content: `${gptResponse.data.choices[0].message.content}` });
    }
}