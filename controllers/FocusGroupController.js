var schedule = require('node-schedule');
const {ServerId,IdChannelSchedule,IdFocusGroup} = require('../helpers/config')
const RequestAxios = require('../helpers/axios')

class FocusGroupController {
    static OpenFocusGroup(bot){
        let openMorning = new schedule.RecurrenceRule();
        openMorning.hour = 5;
        openMorning.minute = 0;
         
        schedule.scheduleJob(openMorning, function(){
            bot.guilds.get(ServerId).channels.get(IdChannelSchedule).send(`The morning focus-group session has opened \:stadium:, safe your seat!`)
            let role = bot.guilds.get(ServerId).roles.find(role=>role.name=="Member")
            bot.guilds.get(ServerId).channels.get(IdFocusGroup).overwritePermissions(
                role,
                { 'CONNECT': true },
            )
            .catch(err=>{
                console.log(err)
            });
        });
        
        let closeMorning = new schedule.RecurrenceRule();
        closeMorning.hour = 9;
        closeMorning.minute = 0;
         
        schedule.scheduleJob(closeMorning, function(){
            let role = bot.guilds.get(ServerId).roles.find(role=>role.name=="Member")
            bot.guilds.get(ServerId).channels.get(IdFocusGroup).overwritePermissions(
                role,
                { 'CONNECT': false },
            )
            .catch(err=>{
                console.log(err)
            });
        });
        let openNight = new schedule.RecurrenceRule();
        openNight.hour = 17;
        openNight.minute = 0;
         
        schedule.scheduleJob(openNight, function(){
            bot.guilds.get(ServerId).channels.get(IdChannelSchedule).send(`The evening focus-group session has opened \:stadium:, safe your seat!`)
            let role = bot.guilds.get(ServerId).roles.find(role=>role.name=="Member")
            bot.guilds.get(ServerId).channels.get(IdFocusGroup).overwritePermissions(
                role,
                { 'CONNECT': true },
            )
            .catch(err=>{
                console.log(err)
            });
        });
        let closeNight = new schedule.RecurrenceRule();
        closeNight.hour = 21;
        closeNight.minute = 0;
        schedule.scheduleJob(closeNight, function(){
            let role = bot.guilds.get(ServerId).roles.find(role=>role.name=="Member")
            bot.guilds.get(ServerId).channels.get(IdFocusGroup).overwritePermissions(
                role,
                { 'CONNECT': false },
            )
            .catch(err=>{
                console.log(err)
            });
        });
    }

    static checkFocusGroup(oldMember,newMember){
        if (oldMember.voiceChannelID == IdFocusGroup) {

            RequestAxios.get(`voice/${newMember.user.id}/active`)
                .then(data=>{
                    let dateEnter = new Date(data[0].createdAt).getTime()
                    let dateExit = new Date(Date.now()).getTime()
                    let diff = Math.floor((dateExit-dateEnter)/60000)
                    
                    let url = `voice/${data[0].id}`
                    
                    return RequestAxios.put(url, {
                        sessionTime:diff,
                        status:true
                    })
                }).catch(err=>{
                    console.log(err)
                })

            
        }else if (newMember.voiceChannelID == IdFocusGroup) {

            RequestAxios.post('voice', {
                sessionTime: null,
                status: false,
                UserId: newMember.user.id
              })
              .catch(err => {
                console.log(err.response.data)
              })
        }
    }
}

module.exports = FocusGroupController