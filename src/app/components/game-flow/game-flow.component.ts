import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { County } from 'src/app/models/county';
import { GlobalMap } from 'src/app/models/global-map';
import { MoveResult } from 'src/app/models/move-result';
import { Unit } from 'src/app/models/unit';
import { BackUpAndDataTransferService } from 'src/app/services/back-up-and-data-transfer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-game-flow',
  templateUrl: './game-flow.component.html',
  styleUrls: ['./game-flow.component.css']
})
export class GameFlowComponent implements OnInit {
  //isTrue: boolean;
  currentPlayer: string;
  globalMap: GlobalMap = {} as GlobalMap;
  countyId;
  targetCounty: County = {} as County;
  moveResults = [];
  attackResults = [];
  deadResults = [];
  retreatedUnits = [];
  newDeadUnits = [];
  neighbors = [];
  friendlyNeighbors = [];
  isPanic = false;
  cemetery = [];
  constructor(private dataTransfer: BackUpAndDataTransferService, private router: Router) { }

  ngOnInit(): void {
    if (this.dataTransfer.fildState === undefined) {
      this.router.navigate(['']);
    }
    this.globalMap = this.dataTransfer.fildState;
    this.currentPlayer = this.dataTransfer.firstMove;
    this.sortAllCounties();
    console.log(this.globalMap)
    if (this.isNoMoreMoves()) {
      this.errorOutOfMoves();
    }
    this.defineWinner();
    //this.setTargetOwner(this.targetCounty);
    // console.log(this.cemetery);
    // this.resurrection();
    // console.log(this.cemetery);
  }
  setTarget() {
    this.isPanic = false;
    this.globalMap.counties.forEach(county => {
      if (this.countyId === county.id) {
        //this.targetCounty = new County(county.id)
        this.targetCounty = county;
        this.sortCounty(this.targetCounty);
      }

    });
    //console.log(this.targetCounty)
    this.prepareNeighbors()
  }
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
      this.sortCounty(county);
    });
  }
  prepareFriendlyNeighbors() {
    this.friendlyNeighbors = [];
    this.targetCounty.neighbors.forEach(neighborCountyId => {
      this.globalMap.counties.forEach(county => {
        if (neighborCountyId === county.id) {
          if (county.owner != this.currentPlayer) {
            this.friendlyNeighbors.push(county);
            county.army = county.army.filter(function (unit) {
              return (unit.name != "None");
            })
          }
        }
        this.sortCounty(county);
      });
    });
    this.friendlyNeighbors.sort((a, b) => b.army.length - a.army.length);
    // console.log("this.friendlyNeighbors")
    // console.log(this.friendlyNeighbors)
  }

  makeMove() {
    this.moveResults = [];
    this.attackResults = [];
    this.deadResults = [];
    // console.log(this.neighbors[0])
    // console.log(this.checkUseSupport());
    // console.log(this.checkForSpace());
    this.isPanic = false;
    if (this.checkUseSupport() && this.checkForSpace() && this.checkEmptyAttack()) {
      if (this.targetCounty.owner === this.currentPlayer || this.targetCounty.owner === "Neutral") {
        this.moveArmyExtract();
      } else {
        this.attackEnemyExtract();
      }
      this.dataTransfer.stepNumber++;
      this.recordState();
      this.defineWinner();
    }
    // console.log(this.globalMap.counties[0])
    // console.log(this.dataTransfer.fildState.counties[0])


  }

  checkEmptyAttack(): boolean {
    let res = false;
    this.neighbors.forEach(county => {
      county.army.forEach(unit => {
        if (unit.isInUse) {
          res = true
        }
      });
    });
    if (!res) {
      this.errorEmptyAttack();
    }
    return res;
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
    if (this.targetCounty.owner === this.currentPlayer) {
      this.targetCounty.army.forEach(unit => {
        if (unit.name != "None") {
          freeSpace--;
        }
      });
    }
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
    // console.log(res);
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

    if (infantryCount - artilleryCount < 0) {
      this.errorInfantryArtilleryQuantity(artilleryCount - infantryCount);
      return false;
    } else if (artilleryInSupportCount - infantryInSupportCount < 0 && infantryCount - artilleryCount <= 0) {
      this.errorInfantryArtilleryInSupport(infantryInSupportCount - artilleryInSupportCount)
      return false;
    } else {
      return true;
    }
  }
  checkIfOnlySupport(): boolean {
    let isNotOnlySupport = false;
    this.neighbors.forEach(county => {
      county.army.forEach(unit => {
        if (!unit.isSupport && unit.isInUse) {
          isNotOnlySupport = true;
        }
      });
    });
    if (!isNotOnlySupport) {
      this.errorOnlySupport();
    }
    return isNotOnlySupport;
  }
  checkForWin(): number {    
    let red = this.globalMap.counties.some(county => county.owner==="Red");
    let blue = this.globalMap.counties.some(county => county.owner==="Blue");
    if(!red&&!blue){
      return 1;
    }
    if(!red) {
      return 2;
    }
    if(!blue){
      return 3;
    }
    return 0;
  }


  errorEmptyAttack() {
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">No unit selected. Select at least one.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      position: 'top',
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });
  }

  errorOnlySupport() {
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">All units are marked as support. Please, send to attack at least one.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      position: 'top',
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });
  }
  errorUseSupport(index: number, countyId: string) {
    var pos = index + 1;
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">Unit ` + pos + ` in ` + countyId + ` county is marked as "Support" without "Use". Please, check.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      position: 'top',
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });
  }
  errorOutOfSpace(num: number) {
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">Not enough space in the target county. Remove ` + num + ` units from attack (move) or use them as support (If relevant).</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      position: 'top',
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });
  }

  errorInfantryArtilleryQuantity(num: number) {
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">You are trying to use in attack more artillery than infantry. Remove ` + num + ` artillery unit(s) from attack or use more infantry.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      position: 'top',
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });
  }
  errorInfantryArtilleryInSupport(num: number) {
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">Invalid ratio between artillery and infantry in attack. Move ` + num + ` artillery unit(s) to support or use more infantry in attack.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      position: 'top',
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });

  }
  errorOutOfMoves() {
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">There are no more available moves for the ` + this.currentPlayer + ` player. Press OK to change side.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      position: 'top',
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`
    }).then((result) => {
      if (result.isConfirmed) {
        this.changeSide();
      }
    });
  }
  attackerWin() {
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">Attacker won. Units were moved.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      //position: 'top',
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.isNoMoreMoves()) {
          this.errorOutOfMoves();
        }
      }
    });
  }
  defenderWin() {
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">Defender won. No units were moved.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      //position: 'top',
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.isNoMoreMoves()) {
          this.errorOutOfMoves();
        }
      }
    });
  }
errorPlayerWon(colorWin:string, colorLose:string){
  Swal.fire({
    title: `<p style="font-family:'Aladin';color:cadetblue;">`+colorWin+` player won. `+colorLose+` player has no more live units. Do you want to start a new game?</p>`,
    showCancelButton: true,
    position:'top',
    cancelButtonColor: '#5f9ea0',
    confirmButtonColor: '#5f9ea0',
    background: '#e6e6e6',
    confirmButtonText: `<p style="font-family:'Ewert';">Yes</p>`,
    cancelButtonText: `<p style="font-family:'Ewert';">No</p>`,

  }).then((result) => {
    if (result.isConfirmed) {
      this.dataTransfer.startNewGame().subscribe(() => {
      });
      this.router.navigate(['map-setup']);
    } 
    
  });
}
errorPlayerTie(){
  Swal.fire({
    title: `<p style="font-family:'Aladin';color:cadetblue;">No more live units on the field. Do you want to start a new game?</p>`,
    showCancelButton: true,
    position:'top',
    cancelButtonColor: '#5f9ea0',
    confirmButtonColor: '#5f9ea0',
    background: '#e6e6e6',
    confirmButtonText: `<p style="font-family:'Ewert';">Yes</p>`,
    cancelButtonText: `<p style="font-family:'Ewert';">No</p>`,

  }).then((result) => {
    if (result.isConfirmed) {
      this.dataTransfer.startNewGame().subscribe(() => {
      });
      this.router.navigate(['map-setup']);
    } 
    
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
          if (unit.side != this.targetCounty.owner) {
            this.setupNumberOfSteps(unit);
          }
        }
      });
      this.addEmptyUnits(county);
      if (this.checkIfEmpty(county)) {
        county.owner = "Neutral";
      }
    });
    this.recordResults(unitsToMove);
    unitsToMove.forEach(unit => {
      unit.currentCounty = this.targetCounty.id;
      unit.isInUse = false;
      unit.numberOfSteps--;
    });

    // console.log(this.neighbors)
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
    this.sortCounty(this.targetCounty);
    if (this.isNoMoreMoves()) {
      this.errorOutOfMoves();
    }
  }

  attackEnemyExtract() {
    if (this.checkInfantryArtillery() && this.checkIfOnlySupport()) {
      this.causeDamage();
      if (this.attackerWon()) {
        this.prepareFriendlyNeighbors();
        this.runAway();
        this.moveArmyExtract();
        this.attackerWin();
        // console.log(this.targetCounty);
        // console.log(this.friendlyNeighbors);
      } else {
        this.neighbors.forEach(county => {
          county.army.forEach(unit => {
            if (unit.isInUse) {
              this.setupNumberOfSteps(unit);
            }
          });
        });
        this.searchForDeadUnits();
        this.defenderWin();
      }
      this.targetCounty.army.forEach(unit => {
        this.setupNumberOfSteps(unit);
      });
      this.recordDeads();
    }
  }

  runAway() {
    var artillery = [];
    var cavalry = [];
    var infantry = [];
    var unitsToMove = [];
    this.targetCounty.army.forEach(unit => {
      switch (unit.name) {
        case "Artillery":
          artillery.push(unit);
          artillery.sort((a, b) => Number(b.hp) - Number(a.hp));
          break;
        case "Cavalry":
          cavalry.push(unit);
          cavalry.sort((a, b) => Number(b.hp) - Number(a.hp));
          break;
        case "Infantry":
          infantry.push(unit)
          // console.log(unit)
          infantry.sort((a, b) => Number(b.hp) - Number(a.hp));
          break;
        default:
          break;
      }
    });
    if (infantry.length === 0 && !this.targetCounty.isCastle) {
      artillery.forEach(unit => {
        unit.hp = 0;
      });
      artillery = [];
    }
    this.searchForDeadUnits();
    if (this.isPanic) {
      cavalry.forEach(unit => {
        unitsToMove.push(unit);
        this.retreatedUnits.push(unit);
      });
      infantry.forEach(unit => {
        unitsToMove.push(unit);
        this.retreatedUnits.push(unit);
      });
      artillery.forEach(unit => {
        unitsToMove.push(unit);
        this.retreatedUnits.push(unit);
      });
    } else {
      cavalry.forEach(unit => {
        unitsToMove.push(unit);
        this.retreatedUnits.push(unit);
      });
      artillery.forEach(unit => {
        unitsToMove.push(unit);
        this.retreatedUnits.push(unit);
      });
      infantry.forEach(unit => {
        unitsToMove.push(unit);
        this.retreatedUnits.push(unit);
      });
    }
    this.retreatedUnits;
    // console.log("this.retreatedUnits")
    // console.log(this.retreatedUnits)
    this.friendlyNeighbors.forEach(county => {
      var freeSpace = 12 - county.army.length;
      // console.log("unitsToMove");
      // console.log(unitsToMove);
      while (freeSpace > 0 && unitsToMove.length > 0) {
        county.army.push(unitsToMove[0]);
        unitsToMove[0].currentCounty = county.id;

        unitsToMove.splice(0, 1);
        freeSpace--;
      }
      if (county.owner === "Neutral" && !this.checkIfEmpty(county)) {
        county.owner = this.targetCounty.owner;
      }
      this.addEmptyUnits(county);
      this.sortCounty(county);
    });
    if (unitsToMove.length > 0) {
      unitsToMove.forEach(unit => {
        unit.hp = 0;
      });
      this.searchForDeadUnits();
    }
    this.targetCounty.army = this.targetCounty.army.filter(function (unit) {
      return (unit.name === "None");
    })
    this.addEmptyUnits(this.targetCounty);
    if (this.checkIfEmpty(this.targetCounty)) {
      this.targetCounty.owner = "Neutral";
    }
    this.recordAttackResults();
    // console.log("this.retreatedUnits")
    // console.log(this.retreatedUnits)
  }

  attackerWon(): boolean {

    this.isPanic = false;
    if (this.countAttackerStrengh() / this.countDefenderStrength() >= 2) {
      this.isPanic = true;
    }
    return this.countAttackerStrengh() > this.countDefenderStrength();

  }
  countAttackerStrengh(): number {
    let attackerStrength = 0;
    this.neighbors.forEach(county => {
      county.army.forEach(unit => {
        if (unit.isInUse) {
          attackerStrength += unit.isSupport ? unit.damage * 0.5 : unit.damage;
        }
      });
    });
    return this.targetCounty.isCastle ? attackerStrength - (attackerStrength * 0.3) : attackerStrength;
  }
  countDefenderStrength(): number {
    let defenderStrength = 0;
    var artilleryDamage = 0;
    var restDamage = 0;
    var isHaveInfantry = false;
    this.targetCounty.army.forEach(unit => {
      if (unit.name === "Artillery") {
        artilleryDamage = artilleryDamage + unit.damage;
      } else {
        restDamage = restDamage + unit.damage;
      }
      if (unit.name === "Infantry") {
        isHaveInfantry = true;
      }
    });
    if (isHaveInfantry || this.targetCounty.isCastle) {
      defenderStrength = defenderStrength + artilleryDamage + restDamage;
    } else {
      defenderStrength = defenderStrength + restDamage;
    }
    if (this.targetCounty.isCastle) {
      defenderStrength = defenderStrength + 40;
      if (this.targetCounty.id === "B3") {
        defenderStrength = defenderStrength + 60;
      }
    }

    return defenderStrength;
  }
  causeDamage() {
    var realUnits = [];
    realUnits = this.targetCounty.army.filter(function (unit) {
      return (unit.name != "None");
    });
    this.targetCounty.army.forEach(unit => {
      if (unit.name != "None") {
        // if (this.targetCounty.isCastle) {
        //   unit.hp = Math.floor(unit.hp - ((this.countAttackerStrengh() / realUnits.length) - (this.countAttackerStrengh() / realUnits.length) * 0.3));
        // } else {
        unit.hp = Math.floor(unit.hp - this.countAttackerStrengh() / realUnits.length);
        // }
      }
    });
    realUnits = [];
    this.neighbors.forEach(county => {
      county.army.forEach(unit => {
        realUnits.push(unit);
      });
    });
    realUnits = realUnits.filter(function (unit) {
      return (unit.isInUse);
    })
    this.neighbors.forEach(county => {
      county.army.forEach(unit => {
        if (unit.isInUse) {
          unit.hp = Math.floor(unit.hp - this.countDefenderStrength() / realUnits.length);
        }
      });
    });
    console.log(this.countDefenderStrength());
    console.log(this.countAttackerStrengh());
    console.log(this.countAttackerStrengh() > this.countDefenderStrength());
  }
  searchForDeadUnits() {
    this.newDeadUnits = [];
    this.neighbors.forEach(county => {
      county.army.forEach(unit => {
        this.deadUnit(county, unit);
      });
      this.sortCounty(county);
    });
    this.targetCounty.army.forEach(unit => {
      this.deadUnit(this.targetCounty, unit);
    });
    // console.log(this.cemetery);
  }

  deadUnit(county, unit) {

    if (unit.name != "None" && unit.hp <= 0) {
      unit.name = "Dead";
      this.setupNumberOfSteps(unit);
      this.cemetery.push(unit);
      this.newDeadUnits.push(unit);
    }
    county.army = county.army.filter(function (unit) {
      return (unit.name != "Dead");
    })
    // for (var i = county.army.length; i < 12; i++) {
    //   county.army.push(new Unit("None", "None", "None", 0, 0));
    // }
    this.addEmptyUnits(county);
    if (this.checkIfEmpty(county)) {
      county.owner = "Neutral";
    }
  }

  recordResults(unitsToMove) {
    this.moveResults = [];
    var countyList = [];
    unitsToMove.forEach(unit => {
      countyList.push(unit.currentCounty);
    });
    var mySet = new Set(countyList);
    countyList = [...mySet];
    // console.log("resultCounties")
    // console.log(countyList)
    countyList.forEach(countyName => {
      var artilleryCount = 0;
      var cavalryCount = 0;
      var infantryCount = 0;
      unitsToMove.forEach(unit => {
        switch (unit.name) {
          case "Artillery":
            if (unit.currentCounty === countyName) {
              artilleryCount++
            }
            break;
          case "Cavalry":
            if (unit.currentCounty === countyName) {
              cavalryCount++;
            }
            break;
          case "Infantry":
            if (unit.currentCounty === countyName) {
              infantryCount++;
            }
            break;
          default:
            break;
        }
      });
      this.moveResults.push(new MoveResult(artilleryCount, "Artillery", countyName, this.targetCounty.id));
      this.moveResults.push(new MoveResult(cavalryCount, "Cavalry", countyName, this.targetCounty.id));
      this.moveResults.push(new MoveResult(infantryCount, "Infantry", countyName, this.targetCounty.id));
    });
  }
  recordAttackResults() {
    this.attackResults = [];
    this.friendlyNeighbors.forEach(county => {
      var artilleryCount = 0;
      var cavalryCount = 0;
      var infantryCount = 0;
      county.army.forEach(unit => {
        this.retreatedUnits.forEach(retreatedUnit => {
          switch (retreatedUnit.name) {
            case "Artillery":
              if (retreatedUnit.id === unit.id) {
                artilleryCount++
              }
              break;
            case "Cavalry":
              if (retreatedUnit.id === unit.id) {
                cavalryCount++;
              }
              break;
            case "Infantry":
              if (retreatedUnit.id === unit.id) {
                infantryCount++;
              }
              break;
            default:
              break;
          }
        });
      });
      this.attackResults.push(new MoveResult(artilleryCount, "Artillery", this.targetCounty.id, county.id));
      this.attackResults.push(new MoveResult(cavalryCount, "Cavalry", this.targetCounty.id, county.id));
      this.attackResults.push(new MoveResult(infantryCount, "Infantry", this.targetCounty.id, county.id));
    });
  }

  recordDeads() {
    this.deadResults = [];
    var countyList = [];
    this.newDeadUnits.forEach(unit => {
      countyList.push(unit.currentCounty);
    });
    var mySet = new Set(countyList);
    countyList = [...mySet];
    countyList.forEach(countyName => {
      var artilleryCount = 0;
      var cavalryCount = 0;
      var infantryCount = 0;
      this.newDeadUnits.forEach(unit => {
        switch (unit.id.charAt(0)) {
          case "A":
            if (unit.currentCounty === countyName) {
              artilleryCount++;
            }
            break;
          case "C":
            if (unit.currentCounty === countyName) {
              cavalryCount++;
            }
            break;
          case "I":
            if (unit.currentCounty === countyName) {
              infantryCount++;
            }
            break;
          default:
            break;
        }
      });
      this.deadResults.push(new MoveResult(artilleryCount, "Artillery", countyName, countyName));
      this.deadResults.push(new MoveResult(cavalryCount, "Cavalry", countyName, countyName));
      this.deadResults.push(new MoveResult(infantryCount, "Infantry", countyName, countyName));
    });
    // console.log("this.deadResults")
    // console.log(this.deadResults)
  }
  changeSide() {

    if (!this.isNoMoreMoves()) {

      Swal.fire({
        title: `<p style="font-family:'Aladin';color:cadetblue;">` + this.currentPlayer + ` player still has an available moves. Are you sure, you want to change side?</p>`,
        showCancelButton: true,
        cancelButtonColor: '#5f9ea0',
        confirmButtonColor: '#5f9ea0',
        background: '#e6e6e6',
        confirmButtonText: `<p style="font-family:'Ewert';">Yes</p>`,
        cancelButtonText: `<p style="font-family:'Ewert';">No</p>`,

      }).then((result) => {
        if (result.isConfirmed) {
          if (this.dataTransfer.firstMove === "Blue") {
            this.dataTransfer.firstMove = "Red";
          } else {
            this.dataTransfer.firstMove = "Blue";
          }
          this.globalMap.counties.forEach(county => {
            county.army.forEach(unit => {
              unit.isInUse = false;
              unit.isSupport = false;
              if (unit.name === "Cavalry") {
                unit.numberOfSteps = 2;
              }
              else if (unit.name === "Artillery" || unit.name === "Infantry") {
                unit.numberOfSteps = 1
              }
            });
          });
          this.router.navigate(['swapSide'])
        }
      });
    } else {
      if (this.dataTransfer.firstMove === "Blue") {
        this.dataTransfer.firstMove = "Red";
      } else {
        this.dataTransfer.firstMove = "Blue";
      }
      this.globalMap.counties.forEach(county => {
        county.army.forEach(unit => {
          unit.isInUse = false;
          unit.isSupport = false;
          if (unit.name === "Cavalry") {
            unit.numberOfSteps = 2;
          }
          else if (unit.name === "Artillery" || unit.name === "Infantry") {
            unit.numberOfSteps = 1
          }
        });
      });
      this.router.navigate(['swapSide'])
    }
  }
  selectAllUse(county) {
    let isTrue = county.army.some(unit => unit.isInUse);
    county.army.forEach(unit => {
      if (unit.numberOfSteps > 0) {
        unit.isInUse = !isTrue;
        if (!unit.isInUse) unit.isSupport = false;
      }
    });
  }

  selectAllSupport(county) {
    let isTrue = county.army.some(unit => unit.isSupport);
    county.army.forEach(unit => {
      if (unit.numberOfSteps > 0) {
        unit.isSupport = !isTrue;
        if (unit.isSupport) unit.isInUse = true;
      }
    });
  }

  sortAllCounties() {
    this.globalMap.counties.forEach(county => {
      this.sortCounty(county);
    });
  }
  selectUse(unit) {
    if (!unit.isSupport) {
      unit.isInUse = true;
    }
  }
  unselectSupport(unit) {
    if (unit.isInUse) {
      unit.isSupport = false;
    }
  }
  sortCounty(county) {
    county.army.sort((a, b) => a.name.localeCompare(b.name) || b.hp - a.hp || b.numberOfSteps - a.numberOfSteps);
  }
  setupNumberOfSteps(unit) {
    unit.numberOfSteps = 0;
    unit.isInUse = false;
    unit.isSupport = false;
  }
  changeUnitLocation(county, unit) {
    unit.currentCounty = county.id;
  }
  addEmptyUnits(county) {
    for (var i = county.army.length; i < 12; i++) {
      county.army.push(new Unit("None", "None", "None", 0, 0));
    }
  }
  isNoMoreMoves(): boolean {
    let res = true;
    this.globalMap.counties.forEach(county => {
      county.army.forEach(unit => {
        if (unit.numberOfSteps > 0 && unit.side === this.currentPlayer) {
          res = false;
        }
      });
    });
    return res;
  }
  // resurrection() {
  //   let index = this.cemetery.length - 1;
  //   while (index >= 0) {
  //     this.globalMap.counties.forEach(county => {
  //       let zombie = county.army.some(unit => unit.id === this.cemetery[index].id)
  //       if (zombie) {
  //         this.cemetery.splice(index, 1);
  //       }
  //     });
  //     index--;
  //   }
  // }
  defineWinner(){
    if (this.checkForWin()>0){
      switch (this.checkForWin()) {
        case 1:
          this.errorPlayerTie();
          break;
          case 2:
          this.errorPlayerWon("Blue","Red");
          break;
          case 3:
            this.errorPlayerWon("Red","Blue");
          break;
      
        default:
          break;
      }
    }
  }

  getReport() {
    this.globalMap.counties.forEach(county => {
      county.army.forEach(unit => {
        unit.isInUse = false;
        unit.isSupport = false;
      });
    });
    this.router.navigate(['report'])
  }
  recordState() {
    this.dataTransfer.saveState().subscribe(() => {

    });
  }
}
