const {ServerId,IdRoleNewMember} = require("../helpers/config")

class MemberController{
    static isNewMember(bot,msg){
        return bot.guilds.get(ServerId).roles.get(IdRoleNewMember).members.get(msg.author.id)
    }

    static changeRole(bot,userId,oldRoleId,newRoleId) {
        let oldRole = bot.guilds.get(ServerId).roles.get(oldRoleId)
        bot.guilds.get(ServerId).members.get(userId).removeRole(oldRole)
        let newRole = bot.guilds.get(ServerId).roles.get(newRoleId)
        bot.guilds.get(ServerId).members.get(userId).addRole(newRole)
    }

    static addRole(bot,userId,roleId) {
        let role = bot.guilds.get(ServerId).roles.get(roleId)
        bot.guilds.get(ServerId).members.get(userId).addRole(role)
    }

    static removeRole(bot,userId,roleId) {
        let role = bot.guilds.get(ServerId).roles.get(roleId)
        bot.guilds.get(ServerId).members.get(userId).removeRole(role)
    }
}

module.exports = MemberController