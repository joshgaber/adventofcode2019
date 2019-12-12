module.exports = class {

    velocity = {
        x: 0,
        y: 0,
        z: 0
    };

    constructor(x, y, z) {
        this.position = {
            x: x,
            y: y,
            z: z
        };
    }

    applyGravity(planets) {
        planets.forEach(this.applyGravitySingular.bind(this));
        return this;
    }

    applyGravitySingular(planet) {
        if (this === planet) return;

        const gravity = {
            x: this.position.x - planet.position.x,
            y: this.position.y - planet.position.y,
            z: this.position.z - planet.position.z
        };
        for (const i in gravity) {
            if (gravity[i] < 0) {
                this.velocity[i]++;
            } else if (gravity[i] > 0) {
                this.velocity[i]--;
            }
        }
    }

    applyVelocity() {
        for (const i in this.position) {
            this.position[i] += this.velocity[i];
        }
    }

    get totalEnergy() {
        return (Math.abs(this.position.x) + Math.abs(this.position.y) + Math.abs(this.position.z))
            * (Math.abs(this.velocity.x) + Math.abs(this.velocity.y) + Math.abs(this.velocity.z));
    }
};