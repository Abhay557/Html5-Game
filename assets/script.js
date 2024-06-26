var bgAudio = new Audio(); 
bgAudio.src="assets/audio/bg.mp3", bgAudio.loop=true ,bgAudio.play();
var canvas = document.getElementsByTagName("canvas")[0]; 
var ctx = canvas.getContext("2d"); 
var game = { speed : 12  , score:0, time : 25 , status : true } 
var role = { positionY:292 , width : 48 , height: 48}; 
var coin = { positionY:0 , width : 32 , height: 32}; 
var keys = {}; 
addEventListener("keydown", function (e) {	keys[e.keyCode] = true;}, false);
addEventListener("keyup", function (e) {  delete keys[e.keyCode];}, false);

var launch = function (step) {
	if(step=="start") 
	{
		role.x = canvas.width / 2, role.y = role.positionY;
		
		window.setInterval(function(){ 
		if(game.time>0)
			game.time--;
		else
		{
			game.status=false;
			bgimg.src = "images/background2.png";
			bgAudio.pause();
		}
		},1000);
	}
	if(step=="score") 
		audio.play(), game.score+=1
		
	coin.positionY=0;
	coin.x = coin.width + (Math.random() * (canvas.width - coin.width*2)), coin.y = coin.positionY;
};

var br = false, bgimg = new Image(); 
bgimg.onload = function () {br = true;};
bgimg.src = "images/background.png";

var rr = false, roleimg = new Image(); 
roleimg.onload = function () {rr = true;};
roleimg.src = "images/role.png";

var cr = false, coinimg = new Image(); 
coinimg.onload = function () {cr = true;};
coinimg.src = "images/coin.png";

var audio = new Audio(); 
audio.src="assets/audio/coin.wav";
var loop = function () {
	if (37 in keys) 
		if(role.x>0)
			role.x -= game.speed;
	if (39 in keys)
		if(role.x<canvas.width-48)
			role.x += game.speed;
	if(
		(role.x <= (coin.x + coin.width)) && (coin.x <= (role.x + coin.width))
		&& (role.y <= (coin.positionY + coin.height)) && (coin.positionY <= (role.y + coin.height))
	)
		launch("score");
	
	if(game.status)
		coin.positionY+=game.speed/2;
	if(coin.positionY>310)
		launch();
	
	if(br)ctx.drawImage(bgimg, 0, 0); 
	if(rr)ctx.drawImage(roleimg, role.x, role.y);
	if(cr)ctx.drawImage(coinimg, coin.x, coin.positionY);
	
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "20px arial";
	ctx.fillText(game.score, 45, 32);
	
	ctx.fillStyle = "rgb(250, 250, 250)"; 
	ctx.font = "20px arial";
	ctx.fillText(game.time, 134, 32);
};

var main = function () { 
	loop(); 
	requestAnimationFrame(main); 
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame    ||
          function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();


launch("start");
main();
