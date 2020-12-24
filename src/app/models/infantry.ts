import { Unit } from './unit'

export class Infantry extends Unit {
    public name: string;

    constructor(id: string, side: string, currentCounty: string) {
        super(id, side, currentCounty, 1, 10);
        this.name = "Infantry"
        this.hp = 100;
    }

}
