export  class Unit {
    public id: string;
    public name: string;
    public hp: number;
    public numberOfSteps: number;
    public damage: number;
    public side: string;
    public currentCounty: string;
    public isInUse: boolean;
    public isSupport: boolean;

    constructor ( id: string, side: string, currentCounty: string, numberOfSteps: number, damage: number) {
       this.id = id;
       this.name = "None"
       this.side = side;
       this.currentCounty = currentCounty;
        this.hp = 0;
        this.numberOfSteps = numberOfSteps;
        this.damage = damage;
        this.isInUse = false;
        this.isSupport = false;
    }
 



}
