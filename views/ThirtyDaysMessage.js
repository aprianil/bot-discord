const Discord = require('discord.js');
const {IdChannelHighlight,ServerId} = require('../helpers/config')
class TemplateMessage{
    //-----------------------    30 Days Challenge    -----------------------// 
    static embedMessage(text){
        return new Discord.RichEmbed()
        .setColor('#fefefe')
        .setDescription(text)
    }
    
    static setScheduleHighlight(){
        return TemplateMessage.embedMessage(`Super Cool! Now to make it easier for you to do the challenge, what time you want me to remind you to write your daily highlight every day?

You can Custom the reminder by copying this template below & paste in this chat room.
\`\`\`
/reminder Write Highlight at 06.00
\`\`\`
or
you can add reaction below start from 06.00 , 09.00 , 12.00.
`)
    }

    static join30DaysChallenge(){
        return TemplateMessage.embedMessage("Welcome to 30 days challenge")
    }

    static progress30DaysChallenge(data,msg){
        return TemplateMessage.embedMessage(`Day ${data[0].date.days} of 30 days challenge, Keep going ${msg.author}!`)
    }

    static replyUserSetHighlight(time){
        return TemplateMessage.embedMessage(`Okay great! I'll remind you at ${time} every day`)
    }

    static reminderSetAvailableSchedule(username,ChannelSchedule){
        return TemplateMessage.embedMessage(`Cool ${username}! One more step to do what matters today.
Let's schedule Focus session today.

**copy the template** below and go to ${ChannelSchedule} and write your highlight.`)
    }
    static reminderHighlight(bot,user){
        let channelHighlight = bot.guilds.get(ServerId).channels.get(IdChannelHighlight)
        return TemplateMessage.embedMessage(`Hi ${user} let's start your day by writing the ${channelHighlight} today.

        **copy the template** below and go to ${channelHighlight} and write your highlight.`)
    }
    static templateHighlight(time){
        return TemplateMessage.embedMessage(`\`\`\`_____ at ${time} \`\`\``)
    }

    static cancel30DaysChallenge(){
        return TemplateMessage.embedMessage('You just canceled the 30 days challenge')
    }
    
    static reminderNotMissThisDay(user){
        return TemplateMessage.embedMessage(`Seems you didn't update anything today 🙁, we hope you don't miss twice on your 30 days challenge or you might have to start over.

if you want to make time for your challenge, you still have time before the day ended.
All the best for you ${user}`)
    }
    static reminderNotMissTwice(user){
        return TemplateMessage.embedMessage(`Hi ${user} what's happening? is everything okay? 
Seems we don't see any updates from you in the last 2 days. 

if you need friends to do focus session you can schedule and tag Apri on your schedule.
We hope you can make the time today so you didn't miss twice.`)
    }

    static missTwice(user){
        return TemplateMessage.embedMessage(`Hi ${user}, we're sorry to inform you that you lost the 30 days challenge because you miss 2 days in a row.

Thanks for participating. We hope ** you can try again ** and make the best of your time to participate on the 30 days ** #🎮challenge**.`)
    }

    static stillInChallenge(user){
        return TemplateMessage.embedMessage(`Cool ${user}! **you stay on track in 30 days challenge**. Keep it up!
Aren't we all a deadliner? last minute challenge also seems great 😂haha`)
    }

    static announcement30DaysChallenge(){
        return TemplateMessage.embedMessage(`\`\`\`🗓 30 DAYS CHALLENGE\`\`\`
Participate in **30 DAYS CHALLENGE** as your commitment to *do what matters every day*.

\`\`\`🎮 HOW\`\`\`
• Add Reaction to The message below to participate in 30 Days Challenge

• Write down one project that you want to accomplish this year and break it down as a milestone in the next 30 days challenge.

• Update your progress every day by writing your daily #highlight and progress at #done channel.

• At the end of the challenge write key learnings or story of your 30 days challenge project anywhere that later we will feature on our page.

\`\`\`📋 RULES\`\`\`
• Never Miss Twice
• Every Progress at #done channel must include something to share or Key learnings not just a list of log about what you have done.
• It's not about achieving the project goals or not, it's about the consistency doing what matters most to you in the next 30 days.
• If you lose the challenge you can always start over by redo the reaction and add it back on the message below.

\`\`\`🎁 REWARDS\`\`\`
\`\`\`
• Closa Custom Profile http://closa.me/username 🌟 
• 30 days challenge profile badge 🎖
• Eligible to apply as Community Organizer.
• Eligible to apply as 💻 Developer / 🍉 Content Contributor.
• Featured as Our Active Early Member List at Closa Member List Page.
\`\`\``)
    }

    static sendHightlight(){
        return TemplateMessage.embedMessage(`Super Cool! Now to make it easier for you to do the challenge, what time you want me to remind you to write your daily highlight every day?

You can Custom the reminder by copying this template below & paste in this chat room.
\`\`\`
/reminder Write Highlight at 06.00
\`\`\`
or
you can add reaction below start from 06.00 , 09.00 , 12.00.
`)
    }

    static accomplished30DaysChallenge(user){
        return TemplateMessage.embedMessage(`Congratulations! ${user} 
You just successfully complete the 30 Days Challenge!

In honor of your consistency in the past 30 days we are glad to grant you the rewards:

\`\`\`🎁 REWARDS\`\`\`
\`\`\`
• Closa Custom Profile http://closa.me/username 🌟 
• 30 days challenge profile badge 🎖
• Eligible to apply as Community Organizer.
• Eligible to apply as 💻Developer/🍉Content Contributor.
• Featured as Our Active "Early Member" at Closa Member List Page.
\`\`\``)
    }

    static challengeAccepted(user){
        return new Discord.RichEmbed()
        .setColor('#fefefe')
        .setAuthor('CHALLENGE ACCEPTED!','https://media4.giphy.com/media/h6yEGXakmRx8KX6HMK/giphy.gif')
        .setDescription(`30 days challenge by ${user}`)
    }
}

module.exports=TemplateMessage