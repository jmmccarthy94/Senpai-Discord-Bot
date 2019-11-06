const Discord = require('discord.js');
//const { Kanjiapi } = require('kanjiapi-wrapper');
const { grade1, grade2, grade3, grade4, grade5, grade6, grade7 } = require('./kanji.json');
const{ prefix, token } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!')
})

var schedule = require('node-schedule');
var http = require('http');

var jResponse = JSON;

var j = schedule.scheduleJob('/0 * * * * *', () =>{
    //printDate();
    console.log('date printed');
    var options = {
        host: 'kanjiapi.dev',
        port: '80',
        path: encodeURI('/v1/kanji/貯'),
        method: 'GET'
      };

    var req = http.request(options, function(res) {
        //res.setEncoding('utf8');
        res.on('data', function (chunk) {
          //console.log('BODY: ' + chunk);
          jResponse = JSON.parse(chunk);
        });
      }).end();

      setTimeout(func1, 3000);
      //console.log(jResponse);
});

function func1(){
    console.log(jResponse);
}



/*
const listener = () => {
    // Ask kanjiapi instance for data again and trigger UI redraws
}

const kanjiapi = Kanjiapi.build()
kanjiapi.addListener('listener_name', listener)

const result = kanjiapi.getKanji('字')

console.log(result);
*/

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