
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artillery } from 'src/app/models/artillery';
import { Cavalry } from 'src/app/models/cavalry';
import { GlobalMap } from 'src/app/models/global-map';
import { Infantry } from 'src/app/models/infantry';
import { Unit } from 'src/app/models/unit';
import { BackUpAndDataTransferService } from 'src/app/services/back-up-and-data-transfer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-map-setup',
  templateUrl: './map-setup.component.html',
  styleUrls: ['./map-setup.component.css']
})
export class MapSetupComponent implements OnInit {


  globalMap = new GlobalMap();

  allUnitsList = ["I01", "I02", "I03", "I04", "I05", "I06", "I07", "I08", "I09", "I10", "I11", "I12", "I13", "I14", "I15", "I16", "I17", "I18", "I19", "I20", "I21", "I22", "I23", "I24", "I25", "I26", "I27", "I28", "I29", "I30", "I31", "I32", "I33", "I34", "I35", "I36", "I37", "I38", "I39", "I40", "I41", "I42", "I43", "I44", "I45", "I46", "I47", "I48", "I49", "I50", "I51", "I52", "I53", "I54", "C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10", "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18", "C19", "C20", "C21", "C22", "C23", "C24", "C25", "C26", "C27", "C28", "C29", "C30", "C31", "C32", "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20", "A21", "A22", "A23", "A24", "A25"]
  // allUnitsList = ["I01", "I02", "I03", "C01", "C02", "C03", "A01", "A02", "A03"]
  infantryList = [];
  cavalryList = [];
  artilleryList = [];
  previousValue = "";
  previousUnitType = "";
  firstMove: string;

  constructor(private dataTransfer: BackUpAndDataTransferService, private router: Router) { }

  ngOnInit(): void {
    this.prepareUnitsLists();
    this.globalMap.mapSetup();
    this.globalMap.counties.sort((a,b) => a.id.localeCompare(b.id));
  }
  submit() {
    if (this.firstMove === undefined) {
      Swal.fire({
        title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">Please, choose who will make a first move!</p>`,
        confirmButtonColor: '#5f9ea0',
        toast: true,
        background: '#e6e6e6',
        confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

      });

    } else {
      if (this.checkForEmptyCounties()) {
        this.dataTransfer.firstMove = this.firstMove;
        this.dataTransfer.fildState = this.globalMap;
        console.log(this.dataTransfer.fildState);
        this.router.navigate(['gameFlow'])
      }
    }
  }
  prepareUnitsLists() {
    this.allUnitsList.forEach(unit => {
      if (unit.includes("I")) {
        this.infantryList.push(unit);
      }
      else if (unit.includes("C")) {
        this.cavalryList.push(unit);
      } else {
        this.artilleryList.push(unit);
      }
    });

  }
  setUnit(county, unitIndex, unitName) {

    this.releaseId(county.army[unitIndex].id)
    switch (unitName) {
      case "Infantry":
        if (this.infantryList.length === 0) {
          this.outOfUnits(county.army[unitIndex].name)
          county.army[unitIndex] = new Unit("None", "None", "None", 0, 0);
        } else {
          county.army[unitIndex] = new Infantry(this.infantryList[0], county.owner, county.id);
          this.infantryList.splice(0, 1);

        }
        break;
      case "Cavalry":
        if (this.cavalryList.length === 0) {
          this.outOfUnits(county.army[unitIndex].name)
          county.army[unitIndex] = new Unit("None", "None", "None", 0, 0);
        } else {
          county.army[unitIndex] = new Cavalry(this.cavalryList[0], county.owner, county.id);
          this.cavalryList.splice(0, 1);

        }
        break;
      case "Artillery":
        if (this.artilleryList.length === 0) {
          this.outOfUnits(county.army[unitIndex].name)
          county.army[unitIndex] = new Unit("None", "None", "None", 0, 0);
        } else {
          county.army[unitIndex] = new Artillery(this.artilleryList[0], county.owner, county.id);
          this.artilleryList.splice(0, 1);
        }
        break;
      case "None":
        county.army[unitIndex] = new Unit("None", "None", "None", 0, 0);
        break;

      default:
        break;
    }

    console.log(county.army)
  }

  clrRow(county) {
    if (county.owner === "Neutral") {

      county.army.forEach(unit => {
        console.log(unit.id)
        this.releaseId(unit.id);

      });
      county.army.splice(0, 12);
      for (let i = 1; i <= 12; ++i) {
        county.army.push(new Unit("None", "None", "None", 0, 0));
      }

    }
    //this.defineAvaliableUnits();
    console.log(county)
  }

  releaseId(id: string) {
    var type = id.charAt(0);
    switch (type) {
      case "I":

        this.infantryList.push(id);
        this.infantryList.sort();

        break;
      case "C":

        this.cavalryList.push(id);
        this.cavalryList.sort();


        break;
      case "A":

        this.artilleryList.push(id);
        this.artilleryList.sort();
        break;
      default:
        break;
    }

  }


  outOfUnits(unitType: string) {

    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">Out of ` + unitType.toLowerCase() + ` units</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });

  }
  checkForEmptyCounties(): boolean {
    let check = true;
    this.globalMap.counties.forEach(county => {
      var counter = 0;
      if (county.owner != "Neutral") {
        county.army.forEach(unit => {
          if (unit.name != "None") {
            counter++;
          }
        });
        if (counter === 0) {
          this.emptyCountyError(county.id)
          check = false;
        }

      }
    });
    return check;
  }
  emptyCountyError(countyId) {
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">County ` + countyId + ` has owner but has no army.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });

  }


  check() {
    console.log(this.globalMap.counties[0].isCastle)
    console.log(this.globalMap.counties[0].owner)
    console.log(this.globalMap.counties[0].army[0])
    console.log(this.globalMap.counties[0].army[1])
    console.log(this.globalMap.counties[0].neighbors)
    console.log(this.globalMap.counties[1].neighbors)
    console.log(this.globalMap.counties[0])

  }

}
