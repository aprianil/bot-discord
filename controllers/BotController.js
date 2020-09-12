const {ServerId,MyId,avatar} = require('../helpers/config')

class BotController{
    static getFirstRole(bot){
        console.log(bot.guilds.get(ServerId).roles.first());
    }
    static getAllRoles(bot){
        bot.guilds.get(ServerId).roles.map(role=>{
            console.log(role.id);
            console.log(role.name);
        })
    }

    static getAllMembers(bot){
        bot.guilds.get(ServerId).members.map(member=>{
            console.log(member.user.id);
            console.log(member.user.username);
            console.log(member.user.displayAvatarURL);
        })
    }

    static getMemberById(id,bot){
        return bot.guilds.get(ServerId).members.get(id)
    }
    
    static getFirstMember(bot){
        console.log(bot.guilds.get(ServerId).members.first());
    }

    static getFirstChannel(bot){
        console.log(bot.guilds.get(ServerId).channels.first());
    }
    static findMember(bot,id){
        let member = bot.guilds.get(ServerId).members.find(member=>member.id==id)
        console.log(member);
    }
    static findChannel(bot,name){
        let channel = bot.guilds.get(ServerId).channels.find(channel=>channel.name==name)
        console.log(channel.id);
        console.log(channel.name);
    }
    static getAllChannels(bot){
        bot.guilds.get(ServerId).channels.map(channel=>{
            console.log(channel.id);
            console.log(channel.name);
        })
    }

    static getGuild(bot){
        return bot.guilds.get(ServerId)
    }

    static getChannelById(id,bot){
        return bot.guilds.get(ServerId).channels.get(id)
    }

    static sendMessage(bot,msg){
        let user = bot.guilds.get(ServerId).members.get(MyId)
        user.send(msg)
    }

    static sendMessagetoChannel(bot,msg,idChannel){
        bot.guilds.get(ServerId).channels.get(idChannel).send(msg).then(msg=>{
            msg.react('🚀')
        })
    }
}

module.exports = BotController