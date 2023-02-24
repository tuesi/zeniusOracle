const cron = require('node-cron');

let currentGame = 0

function cronStart() {
    var job = cron.schedule('* * * * *', async function () {
        const randomNum = Math.floor(Math.random() * 3);
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