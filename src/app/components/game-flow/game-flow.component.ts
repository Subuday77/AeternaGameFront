import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { stringify } from 'querystring';
import { County } from 'src/app/models/county';
import { GlobalMap } from 'src/app/models/global-map';
import { Unit } from 'src/app/models/unit';
import { BackUpAndDataTransferService } from 'src/app/services/back-up-and-data-transfer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-game-flow',
  templateUrl: './game-flow.component.html',
  styleUrls: ['./game-flow.component.css']
})
export class GameFlowComponent implements OnInit {
  currentPlayer: string;
  globalMap: GlobalMap = {} as GlobalMap;
  countyId;
  targetCounty: County = {} as County;
  neighbors = [];
  constructor(private dataTransfer: BackUpAndDataTransferService, private router: Router) { }

  ngOnInit(): void {
    if (this.dataTransfer.fildState === undefined) {
      this.router.navigate(['']);
    }
    this.globalMap = this.dataTransfer.fildState;
    this.currentPlayer = this.dataTransfer.firstMove;
    //console.log(this.globalMap)
    //this.setTargetOwner(this.targetCounty);
    //console.log(this.targetCounty);

  }
  setTarget() {
    this.globalMap.counties.forEach(county => {
      if (this.countyId === county.id) {
        //this.targetCounty = new County(county.id)
        this.targetCounty = county;
      }
    });
    //console.log(this.targetCounty)
    this.prepareNeighbors()
  }

  // getCountyInfo(countyName, requestType): any {
  //   let county
  //   this.globalMap.counties.forEach(countyFromList => {
  //     if (countyFromList.id === countyName) {
  //       county = countyFromList;
  //       // console.log(county)
  //       // console.log(county.army)
  //     }
  //   });
  //   switch (requestType) {
  //     case "owner":
  //       return county.owner;

  //     case "castle":
  //       return county.isCastle;

  //     case "units":
  //       // console.log(county.army)
  //       return county.army;

  //     default:
  //       break;
  //   }
  // }

  prepareNeighbors() {
    this.neighbors = [];
    this.targetCounty.neighbors.forEach(neighborCountyId => {
      this.globalMap.counties.forEach(county => {

        var counter = 0;
        if (neighborCountyId === county.id) {
          if (county.owner === this.currentPlayer) {
            county.army.forEach(unit => {
              if (unit.name != "None") {
                counter++;
              }
            });
            if (counter > 0) {
              this.neighbors.push(county);
            }
          }
        }
      });
    });
    this.neighbors.forEach(county => {
      county.army.sort((a, b) => a.name.localeCompare(b.name) || b.hp - a.hp || b.numberOfSteps - a.numberOfSteps);
    });
  }
  makeMove() {

    // console.log(this.neighbors[0])
    // console.log(this.checkUseSupport());
    // console.log(this.checkForSpace());
    if (this.checkUseSupport() && this.checkForSpace()) {
      if (this.targetCounty.owner === this.currentPlayer || this.targetCounty.owner === "Neutral") {
        this.moveArmyExtract();
      } else {
        this.attackEnemyExtract();
      }
    }
    console.log(this.globalMap.counties[0])
    console.log(this.dataTransfer.fildState.counties[0])


  }

  checkUseSupport(): boolean {
    let res = true;
    this.neighbors.forEach(county => {
      county.army.forEach((unit, index) => {
        if (unit.isSupport && (!unit.isInUse)) {
          this.errorUseSupport(index, county.id);
          res = false;
        }
      });
    });
    return res;
  }
  checkForSpace(): boolean {
    let res = true;
    var freeSpace = 12;
    var unitsToMove = 0;
    this.targetCounty.army.forEach(unit => {
      if (unit.name != "None") {
        freeSpace--;
      }
    });
    this.neighbors.forEach(county => {
      county.army.forEach(unit => {
        if (unit.isInUse && (!unit.isSupport)) {
          unitsToMove++;
        }
      });
    });
    if (freeSpace - unitsToMove < 0) {
      res = false;
      this.errorOutOfSpace(unitsToMove - freeSpace)
    }
    return res;
  }
  checkIfEmpty(county): boolean {
    let res = true;
    county.army.forEach(unit => {
      if (unit.name != "None") {
        res = false;
      }
    });
    console.log(res);
    return res;
  }
  checkInfantryArtillery(): boolean {
    var infantryCount = 0;
    var infantryInSupportCount = 0
    var artilleryCount = 0;
    var artilleryInSupportCount = 0;
    this.neighbors.forEach(county => {
      county.army.forEach(unit => {
        if (unit.name === "Infantry" && unit.isInUse) {
          infantryCount++;
          if (unit.isSupport) {
            infantryInSupportCount++;
          }
        }
        if (unit.name === "Artillery" && unit.isInUse) {
          artilleryCount++;
          if (unit.isSupport) {
            artilleryInSupportCount++;
          }
        }
      });
    });
    if (infantryCount - artilleryCount >= 0 && (artilleryInSupportCount - infantryInSupportCount >= 0 || artilleryCount===0)) {

      return true;
    } else if (infantryCount - artilleryCount < 0) {
      this.errorInfantryArtilleryQuantity(artilleryCount - infantryCount);
      return false;
    } else if (artilleryInSupportCount - infantryInSupportCount < 0) {
      this.errorInfantryArtilleryInSupport(infantryInSupportCount - artilleryInSupportCount)
      return false;
    }
  }
  errorUseSupport(index: number, countyId: string) {
    var pos = index + 1;
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">Unit ` + pos + ` in ` + countyId + ` county is marked as "Support" without "Use". Please, check.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });
  }
  errorOutOfSpace(num: number) {
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">Not enough space in the target county. Remove ` + num + ` units from attack or use them as support.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });
  }

  errorInfantryArtilleryQuantity(num: number) {
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">You are trying to use in attack more artillery than infantry. Remove ` + num + ` artillery unit(s) from attack or use more infantry.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });
  }
  errorInfantryArtilleryInSupport(num: number) {
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">You are trying to use in support more infantry than artillery. Move ` + num + ` artillery unit(s) to support or use more infantry in attack.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });
  }

  moveArmyExtract() {
    let unitsToMove = [];
    this.neighbors.forEach(county => {
      county.army.forEach((unit) => {
        if (unit.isInUse && (!unit.isSupport)) {
          unitsToMove.push(unit);
        }
      });
      county.army = county.army.filter(function (unit) {
        return (!unit.isInUse) || unit.isSupport;
      });
      county.army.forEach(unit => {
        if (unit.isInUse || unit.isSupport) {
          unit.isInUse = unit.isSupport = false;
        }
      });
      for (var i = county.army.length; i < 12; i++) {
        county.army.push(new Unit("None", "None", "None", 0, 0));
      }
      if (this.checkIfEmpty(county)) {
        county.owner = "Neutral";
      }
    });
    unitsToMove.forEach(unit => {
      unit.currentCounty = this.targetCounty.id;
      unit.isInUse = false;
      unit.numberOfSteps--;
    });

    console.log(this.neighbors)
    this.moveArmyInsert(unitsToMove);
  }

  moveArmyInsert(unitsToMove) {
    if (this.targetCounty.owner === "Neutral") {
      this.targetCounty.owner = this.currentPlayer;
    }
    var counter = unitsToMove.length;
    var index = 11;
    while (counter > 0) {
      if (this.targetCounty.army[index].name === "None") {
        this.targetCounty.army.splice(index, 1);
        counter--;
      }
      index--;
    }
    unitsToMove.forEach(unit => {
      this.targetCounty.army.push(unit);
    });
    this.targetCounty.army.sort((a, b) => a.name.localeCompare(b.name) || b.hp - a.hp);
  }
  attackEnemyExtract() {
    let unitsToMove = [];
    if (this.checkInfantryArtillery()) {
      this.neighbors.forEach(county => {
        county.army.forEach((unit) => {
          if (unit.isInUse && (!unit.isSupport)) {
            unitsToMove.push(unit);
          }
        });
      });
      this.attack();
    }
  }
  attack() {
    let win = true;
   console.log(this.countAttackerStrengh());
  }
  countAttackerStrengh():number {
    let attackerStrength = 0;
    this.neighbors.forEach(county => {
      county.army.forEach(unit => {
        if (unit.isInUse && (!unit.isSupport)) {
          attackerStrength = attackerStrength + unit.damage;
        }
        else if (unit.isInUse && unit.isSupport) {
          attackerStrength = attackerStrength + unit.damage*0.5;
        }
      });
    });
    return attackerStrength;
  }

  selectUse(unit) {
    if (!unit.isSupport) {
      unit.isInUse = true;
    }
  }

  // moveUnit(): Unit {
  //   //let res = new Unit("None", "None", "None", 0, 0);

  // }

  // test() {
  //   console.log(this.targetCounty.owner);
  //   console.log(this.targetCounty.isCastle);
  // }
}
