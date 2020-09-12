const Discord = require('discord.js');
class TemplateMessage{

    //-----------------------    Daily Streak    -----------------------// 

    static dailyStreak(streak,user,longestStreak){
        let url 
        let color = '#fefefe'
        if (longestStreak>=365) {
            color = '#ffcc00'
            url = 'https://cdn.discordapp.com/attachments/746601801150758962/746682286530887780/708780647157858324.gif'
        }else if (longestStreak>=100) {
            color = '#5856ff'
            url = 'https://media3.giphy.com/media/AEHWYyOBSmYRDl7kDc/giphy.gif'
        }else if (longestStreak>=30) {
            color = '#FF3B30'
            url = 'https://emojis.slackmojis.com/emojis/images/1564765165/6075/hot_fire.gif?1564765165'
        }else if (longestStreak>=7) {
            color = '#FF3B30'
            url = 'https://media1.giphy.com/media/lp8JndnFvTMndTWYWs/giphy.gif'
        }
        
        if (longestStreak>=7) {
            return new Discord.RichEmbed()
            .setColor(color)
            .setAuthor(`${streak}x day streak!`,url)
            .setDescription(`${user}`)
            .setFooter(user.username, user.displayAvatarURL)
        }else{
            return new Discord.RichEmbed()
            .setColor(color)
            .setAuthor(`🔥 ${streak}x day streak!`)
            .setDescription(`${user}`)
            .setFooter(`${user.username}`, user.displayAvatarURL)
        }
    }

    static notify7DaysStreak(user){
        return TemplateMessage.embedMessage(`Congratulations ${user} in honor of your consistency to do what matters every day.  you just got 🔥7x day streak badge! 

Now your fire have animation 👀every time you keep the streak.
You can check the badge on your profile.`)
    }

    static notifyDailyStreak(user,total){
        return TemplateMessage.embedMessage(`Congratulations ${user} in honor of your consistency to do what matters every day.  you just got 🔥**${total}x day streak** badge! 

You can check the new badge on your profile.`)
    }
    static embedMessage(text){
        return new Discord.RichEmbed()
        .setColor('#fefefe')
        .setDescription(text)
    }
}

module.exports=TemplateMessage