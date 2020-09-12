const RequestAxios = require('../helpers/axios')
const MemberController = require('../controllers/MemberController')
const BotController = require('../controllers/BotController')
const DailyStreakController = require('../controllers/DailyStreakController')
const DailyStreakMessage = require('../views/DailyStreakMessage')
const ThirtyDaysMessage = require('../views/ThirtyDaysMessage')
const Time = require('../helpers/time')

const { IdChannelHighlight, IdRole30DaysChallenge, IdChannelSchedule, IdChannelDone, IdChannelActivity, ServerId } = require('../helpers/config')

module.exports = {
    name: '!spesificChannel',
    description: 'Ping!',
    execute(msg, bot) {

        if (msg.channel.id == IdChannelHighlight) {
            const args = msg.content.split(/[\s,-]+/);

            let hours = Time.formatTime(+args[args.length - 1].split('.')[0])
            let toHours = Time.formatTime(+args[args.length - 1].split('.')[0] + 1)
            let minutes = Time.formatTime(+args[args.length - 1].split('.')[1])

            let ChannelSchedule = BotController.getChannelById(IdChannelSchedule, bot)
            msg.author.send(ThirtyDaysMessage.reminderSetAvailableSchedule(msg.author.username, ChannelSchedule))
                .then(() => {
                    if (hours) {
                        msg.author.send(`\`\`\`!available at ${hours}.${minutes} - ${toHours}.${minutes}, Today at focus-room-1\`\`\``)
                    } else {
                        msg.author.send(`\`\`\`!available at 07.00 - 08.00, Today at focus-room-1\`\`\``)
                    }
                })

        }

        if (IdChannelDone == msg.channel.id) {

            let done = []
            msg.content.split('\n').forEach(el => {
                if (el != '') {
                    if (el.includes(`✅`) || el.includes(':white_check_mark:')) {
                        done.push(el)
                    }
                }
            });
            let description = done.join(',')
            let ChannelActivity = bot.guilds.get(ServerId).channels.get(IdChannelActivity)
            RequestAxios.post('todos', {
                description: description,
                UserId: msg.author.id
            })
                .then(() => {
                    return RequestAxios.get(`todos/${msg.author.id}`)
                })
                .then((data) => {
                    if (data.length != 1) {
                        throw new Error("Tidak perlu kirim daily streak ke channel")
                    } else {
                        return Promise.all(
                            [
                                RequestAxios.get(`todos/dailyStreak/${msg.author.id}`),
                                RequestAxios.get(`todos/longestStreak/${msg.author.id}`),
                                RequestAxios.get('thirtyDays/progress/' + msg.author.id)
                            ])
                    }
                })
                .then(values => {
                    let dailyStreak = values[0][0].length
                    let longestStreak = values[1][0].length

                    DailyStreakController.achieveDailyStreak(bot, dailyStreak, msg.author)
                    ChannelActivity.send(DailyStreakMessage.dailyStreak(dailyStreak, msg.author, longestStreak))

                    let thirtyDays = values[2]
                    if (thirtyDays.length > 0) {
                        if (thirtyDays[0].date.days == 30) {
                            ChannelActivity.send(ThirtyDaysMessage.accomplished30DaysChallenge(msg.author))
                            MemberController.addRole(bot, msg.author.id, IdRole30DaysChallenge)
                        } else {
                            ChannelActivity.send(ThirtyDaysMessage.progress30DaysChallenge(thirtyDays, msg))
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
};
