import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from 'app/services/backend.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, first, from, fromEvent, iif, map, Observable, of, Subject, Subscription, switchMap, take, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ICard } from '../card-component/ICard.interface';




@Component({
  selector: 'templates-container',
  templateUrl: './templates-container.component.html',
  styleUrls: ['./templates-container.component.css']
})
export class TemplatesContainerComponent implements OnInit, OnDestroy {



  cardArray: ICard[] = [];
  cardArrayCopy: ICard[] = [];
  backendServiceSubscription: Subscription = new Subscription();
  searchTemplateInputField = new FormControl('');
  keyboardInput$: Observable<string | null> = new Observable();
  backspaceEvent$: Observable<Event> = new Observable();
  counter$: Observable<number> = new Observable();
  counter: number = 0;

  @HostListener('window:keydown.backspace', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    let backspaceEvent$: Subject<KeyboardEvent> = new BehaviorSubject(event);
    backspaceEvent$.pipe(tap(_ => this.counter++))
      .subscribe(_ => {
        if (this.counter == 1) {
          // this._backendService.listTemplates().subscribe(r => this.cardArray = r);
          this.cardArrayCopy = this.cardArray;
          this.searchTemplateInputField.reset();
        }
        return
      });
  }


  //.pipe(first(), distinctUntilChanged())

  constructor(private _backendService: BackendService) { }

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

  sortObjectsInCardArray(cardArray: ICard[]): ICard[] {   
    this.cardArray = cardArray
    this.cardArrayCopy = this.cardArray;
    
    this.searchTemplateInputField.valueChanges
      .pipe(
        switchMap(typedText => of(this.cardArrayCopy)
          .pipe(
            map(cardObjArray => cardObjArray
              .filter(cardObj => cardObj.Title.includes(typedText ? this.capitalizeFirstLetter(typedText) : ""))),
            tap(_ => this.counter = 0)
          )

        )

      ).subscribe({
        next: cards => this.cardArrayCopy = cards,
        error: e => console.log(e),
        complete: () => console.info('complete')
      })

    return this.cardArrayCopy;
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


  ngOnInit(): void {
    this._backendService.listTemplates()
      .subscribe({
        next: result => this.sortObjectsInCardArray(result),
        error: e => console.log(e)
      });
    ;
  }

  ngOnDestroy(): void {
    this.backendServiceSubscription.unsubscribe();
  }
}
