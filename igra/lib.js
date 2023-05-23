// functions - START
function deg2rad(degrees) {
    radians = degrees * (PI / 180);
    return radians
}

function boost(ship, force) {
    var v = createVector(ship.premikX, ship.premikY); // vektor hitrosti
    var F = p5.Vector.fromAngle(ship.smer - deg2rad(90)); // vektor sile
    F.mult(force); // skaliranje sile
    v.add(F); // pospešek ladje

    return v
}
// functions - STOP
function Asteroid() { // class
    this.velikost = random(5, 40);
    this.x = random(this.velikost, sirina - this.velikost);    // to so lastnosti oz. atributi
    this.y = -this.velikost;
    this.vx = random(-1, 1); // velocity -10, 10
    this.vy = random(1, 3);
    this.odmik = [];
    for (var i = 0; i < 6; i++) {
        this.odmik[i] = this.velikost + random(-this.velikost / 2, this.velikost / 2);
    }

    //console.log("Nov asteroid:", String(this.x), String(this.y));

    this.prikazi = function() { // to je metoda oz. funkcija od Asteroida
        push()
        stroke(255)
        fill("#c0c0c0")
        translate(this.x, this.y)
        beginShape()
        for (var i = 0; i < 6; i++) {
            var kot = map(i, 0, 6, 0, 2 * PI);
            var r = this.odmik[i]
            var x = r * cos(kot);
            var y = r * sin(kot);
            vertex(x, y);
        }
        endShape(CLOSE);

        //ellipse(0, 0, this.velikost, this.velikost);
        pop()
    }

    this.premik = function() {
        this.x = this.x + this.vx; // premik X
        this.y = this.y + this.vy; // premik Y
    }

    this.zaznajRob = function() {
        if (this.x > sirina + this.velikost) {
            this.x = -this.velikost;
        } else if (this.x < 0 - this.velikost) {
            this.x = sirina + this.velikost;
        }

        if (this.y > visina + this.velikost) {
            this.y = -this.velikost;
        } else if (this.y < 0 - this.velikost) {
            this.y = visina + this.velikost;
        }
    }

}

function Ship() {
    /* 
    - pospeÅ¡ek a (acceleration)
    - hitrost v (velocity)
    - pozicija pos (position) -> DONE
    */
    this.r = 15; // velikost ladje
    this.x = sirina / 2;
    this.y = visina - 3 * this.r;
    this.smer = deg2rad(0); // vnesemo kot v stopinja (degrees)
    this.premikX = 0
    this.premikY = 0
    this.rotacija = 0

    this.prikazi = function() {
        /*
        push();
        translate(this.x, this.y);
        rotate(this.smer);
        fill("#74219d");
        stroke("#ffffff");
        strokeWeight(1);
        triangle(-this.r, this.r,
            this.r, this.r,
            0, -this.r);
        pop();
        */
        push();
        translate(this.x, this.y);
        rotate(this.smer);
        image(shipIMG, -25,-25);
        pop();
    }

    this.nastaviRotacijo = function(kot) {
        this.rotacija = deg2rad(kot);


    }

    this.premik = function() {
        this.x = this.x + this.premikX
        this.y = this.y + this.premikY
        this.smer = this.smer + this.rotacija

    }

    this.keepOnScreen = function() {
        if (this.x > sirina - this.r) {
            this.premikX = 0
            this.x = sirina - this.r
        } else if (this.x < this.r) {
            this.premikX = 0
            this.x = this.r
        }

        if (this.y > visina - this.r) {
            this.premikY = 0
            this.y = visina - this.r
        } else if (this.y < this.r) {
            this.premikY = 0
            this.y = this.r
        }
    }

    this.trk = function(ovira) {
        var d = dist(ovira.x, ovira.y, this.x, this.y)
        if (d < this.r + ovira.velikost) {
            return true;
        } else {
            return false;
        }
    }
}