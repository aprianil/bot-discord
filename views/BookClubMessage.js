const Discord = require('discord.js');
class TemplateMessage{

    //-----------------------    Book Club    -----------------------// 
    static bookClubInvitation(timer, openHours){
        let statusOpen = timer<=0?`Opening Now\n.`:`${timer} left\n.`

        return new Discord.RichEmbed()
        .setColor('#fefefe')
        .setTitle("📚 Book Club Invitation Tonight, Let’s go!")
        .setDescription('Book Club is a place where you share and discuss the recent book that you or others just read. So you can gain valuable insights from the community.\n.')
        .addField('Open Hours',openHours,true)
        .addBlankField(true)
        .addField('Time Before Open',statusOpen,true)
        .addField('RSVP','Add 👀 reaction',true)
        .addBlankField(true)
        .addField('RSVP HOST','Add 🎙 reaction',true)
    }

    static guestBookClub(){
        return new Discord.RichEmbed()
        .setColor('#fefefe')
        .setDescription(`The table and seat reserved for you at the **:books:  Book Club** 
I'll remind you when the book club has opened.`)
    }

    static hostBookClub(name){
        return new Discord.RichEmbed()
        .setColor('#fefefe')
        .setDescription(`Hi ${name}! You reserved a seat for being a host on our book club session this night. 
Here is some guidelines that we recommend you to do as a host
\`\`\`
1. Introduce Yourself when you enter the room and say Hi to everyone.
2. List the book that you are going to discuss.
3. Put timebox for 6 Minutes for each book that you want to discuss (max 9 books)
4. Recap and close your session 5 minutes before the times up
\`\`\``)
    }
    static noHost(user){
        return TemplateMessage.embedMessage(`Hi ${user}! Due to no body book as a host. You are the host for tonight book club session that we pick the host from the RSVP list.
Here is some guidelines that we recommend you to do as a host
\`\`\`
1. Introduce Yourself when you enter the room and say Hi to everyone.
2. List the book that you are going to discuss.
3. Put timebox for 6 Minutes for each book that you want to discuss (max 9 books)
4. Recap and close your session 5 minutes before the times up
\`\`\``)
    }

    static alreadyExistHost(user,hostUser){
        return TemplateMessage.embedMessage(`Hi ${user.username}, ${hostUser} already reserved as a host. The host can not be more than 1 people.`)
    }

    static cancelReservation(){
        return TemplateMessage.embedMessage('You just canceled the reservation')
    }

    static bookClubStarted(){
        return new Discord.RichEmbed()
        .setColor('#fefefe')
        .setDescription(`The **:books:  Book Club** door has opened. 
Let's have a book talk!

**60 Minutes** before closing.`)
    }

    static embedMessage(text){
        return new Discord.RichEmbed()
        .setColor('#fefefe')
        .setDescription(text)
    }

    static bookClubWillBeEnded(){
        return TemplateMessage.embedMessage(`The Book club Session will be ended in 5 minutes. 

How do you feel about the session? 😃
Add your favorite reaction below!`)
    }

    static reminderBookClub(){
        return TemplateMessage.embedMessage(`📚 Book Club session will start in 10 minutes. Let's wait at the ☕ Closa Cafe before the door opened.`)
    }

    static bookClubHasOpened(){
        return TemplateMessage.embedMessage(`The **📚 Book Club** door has opened. 
Let's have a book talk!

**60 Minutes** before closing.`)
    }

    static timerBookClub(sesiBookClub){
        return TemplateMessage.embedMessage(`The **📚 Book Club** door has opened. 
Let's have a book talk!

**${sesiBookClub} ${sesiBookClub==1?'Minute':"Minutes"}** before closing.`)
    }
    static timerBookClubEnded(){
        return TemplateMessage.embedMessage(`The **📚 Book Club** door closed`)
    }
    static featuredBook(){
        return `The Book club Session will be ended in 5 minutes. 
You can start closing the session and write 1 Book that you find interesting on our book club session tonight in this message room.
\`\`\`
Featured Book - ______ by ______
\`\`\`
Delete the \`\`____\`\` and replace with Book Title and Author of the book`
    }

    static bookClubEnded(){
        return new Discord.RichEmbed()
        .setColor('#fefefe')
        .setTitle("📚 Book Club: Thanks for Participating!")
        .setDescription(`See you on the next book club session on Sunday at 20.00 WIB

I will remind you for the next book club session 🔔`)
    }

    static recapBookClub(name){
        return `Hi ${name}, here is the book club recap today. 
\`\`\`What you've learned from our Book Club session today?\`\`\`
You can download the image below and spread what you've learned from the session.

feel free to tag us at @beclosa on Instagram/Twitter
Thank you!`
    }

}

module.exports=TemplateMessage