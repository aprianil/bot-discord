const { IdChannelWelcome,ServerId,IdChannelWeeklyGoals,IdChannelSchedule,IdChannelGuidelines,IdRoleMember,IdRoleNewMember } = require('../helpers/config')
const MemberController = require('../controllers/MemberController')
const OnboardingMessage = require('../views/OnboardingMessage')
module.exports = {
    name: '!onboarding',
    description: 'Ping!',
    execute(msg, bot) {
        if (msg.channel.id == IdChannelWelcome) {
            let ChannelWeeklyGoals = bot.guilds.get(ServerId).channels.get(IdChannelWeeklyGoals)
            let template = OnboardingMessage.OnBoardingWeeklyGoals(ChannelWeeklyGoals)

            msg.author.send(template)
        } else if (msg.channel.id == IdChannelWeeklyGoals) {
            let ChannelSchedule = bot.guilds.get(ServerId).channels.get(IdChannelSchedule)
            let template = OnboardingMessage.OnBoardingSchedule(msg.author.username, ChannelSchedule)

            msg.author.send(template)
        } else if (msg.channel.id == IdChannelSchedule) {
            let ChannelGuidelines = bot.guilds.get(ServerId).channels.get(IdChannelGuidelines)
            let template = OnboardingMessage.FinishOnBoarding(ChannelGuidelines)

            msg.author.send(template)

            MemberController.changeRole(
                bot,
                msg.author.id,
                IdRoleNewMember,
                IdRoleMember)
        }
    },
};
