const { DiscordJS, Client, Collection, MessageEmbed, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: 32767 });
const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const mongoose = require('mongoose');
const loadData = require('./mongodb/loadData');
const fs = require('fs');
const cors = require('cors');
const express = require("express");
var app = express();
require('dotenv').config();

// app.use(cors({origin: '*'}));

// app.listen(process.env.PORT || 80, () => {
//     console.log("Server running on port " + process.env.PORT);
//    });

// app.get("/", (req,res) => {
// res.send("ALIVE!");
// });

mongoose.connect(process.env.MONGOOSE);

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

pabuciuokStatus = false;
pubuciuokValue: String;

loadData();

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const commands = [];
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

client.on('ready', () => {
    console.log('BOT is online');
    const CLIENT_ID = client.user.id;
    const rest = new REST({
        version: "9"
    }).setToken(process.env.DISCORD_KEY);
    (async () => {
        try {
            if (process.env.ENV === "production") {
                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                });
                console.log("Registered commands");
            } else {
                await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                    body: commands
                });
                console.log("Registered dev commands");
            }
        } catch (err) {
            console.log(err);
        }
    })();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err) {
        console.log(err);
        await interaction.reply({
            content: " An error occurred while executing that command.",
            ephemeral: true
        });
    }
});

client.login(process.env.DISCORD_KEY);