const schedule = require('node-schedule');
const RequestAxios = require('../helpers/axios')
const ThirtyDaysMessage = require('../views/ThirtyDaysMessage')
const BotController = require('../controllers/BotController')
const MemberController = require('../controllers/MemberController')
const { BotId, IdChannelActivity, IdAnnouncement30Days, ServerId, IdChannelWelcome, IdRoleChallenger, MyId } = require('../helpers/config')
class ThirtyDaysController {
    static async giveReaction(msg) {
        await msg.react('🕕')
        await msg.react('🕘')
        await msg.react('🕛')
    }

    static is30DaysChallenge(reaction) {
        return reaction.message.id == IdAnnouncement30Days
    }
    static isReminder30Days(reaction) {
        if (reaction.message.embeds.length > 0) {
            return reaction.message.embeds[0].description.includes('you can add reaction below start from 06.00 , 09.00 , 12.00.')
        } else {
            return false
        }
    }

    static sendReminder(reaction, user, bot) {
        if (reaction.emoji.name == '🚀') {

            RequestAxios.post("thirtyDays", {
                UserId: user.id,
                description: '07.00',
                status: true
            })
                .then(() => {
                    bot.guilds.get(ServerId)
                        .channels.get(IdChannelActivity)
                        .send(ThirtyDaysMessage.challengeAccepted(user))

                    MemberController.addRole(bot, user.id, IdRoleChallenger)

                    user.send(ThirtyDaysMessage.sendHightlight())
                        .then(awaitmsg => {
                            ThirtyDaysController.giveReaction(awaitmsg)
                        })
                })
                .catch(err => {
                    console.log(err);
                })

        }

    }

    static addReaction(reaction, author, bot) {
        if (author.id != BotId) {
            RequestAxios.get('thirtyDays/' + author.id)
                .then(data => {
                    if (data.length == 0) {
                        let time
                        if (reaction.emoji.name == "🕕") {
                            time = "06.00"
                        } else if (reaction.emoji.name == "🕘") {
                            time = "09.00"
                        } else if (reaction.emoji.name == "🕛") {
                            time = "12.00"
                        } else {
                            return
                        }
                        RequestAxios.put("thirtyDays/" + author.id,{
                            description:time
                        })
                        .then(()=>{
                            author.send(ThirtyDaysMessage.replyUserSetHighlight(time))
                            this.SetReminder(time, author, bot)
                        })
                        .catch(err => {
                            console.log(err);
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })

        }
    }

    static SendHighlight(user) {
        user.send(ThirtyDaysMessage.setScheduleHighlight()).then(awaitmsg => {
            this.giveReaction(awaitmsg)
        })
    }

    static SetReminder(time, user, bot) {
        var ruleReminderDone = new schedule.RecurrenceRule();
        ruleReminderDone.hour = 21
        ruleReminderDone.minute = 30
        var reminderDone = schedule.scheduleJob(ruleReminderDone, function () {
            RequestAxios.get('todos/miss/' + user.id)
                .then(data => {
                    if (data.status == 1) {
                        user.send(ThirtyDaysMessage.reminderNotMissThisDay(user))
                    } else if (data.status == 2) {
                        user.send(ThirtyDaysMessage.reminderNotMissTwice(user));
                        schedule.scheduleJob(`59 23 * * *`, () => {
                            RequestAxios.get('todos/miss/' + user.id)
                                .then(data => {
                                    if (data.status == 2) {
                                        RequestAxios.put('thirtyDays/' + user.id, {
                                            status: false
                                        })
                                            .then(() => {
                                                let channelActivity = BotController.getChannelById(IdChannelActivity, bot)
                                                channelActivity.send(ThirtyDaysMessage.missTwice(user))
                                                MemberController.removeRole(bot, user.id, IdRoleChallenger)
                                                reminderDone.cancel()
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            })
                                    } else {
                                        user.send(ThirtyDaysMessage.stillInChallenge(user))
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                })
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        });
        var rule = new schedule.RecurrenceRule();
        rule.hour = +time.split('.')[0]
        rule.minute = +time.split('.')[1]
        var reminderHighlight = schedule.scheduleJob(rule, function () {
            RequestAxios.get('thirtyDays/' + user.id)
                .then(data => {
                    if (data.length == 0) {
                        reminderHighlight.cancel()
                    } else {
                        if (time != data[0].description) {
                            console.log("Update tanggal");
                            reminderHighlight.cancel()
                        } else {
                            user.send(ThirtyDaysMessage.reminderHighlight(bot, user))
                                .then(() => {
                                    user.send(ThirtyDaysMessage.templateHighlight(time))
                                })
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        });
    }

    static cancel30DaysChallenge(user, bot) {
        RequestAxios.put("thirtyDays/" + user.id, {
            status: false
        })
            .catch(err => {
                console.log(err);
            })
        MemberController.removeRole(bot, user.id, IdRoleChallenger)
        user.send(ThirtyDaysMessage.cancel30DaysChallenge())
    }

    static restart(bot) {
        RequestAxios.get('thirtyDays')
            .then(data=>{
                data.forEach(async user => {
                    ThirtyDaysController.SetReminder(user.description,
                        BotController.getMemberById(user.UserId,bot),
                        bot)
                });
            })
            .catch(err=>{
                console.log(err);
            })
    }
}

module.exports = ThirtyDaysController