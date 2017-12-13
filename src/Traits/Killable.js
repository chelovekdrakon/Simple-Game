import {Sides, Trait} from '../Entity.js';

export default class Killable extends Trait {
    constructor() {
        super('killable');
        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 2;
    }

    kill(){
        this.dead = true;
    }

    update(entity, deltaTime, sprites) {
        if (this.dead) {
            if (entity.name !== 'cosmo') {
                entity.pictures = entity.deadPic;
            } else {
                sprites.entities.delete(entity);
            }


            if (entity.name === 'purple') {
                entity.offset.y = -10;
            }

            this.deadTime += deltaTime;

            if (this.deadTime > this.removeAfter) {
                sprites.entities.delete(entity);
            }
        }
    }
}
