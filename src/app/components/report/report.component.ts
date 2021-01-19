import { GlobalMap } from 'src/app/models/global-map';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackUpAndDataTransferService } from 'src/app/services/back-up-and-data-transfer.service';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  globalMap: GlobalMap = {} as GlobalMap;
  currentPlayer: string;
  stepNumber: number;
  constructor(private dataTransfer: BackUpAndDataTransferService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (this.dataTransfer.fildState === undefined) {
      this.router.navigate(['']);
    }
    this.globalMap = this.dataTransfer.fildState;
    this.currentPlayer = this.dataTransfer.firstMove;
    this.stepNumber = this.dataTransfer.stepNumber;
  }
  goBack() {
    this.router.navigate(['gameFlow']);
  }
  print() {
    // let printContents, popupWin;
    // printContents = document.getElementById('report').innerHTML;
    // popupWin = window.open();
    // popupWin.document.open();
    // popupWin.document.write(`<p style ="font-family: 'Marck Script';">
    //       <html>
    //         <head>
    //           <link rel="stylesheet" type="text/css" href="print.component.css, href="https://fonts.googleapis.com/css?family=Rye|Aladin|Lora|Roboto+Mono|Ewert|Marck+Script|Architects+Daughter"">
    //         </head>
    //         <body onload="window.print();window.close()">${printContents}</body>
    //       </html></p>`
    // );
    // popupWin.document.close();
    // ========================================================================
        const printContent = document.getElementById("report");
    const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }
  rollback(){
    this.spinner.show();
    this.dataTransfer.rollback().subscribe((result)=> {
      this.currentPlayer = result.turn;
      this.stepNumber = result.stepNumber;
      this.globalMap = result.globalMap;
      this.dataTransfer.fildState = result.globalMap;
      this.dataTransfer.stepNumber = result.stepNumber;
      this.dataTransfer.firstMove = result.turn;
      this.spinner.hide();
    });
    if (this.stepNumber===0){
      this.errorNoMoreRollbacks();
    }
  }
  errorNoMoreRollbacks(){
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">You have reached the initial field state.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      position: 'top',
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });
  }
  notReadyYet(){
    Swal.fire({
      title: `<p style="font-family:'Aladin';color:cadetblue; font-size: 200%">This functionality will be added in the further versions.</p>`,
      confirmButtonColor: '#5f9ea0',
      toast: true,
      background: '#e6e6e6',
      confirmButtonText: `<p style="font-family:'Ewert'; font-size: 150%">OK</p>`

    });
  }
}
