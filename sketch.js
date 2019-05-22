var width;
var height;

function aiguille(per,rayon,r,g,b,dim)
{
	this.r=rayon;
	this.periode=per;
	this.omega=2*PI/per;
	this.col=[r,g,b];
	this.taille=dim;
	this.show=function()
	{
	stroke(this.col[0],this.col[1],this.col[2]);
	strokeWeight(this.taille);
	//fill(230);
	line(0,0,this.r*cos(this.omega),this.r*sin(this.omega));
	}
	this.move=function(a)
	{
		this.omega=this.omega+a;
	}
	this.ajout=function(a)
	{
		this.omega=this.omega+a;//PI/per;
	}
}

function montre()
{
	this.s=second();
	this.m=minute();
	this.h=hour();

	this.show=function(x,y,t)
	{
		var h,m,s;
		if (this.s<10){
			s="0"+this.s;
		}else{
			s=""+this.s;
		}
		if (this.m<10){
			m="0"+this.m;
		}else{
			m=""+this.m;
		}
		if (this.h<10){
			h="0"+this.h;
		}else{
			h=""+this.h;
		}

		fill(230);
		textSize(t);
		text(""+h+" : "+m+" : "+s,x,y);
	}
	this.update=function()
	{
		this.s=second();
		this.m=minute();
		this.h=hour();
	}
}

var aig_s;
var aig_m;
var aig_h;
var cadran;
var h,m,s;
var montrer;


function setup()
{
	createCanvas(800,600);
	cadran=loadImage("hh1.png");
	var dd=12*3600;
	montrer=new montre()
	aig_h = new aiguille(dd,100,255,1,9,10);
	aig_s = new aiguille(60,170,145,0,129,5);
	aig_m = new aiguille(3600,170,123,167,89,8);
	aig_h.omega=-PI/2 + hour()*PI/6+minute()*5*PI/1800;
	aig_m.omega=-PI/2+minute()*PI/30;
	aig_s.omega=-PI/2+second()*PI/30;
	s=0;m=0;h=0;
	setInterval( function(){
		aig_s.move(PI/30)
		if (s>59)
		{
			//m=m+1;
			aig_m.move(PI/30);
			aig_h.move(5*PI/1800);
			s=0;
			montrer.update();
		}
		s=s+1
	},1000);
}

function keyPressed()
{
	if (key=='h'  || key=='H') {
		fill(200);
		aig_h.ajout(5*PI/1800);
		console.log(aig_h.omega);
	}
	if (key=='m' || key=='M') {
		fill(200);
		aig_m.move(PI/30);
		console.log(aig_m.omega);
	}
	if (key=='s' || key== 'S') {
		fill(200);
		aig_s.move(PI/30);
		console.log(aig_s.omega);
	}
}


function draw()
{
	background(0);
	push();
	translate(800/2,600/2);
	fill(253);
	ellipse(0,0,aig_s.r+170,aig_s.r+170);
	scale(0.5); 
	imageMode(CENTER);
	image(cadran,0,0)
	//scale(1);
	aig_s.show();
	//aig_s.move(s);
	aig_m.show();
	//aig_m.move(m);
	aig_h.show();
	//aig_h.move(h);
	pop();
	fill(230);
	translate(0,0);
	textSize(12);
	text("h"+aig_h.omega,10,20);
	text("m"+aig_m.omega,10,60);
	text("s"+aig_s.omega,10,90);
	textSize(34);
	text("Horloge 2017",width/2-120,height/2 +220)
	montrer.update();
	montrer.show(width/2-120,100);
}
