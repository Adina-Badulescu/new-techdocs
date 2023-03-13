import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from 'app/services/backend.service';
import { BehaviorSubject, concatMap, count, debounceTime, delay, distinctUntilChanged, filter, first, from, fromEvent, iif, map, mergeMap, Observable, of, Subject, Subscription, switchMap, take, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ICard } from '../card-component/ICard.interface';

@Component({
  selector: 'templates-container',
  templateUrl: './templates-container.component.html',
  styleUrls: ['./templates-container.component.css']
})
export class TemplatesContainerComponent implements OnInit, OnDestroy {



  A: ICard[] = [];
  B: ICard[] = [];
  C$: Observable<ICard[]> =new Observable();
  backendServiceSubscription: Subscription = new Subscription();
  searchTemplateInputField = new FormControl('');
  keyboardInput$: Observable<string | null> = new Observable();
  backspaceEvent$: Observable<Event> = new Observable();
  counter$: Observable<number> = new Observable();
  counter: number = 0;
  display_N_Objects(sourceArray: ICard[]) {
    let c;   
    let a: ICard[] = [];

    c = of(sourceArray).pipe(
      // From array to observable emitting items synchronously
      mergeMap(array => array),
      // Map each item to observable of item (with delay)
      map(item => of(item)),
      // Flatten those observables into one,
      // waiting for each to complete      
      concatMap(item$ => item$),
      take(3),
      tap(x => a.push(x)),

      // tap((item) => console.log(JSON.stringify(item)))
    );

    c.subscribe(() => this.C$ = of(a));
  }



  capitalizeFirstLetter(string: string | null): string {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return "";
  }

  getKeyboardInput(): Observable<any> {
    return this.searchTemplateInputField.valueChanges
  }

  returnArrayB(array: ICard[]): ICard[] {
    this.B = array;
    console.log(this.B.length);
    return this.B;
  }


  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    let keyDownEvent$: Subject<KeyboardEvent> = new BehaviorSubject(event);
    keyDownEvent$.subscribe(keyEvent => {
      let cardArrayObservable: Observable<ICard[]>;
      // console.log('keyEvent.code ' + keyEvent.code);

      if (keyEvent.code === 'Backspace' || keyEvent.code === 'Escape') {
        // this.B = this.A;
        this.searchTemplateInputField.valueChanges
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
          tap(() => this.B  = this.A)
          // tap(x => console.log('typed... ' + typeof x))

        )
        .subscribe(() => {
          this.B = this.A
          this.display_N_Objects(this.B);
        });
        // this.searchTemplateInputField.reset();
        
        // this.B = this.A
               console.log('this.B LENGTH ' + this.B.length);
          console.log('this.B ' + this.B.forEach(e => e.Title));
        // this.display_N_Objects(this.B);
        // console.log('this.A LENGTH ' + this.A.length);
        // console.log('this.B LENGTH ' + this.B.length);        
        
      }
      // filter HERE  
      if (keyEvent.code != 'Backspace') {
        this.searchTemplateInputField.valueChanges
          .pipe(
            debounceTime(500),
            distinctUntilChanged(),
            // tap(x => console.log('typed... ' + typeof x))

          )
          .subscribe(keyBoardInput => {
            // cardArrayObservable = from([this.B.filter((card: ICard) => card.Title.includes(keyBoardInput ? keyBoardInput : ''))]);
            this.B = this.B.filter((card: ICard) => card.Title.includes(keyBoardInput ? keyBoardInput : ''));
            // this.display_N_Objects(c)
            // cardArrayObservable.subscribe((cardArray: ICard[]) => this.C$ = of(cardArray))
          });
      }


    });
  }


  constructor(private _backendService: BackendService) {

    this._backendService.listTemplates()
      .pipe(
        //filling this.B with cards and subsidiary displaying N objects
        tap((cardArray: ICard[]) => this.display_N_Objects(this.returnArrayB(cardArray)))
      )
      .subscribe(cardsHttpResponse => this.A = cardsHttpResponse);
  }

  ngOnInit(): void {

      
      
  }

  ngOnDestroy(): void {
    this.backendServiceSubscription.unsubscribe();
  }
}
