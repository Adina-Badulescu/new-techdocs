import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentCommunicationService {

  constructor() { }
  public flag: boolean = true;
  public showHideSubject$ = new BehaviorSubject<boolean>(this.flag);
  

  sendFlag(sendFlag: boolean){
    this.flag = sendFlag;
    this.showHideSubject$.next(sendFlag);       
  }


}
