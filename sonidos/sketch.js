

let butom;
let cajon;
let pyramide;
let moved = false;
let img
let vol
let synth

function preload(){
  img = loadImage("../img/ban.png")
  
}

function setup() {
  vol = new Tone.Volume(-24).toDestination();
  synth =  new Tone.PolySynth().connect(vol);

  var canvas = createCanvas(1900, 800);
  canvas.parent("canvasdiv");
  butom = [];
cajon = []
pyramide =[]
for (let i = 0; i < 1; i++) {
  cajon.push (new ball(100+i*300,100+i*200))
}
for (let i = 0; i < 1; i++) {
  butom.push (new box(100+i*100,100+i*200))
}
for (let i = 0; i < 1; i++) {
  pyramide.push (new triang(100+i*200,i+100))
}

}
function sonidoSi(nota, tempo) {
  synth.triggerAttackRelease(nota, tempo);
}


function draw() {
  background(img);
butom.forEach(e=>{
  e.display()
  e.movex()
})
cajon.forEach(e => {
  e.display()
  e.movex()
});
pyramide.forEach(e => {
  e.display()
e.movex()
});

}

class box {
  constructor(x,y) {
    this.r = random(0,256)
    this.g = random(0,256)
    this.b = random(0,256)
    this.x = x;
    this.y = y;
    this.diameter = 100;
    this.sound = 0;
    this.direc=0;

  }

  display() {
    rectMode(CENTER)
    fill(this.r, this.g, this.b, 90);
    noStroke();
    rect(this.x, this.y, this.diameter);
  }

  movex(){

    switch (this.direc) {
      case 0:
        this.x+=10
        if(this.x>= width){
          this.direc=1
          sonidoSi("F2", "8n")
        }
        break;
        case 1:
          this.x-=50
          if(this.x<=width-width){
            this.direc=0
            sonidoSi("D3", "8n")
         
          }
          break;
    
      default:
        break;
    }
  }
   drag() {
    if (dist(mouseX, mouseY, this.x, this.y) <= this.diameter / 2) {
     this.direc = 3;
     this.movex()
      this.x = mouseX
      this.y = mouseY
moved = true;
    }
  }

}
class ball {
  constructor(x,y) {
    this.r = random(0,256)
    this.g = random(0,256)
    this.b = random(0,256)
    this.x = x;
    this.y = y;
    this.diameter = 100;
    this.sound = 0;
    this.direc=0;

  }

  display() {
    rectMode(CENTER)
    noStroke();
    fill(this.r, this.g, this.b, 90);
    circle(this.x, this.y, this.diameter);
  }

  movex(){

    switch (this.direc) {
      case 0:
        this.y+=10
        if(this.y>=height){
          this.direc=1
          sonidoSi("E5", "8n")
        }
        break;
        case 1:
          this.y-=10
          if(this.y<=height-height){
            this.direc=0
            sonidoSi("B4", "8n")
         
          }
          break;
    
      default:
        break;
    }
  }
   drag() {
    if (dist(mouseX, mouseY, this.x, this.y) <= this.diameter / 2) {
     this.direc = 3;
     this.movex()
      this.x = mouseX
      this.y = mouseY
moved = true;
    }
  }

}


class triang {
  constructor(x,y) {
    this.r = random(0,256)
    this.g = random(0,256)
    this.b = random(0,256)
    this.x = x;
    this.y = y;
    this.diameter = 50;
    this.sound = 0;
    this.direc=0;

  }

  display() {
    rectMode(CENTER)
    fill(this.r, this.g, this.b, 90);
    noStroke();
    triangle(this.x, this.y+this.diameter, this.x+this.diameter, this.y-this.diameter,this.x-this.diameter, this.y-this.diameter);
  }

  movex(){

    switch (this.direc) {
      case 0:
        this.y+=10
        this.x+=10;
        if(this.y>=height){
          this.direc=1
          sonidoSi("A2", "8n")
        }
        if(this.x>=width){
          this.direc=2
          sonidoSi("C7", "8n")
        }
        break;
        case 1:
          this.x+=10
          this.y-=10
          if(this.y<=height-height){
            this.direc=0
            sonidoSi("F3", "8n")
         
          }
          if(this.x>=width){
            this.direc=3
            sonidoSi("G6", "8n")
         
          }
          break;
          case 2:
            this.x-=10;
            this.y+=10
            if(this.y>=height){
              this.direc=3
              sonidoSi("D1", "8n")
            }
            if(this.x<=width-width){
              this.direc=0
              sonidoSi("C9", "8n")
            }
            break;
            case 3:
              this.x-=10
              this.y-=10
              if(this.y<=height-height){
                this.direc=2
                sonidoSi("E3", "8n")
              }
              if(this.x<=width-width){
                this.direc=1
                sonidoSi("F7", "8n")
              }
              break;        
    
      default:
        break;
    }
  }
   drag() {
    if (dist(mouseX, mouseY, this.x, this.y) <= this.diameter * 2) {
     this.direc = 5;
     this.movex()
      this.x = mouseX
      this.y = mouseY
moved = true;
    }
  }

}




function mouseDragged() {
  butom.forEach(e=>{
    e.drag()
  })
  cajon.forEach(e => {
    e.drag()
  });
  pyramide.forEach(e => {
    e.drag()
  });
}

function mouseReleased() {
  if (moved){
    butom.forEach(e =>{
      e.direc = 0;
      e.movex();
    })

cajon.forEach(e =>{
  e.direc = 0;
  e.movex();
});
pyramide.forEach(e =>{
  e.direc = 0;
  e.movex();
});
  }
moved = false;
}
function doubleClicked() {

const hander = Math.floor(random(0,3))
console.log(hander)
newF(hander)
}

function newF(number) {
  switch (number) {
    case 0:
      cajon.push (new ball(random(0, width),random(0,height)))
      break;
      case 1:
        butom.push (new box(random(0, width),random(0,height)))
        break;
        case 2:
          pyramide.push (new triang(random(0, width),random(0,height)))
          break;
  
    default:
      break;
  }
}