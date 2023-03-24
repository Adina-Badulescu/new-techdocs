import { Injectable } from '@angular/core';
import { ICard } from 'app/models/ICard.interface';
import { concatMap, map, mergeMap, Observable, of, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LimitNumberOfObjectsService {

  constructor() { }

  display_N_Objects(sourceArray: ICard[], numberOfObjects: number): Observable<ICard[]> {
    let nObjectsObservable: Observable<ICard[]> = new Observable();
    let card: Observable<ICard>;
    let cardArray: ICard[] = [];

    card = of(sourceArray).pipe(
      // From array to observable emitting items synchronously
      mergeMap(array => array),
      // Map each item to observable of item
      map(item => of(item)),
      // Flatten those observables into one,
      // waiting for each to complete      
      concatMap(item$ => item$),
      take(numberOfObjects),
      tap(x => cardArray.push(x))      
    );
    card.subscribe(() => nObjectsObservable = of(cardArray));
    return nObjectsObservable;
  }

}
