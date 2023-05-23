
let sirina = 800;
let visina = 600;
let a = sirina / 8;
let b = visina / 6;
let x;
let y;
let asteroids = []; //seznam asteroidov
let pulses = [];
let VX;
let VY;
let bg;
let shipIMG;
let pew;
let gameover = false;
let prevGameover = false;
let ship = null;
let lvl = 1;
let score = 0;
let health = 0;
let maxAsteroid = 0;
let topscore = 0;

function preload() {
  bg = loadImage("../slike/spacecloud.webp");
  pew = loadSound("../zvoki/PewSoundEffect.mp3");
  shipIMG = loadImage("../slike/spaceship.png");
}

function setup() {
  createCanvas(sirina, visina);
  background("#1abc9c");
  //randomSeed(2211);

  gameStart();
  for (var l = 1; l < 20; l++) {
    var N = round((0.2 * l) ** 3 - 0.1 * (l ** 0.5) + l);
    console.log(l, N);
  }
}

function draw() {
  background(bg);
  //asteroid.premik();

  if (gameOver(health, asteroids)) {
    gameover = true;
    if (asteroids.length == 0) {
      ship.prikazi();
      ship.premik();
      ship.keepOnScreen();

      push();
      textSize(42);
      fill("#fff");
      text("LEVEL COMPLETED", sirina / 2 - 200, visina / 2);
      textSize(25);
      text("Press SPACE to continue", sirina / 2 - 135, visina / 2 + 30);
      pop();
    } else {
      ship = null; // ladja uničena
      for (let asteroid of asteroids) {
        asteroid.prikazi();
        asteroid.premik();
        asteroid.zaznajRob();
      }

      push();
      textSize(42);
      fill("#fff");
      text("GAME OVER", sirina / 2 - 100, visina / 2);
      textSize(25);
      text("Press SPACE to continue", sirina / 2 - 110, visina / 2 + 30);
      pop();
    }
  } else {
    ship.prikazi();
    ship.premik();
    ship.keepOnScreen();

    for (let asteroid of asteroids) {
      if (ship.trk(asteroid)) {
        if (health > 0) {
          health-- // health = health - 1
        }
        //console.log(health);
      }
      asteroid.prikazi();
      asteroid.premik();
      asteroid.zaznajRob();
    }

    for (var i = 0; i < pulses.length; i++) {
      pulses[i].prikazi();
      pulses[i].premik();
      if (pulses[i].offScreen()) {
        pulses.splice(i, 1);
      } else {
        for (var j = 0; j < asteroids.length; j++) {
          if (pulses[i].zadetek(asteroids[j])) {
            score += round(1 + abs(maxAsteroid - asteroids[j].velikost));  // ALT: več točk za manjši asteroid
            asteroids.splice(j, 1);
            pulses.splice(i, 1);
            break;
          }
        }
      }
    }


  }

  displayLevel(lvl);
  displayScore(score);
  displayTopScore(topscore);
  updateHealth(ship, health, 100);

  if (prevGameover != gameover) {
    topscore = updateTopScore(score, topscore);
  }
  prevGameover = gameover; // catch state change
}




function deg2rad(degrees) {
  radians = degrees * (PI / 180);
  return radians
}

function mousePressed() {


}

function mouseClicked() {
  pulses.push(new Pulse(ship.x, ship.y, ship.smer))
  pew.play()

}


function keyReleased() {
  if (keyCode == 68) {
    ship.premikX = 0;
  } else if (keyCode == 65) {
    ship.premikX = 0;
  }

  if (keyCode == 87) {
    ship.premikY = 0;
  } else if (keyCode == 83) {
    ship.premikY = 0;
  }

  if (!gameover) {
    ship.nastaviRotacijo(0);
  }

}

function keyPressed() {
  //console.log(keyCode)
  if (keyCode == 32) { // SPACE
    if (gameover) {
      gameover = false;
      gameStart();
    }
  }

  // ASDW keys
  if (keyCode == 68) {
    ship.premikX = 10;
  } else if (keyCode == 65) {
    ship.premikX = -10;
  }

  if (keyCode == 87) {
    ship.premikY = -10;
  } else if (keyCode == 83) {
    ship.premikY = 10;
  }

  if (key == "e") {
    ship.nastaviRotacijo(5);
  } else if (key == "q") {
    ship.nastaviRotacijo(-5);
  }

}