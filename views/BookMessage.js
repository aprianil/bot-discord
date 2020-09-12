const Discord = require('discord.js');
class TemplateMessage{

    static Timer(time){
        let msg = `Your focus session just started, Let's get things done!🚀
:stopwatch: Time-left ${time} Min (live update)
.`
        return msg
    }
    
    static SessionEnd(time){
        let msg = `Your ${time} min session has ended`
        return msg
    }

    static ReminderBook(username,date){
        let msg = `🗓️Reminder: Session with ${username} at ${date}

\`\`\`💡Tips : You can wait for your partner at the voice channel 10 mins before the 1 on 1 focus session begin.\`\`\`
.`
        return msg
    }
    static MyReminderBook(date){
        let msg = `🗓️Reminder: Your session will start at ${date}

\`\`\`💡Tips : You can wait for your partner at the voice channel 10 mins before the 1 on 1 focus session begin.\`\`\`
.`
        return msg
    }

    static setTodoList(username){
        let msg = `Hi ${username} **write your to do list down in this chat room** using the template below:
\`\`\`
**:clipboard: To-do List **

[  ] Todo 1
[  ] Todo 2
[  ] Todo n
\`\`\`**Copy > Edit > Paste in this chat room**
.`
        return msg
    }
    
    static BookSchedule(username,date){
        let msg = `\:calendar_spiral: you booked ${username}'s schedule ${date}
        
\:bell: I will remind you 10 min before the session begin
.`
        return msg
    }
    static BookedSchedule(username,date){
        let msg = `\:calendar_spiral: ${username} booked your schedule ${date}
        
\:bell: I will remind you 10 min before the session begin 
.`
        return msg
    }
    static setAvailableTime(){
        let msg = `Now you are set 🚀
I will remind you when somebody book your schedule.
.`
        return msg
    }
    static TimerEnd(){
        let msg = `Your focus session just started, Let's get things done!🚀
\:octagonal_sign: Ended
.`
        return msg
    }
    static AnotherEnd(){
        let msg = `Your focus session has ended, Thanks for the work! :raised_hands:
Here is what you possibly done:
\`\`\`
:white_check_mark: Todo 1
:white_check_mark: Todo 2
\`\`\`**Copy the text above** and 
**Post to** #:white_check_mark: done channel
.`
        return msg
    }
    static embedMessage(text){
        return new Discord.RichEmbed()
        .setColor('#fefefe')
        .setDescription(text)
    }
}

module.exports = TemplateMessage