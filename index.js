const Discord = require('discord.js');
const{ prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!')
})

var schedule = require('node-schedule');

var j = schedule.scheduleJob('/0 * * * * *', function(){
    printDate();
    console.log('date printed');
});

function printDate() {
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var date = new Date();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    var marker;
    if (day == 1 || day == 21) {
        marker = "st";
    } else if (day == 2 || day == 22) {
        marker = "nd";
    } else if (day == 3 || day == 23) {
        marker = "rd";
    } else {
        marker = "th";
    }

    client.channels.get('203349952783581184').send(monthNames[monthIndex] + ' ' + day + marker + ' ' + year);
}

client.on('message', message => {
    //console.log(message.content);
    if(message.content.startsWith(`${prefix}date`)) {
        printDate();
    }
    
})

client.login(token);