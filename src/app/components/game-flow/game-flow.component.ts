import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { stringify } from 'querystring';
import { BackUpAndDataTransferService } from 'src/app/services/back-up-and-data-transfer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-game-flow',
  templateUrl: './game-flow.component.html',
  styleUrls: ['./game-flow.component.css']
})
export class GameFlowComponent implements OnInit {
  currentPlayer: string;
  fieldState;
  targetCounty;
  targetOwner: string;
  isCastle;
  targetUnitList = {};
  targetUnit1 = "";
  targetUnit2 = "";
  targetUnit3 = "";
  targetUnit4 = "";
  targetUnit5 = "";
  targetUnit6 = "";
  targetUnit7 = "";
  targetUnit8 = "";
  targetUnit9 = "";
  targetUnit10 = "";
  targetUnit11 = "";
  targetUnit12 = "";
  neighbors = [];
  allCountysNames = ["V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8", "V9", "V10", "V11", "V12", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "G10", "G11", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8", "R9", "O1", "O2", "O3", "O4", "O5", "O6", "O7", "O8", "O9", "O10"];
  allNeighbors = [
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

  
  constructor(private dataTransfer: BackUpAndDataTransferService, private router: Router) { }

  ngOnInit(): void {
    if (this.dataTransfer.fildState === undefined) {
      this.router.navigate(['']);
    }
    this.currentPlayer = this.dataTransfer.firstMove;
    this.fieldState = this.dataTransfer.fildState;
    //this.setTargetOwner(this.targetCounty);
    //console.log(this.targetCounty);

  }
  setTargetOwner(countyName) {

    this.targetOwner = this.getCountyInfo(countyName, "owner");
  }
  setIsCastle(countyName) {
    this.isCastle = this.getCountyInfo(countyName, "castle");
  }
  setUnitList(countyName) {
    
    this.targetUnitList =this.getCountyInfo(countyName, "units");
    this.setTargetUnits(this.targetUnitList);
  }
  setNeighbors(countyName) {
this.allNeighbors.forEach(element => {
  if (element.name===countyName){
    this.neighbors=element.neighbors;
  }
});
    console.log(this.neighbors)
  }
  getCountyInfo(countyName, requestType): any {
    let county
    this.fieldState.forEach(countyFromList => {
      if (countyFromList.name === countyName) {
        county = countyFromList;
        // console.log(county)
        // console.log(county.army)
      }
    });
    switch (requestType) {
      case "owner":
        return county.owner;
        break;
      case "castle":
        return county.isCastle;
        break;
      case "units":
        // console.log(county.army)
        return county.army;
        break;
      default:
        break;
    }
  }
  setTargetUnits(unitList){    
    this.targetUnit1 = unitList.unit1.name+"..."+unitList.unit1.hp;
    this.targetUnit2 = unitList.unit2.name+"..."+unitList.unit2.hp;
    this.targetUnit3 = unitList.unit3.name+"..."+unitList.unit3.hp;
    this.targetUnit4 = unitList.unit4.name+"..."+unitList.unit4.hp;
    this.targetUnit5 = unitList.unit5.name+"..."+unitList.unit5.hp;
    this.targetUnit6 = unitList.unit6.name+"..."+unitList.unit6.hp;
    this.targetUnit7 = unitList.unit7.name+"..."+unitList.unit7.hp;
    this.targetUnit8 = unitList.unit8.name+"..."+unitList.unit8.hp;
    this.targetUnit9 = unitList.unit9.name+"..."+unitList.unit9.hp;
    this.targetUnit10 = unitList.unit10.name+"..."+unitList.unit10.hp;
    this.targetUnit11 = unitList.unit11.name+"..."+unitList.unit11.hp;
    this.targetUnit12 = unitList.unit12.name+"..."+unitList.unit12.hp;

  }
  test() {
    console.log(this.targetCounty);
    //  console.log(this.targetCounty.isCastle);
  }
}
