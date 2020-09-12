const ThirtyDayController = require('../controllers/ThirtyDaysController')
const RequestAxios = require('../helpers/axios')
const ThirtyDaysMessage = require('../views/ThirtyDaysMessage')
module.exports = {
    name: '/reminder',
    description: 'Hello!',
    execute(msg,bot) {
        let args = msg.content.split(/[\s,-]+/).splice(1)
        let time = args[args.length-1]
        RequestAxios.get('thirtyDays/'+msg.author.id)
            .then(data=>{
                if (data.length==0) {
                    RequestAxios.post("thirtyDays", {
                        UserId: msg.author.id,
                        description: time,
                        status: true
                        })
                        .then(() => {
                            msg.author.send(ThirtyDaysMessage.replyUserSetHighlight(time))
                            ThirtyDayController.SetReminder(time, msg.author,bot)
                        })
                        .catch(err => {
                            console.log(err);
                        })
                }else{
                    RequestAxios.put("thirtyDays/" + msg.author.id,{
                        description:time
                    })
                    .then(()=>{
                        msg.author.send(ThirtyDaysMessage.replyUserSetHighlight(time))
                        ThirtyDayController.SetReminder(time, msg.author,bot)
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            })
            .catch(err=>{
                console.log(err);
            })

    },
  };
