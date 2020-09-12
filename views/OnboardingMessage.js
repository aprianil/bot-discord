const Discord = require('discord.js');
class TemplateMessage{
//-----------------------    Onboarding    -----------------------// 
    static WelcomeNewMember(IdChannelWelcome){
        return `.
\:arrow_down: 


The next step, please **introduce yourself in ${IdChannelWelcome}** so the community will know better about you 👍

you can **[USE THE TEXT BELOW AS A TEMPLATE]** and edit in between \`**....**\` parts, to introduce yourself to the community.
\`\`\`Hello @everyone! my name is **John Doe**
Three words to describe me **Curious**, **Empathetic, Adventurous**

I am **Designer, Product Manager.**
Things I'm fascinated to talk about **Startup, Product Management, User Experience Design, Leadership, 1 on 1 Experience, Books, and life**

Something that Impressed me lately 
**Apple WWDC the Brand Mac OS**

I hope I can contribute something to the community!
Thank you.\`\`\`

**Go to** ▶️ ${IdChannelWelcome}`
    }
    
    static Welcome(username,totalMember,channel){
        let msg = `Hi ${username} ! you are the #${totalMember} member now, Have a great time here in Closa
        
Closa is a community where you get more done every day :white_check_mark:
Our goal is to make you 1% better every day :chart_with_upwards_trend:

You will be a part of early members and we just get started! :rocket:
before joining as an official member we would like to onboard you to better understand our community.

:calendar_spiral: You can pick this schedule below:
• Friday at 19.30 add reaction :thumbsup:  to book this schedule
• Saturday at 19.30 add reaction :100:  to book this schedule

**Go to :arrow_forward: ${channel}
.`
        return msg
    }
    
    static OnBoardingWeeklyGoals(IdChannelWeeklyGoals){
        let msg = `.
\:arrow_down: 


\`"And, when you want something, all the universe conspires in helping you to achieve it."\` 
inspired by this quote from *The Alchemist, Novel by Paulo Coelho*

The next step is to **set you weekly commitment about your most ambitious goal.** we called it ${IdChannelWeeklyGoals}

**USE THIS TEMPLATE**
\`\`\`
Hello @everyone! This week I want to **....** So, that I **....**
\`\`\`

Delete the \`....\` and fill with your own goal.

**Go to** ▶️ ${IdChannelWeeklyGoals}`
        
        return msg
    }
    
    static OnBoardingSchedule(username,IdChannelSchedule){
        let msg = `.
\:arrow_down: 


Okay, Cool **${username}**! 

Now we need to set a specific time to work on your weekly goal everyday!
Let's **schedule our first 1 on 1 session** based on your preferred time.

**Copy one of this template** to schedule your focus session.
\`\`\`
!available at 6.30 - 7.30, Today at Focus-Room-1
!available at 6.30 - 7.30, 20 July 2020 at Focus-Room-2
\`\`\`
The *default will always be 60 min a day.*

**Go to** ▶️ ${IdChannelSchedule}`
        
        return msg
    }
    
    static FinishOnBoarding(IdChannelGuidelines){
        let msg = `.
\:arrow_down:


Now you are set 🚀
You just need to **wait for somebody to book your schedule.** I'll let you know later when somebody booked your schedule, no need to worry 😉

While waiting you can also read our ${IdChannelGuidelines} to better understand about the community.`
        
        return msg
    }
    static embedMessage(text){
        return new Discord.RichEmbed()
        .setColor('#fefefe')
        .setDescription(text)
    }
}

module.exports=TemplateMessage