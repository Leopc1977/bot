const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "$"
var msgTemp = new Array();

for (var i = 0; i < 10; i++)
{
 msgTemp[i] = new Array();
}

client.on("ready", () => {
    client.user.setPresence({
        status: 'online'
    })
})

client.on("message", message => {
  if (!message.content.startsWith(prefix)|| message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if (command === 'ping')
  {
  message.channel.sendMessage('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
  }
  if (command === 'date') {
    let [idMsg, day, hour,minute, idChannel] = args;

    let msg = message.channel.fetchMessage(idMsg.toString())

    message.channel.fetchMessages({around: idMsg, limit: 1})
    .then(msg => {
        const fetchedMsg = msg.first();
        insertMsgTemp[0] = fetchedMsg.content;
    });

    let insertMsgTemp =  new Array(3);
    //insertMsgTemp[0] = args[0];
    insertMsgTemp[1] = calc(day,hour,minute)
    insertMsgTemp[2] = idChannel
    msgTemp.push(insertMsgTemp);

    message.channel.send("Message : "+insertMsgTemp[0]+" to send the day : "+day+" and the hour : " +hour+" and minute : "+minute+" in the channel : " + idChannel);
  }
});

setInterval(verif , 0)
function verif(){
  msgTemp.forEach((item, index) => {
    let x = new Date();
    x.setHours(x.getHours()+2)

    let timerDate = new Date();
    timerDate.setHours(timerDate.getHours()+2)

    if (timerDate > item[1] || timerDate == item[1])
    {
      item[2] = item[2].toString();
      client.channels.get(item[2]).send(item[0]);
      delete item[0];
      delete item[1];
      delete item[2];
    }
  })
}
function calc(pDay, pHour, pMinute){
  let timerDate = new Date();
  timerDate.setDate(pDay);
  timerDate.setHours(pHour);
  timerDate.setMinutes(pMinute)
  timerDate.setSeconds(0);
  return timerDate
}

client.login(process.env.token);
