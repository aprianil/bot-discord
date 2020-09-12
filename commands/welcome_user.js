const RequestAxios = require('../helpers/axios')
const { ServerId, IdChannelWaitlist } = require('../helpers/config')
const OnboardingMessage = require('../views/OnboardingMessage')

module.exports = {
    name: '!newuser',
    description: 'Hello!',
    execute(member, bot) {
        let user = member.user
        let closa = bot.guilds.get(ServerId)

        member.send(OnboardingMessage.Welcome(
            user.username,
            closa.members.size,
            closa.channels.get(IdChannelWaitlist)))

        let data = {
            id: user.id,
            name: user.username,
            description: "-",
            role: "-",
            talk: "-"
        }
        RequestAxios.post('users', data)
            .catch(err => {
                console.log(err.response.data)
            })

    },
};