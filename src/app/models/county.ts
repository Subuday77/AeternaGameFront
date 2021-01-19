import { Unit } from './unit';

const allNeighbors = [
    { name: "V01", neighbors: ["V02", "V03"] },
    { name: "V02", neighbors: ["V01", "V03", "V08", "V09"] },
    { name: "V03", neighbors: ["V01", "V02", "V04", "V07", "V08"] },
    { name: "V04", neighbors: ["V03", "V05", "V06", "V07"] },
    { name: "V05", neighbors: ["V04", "V06"] },
    { name: "V06", neighbors: ["V04", "V05", "V07", "G02", "R08"] },
    { name: "V07", neighbors: ["V03", "V04", "V06", "V08", "G01", "G02", "G04"] },
    { name: "V08", neighbors: ["V02", "V03", "V07", "V09", "V11"] },
    { name: "V09", neighbors: ["V02", "V08", "V10", "V11"] },
    { name: "V10", neighbors: ["V09", "V11", "V12"] },
    { name: "V11", neighbors: ["V08", "V09", "V10", "V12", "G04", "G05"] },
    { name: "V12", neighbors: ["V10", "V11", "G05"] },
    { name: "G01", neighbors: ["V07", "G02", "G03", "G04"] },
    { name: "G02", neighbors: ["V06", "G01", "G03", "R09"] },
    { name: "G03", neighbors: ["G01", "G02", "G04", "G07", "G08"] },
    { name: "G04", neighbors: ["V07", "V11", "G01", "G03", "G05", "G06", "G07"] },
    { name: "G05", neighbors: ["V11", "V12", "G04", "G06", "G11"] },
    { name: "G06", neighbors: ["G04", "G05", "G07", "G09", "G11"] },
    { name: "G07", neighbors: ["G03", "G04", "G06", "G08", "G09"] },
    { name: "G08", neighbors: ["G03", "G07", "G09", "R02", "R03", "R09", "O08"] },
    { name: "G09", neighbors: ["G06", "G07", "G08", "G10", "G11", "O06"] },
    { name: "G10", neighbors: ["G09", "G11", "B04", "B05", "O01"] },
    { name: "G11", neighbors: ["G05", "G06", "G09", "G10", "B01", "B04"] },
    { name: "B01", neighbors: ["G11", "B02", "B03", "B04"] },
    { name: "B02", neighbors: ["B01", "B03", "B07"] },
    { name: "B03", neighbors: ["B01", "B02", "B04", "B05", "B06", "B07"] },
    { name: "B04", neighbors: ["G10", "G11", "B01", "B03", "B05"] },
    { name: "B05", neighbors: ["G10", "B03", "B04", "B06", "B09", "B10", "O02"] },
    { name: "B06", neighbors: ["B03", "B05", "B07", "B08", "B09"] },
    { name: "B07", neighbors: ["B02", "B03", "B06", "B08"] },
    { name: "B08", neighbors: ["B06", "B07", "B09"] },
    { name: "B09", neighbors: ["B05", "B06", "B08", "B10", "B11"] },
    { name: "B10", neighbors: ["B05", "B09", "B11", "B12", "O03"] },
    { name: "B11", neighbors: ["B09", "B10", "B12"] },
    { name: "B12", neighbors: ["B10", "B11", "O03"] },
    { name: "R01", neighbors: ["R02", "R04", "O08"] },
    { name: "R02", neighbors: ["G08", "R01", "R03", "R04", "O08"] },
    { name: "R03", neighbors: ["G08", "R02", "R04", "R06", "R07", "R09"] },
    { name: "R04", neighbors: ["R01", "R02", "R03", "R05"] },
    { name: "R05", neighbors: ["R04", "R06"] },
    { name: "R06", neighbors: ["R03", "R05", "R07"] },
    { name: "R07", neighbors: ["R03", "R06", "R08", "R09"] },
    { name: "R08", neighbors: ["V06", "R07"] },
    { name: "R09", neighbors: ["G02", "G08", "R03", "R07"] },
    { name: "O01", neighbors: ["G10", "O02", "O06"] },
    { name: "O02", neighbors: ["B05", "O01", "O03", "O05"] },
    { name: "O03", neighbors: ["B10", "B12", "O02", "O05", "O04"] },
    { name: "O04", neighbors: ["O03", "O05", "O10"] },
    { name: "O05", neighbors: ["O02", "O04", "O06", "O07", "O10"] },
    { name: "O06", neighbors: ["G09", "O01", "O05", "O07", "O08"] },
    { name: "O07", neighbors: ["O05", "O06", "O08", "O09", "O10"] },
    { name: "O08", neighbors: ["G08", "R01", "R02", "O06", "O07", "O09"] },
    { name: "O09", neighbors: ["O07", "O08", "O10"] },
    { name: "O10", neighbors: ["O04", "O05", "O07", "O09"] }
]

const canonicNames = new Map([
    ["V01", "Манро"],
    ["V02", "Южная Марагона"],
    ["V03", "Легезак"],
    ["V04", "Лумель"],
    ["V05", "Фукиано"],
    ["V06", "Фиеско"],
    ["V07", "Варзов"],
    ["V08", "Старая Придда"],
    ["V09", "Гельбе"],
    ["V10", "Ноймаринен"],
    ["V11", "Васспард"],
    ["V12", "Агмари"],
    ["G01", "Борн"],
    ["G02", "Савиньяк"],
    ["G03", "Старая Эпинэ"],
    ["G04", "Гонт"],
    ["G05", "Фарнэби"],
    ["G06", "Оллария"],
    ["G07", "Барсина"],
    ["G08", "Ариго"],
    ["G09", "Пуэн"],
    ["G10", "Кракл"],
    ["G11", "Тристрам"],
    ["B01", "Ларак"],
    ["B02", "Мала"],
    ["B03", "Давенпорт"],
    ["B04", "Танп"],
    ["B05", "Надор"],
    ["B06", "Надоры"],
    ["B07", "Горик"],
    ["B08", "Старый Карлион"],
    ["B09", "Каданэр"],
    ["B10", "Рокслей"],
    ["B11", "Ренкваха"],
    ["B12", "Южный Надор"],
    ["R01", "Маллэ"],
    ["R02", "Гальтара"],
    ["R03", "Кадела"],
    ["R04", "Кадельяк"],
    ["R05", "Эр-Сабвэ"],
    ["R06", "Эр-При"],
    ["R07", "Рафиан"],
    ["R08", "Валмон"],
    ["R09", "Дорак"],
    ["O01", "Агиррэ"],
    ["O02", "Цикотера"],
    ["O03", "Вараста-север"],
    ["O04", "Вараста-центр"],
    ["O05", "Ежанка"],
    ["O06", "Салиган"],
    ["O07", "Тронко"],
    ["O08", "Регаллона"],
    ["O09", "Гунамасса"],
    ["O10", "Вараста-юг"]
]);

export class County {
    public id: string;
  //  public canonicName: string;
    public owner = "Neutral"
    public isCastle = false;
    public army: Unit[] = [];
    public neighbors: string[] = [];

    constructor(id: string) {
        this.id = id;
     //   this.canonicName = canonicNames.get(this.id);
        this.createArmy();
        this.addNeighbors();
    }
    addNeighbors() {
        allNeighbors.forEach(element => {
            if (element.name === this.id) {
                this.neighbors = element.neighbors;
            }
        });
    }
    createArmy() {
        for (let i = 1; i <= 12; ++i) {
            var unit = new Unit("None", "None", "None", 0, 0);
            this.army.push(unit);
        }
    }
}
