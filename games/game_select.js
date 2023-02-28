const cron = require('node-cron');

let currentGame = process.env.INITIAL_GAME;

function cronStart() {
    var job = cron.schedule('00 22 * * *', async function () {
        const randomNum = Math.floor(Math.random() * 4);
        currentGame = randomNum;
    }, null, true, 'Europe/Vilnius');

    job.start();
}

module.exports = {
    getCurrentGame: function () {
        return currentGame;
    },
    cronStart
};