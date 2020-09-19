
const {BotToken,BotId,ServerId, MyId} = require('./helpers/config')
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands');
const MemberController = require('./controllers/MemberController')
const BotController = require('./controllers/BotController')
const ThirtyDaysController = require('./controllers/ThirtyDaysController')
const BookClubController = require('./controllers/BookClubController')
const FocusGroupController = require('./controllers/FocusGroupController')

Object.keys(botCommands).map(key => {
	bot.commands.set(botCommands[key].name, botCommands[key]);
});

const TOKEN = BotToken
bot.login(TOKEN);
bot.on('raw', packet => {
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    const channel = bot.channels.get(packet.d.channel_id);
    if (channel.messages.has(packet.d.message_id)) return;
    channel.fetchMessage(packet.d.message_id).then(message => {
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        const reaction = message.reactions.get(emoji);
        if (reaction) reaction.users.set(packet.d.user_id, bot.users.get(packet.d.user_id));
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            bot.emit('messageReactionAdd', reaction, bot.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            bot.emit('messageReactionRemove', reaction, bot.users.get(packet.d.user_id));
        }
    });
});

bot.on('messageReactionRemove',async (reaction,user)=>{
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
	}
	if (BookClubController.isBookClubInvitation(reaction)) {
		BookClubController.cancelReservation(reaction,user)
	}	
	if (ThirtyDaysController.is30DaysChallenge(reaction)) {
		ThirtyDaysController.cancel30DaysChallenge(user,bot)
	}
})

bot.on('messageReactionAdd', async (reaction, user) => {

	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			return;
		}
	}
	
	if (user.id!=BotId) {
		if (ThirtyDaysController.isReminder30Days(reaction)) {
			ThirtyDaysController.addReaction(reaction,user)
		}
		if (ThirtyDaysController.is30DaysChallenge(reaction)) {
			ThirtyDaysController.sendReminder(reaction,user,bot)
		}
		
		if (BookClubController.isBookClubInvitation(reaction)) {
			BookClubController.addReactionHost(reaction,user,bot)
			BookClubController.addReactionGuest(reaction,user,bot)
			.catch(err=>{
				console.log(err);
			})
		}		
	
		bot.commands.get('!policy').execute(user, [reaction.message.id,bot]);
	
		const args = reaction.message.content.split(/[\s,-]+/);
		const command = args.shift().toLowerCase();
		if (!bot.commands.has(command)) return;
	
		try {
			bot.commands.get(command).execute([reaction, user], args);
		} catch (error) {
			console.error(error);
		}
	}
});

bot.on('voiceStateUpdate',async (oldMember,newMember)=>{
	FocusGroupController.checkFocusGroup(oldMember,newMember)
})

bot.on('ready', () => {

	console.info(`Logged in as ${bot.user.tag}!`);
	bot.guilds.get(ServerId).members.get(MyId).send("Restart server closa")

	ThirtyDaysController.restart(bot)
});

bot.on('guildMemberAdd', member => {
	bot.commands.get("!newuser").execute(member,bot);
});

bot.on('message', msg => {
	const args = msg.content.split(/[\s,-]+/);
	const command = args.shift().toLowerCase();

	if (MemberController.isNewMember(bot,msg)) {
		bot.commands.get("!onboarding").execute(msg, bot);
	}
	bot.commands.get("!spesificChannel").execute(msg, bot);

	if (!bot.commands.has(command)) return;

	try {
		bot.commands.get(command).execute(msg, bot);
	} catch (error) {
		console.error(error);
	}

});