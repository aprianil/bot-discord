const { createCanvas, loadImage, registerFont } = require('canvas')
const {avatarNoImage} = require('./config')
const todayDate = require('./time').todayDate

const generateImage = async (users,user,host) => {

    registerFont('./resource/font/Inter/InterRegular.ttf', { family: 'Inter' })
    registerFont('./resource/font/Inter/InterSemiBold.ttf', { family: 'InterSemiBold'})

    const canvas = createCanvas(1080, 1920)
    const context = canvas.getContext('2d')

    context.fillRect(0, 0, canvas.width, canvas.height)


    const image = await loadImage('./resource/img/recap.jpg');
    context.drawImage(image, 0, 0)

    let coords = await generateArray(users,user,host)
    context.fillStyle = "white";
    context.font = "50px InterSemiBold";
    context.fillText(`${users.length} People`, 108, 672);

    context.fillStyle = "white";
    context.font = "58px Inter";
    context.fillText(host?host.name:"", 264, 510);

    context.fillStyle = "white";
    context.font = "40px Inter";
    context.fillText(`${user.name}`, 214, 1425);

    context.fillStyle = "white";
    context.font = "36px Inter";
    context.fillText(todayDate(), 670, 1425);

    if (users.length<13) {
        context.fillStyle = 'black';
        context.fillRect(892, 863, 86, 86);
    }

    context.beginPath();
    for(var i = 0; i < coords.length; i++){
        let midSize = coords[i][2]/2
        context.arc(coords[i][0]+midSize, coords[i][1]+midSize,midSize,0,Math.PI * 2, true);
        context.closePath();
    }
    
    context.clip();
    for (let i = 0; i < coords.length; i++) {
        context.drawImage(coords[i][3],coords[i][0],coords[i][1],coords[i][2],coords[i][2])
    }
    const buffer = canvas.toBuffer()
    return buffer
}

async function generateArray(users,user,host) {
    let initWidth = 106
    let initHeight = 732
    let size = 86
    let diff = 131
    let photoUser = await loadImage(user.avatar);
    let photoHost = await loadImage(host?host.avatar:avatarNoImage);
    let arr = [[106, 424, 128,photoHost],[106, 1367,84,photoUser],[initWidth,initHeight,size,photoUser]]
    
    let i =0
    let members = await Promise.all(
        users.map(async data=>{
            if (i<13&&data.UserId!=user.UserId) {
                i++
                let index = i
                let photoMember = await loadImage(data.avatar);
                if (index<7) {
                    arr.push([initWidth+(diff*index),initHeight,size,photoMember])
                }else{
                    arr.push([initWidth+(diff*(index-7)),initHeight+diff,size,photoMember])
                }
            }
        })
    )
    return arr
}

module.exports = generateImage