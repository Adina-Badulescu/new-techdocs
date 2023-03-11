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


  original = [1, 2, 3];
  items: Observable<number[] | number> = of([]);
  A: ICard[] = [];
  B: ICard[] = [];   
  C$: Observable<ICard[]> = of([]);  
  backendServiceSubscription: Subscription = new Subscription();
  searchTemplateInputField = new FormControl('');
  keyboardInput$: Observable<string | null> = new Observable();
  backspaceEvent$: Observable<Event> = new Observable();
  counter$: Observable<number> = new Observable();
  counter: number = 0;
  doit(sourceArray: ICard[]) {
    // Clear display
    this.C$ = of([]);

    // Let's do this thing ... with the original data
    this.C$ = of([sourceArray]).pipe(
      // From array to observable emitting items synchronously
      mergeMap(array => array),
      // Map each item to observable of item (with delay)
      map(item => of(item).pipe(delay(500))),
      // Flatten those observables into one,
      // waiting for each to complete
      concatMap(item$ => item$),
      take(2),
      // log emitted values
      tap((item) => console.log(item))
    );
    this.C$.subscribe(x => console.log(x))
  }

  // sortObjectsInCardArray(): ICard[] {

  //   // 1 cards retreived from this.cardArray
  //   this._backendService.listTemplates().subscribe(result => this.cardArray = result);

  //   // 2. make a subscription called in ngOnInit
  //   this.searchTemplateInputField.valueChanges
  //     .pipe(
  //       switchMap(typedText => of(this.cardArray)
  //         .pipe(
  //           map(cardObjArray => cardObjArray
  //             .filter(cardObj => cardObj.Title.includes(typedText ? this.capitalizeFirstLetter(typedText) : ""))),
  //           tap(_ => this.counter = 0)
  //         )

  //       )

  //     ).subscribe(value => this.cardArray = value)

  //   return this.cardArray
  // }


  capitalizeFirstLetter(string: string | null): string {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return "";
  }

  getKeyboardInput(): Observable<any> {
    return this.searchTemplateInputField.valueChanges
  }


  // @HostListener('window:keydown.backspace', ['$event'])
  // handleKeyDown(event: KeyboardEvent) {
  //   let backspaceEvent$: Subject<KeyboardEvent> = new BehaviorSubject(event);
  //   backspaceEvent$.pipe(tap(_ => this.counter++))
  //     .subscribe(_ => {
  //       if (this.counter == 1) {
  //         // this._backendService.listTemplates().subscribe(r => this.cardArray = r);
  //         // console.log('this.A length ' + JSON.stringify(this.A.length));  

  //         this.B = this.A;
  //         // console.log('this.B length ' + JSON.stringify(this.B.length));
  //         this.C_Subject$.next(this.B);
  //         this.searchTemplateInputField.reset();
  //       }
  //       return
  //     });
  // }

  @HostListener('window:keydown', ['$event'])
  handleKeyUp(event: KeyboardEvent) {
    let keyUpEvent$: Subject<KeyboardEvent> = new BehaviorSubject(event);
    keyUpEvent$
      .subscribe(keyEvent => {
        // filter HERE  
        if(keyEvent.code != 'Backspace') {
          this.searchTemplateInputField.valueChanges
          .pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(x => console.log(x))

          )
          .subscribe(keyBoardInput =>{
          this.B = this.A.filter(card => card.Title.includes(keyBoardInput ? keyBoardInput : ''));
          this.C$ = from([this.B]);
          this.C$.pipe().subscribe(x => console.warn(x))

          })
          
          
          // this.B.filter(cardObj => cardObj.Title.includes(keyEvent. ? this.capitalizeFirstLetter(typedText) : "")))        
          // this.C_Subject$.next(this.B);
          
        } 
        else {          
          this._backendService.listTemplates().subscribe(cardArray => this.A = cardArray)          
          this.searchTemplateInputField.reset();
        }
      });
  }


  constructor(private _backendService: BackendService) { }

  // sortObjectsInCardArray(cardArray: ICard[]): Subject<ICard[]> {
  //   this.A = cardArray;
  //   this.B = this.A;
  //   this.C_Subject$.next(this.B);
  //   // console.log('this.B ' + JSON.stringify(this.B));


  //   this.searchTemplateInputField.valueChanges
  //     .pipe(
  //       tap(typedText => console.log('typedText ' + typedText)),
  //       switchMap(typedText => from([this.B])
  //         .pipe(
  //           map(cardObjArray => cardObjArray
  //             .filter(cardObj => cardObj.Title.includes(typedText ? this.capitalizeFirstLetter(typedText) : "")),
  //           ),
  //           tap(_ => this.counter = 0)
  //         )

  //       )

  //     )
  //     .subscribe({
  //       // next: cards => this.B = cards,
  //       next: cardObjects => this.C_Subject$.next(cardObjects ? cardObjects : this.B),
  //       error: e => console.log(e),
  //       complete: () => console.info('complete')
  //     })

  //   return this.C_Subject$;
  // }



  ngOnInit(): void {
    this._backendService.listTemplates()
    
    // .pipe(      
    //     cardsHttpResponse =>  this.doit(cardsHttpResponse)
    // )
    .subscribe(cardsHttpResponse => this.doit(cardsHttpResponse));
    // this.doit(this.B)
    // this.C$ = from([this.A]).pipe(
      
    //   map(item => of(item).pipe(delay(1000))),
    //   concatMap(item$ => item$),
    //   take(2),
    //   tap((item) => console.log(item))
    // );
    // 
 
    // this._backendService.listTemplates()
    //   .subscribe({
    //     next: result => from(this.sortObjectsInCardArray(result))
    //       .pipe(
    //         take(1),
    //         tap(r => this.C_Subject$.next(r)),
    //         tap(r => console.warn('this.C_Subject$ length ' + r.length))
    //       )
    //       .subscribe(r => this.C_Subject$.next(r)),
    //     error: e => console.log(e)
    //   })

  }

  ngOnDestroy(): void {
    this.backendServiceSubscription.unsubscribe();
  }
}
