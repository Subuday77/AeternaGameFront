
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalMap } from 'src/app/models/global-map';
import { BackUpAndDataTransferService } from 'src/app/services/back-up-and-data-transfer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-map-setup',
  templateUrl: './map-setup.component.html',
  styleUrls: ['./map-setup.component.css']
})
export class MapSetupComponent implements OnInit {

  // allCounties = [
  //   { name: "V1", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "V2", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "V3", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "V4", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "V5", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "V6", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "V7", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "V8", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "V9", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "V10", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "V11", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "V12", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "G1", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "G2", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "G3", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "G4", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "G5", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "G6", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "G7", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "G8", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "G9", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "G10", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "G11", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "B1", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "B2", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "B3", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "B4", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "B5", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "B6", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "B7", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "B8", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "B9", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "B10", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "B11", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "B12", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "R1", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "R2", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "R3", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "R4", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "R5", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "R6", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "R7", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "R8", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "R9", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "O1", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "O2", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "O3", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "O4", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "05", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "O6", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "O7", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "O8", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "O9", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },
  //   { name: "O10", owner: "Neutral", isCastle: false, army: { unit1: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit2: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit3: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit4: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit5: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit6: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit7: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit8: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit9: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit10: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit11: { name: "None", hp: 0, id: "None", madeMove: 0 }, unit12: { name: "None", hp: 0, id: "None", madeMove: 0 } } },

  // ]

  globalMap = new GlobalMap();

  allUnitsList = ["I01", "I02", "I03", "I04", "I05", "I06", "I07", "I08", "I09", "I10", "I11", "I12", "I13", "I14", "I15", "I16", "I17", "I18", "I19", "I20", "I21", "I22", "I23", "I24", "I25", "I26", "I27", "I28", "I29", "I30", "I31", "I32", "I33", "I34", "I35", "I36", "I37", "I38", "I39", "I40", "I41", "I42", "I43", "I44", "I45", "I46", "I47", "I48", "I49", "I50", "I51", "I52", "I53", "I54", "C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10", "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18", "C19", "C20", "C21", "C22", "C23", "C24", "C25", "C26", "C27", "C28", "C29", "C30", "C31", "C32", "A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20", "A21", "A22", "A23", "A24", "A25"]
   // allUnitsList = ["I01", "I02", "I03", "C01", "C02", "C03", "A01", "A02", "A03"]
  infantryList = [];
  cavalryList = [];
  artilleryList = [];
  previousValue = "";
  previousUnitType = "";
  firstMove: string;
  infantryUnitsNumber;
  cavalryUnitsNumber;
  artilleryUnitsNumber;
  constructor(private dataTransfer: BackUpAndDataTransferService, private router: Router) { }

  ngOnInit(): void {
    this.prepareUnitsLists();
    this.globalMap.mapSetup();
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
    } else if (this.infantryUnitsNumber < 0 || this.cavalryUnitsNumber < 0 || this.artilleryUnitsNumber < 0) {
      Swal.fire({
        title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">Out of units!</p>`,
        confirmButtonColor: '#5f9ea0',
        toast: true,
        background: '#e6e6e6',
        confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

      });
    } else {
      //console.log(this.allCounties[11])
      // console.log(this.firstMove);
      // this.dataTransfer.fildState = this.allCounties;
      this.dataTransfer.firstMove = this.firstMove;
     // console.log(this.dataTransfer.fildState[0])
      this.router.navigate(['gameFlow'])
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
    this.infantryUnitsNumber = this.infantryList.length;
    this.cavalryUnitsNumber = this.cavalryList.length;
    this.artilleryUnitsNumber = this.artilleryList.length;
  }
  setUnit(countyName, unitNum) {
   

  }

  clrRow(county) {
    if (county.owner === "Neutral") {
      this.releaseId(county.army.unit1.id);
      this.increaseUnitsNumber(county.army.unit1.name);
      county.army.unit1.name = county.army.unit1.id = "None";
      county.army.unit1.hp = 0;

      // this.releaseId(county.army.unit2.id);
      // this.increaseUnitsNumber(county.army.unit2.name);
      // county.army.unit2.name = county.army.unit2.id = "None";
      // county.army.unit2.hp = 0;
      // this.releaseId(county.army.unit3.id);
      // this.increaseUnitsNumber(county.army.unit3.name);
      // county.army.unit3.name = county.army.unit3.id = "None";
      // county.army.unit3.hp = 0;
      // this.releaseId(county.army.unit4.id);
      // this.increaseUnitsNumber(county.army.unit4.name);
      // county.army.unit4.name = county.army.unit4.id = "None";
      // county.army.unit4.hp = 0;
      // this.releaseId(county.army.unit5.id);
      // this.increaseUnitsNumber(county.army.unit5.name);
      // county.army.unit5.name = county.army.unit5.id = "None";
      // county.army.unit5.hp = 0;
      // this.releaseId(county.army.unit6.id);
      // this.increaseUnitsNumber(county.army.unit6.name);
      // county.army.unit6.name = county.army.unit6.id = "None";
      // county.army.unit6.hp = 0;
      // this.releaseId(county.army.unit7.id);
      // this.increaseUnitsNumber(county.army.unit7.name);
      // county.army.unit7.name = county.army.unit7.id = "None";
      // county.army.unit7.hp = 0;
      // this.releaseId(county.army.unit8.id);
      // this.increaseUnitsNumber(county.army.unit8.name);
      // county.army.unit8.name = county.army.unit8.id = "None";
      // county.army.unit8.hp = 0;
      // this.releaseId(county.army.unit9.id);
      // this.increaseUnitsNumber(county.army.unit9.name);
      // county.army.unit9.name = county.army.unit9.id = "None";
      // county.army.unit9.hp = 0;
      // this.releaseId(county.army.unit10.id);
      // this.increaseUnitsNumber(county.army.unit10.name);
      // county.army.unit10.name = county.army.unit10.id = "None";
      // county.army.unit10.hp = 0;
      // this.releaseId(county.army.unit11.id);
      // this.increaseUnitsNumber(county.army.unit11.name);
      // county.army.unit11.name = county.army.unit11.id = "None";
      // county.army.unit11.hp = 0;
      // this.releaseId(county.army.unit12.id);
      // this.increaseUnitsNumber(county.army.unit12.name);
      // county.army.unit12.name = county.army.unit12.id = "None";
      // county.army.unit12.hp = 0;


    }
   
  }
  getId(unitType): string {

    switch (unitType) {
      case "Infantry":
        if (this.infantryList.length > 0) {

          var id = this.infantryList[0];
          this.infantryList.splice(0, 1);

          return id;
        } else {

          this.outOfUnits(unitType);
          return "None"
        }
      case "Cavalry":
        if (this.cavalryList.length > 0) {
          var id = this.cavalryList[0];
          this.cavalryList.splice(0, 1);
          return id;
        } else {
          this.outOfUnits(unitType);
          return "None"
        }
      case "Artillery":

        if (this.artilleryList.length > 0) {
          var id = this.artilleryList[0];
          this.artilleryList.splice(0, 1);

        } else {

          this.outOfUnits(unitType);
          console.log("I'm here 1")
          id = "None";
        }

        return id;
      default:
        break;
    }
  }
  releaseId(id: string) {
    var type = id.charAt(0);
    switch (type) {
      case "I":
        // this.increaseUnitsNumber(this.previousUnitType);
        this.infantryList.push(id);
        this.infantryList.sort();

        break;
      case "C":
        // this.increaseUnitsNumber(this.previousUnitType);
        console.log(this.cavalryList)
        this.cavalryList.push(id);
        this.cavalryList.sort();

        console.log(this.cavalryList)
        break;
      case "A":
        // this.increaseUnitsNumber(this.previousUnitType);
        this.artilleryList.push(id);
        this.artilleryList.sort();
        break;
      case "N":
        console.log("I'm here")
        // this.increaseUnitsNumber(this.previousUnitType);
        break;
      default:
        break;
    }
    console.log(this.infantryList)
  }

  storePrevVal(id, unitType) {
    this.previousValue = id;
    this.previousUnitType = unitType;
  }
  outOfUnits(unitType:string) {
    
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">Out of ` + unitType.toLowerCase() + ` units</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });

  }
  
  increaseUnitsNumber(unitType: string) {
    switch (unitType) {
      case "Infantry":
        this.infantryUnitsNumber = this.infantryUnitsNumber + 1;
        break;
      case "Cavalry":
        this.cavalryUnitsNumber = this.cavalryUnitsNumber + 1;
        break;
      case "Artillery":
        this.artilleryUnitsNumber = this.artilleryUnitsNumber + 1
        break;
      default:
        break;
    }

  }

  decreaseUnitsNumber(unitType: string) {
    switch (unitType) {
      case "Infantry":
        this.infantryUnitsNumber = this.infantryUnitsNumber - 1;
        break;
      case "Cavalry":
        this.cavalryUnitsNumber = this.cavalryUnitsNumber - 1;
        break;
      case "Artillery":
        this.artilleryUnitsNumber = this.artilleryUnitsNumber - 1
        break;
      default:
        break;
    }

  }
  check(){
    console.log(this.globalMap.counties[0].isCastle)
    console.log(this.globalMap.counties[0].owner)
    console.log(this.globalMap.counties[0].army[0])
    console.log(this.globalMap.counties[0].army[1])
    console.log(this.globalMap.counties[0].neighbors)
    console.log(this.globalMap.counties[1].neighbors)
  }

}
