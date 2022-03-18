const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async(client, message, args) => {
   if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın')

   	let kanal = message.mentions.channels.first()
    if(!kanal) return message.reply('```Kick Log kanalını belirtmelisin```')

    db.set(`kicklog_${message.guild.id}`, kanal.id)
   
    return message.reply(`Kick Log Kanalı Başarıyla <#${kanal.id}> Olarak ayarlandı!`)
  
 }

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases:[],
	permlevel: 0
};

exports.help = {
	name: "kick-log"
}