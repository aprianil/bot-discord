const { createCanvas, loadImage, registerFont } = require('canvas')
const fs = require('fs')

const generateImage = async () => {

    registerFont('./resource/font/Inter/InterRegular.ttf', { family: 'Inter' })
    registerFont('./resource/font/Inter/InterSemiBold.ttf', { family: 'InterSemiBold'})

    const canvas = createCanvas(1080, 1920)
    const context = canvas.getContext('2d')

    context.fillRect(0, 0, canvas.width, canvas.height)
    function roundedImage(x, y, width, height, radius) {
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.quadraticCurveTo(x + width, y, x + width, y + radius);
        context.lineTo(x + width, y + height - radius);
        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        context.lineTo(x + radius, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.closePath();
      }

    const image = await loadImage('./resource/img/template_weekly_recap.jpg');
    context.drawImage(image, 0, 0)
    let x = 75
    // let coords = await generateArray(users,user,host)
    context.fillStyle = "black";
    context.font = "56px InterSemiBold";
    context.fillText(`Hi, Apri`, 75, 145);

    context.fillStyle = "black";
    context.font = "36px Inter";
    context.fillText("Learn origami studio", 219, 375);

    context.fillStyle = "black";
    context.font = "48px InterSemiBold";
    context.fillText(`D42`, 860, 350);
    
    context.fillStyle = "black";
    context.font = "48px InterSemiBold";
    context.fillText(`7x`, 121, 740);

    context.fillStyle = "black";
    context.font = "48px InterSemiBold";
    context.fillText(`24`, 443, 740);
    
    context.fillStyle = "black";
    context.font = "48px InterSemiBold";
    context.fillText(`26h`, 765, 740);
    
    
    context.fillStyle = "#40B063";
    context.font = "36px Inter";
    let contributions = `87 contributions`
    console.log(context.measureText(contributions).width)
    context.fillText(contributions, 75, 1013);
    let width = context.measureText(contributions).width - 245
    context.fillStyle = "black";
    context.font = "36px Inter";
    context.fillText(`in the last 4 weeks`, 330 + width, 1013);

    context.fillStyle = "black";
    context.font = "36px Inter";
    context.fillText(`Taufiq`, 233, 1680);
    
    context.fillStyle = "black";
    context.font = "36px Inter";
    context.fillText(`12x Focus Session`, 639, 1680);
    
    context.fillStyle = "black";
    context.font = "36px Inter";
    context.fillText(`28 Aug - 3 Sep`, 748, 1835);

    context.beginPath()
    let size = 86
    let sumbuX = 50
    let sumbuY = 50
    let arr = generateContributions()
    arr.forEach(el=>{
        roundedImage(...el)
    })
    roundedImage(881,84,124,124,45)
    roundedImage(117,1622,86,86,31)
    context.clip()

    let photoMember = await loadImage('./resource/img/avatar.png');
    let photoPartner = await loadImage('./resource/img/avatar.png');
    context.fillStyle='#30A14E'
    context.fill()
    context.drawImage(photoMember,881,84,124,124)
    context.drawImage(photoMember,117,1622,86,86)
 
    const buffer = canvas.toBuffer('image/png')
    fs.writeFileSync('./tes.png',buffer)
    return buffer
}

generateImage()


function generateContributions() {
    let arr = []
    let width = 75
    let height = 1054
    
    for (let i = 1; i < 28; i++) {
        let plusWidth = (i % 7) * 143
        let plushHeight = Math.floor(i/7) * 104
        arr.push([width+plusWidth,height+plushHeight,72,72,28])
    }
    return arr
}




module.exports = generateImage