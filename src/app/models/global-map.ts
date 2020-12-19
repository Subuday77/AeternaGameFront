import { County } from './county';

const COUNTY_NAMES = ["V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11",
            "V12", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "B1", "B2", "B3", "B4", "B5",
            "B6", "B7", "B8", "B9", "B10", "B11", "B12", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "O1",
            "O2", "O3", "O4", "O5", "O6", "O7", "O8", "O9", "O10"];

export class GlobalMap {
    public counties: County[] = [];

    
mapSetup() {
    COUNTY_NAMES.forEach(id => {
        var county = new County(id);
        this.counties.push(county);
    });
}

}
