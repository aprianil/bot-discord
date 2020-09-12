const { TimeBookClupOpened, MyId, TimeBookClubEnded, IdChannelBookClub, ServerId } = require('../helpers/config')
const Time = require('../helpers/time')
const BookClubController = require('../controllers/BookClubController')
const BookClubMessage = require('../views/BookClubMessage')
module.exports = {
    name: '!bookclosa',
    description: 'Ping!',
    execute(msg, bot) {
        if (msg.author.id == MyId) {

            let tgl = new Date(Date.now())

            BookClubController.sendRecap(bot)
                .then(msg => {
                    console.log(msg);
                })
                .catch(err => {
                    console.log(err);
                })

            let time = Time.gapTime(`${tgl.getHours()}.${tgl.getMinutes()}`, `${TimeBookClupOpened}`)
            let openHours = `${TimeBookClupOpened} - ${TimeBookClubEnded.split(' ')[1]}.${TimeBookClubEnded.split(' ')[0]}`

            const channelClub = bot.guilds.get(ServerId).channels.get(IdChannelBookClub)
            channelClub.send(BookClubMessage.bookClubInvitation(Time.convertTime(time), openHours)).then(msgInvitation => {
                msgInvitation.react('👀').then(() => {
                    msgInvitation.react('🎙')
                })

                let timerBeforeOpen = setInterval(() => {
                    time -= 1
                    let textTime = Time.convertTime(time)
                    msgInvitation.edit(BookClubMessage.bookClubInvitation(textTime, openHours))
                    if (time == 10) {
                        BookClubController.reminderBeforeOpen(channelClub, bot)
                    }

                    if (time == 5) {
                        BookClubController.handleNoHost(channelClub, bot)
                            .catch(err => {
                                console.log(err);
                            })
                    }
                    if (time <= 0) {
                        msgInvitation.edit(BookClubMessage.bookClubInvitation(0, openHours))
                        let sesiBookClub = 60
                        channelClub.send(BookClubMessage.bookClubHasOpened()).then(startMessage => {
                            let timerSession = setInterval(() => {
                                sesiBookClub -= 1
                                if (sesiBookClub == 5) {
                                    channelClub.send(BookClubMessage.bookClubWillBeEnded())
                                }
                                startMessage.edit(BookMessage.timerBookClub(sesiBookClub))
                                if (sesiBookClub == 0) {
                                    startMessage.edit(BookClubMessage.timerBookClubEnded())
                                    channelClub.send(BookClubMessage.bookClubEnded())

                                    clearInterval(timerSession)
                                }
                            }, 60000);

                        })
                        clearInterval(timerBeforeOpen)
                    }
                }, 60000);
            })
        }

    },
};

