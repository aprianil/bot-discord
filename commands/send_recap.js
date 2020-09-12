const {MyId}= require('../helpers/config')
const BookController = require('../controllers/BookClubController')
module.exports = {
    name: '!sendrecap',
    description: 'Ping!',
    execute(msg, bot) {
        if (msg.author.id==MyId) {
            BookController.sendRecapManual(bot)
                .catch(err=>{
                    console.log(err);
                })
        }
    },
  };
  