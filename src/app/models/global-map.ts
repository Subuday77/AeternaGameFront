import { County } from './county';

const COUNTY_NAMES = ["V01", "V02", "V03", "V04", "V05", "V06", "V07", "V08", "V09", "V10", "V11",
            "V12", "G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G10", "G11", "B01", "B02", "B03", "B04", "B05",
            "B06", "B07", "B08", "B09", "B10", "B11", "B12", "R01", "R02", "R03", "R04", "R05", "R06", "R07", "R08", "R09", "O01",
            "O02", "O03", "O04", "O05", "O06", "O07", "O08", "O09", "O10"];

export class GlobalMap {
    public counties: County[] = [];

    
mapSetup() {
    COUNTY_NAMES.forEach(id => {
        var county = new County(id);
        this.counties.push(county);
    });
}

}
