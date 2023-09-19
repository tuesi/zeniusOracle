const { VoiceConnection } = require('@discordjs/voice');

let voiceConnection;
let lastInteractionTime = Date.now();

function setVoiceConnection(connection) {
    voiceConnection = connection;
}

function getVoiceConnection() {
    if (voiceConnection) {
        return voiceConnection;
    } else {
        return null;
    }

}

function updateLastInteractionTime() {
    lastInteractionTime = Date.now();
}

const disconnectTimeout = 5 * 60 * 1000;

function checkActivity() {
    const currentTime = Date.now();
    const timeSinceLastInteraction = currentTime - lastInteractionTime;

    if (timeSinceLastInteraction >= disconnectTimeout && voiceConnection) {
        // Disconnect the bot if there has been no interaction for the specified duration
        voiceConnection.disconnect();
        setVoiceConnection(null);
    } else {
        // Continue checking for inactivity
        setTimeout(checkActivity, disconnectTimeout - timeSinceLastInteraction);
    }
};

module.exports = { setVoiceConnection, getVoiceConnection, checkActivity, updateLastInteractionTime };