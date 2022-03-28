var taustakuva;
var hahmokuva;
var hahmolista = [];
var hahmoajastin;
var mailan_leveys = 150;
var elamat;
var jalleenmyyjat;

function setup() { //SETUP
	var canvas = createCanvas(windowWidth, windowWidth / 3);
	canvas.parent("canvas");
	angleMode(DEGREES)
	//UwU
}
function windowResized(){
	resizeCanvas(windowWidth, windowWidth / 3);
	image(taustakuva, 0, 0, windowWidth,windowWidth /3);
}
function preload() {
	taustakuva = loadImage("images/space_merc.png");
	hahmokuva = loadImage("images/tnt_barrel.png");
}

function draw() {
	var pelin_korkeus = windowWidth / 3;
	image(taustakuva, 0, 0, windowWidth, pelin_korkeus); 
	hahmolista.forEach(function(luo_hahmoja, monesko) {
		luo_hahmoja.liikuta(pelin_korkeus);
		if(luo_hahmoja.hahmo_Y > pelin_korkeus) {
			hahmolista.splice(monesko, 1);
			elamat = elamat - 1;
		}
		if (luo_hahmoja.hahmo_X > windowWidth) {
			hahmolista.splice(monesko, 1);
			pisteet = pisteet + 1;
		}
		textSize(20);
		fill("black")
		text("lives:" + elamat + " | " + "points: " + pisteet, 10, 30);
		if (elamat == 0) {
			gameOver(pelin_korkeus);
		}
	})
	maila(pelin_korkeus);
}


function luo_hahmoja() {
	var uusi_hahmo = random(1000, 5000);
	hahmo_olio = new Hahmo;
	hahmolista.unshift(hahmo_olio);
	hahmoajastin = setTimeout(luo_hahmoja, uusi_hahmo);
}


class Hahmo {
	constructor() {
		this.hahmo_X = 0;
		this.hahmo_Y = 150;
		this.hahmon_korkeus = 100;
		this.hahmon_leveys = 80;
		this.hahmon_nopeusX = random(1, 4);
		this.hahmon_nopeusY = random(-1, -4);
		this.kulma = 0;
	}

	liikuta(pelin_korkeus) {
		this.hahmo_X = this.hahmo_X + this.hahmon_nopeusX;
		this.hahmon_nopeusY = this.hahmon_nopeusY + 0.05;
		this.hahmo_Y =  this.hahmo_Y + this.hahmon_nopeusY;
		this.kulma = this.kulma + -3;

		if (this.hahmo_Y + this.hahmon_korkeus / 2 > pelin_korkeus - 40) {
			if (this.hahmo_X > mouseX && this.hahmo_X < mouseX + mailan_leveys) {
				this.hahmon_nopeusY = -abs(this.hahmon_nopeusY)
			}
		}

		push();
		translate(this.hahmo_X, this.hahmo_Y);
		rotate(this.kulma);
		imageMode(CENTER);
		image(hahmokuva, 0, 0, this.hahmon_leveys, this.hahmon_korkeus);
		pop();
	}
}

function maila(pelin_korkeus) {
	fill("blue")
	rect(mouseX, pelin_korkeus - 40, mailan_leveys, 25, 20, 100, 100, 100);
}


function aloitaPeli() {
	hahmolista = [];
	clearTimeout(hahmoajastin);
	loop();
	luo_hahmoja();
	elamat = 7;
	pisteet = 0;
}

//pelin päättyminen
function gameOver(pelin_korkeus) {
	push();
	textSize(100);
	textAlign(CENTER);
	fill("blue");
	text("YOU LOSE XD",windowWidth / 2, pelin_korkeus / 2);
	pop();
	noLoop();
}

function pysaytaPeli() {
	noLoop();
}



function salainen() {
	pisteet = 9000
	elamat = 9000
}
function LUL() {
	elamat = 0
	pisteet = -10000
}