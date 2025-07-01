const now = require('./utils.js');


PET_YEAR = 60000;


class Pet {
    static STATE = Object.freeze({
        ALIVE: 'alive',
        SICK: 'sick',
        DEAD: 'dead'
    });

    constructor(name, 
                age = 0, 
                health = 50, 
                hunger = 50, 
                mood = 50, 
                state = 'alive') {
        this.name = name;
        this.age = age;
        this.health = health;
        this.hunger = hunger;
        this.mood = mood;
        this.state = state;

        this.intervalId = setInterval(() => this.updatePetAttr(), PET_YEAR);
    }

    updatePetState() {
        if (this.health <= 0 || this.hunger >= 100) {
            this.state = Pet.STATE.DEAD;
        }
        else if (this.health <= 30) {
            this.state = Pet.STATE.SICK;
        }
        else {
            this.state = Pet.STATE.ALIVE;
        }
    }

    updatePetAttr() {
        if (this.state == Pet.STATE.DEAD) {
            this.stopUpdates();
            return;
        }

        this.age++;
        if (this.hunger > 70) {
            this.health = Math.max(0, this.health - 5);
        } 
        else {
            this.health = Math.max(0, this.health - 2);
        }
        this.hunger = Math.min(100, this.hunger + 3);
        this.mood = Math.round((this.health + (100 - this.hunger)) / 2);
        this.updatePetState();
        
        console.log(`${now()} ${JSON.stringify(this)}`);
    }

     stopUpdates() {
        clearInterval(this.intervalId);
    }

    toJSON() {
        return {
            name: this.name,
            age: this.age,
            health: this.health,
            hunger: this.hunger,
            mood: this.mood,
            state: this.state
        };
    }
}


module.exports = Pet;