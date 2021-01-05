export class MoveResult {
    public isDoneOnMap: boolean;
    public numberOfUnits: number;
    public unitType: string;
    public ounboundCounty: string;
    public inboundCounty: string;

    constructor (numberOfUnits: number, unitType: string,  ounboundCounty: string, inboundCounty: string) {
        this.isDoneOnMap = false;
        this.numberOfUnits = numberOfUnits;
        this.unitType = unitType;
        this.ounboundCounty = ounboundCounty;
        this.inboundCounty = inboundCounty;
    }
}
