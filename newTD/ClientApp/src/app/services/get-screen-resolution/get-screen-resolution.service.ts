import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetScreenResolutionService {

  setNumberOfObjectsAtngOnInit: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  setNumberOfSuggestionsObjects: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() {   
    let vw = window.innerWidth;
    if (vw <= 380) {
      this.setNumberOfObjectsAtngOnInit.next(2);
      this.setNumberOfSuggestionsObjects.next(5);
    }
    else if (vw <= 780) {
      this.setNumberOfObjectsAtngOnInit.next(4);
      this.setNumberOfSuggestionsObjects.next(8);
    }
    else if(vw <= 1024) {
      this.setNumberOfObjectsAtngOnInit.next(6);
      this.setNumberOfSuggestionsObjects.next(10);
    }
    else if(vw <= 1080) {
      this.setNumberOfObjectsAtngOnInit.next(12);
      this.setNumberOfSuggestionsObjects.next(14);
    }
    else {
      this.setNumberOfObjectsAtngOnInit.next(18);
      this.setNumberOfSuggestionsObjects.next(20);
    }

  }


}
