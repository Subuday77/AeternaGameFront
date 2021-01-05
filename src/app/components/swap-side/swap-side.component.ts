import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackUpAndDataTransferService } from 'src/app/services/back-up-and-data-transfer.service';

@Component({
  selector: 'app-swap-side',
  templateUrl: './swap-side.component.html',
  styleUrls: ['./swap-side.component.css']
})
export class SwapSideComponent implements OnInit {

  constructor(private dataTransfer: BackUpAndDataTransferService, private router: Router) { }

  ngOnInit(): void {
    if (this.dataTransfer.fildState === undefined) {
      this.router.navigate(['']);
    } else {
    this.router.navigate(['gameFlow']);
    }
  }

}
