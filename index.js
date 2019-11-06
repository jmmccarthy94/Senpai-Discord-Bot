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
    var kan = getKanji();
    var link = '/v1/kanji/' + kan;
    var options = {
        host: 'kanjiapi.dev',
        port: '80',
        path: encodeURI(link),
        method: 'GET'
      };

    var req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            jResponse = JSON.parse(chunk);
            printJSON(jResponse);   
        });
      }).end();

});

function printJSON(info) {
    console.log(info);
    client.channels.get('203349952783581184').send("The kanji of the day is: " + jResponse.kanji + "\nGrade level = " + jResponse.grade
    + "\nMeaning: " + jResponse.meanings);

    if(jResponse.kun_readings.length != 0){ client.channels.get('203349952783581184').send("Kun Reading: " + jResponse.kun_readings);}
    if(jResponse.on_readings.length != 0){ client.channels.get('203349952783581184').send("On Reading: " + jResponse.on_readings);}
    if(jResponse.name_readings.length != 0){ client.channels.get('203349952783581184').send("Name Reading: " + jResponse.name_readings);}
}

function getKanji() {
    switch(Math.floor((Math.random() * 7) + 1) % grade1.length){
        case 1:
            var ran = Math.floor((Math.random() * 10) + 1) % grade1.length;
            return grade1[ran];
            break;    
        case 2:
            var ran = Math.floor((Math.random() * 10) + 1) % grade2.length;
            return grade2[ran];
            break;    
        case 3:
            var ran = Math.floor((Math.random() * 10) + 1) % grade3.length;
            return grade3[ran];
            break;    
        case 4:
            var ran = Math.floor((Math.random() * 10) + 1) % grade4.length;
            return grade4[ran];
            break;    
        case 5:
            var ran = Math.floor((Math.random() * 10) + 1) % grade5.length;
            return grade5[ran];
            break;    
        case 6:
            var ran = Math.floor((Math.random() * 10) + 1) % grade6.length;
            return grade6[ran];
            break;    
        case 7:
            var ran = Math.floor((Math.random() * 10) + 1) % grade7.length;
            return grade7[ran];
            break;    
        default:   
            console.log("ERRER");
    }
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