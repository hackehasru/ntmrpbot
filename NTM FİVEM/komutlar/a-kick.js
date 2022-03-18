const Discord = require("discord.js");
const db = require('quick.db');

exports.run = async(client, message, args) => {
	let rol = db.fetch(`banrol_${message.guild.id}`)
	if(!message.member.roles.cache.has(rol)&& !message.member.hasPermission("KICK_MEMBERS")) return message.reply('Ban yetkili rolü ayarlanmamış veya <@&' + rol + '> Rolüne sahip değilsin.')
	let kicklog = db.fetch(`kicklog_${message.guild.id}`)
	if(!kicklog) return message.message.reply('Kick Log Sistemi Ayarlanmamış.')
    let user = message.mentions.users.first()
    let sebep = args.slice(1).join(' ') || "Belirtilmemiş."
     if(!user) return message.message.reply(' ``⚠️Bir kişi etiketlemelisin.``')
     if(user.id === message.author.id) return message.reply('``⚠️Kendini Kickleyemezsin``')
     if(user.id === client.user.id) return message.reply('``⚠️Botu Kickleyemezsin``')
  if(user.id === message.guild.ownerID) return message.reply('``⚠️Sunucu sahibini Kickleyemessin Zaten Yetkim Yetmez :)``')
    if (!message.guild.member(user).bannable) return message.reply(' ``⚠️Bu kişinin rolü senden üstte veya `Üyeleri yasakla` yetkisine sahip.``');

    message.reply('<@'+ user.id + '> Kişisini **'+ sebep+ '** Sebebiyle Kicklemek istediğine eminmisin ?').then(async m => {
   	 m.react('✅').then(r =>{ 

   const tamam = (reaction,user) => reaction.emoji.name == '✅' && user.id == message.author.id;
      const tamam2 = m.createReactionCollector(tamam)

   tamam2.on('collect', async (r)=>{
  message.guild.members.cache.get(user.id).kick({
  	reason: `${sebep}`
          })
      let kickbilgi = new Discord.MessageEmbed()
    .setColor('0x36393E')
    .setTitle('KİCK BİLGİ')
    .addField('Yetkili', `${message.author.tag}`)
    .addField('Kicklenen Kişi', user)
    .addField('Sebep', sebep)
    client.channels.cache.get(kicklog).send(kickbilgi)
       })
    })
    await m.react('❌').then(r =>{ 

   const tamam = (reaction,user) => reaction.emoji.name == '❌' && user.id == message.author.id;
      const tamam2 = m.createReactionCollector(tamam)

   tamam2.on('collect', async (r)=>{
     m.delete()
     message.reply('Kickleme İşlemi İptal Edildi')
      })
    })
 })
} 
 
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases:[],
	permlevel: 3,
   kategori: "Admins"
};

exports.help = {
	name: "kick"
}