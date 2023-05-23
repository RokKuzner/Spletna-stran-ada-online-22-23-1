// pulse - START
function Pulse(shipX, shipY, shipAngle) {
    this.pos = createVector(shipX, shipY);
    this.v = p5.Vector.fromAngle(shipAngle - deg2rad(90));
    this.v.normalize();
    this.v.mult(10);

    this.prikazi = function() {
        push();
        stroke(255);
        strokeWeight(4);
        point(this.pos.x, this.pos.y);
        pop();
    }

    this.premik = function() {
        this.pos.add(this.v);
    }

    this.zadetek = function(ovira) {
        //console.log(ovira)
        var d = dist(ovira.x, ovira.y, this.pos.x, this.pos.y)

        if (d < ovira.velikost) {
            return true;
        } else {
            return false;
        }
    }

    this.offScreen = function() {
        if (this.pos.x > sirina || this.pos.y < 0) {
            return true;
        } else if (this.pos.y > visina || this.pos.y < 0) {
            return true;
        } else {
            return false;
        }
    }
}
// pulse - STOP