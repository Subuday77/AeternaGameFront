import { Unit } from './unit';

export class Artillery extends Unit {
    public name: string;
    

    constructor(id: string, side: string, currentCounty: string) {
        super(id, side, currentCounty, 1, 20);
        this.name = "Artillery";
        this.hp = 100;
    }


}
