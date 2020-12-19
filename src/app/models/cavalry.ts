import { Unit } from './unit';

export class Cavalry extends Unit {
    public name: string;

    constructor(id: string, side: string, currentCounty: string) {
        super(id, side, currentCounty, 2, 10);
        this.name = "Cavalry"
    }

}
