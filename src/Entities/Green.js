import Entity, {Sides, Trait} from '../Entity';
import Jump from '../Traits/Jump';
import Go from '../Traits/Go';
import PendulumWalk from '../Traits/PendulumWalk';
import Killable from '../Traits/Killable';

class Behavior extends Trait{
    constructor() {
        super('behavior');
    }

    collides(us, them) {
        if (us.killable.dead) {
              return;
          }

        if (them.stomper) {
            us.pendulumWalk.speed = 0;
            them.stomper.bounce();
        }
    }
}

export function createGreenFactory(sprites) {

    return function createGreen(x, y, reverse, pictures, deadPic) {
        const green = new Entity('green');

        green.size.set(26, 74);
        //size was 76 => we are cutting 36 and move offset +36
        green.pos.set(x, y);
        green.vel.set(0, -600);
        green.offset.y = 0;

        green.pictures = reverse ? Array.from(pictures).reverse() : pictures;
        green.picture = null;
        green.deadPic = deadPic;

        green.addTrait(new PendulumWalk());
        green.addTrait(new Behavior());
        green.addTrait(new Killable());

        sprites.entities.add(green);
    };
}