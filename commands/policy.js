const OnboardingMessage = require('../views/OnboardingMessage')
const {IdMessagePolicy,IdChannelWelcome,IdRoleNewMember,ServerId} = require('../helpers/config')

module.exports = {
        name: '!policy',
        description: 'Ping!',
        execute(user, args) {
                let id = args[0]
                let bot = args[1]
                if (id == IdMessagePolicy) {
                        let ChannelWelcome = bot.guilds.get(ServerId).channels.get(IdChannelWelcome)
                        user.send(OnboardingMessage.WelcomeNewMember(ChannelWelcome))
                        let newMember = bot.guilds.get(ServerId).roles.get(IdRoleNewMember)
                        bot.guilds.get(ServerId).members.get(user.id).addRole(newMember)
                }
        }

};