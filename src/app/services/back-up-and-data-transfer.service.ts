import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackUpAndDataTransferService {

  public fildState;
  public firstMove;
  public stepNumber = 0;

  constructor(private server: HttpClient) { }

  saveState(): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('stepNumber', (this.stepNumber.toString()));
    headers = headers.append('turn', (this.firstMove));
    return this.server.post('http://localhost:8081/backup/save', this.fildState, { headers, responseType: 'text' });
  }
  rollback(): Observable<any> {
    return this.server.get('http://localhost:8081/backup/restore');
  }
  createSaveFile(): Observable<any> {
    return this.server.get('http://localhost:8081/backup/create');
  }
  checkForOldGame(): Observable<any> {
    return this.server.get('http://localhost:8081/backup/check');
  }
   getLastLine(): Observable<any> {
    return this.server.get('http://localhost:8081/backup/lastline');
  }
  startNewGame(): Observable<any> {
    return this.server.get('http://localhost:8081/backup/newgame');
  }
  connectionCheck(): Observable<any> {
  return this.server.get('http://localhost:8081/backup/check');
  }
}
