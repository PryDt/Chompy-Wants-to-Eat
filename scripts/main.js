var cnv = document.getElementById('cnv')
var ctx = cnv.getContext('2d')

var started = false

var WIDTH = 800, HEIGHT = 600, mouseX = 0, mouseY = 0, clicked = false, gameover = false
var bot = new Image()
bot.src = './bot.png'

var apple = new Image(), soda = new Image()
apple.src = './apple.png'
soda.src = './soda.png'

var px = WIDTH / 2, py = HEIGHT - 280

var hp = 100, ents = {img: apple, w: 100, h: 100, y: 0, x: Math.random() * WIDTH}


document.body.onmousemove = function(e) {
	mouseX = e.clientX
	mouseY = e.clientY
	console.log('x:' + px + ', y:' + py + ", ex:" + ents.x + ", ey:" + ents.y)
}

document.body.onmousedown = function() {
	clicked = true
}

cnv.onmouseup = function() {
	clicked = false
}

var blink = 0

function loop() {
	
	ctx.clearRect(0, 0, WIDTH, HEIGHT)
	
	if(!started) {
		// title screen
		ctx.fillStyle = '#5495ff'
		ctx.fillRect(0, 0, 800, 600)
		ctx.font = '48px sans-serif'
		ctx.fillStyle = '#000'
		ctx.fillText('Chompy Wants to Eat', 145, 275)
		
		// start button
		ctx.font = '30px sans-serif'
		ctx.fillText('Click to Start!', 280, 375)
		
		if(clicked)
		{
			started = true
		}

	} else if(!gameover){
		
		drawBackground()
		drawHP()
		drawCharacter()
		drawE(ents)
		detect()
		
		if(hp <= 0) {
			gameover = true
		}
	} else {
		ctx.fillStyle = '#5495ff'
		ctx.fillRect(0, 0, 800, 600)
		ctx.font = '48px sans-serif'
		ctx.fillStyle = '#000'
		ctx.fillText('Game Over! Try Again!', 145, 275)
	}

	requestAnimationFrame(loop)
}

function drawHP() {
	ctx.fillStyle = '#f00'
	ctx.fillRect(80, HEIGHT - 45, ((WIDTH - 200) * (hp / 100)), 30)
	ctx.fillStyle = '#000'
	ctx.fillText('HP:', 20, HEIGHT - 20)
}

function drawBackground() {
	ctx.fillStyle = '#48f221'
	ctx.fillRect(0, HEIGHT - 100, WIDTH, 100)
	ctx.fillStyle = '#59ffff'
	ctx.fillRect(0, 0, WIDTH, HEIGHT - 100)
}

function drawCharacter() {
	ctx.drawImage(bot, px, py)

	px = mouseX - 50
}

var t = 0
function update(h) {
	if(h) {
		if(ents.img === soda)
			hp -= 10
		else if(ents.img === apple && hp != 100)
			hp += 10
	}
	var en = {}
	if(Math.random() > .5)
	{
		en.img = apple
		en.w = 100
		en.h = 100
	}
	else
	{
		en.img = soda
		en.w = 40
		en.h = 80
	}
	
	en.x = Math.random() * WIDTH
	en.y = 0
	
	ents = en
}

function drawE(ent) {
	ctx.drawImage(ent.img, ent.x, ent.y, ent.w, ent.h)
	ent.y += 5
}

function detect() {
	if(ents.y > HEIGHT)
	{
		if(ents.img === apple)
			hp -= 10
		update(false)
	} 
	if(ents.x > px - 50 && ents.x < px + 50 && ents.y > py - 50)
	{
		//console.log('under')
		update(true)
	}

}

// starts game loop
requestAnimationFrame(loop)