const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { JapaneseDic } = require('./dictionary.json');
const client = new Discord.Client();

const channel = '203349952783581184';
var gif = true;

client.once('ready', () => {
    console.log('Ready!')
})

var schedule = require('node-schedule');

var j = schedule.scheduleJob('/0 * * * * *', function(){
    console.log('schuduled job executed');
    //printDate();
    newWord(true);
});

function newWord(wotd) {
    var output = '';
    if(wotd) { 
        output += 'The Japanese word of the day is: **'; 
    } else { 
        output += 'Kata/Hira: **'; 
    }
    
    var ran = Math.floor(Math.random() * JapaneseDic.length);

    output += JapaneseDic[ran].Kata + '** ' + '(' + JapaneseDic[ran].Romanji + ')\n';
    output += 'English: ' + JapaneseDic[ran].English;

    if(JapaneseDic[ran].Kanji) {
        output += '\nKanji: ' + JapaneseDic[ran].Kanji;
    }

    client.channels.get(channel).send(output);
}

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

    client.channels.get(channel).send(monthNames[monthIndex] + ' ' + day + marker + ' ' + year);
}

function discipline(member) {
    if(member != undefined){
        client.channels.get(channel).send(member.displayName + ' hi');
    }
}

function help() {
    client.channels.get(channel).send(
        '```Try these commands:\n!learn: Learn a new japanese word\n!toggleGif: Toggle gifs for all commands\n!discipline @<member>: crack the whip!\n!date: Returns todays date```');
}

client.on('message', message => {
    //console.log(message.content);
    if(message.content.startsWith(`${prefix}nani`)) {
        help();
    }
    else if(message.content.startsWith(`${prefix}date`)) {
        printDate();
    }
    else if(message.content.startsWith(`${prefix}learn`)) {
        newWord(false);
    }
    else if(message.content.startsWith(`${prefix}discipline`)) {
        let member = message.mentions.members.first();
        discipline(member);
    }
    else if(message.content.startsWith(`${prefix}toggleGif`)) {
        gif = !(gif);
        console.log(gif);
    }
})

client.login(token);