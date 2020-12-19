import { Unit } from './unit';

const allNeighbors = [
    {name:"V1", neighbors: ["V2", "V3"]},
    {name:"V2", neighbors: ["V1", "V3", "V8", "V9"]},
    {name:"V3", neighbors: ["V1", "V2", "V4", "V7", "V8"]},
    {name:"V4", neighbors: ["V3", "V5", "V6", "V7"]},
    {name:"V5", neighbors: ["V4", "V6"]},
    {name:"V6", neighbors: ["V4", "V5", "V7", "G2", "R8"]},
   {name:"V7", neighbors: ["V3", "V4", "V6", "V8", "G1", "G2", "G4"]},
   {name:"V8", neighbors: ["V2", "V3", "V7", "V9", "V11"]},
   {name:"V9", neighbors: ["V2", "V8", "V10", "V11"]},
   {name:"V10", neighbors: ["V9", "V11", "V12"]},
   {name:"V11", neighbors: ["V8", "V9", "V10", "V12", "G4", "G5"]},
   {name:"V12", neighbors: ["V10", "V11", "G5"]},
   {name:"G1", neighbors: ["V7", "G2", "G3", "G4"]},
   {name:"G2", neighbors: ["V6", "G1", "G3", "R9"]},
   {name:"G3", neighbors: ["G1", "G2", "G4", "G7", "G8"]},
   {name:"G4", neighbors: ["V7", "V11", "G1", "G3", "G5", "G6", "G7"]},
   {name:"G5", neighbors: ["V11", "V12", "G4", "G6", "G11"]},
   {name:"G6", neighbors: ["G4", "G5", "G7", "G9", "G11"]},
   {name:"G7", neighbors: ["G3", "G4", "G6", "G8", "G9"]},
   {name:"G8", neighbors: ["G3", "G7", "G9", "R2", "R3", "R9", "O8"]},
   {name:"G9", neighbors: ["G6", "G7", "G8", "G10", "G11", "O6"]},
   {name:"G10", neighbors: ["G9", "G11", "B4", "B5", "O1"]},
   {name:"G11", neighbors: ["G5", "G6", "G9", "G10", "B1", "B4"]},
   {name:"B1", neighbors: ["G11", "B2", "B3", "B4"]},
   {name:"B2", neighbors: ["B1", "B3", "B7"]},
   {name:"B3", neighbors: ["B1", "B2", "B4", "B5", "B6", "B7"]},
   {name:"B4", neighbors: ["G10", "G11", "B1", "B3", "B5"]},
   {name:"B5", neighbors: ["G10", "B3", "B4", "B6", "B9", "B10", "O2"]},
   {name:"B6", neighbors: ["B3", "B5", "B7", "B8", "B9"]},
   {name:"B7", neighbors: ["B2", "B3", "B6", "B8"]},
   {name:"B8", neighbors: ["B6", "B7", "B9"]},
   {name:"B9", neighbors: ["B5", "B6", "B8", "B10", "B11"]},
   {name:"B10", neighbors: ["B5", "B9", "B11", "B12", "O3"]},
   {name:"B11", neighbors: ["B9", "B10", "B12"]},
   {name:"B12", neighbors: ["B10", "B11", "O3"]},
   {name:"R1", neighbors: ["R2", "R4", "O8"]},
   {name:"R2", neighbors: ["G8", "R1", "R3", "R4", "O8"]},
   {name:"R3", neighbors: ["G8", "R2", "R4", "R6", "R7", "R9"]},
   {name:"R4", neighbors: ["R1", "R2", "R3", "R5"]},
   {name:"R5", neighbors: ["R4", "R6"]},
   {name:"R6", neighbors: ["R3", "R5", "R7"]},
   {name:"R7", neighbors: ["R3", "R6", "R8", "R9"]},
   {name:"R8", neighbors: ["V6", "R7"]},
   {name:"R9", neighbors: ["G2", "G8", "R3", "R7"]},
   {name:"O1", neighbors: ["G10", "O2", "O6"]},
   {name:"O2", neighbors: ["B5", "O1", "O3", "O5"]},
   {name:"O3", neighbors: ["B10", "B12", "O2", "O5", "O4"]},
   {name:"O4", neighbors: ["O3", "O5", "O10"]},
   {name:"O5", neighbors: ["O2", "O4", "O6", "O7", "O10"]},
   {name:"O6", neighbors: ["G9", "O1", "O5", "O7", "O8"]},
   {name:"O7", neighbors: ["O5", "O6", "O8", "O9", "O10"]},
   {name:"O8", neighbors: ["G8", "R1", "R2", "O6", "O7", "O9"]},
   {name:"O9", neighbors: ["O7", "O8", "O10"]},
   {name:"O10", neighbors: ["O4", "O5", "O7", "O9"]}
    ]

export class County {
    public id: string;
    public owner = "Neutral"
    public isCastle = false;
    public army: Unit[] = [];
    public neighbors: string[] = [];

    constructor(id: string) {
        this.id = id;
        this.createArmy();
        this.addNeighbors();
    }
    addNeighbors () {
        allNeighbors.forEach(element => {
            if (element.name===this.id)  {
                this.neighbors=element.neighbors;
            }
        });
    }
    createArmy() {

        for (let i = 1; i <= 12; ++i) {
            var unit = new Unit("None", "None", "None", 1, 10);
            this.army.push(unit);
        }
    }
}
