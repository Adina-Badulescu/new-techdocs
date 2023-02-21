import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  spinnerBooleanState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }

  show() {
    this.spinnerBooleanState.next(true);
  }

  hide() {
    this.spinnerBooleanState.next(false);
  }

}
