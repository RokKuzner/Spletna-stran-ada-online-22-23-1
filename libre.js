function displayScore(score) {
    push()
    textSize(24)
    fill("#fff")
    text("Score: " + round(score), 150, 30)
    pop()
}

function displayLevel(lvl) {
    push()
    textSize(24)
    fill("#fff")
    text("Level: " + round(lvl), 10, 30)
    pop()
}

function updateTopScore(score, top) {
    if (score > top) {
        return score;
    } else {
        return top;
    }
    /*var top5o = top5;
    var top5idx = 0; //if score is within top5
    var tmp = 0;

     // find if current score is within top5
    for (var s = 0; s < top5.length; s++){
        if (score > top5[s]){
            top5idx = s;
            break;
        }     
    }

    if (top5idx != 0){
        for(var i = 0; i < top5idx; i++){
            top5o[i] = top5[i] // samo prepišem tiste, ki so večji od trenutnega score-a
        }

        top5o[top5idx] = score // zapišem trenutno vrednost
        
        /*for(var i = top5idx; i < top5.length-1; i++) {
            top5o[i+1]=top5[i] // prepis vrednosti, ki so manjše od trenutnega score-a
        }
  
    } else {
        top5o[top5idx] = score // zapišem trenutno vrednost
    }
*/
}

function displayTopScore(top) {
    push()
    textSize(20)
    fill("#fff")
    text("Top score: " + top, 630, 30)
    /*text("1. " + top5[0], 650, 60)
    text("2. " + top5[1], 650, 90)
    text("3. " + top5[2], 650, 120)
    text("4. " + top5[3], 650, 150)
    text("5. " + top5[4], 650, 180)*/
    pop()
}

function updateHealth(ship, health, maxHealth) {
    var x = 10
    var y = 50
    var size = 100
    push()
    stroke("#fff");
    strokeWeight(2);
    noFill();
    rect(x, y, size, 10)

    noStroke();
    fill("#fff");
    if (health > 0) {
        rect(x, y, map(health, 0, maxHealth, 0, size), 10)
    } else {
        rect(x, y, map(0, 0, maxHealth, 0, size), 10)
    }

    /*fill("fff");
    textSize(24)
    text("Health ", 10, y+10)*/
    
    pop()
}

function gameOver(health, asteroids) {
    if (health == 0 || asteroids.length == 0) {
        return true
    } else {
        return false
    }
}

function gameStart() {
    asteroids = [];
    var maxval = 0; // največja velikost asteroida
    ship = null;
    ship = new Ship(); // reset ship
 
    if(health <= 0) { // reset all 
        health = 100;
        score = 0;
        lvl = 1;
    } else {
        lvl++;
    }

    // new asteroids
    var N = round((0.2*lvl)**3 - 0.1*(lvl**0.5) + lvl);//lvl * 2 + 1;  // koliko asteroidov na level
    for (var i = 0; i < N; i++) {
        asteroids.push(new Asteroid());
    }
    for (let asteroid of asteroids) {
        if (asteroid.velikost > maxval) {
            maxAsteroid = asteroid.velikost;
        }
    }
}
