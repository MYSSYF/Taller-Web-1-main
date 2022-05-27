let butom;
let cajon;
let synth
let phaser

function setup() {
  phaser  = new Tone.Phaser({
    frequency: 60,
    octaves: 1,
    baseFrequency: 100
  }).toDestination();
  synth =  new Tone.PolySynth().connect(phaser);

  createCanvas(1900, 800);
  butom = new box();
  cajon = []
  for (let i = 0; i < 3; i++) {
    cajon.push(new ball(100 + i * 100, 100 + i * 200))

  }

}

function sonidoSi(nota, tempo) {
  synth.triggerAttackRelease(nota, tempo);
}

function draw() {
  background(220);

  butom.display();
  butom.moveX()
  cajon.forEach(e => {
    e.display()
    e.movex()


  });

}

class box {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.diameter = 100;
    this.sound = 0;
    this.direc = 0;

  }

  display() {
    rectMode(CENTER)
    rect(this.x, this.y, this.diameter);
  }

  moveX() {

    switch (this.direc) {
      case 0:
        this.x += 100
        if (this.x >= width) {
          this.direc = 1

          sonidoSi("A3", "8n")
        }
        break;
      case 1:
        this.x -= 100
        if (this.x <= width - width) {
          this.direc = 0


          sonidoSi("C3", "8n")
        }
        break;

      default:
        break;
    }
  }


}
class ball {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.diameter = 100;
    this.sound = 0;
    this.direc = 0;

  }

  display() {
    rectMode(CENTER)
    circle(this.x, this.y, this.diameter);
  }

  movex() {

    switch (this.direc) {
      case 0:
        this.y += 10
        if (this.y >= height) {
          this.direc = 1
          sonidoSi("E5", "8n")

        }
        break;
      case 1:
        this.y -= 10
        if (this.y <= height - height) {
          this.direc = 0
          sonidoSi("B4", "8n")

        }
        break;

      default:
        break;
    }
  }
  drag() {
    if (dist(mouseX, mouseY, this.x, this.y) <= this.diameter / 2) {
      this.x = mouseX
      this.y = mouseY
    }
  }

}


function move(samba) {
  if (dist(mouseX, mouseY, samba.x, samba.y) <= samba.diameter / 2) {
    samba.x = mouseX
    samba.y = mouseY
  }
}



function mouseDragged() {
  move(butom)
  cajon.forEach(e => {
    e.drag()
  });
}

