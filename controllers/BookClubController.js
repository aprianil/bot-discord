const RequestAxios = require('../helpers/axios')
const generateImage = require('../helpers/recap_book_club')
const schedule = require('node-schedule');
const {TimeBookClubEnded,ServerId,IdRoleBookClub,BotId} = require('../helpers/config')

const BookClubMessage = require('../views/BookClubMessage')
class BookClubController {
    static sendRecap(bot) {
        return new Promise((resolve, reject) => {
            schedule.scheduleJob(`${TimeBookClubEnded} * * *`, function () {
                console.log("Masuk");
                RequestAxios.get('bookClubs/active')
                    .then(data => {
                        let host = data.filter(val => {
                            return val.host
                        })
                        data.forEach(async el => {
                            let memberBookClub = bot.guilds.get(ServerId).roles.get(IdRoleBookClub)
                            let user = bot.guilds.get(ServerId).members.get(el.UserId)
                            user.removeRole(memberBookClub)
                            let msg = await generateImage(data, el, host[0])
                            user.send(BookClubMessage.recapBookClub(user.user.username), {
                                files: [{
                                    attachment: msg,
                                    name: 'recap.png'
                                }]
                            })
                        });
                        resolve("Berhasil Send Recap")
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
        })
    }

    static sendRecapManual(bot) {
        return new Promise((resolve, reject) => {
                RequestAxios.get('bookClubs/active')
                    .then(data => {
                        let host = data.filter(val => {
                            return val.host
                        })
                        data.forEach(async el => {
                                let memberBookClub = bot.guilds.get(ServerId).roles.get(IdRoleBookClub)
                                let user = bot.guilds.get(ServerId).members.get(el.UserId)
                                user.removeRole(memberBookClub)
                                let msg = await generateImage(data, el, host[0])
                                setTimeout(() => {
                                    user.send(BookClubMessage.recapBookClub(user.user.username), {
                                        files: [{
                                            attachment: msg,
                                            name: 'recap.png'
                                        }]
                                    })
                                }, 5000 * Math.random());
                        });
                        resolve("Berhasil Send Recap")
                    })
                    .catch(err => {
                        reject(err)
                    })

            });
    }
    
    static handleNoHost(channelClub, bot) {
        return new Promise((resolve, reject) => {
            RequestAxios.get('bookClubs/active')
                .then(data => {
                    let host = data.filter(val => {
                        return val.host
                    })

                    if (host.length == 0 && data.length != 0) {
                        host = data[Math.floor(Math.random() * data.length)]
                        channelClub.send(BookClubMessage.noHost(bot.guilds.get(ServerId).members.get(host.UserId)))
                        RequestAxios.put(`bookClubs/${host.UserId}`, { host: true })
                            .catch(err => {
                                console.log(err);
                            })
                    }
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

    static addReactionGuest(reaction, user, bot) {
        return new Promise((resolve, reject) => {
            if (user.id != BotId) {
                if (reaction.emoji.name === '👀') {
                    let memberBookClub = bot.guilds.get(ServerId).roles.get(IdRoleBookClub)
                    bot.guilds.get(ServerId).members.get(user.id).addRole(memberBookClub)
                    RequestAxios.post('bookClubs', {
                        name: user.username,
                        avatar: user.displayAvatarURL,
                        host: false,
                        UserId: user.id
                    })
                        .catch(err => {
                            reject(err)
                        })
                    user.send(BookClubMessage.guestBookClub())
                }
            }
            return true;
        })
    }

    static reminderBeforeOpen(channelClub,bot){
        channelClub.send(BookClubMessage.reminderBookClub())
        bot.guilds.get(ServerId).roles.get(IdRoleBookClub).members.map(el=>{
            el.send(BookClubMessage.reminderBookClub())
        })
    }

    static isBookClubInvitation(reaction){
        if (reaction.message.embeds[0]) {
            return reaction.message.embeds[0].title=="📚 Book Club Invitation Tonight, Let’s go!"
        }else{
            return false
        }
    }

    static cancelReservation(reaction,user){
        let url = reaction.emoji.name == "🎙" ? `bookClubs/user/${user.id}/host`: `bookClubs/user/${user.id}/guest`
        RequestAxios.delete(url)
        .catch(err=>{
            console.log(err);
        })
        user.send(BookClubMessage.cancelReservation())
    }

    static addReactionHost(reaction,user,bot){
        if (user.id != BotId) {
            if (reaction.emoji.name=="🎙"&&reaction.message.reactions.get('🎙').count==2) {
                let memberBookClub = bot.guilds.get(ServerId).roles.get(IdRoleBookClub)
                bot.guilds.get(ServerId).members.get(user.id).addRole(memberBookClub)
                user.send(BookClubMessage.hostBookClub(user.username))
                RequestAxios.post('bookClubs', {
                    name: user.username,
                    avatar: user.displayAvatarURL,
                    host:true,
                    UserId: user.id
                  })
                  .catch(err => {
                    console.log(err.response.data)
                  })
            }else if(reaction.message.reactions.get('🎙').count>2){
                let hostUser = [...reaction.message.reactions.get('🎙').users][1][1].username
                user.send(BookClubMessage.alreadyExistHost(user,hostUser))
            }
        }
    }
}

module.exports = BookClubController