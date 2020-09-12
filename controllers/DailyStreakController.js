const MemberController = require('./MemberController')
const DailyStreakMessage = require('../views/DailyStreakMessage')
const {IdRole7Streak,IdRole30Streak,IdRole100Streak,IdRole365Streak,ServerId,IdChannelActivity} = require('../helpers/config')

class DailyStreakController {
    static achieveDailyStreak(bot,dailyStreak,author){
        let ChannelActivity = bot.guilds.get(ServerId).channels.get(IdChannelActivity)
        switch (dailyStreak) {
            case 1:
            MemberController.removeRole(bot, author.id, IdRole7Streak)
            MemberController.removeRole(bot, author.id, IdRole30Streak)
            MemberController.removeRole(bot, author.id, IdRole100Streak)
            MemberController.removeRole(bot, author.id, IdRole365Streak)
                break;
            case 7:
                ChannelActivity.send(DailyStreakMessage.notify7DaysStreak(author))
                MemberController.addRole(bot, author.id, IdRole7Streak)
                break;
            case 30:
                ChannelActivity.send(DailyStreakMessage.notifyDailyStreak(author, 30))
                MemberController.addRole(bot, author.id, IdRole30Streak)
                MemberController.removeRole(bot, author.id, IdRole7Streak)
                break;
            case 100:
                ChannelActivity.send(DailyStreakMessage.notifyDailyStreak(author, 100))
                MemberController.addRole(bot, author.id, IdRole100Streak)
                MemberController.removeRole(bot, author.id, IdRole30Streak)
                break;
            case 365:
                ChannelActivity.send(DailyStreakMessage.notifyDailyStreak(author, 365))
                MemberController.addRole(bot, author.id, IdRole365Streak)
                MemberController.removeRole(bot, author.id, IdRole100Streak)
                break;
        }
    }
}

module.exports = DailyStreakController
