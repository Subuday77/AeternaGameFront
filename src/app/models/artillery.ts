import { Unit } from './unit';

export class Artillery extends Unit {
    public name: string;

    constructor(id: string, side: string, currentCounty: string) {
        super(id, side, currentCounty, 1, 15);
        this.name = "Artillery";
    }


}
