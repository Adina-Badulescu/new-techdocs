import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from 'app/services/backend.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, first, from, fromEvent, iif, map, Observable, of, Subject, Subscription, switchMap, take, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ICard } from '../card-component/ICard.interface';
import { tempArray } from './temp';


@Component({
  selector: 'templates-container',
  templateUrl: './templates-container.component.html',
  styleUrls: ['./templates-container.component.css']
})
export class TemplatesContainerComponent implements OnInit, OnDestroy {



  cardArray: ICard[] = [];
  backendServiceSubscription: Subscription = new Subscription();
  searchTemplateInputField = new FormControl('');
  keyboardInput$: Observable<string | null> = new Observable();
  backspaceEvent$: Observable<Event> = new Observable();
  counter$: Observable<number> = new Observable();
  counter: number = 0;

  @HostListener('window:keydown.backspace', ['$event'])
  handleKeyDown(event: KeyboardEvent) {

    let backspaceEvent$: Subject<KeyboardEvent> = new BehaviorSubject(event);
    // backspaceEvent$.next(event).pipe(first(), distinctUntilChanged()).subscribe(_ => this._backendService.listTemplates().subscribe(r => this.cardArray = r));

    // .subscribe(_ => this._backendService.listTemplates().subscribe(r => this.cardArray = r));    
    // backspaceEvent$.pipe(iif(() => this.checkCounter, this._backendService.listTemplates(), emp))
    backspaceEvent$.pipe(tap(_ =>  this.counter++ ))
      .subscribe(_ => {
        if (this.counter == 1) {
          this._backendService.listTemplates().subscribe(r => this.cardArray = r);
          this.searchTemplateInputField.reset();
          console.log(this.counter);
        }

        return


      });
    // console.log('counter: ' + this.counter);



    // console.log(this.searchTemplateInputField.value);

    // if(this.searchTemplateInputField.value === '') {
    //   this.searchTemplateInputField.reset();
    //   // this.searchTemplateInputField.markAsDirty();  
    //   // this.searchTemplateInputField.markAsTouched();      
    //   this._backendService.listTemplates().subscribe(r => this.cardArray = r);
    // }
    // else null;

  }


  //.pipe(first(), distinctUntilChanged())

  constructor(private _backendService: BackendService) { }

  sortObjectsInCardArray(): ICard[] {
    this._backendService.listTemplates().subscribe(result => this.cardArray = result);


    this.searchTemplateInputField.valueChanges
      .pipe(
        switchMap(typedText => of(this.cardArray)
          .pipe(
            map(cardObjArray => cardObjArray
              .filter(cardObj => cardObj.Title.includes(typedText ? typedText : ""))),
              tap(_ => this.counter = 0)
          )

        )

      ).subscribe(value => this.cardArray = value)//.subscribe(v =>  console.log('this.cardArray value ' + JSON.stringify(v)))

    return this.cardArray
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  getKeyboardInput(): Observable<any> {
    return this.searchTemplateInputField.valueChanges
  }


  ngOnInit(): void {
    // this.cardsArray = this._backendService.listTemplates()
    // .subscribe(cardData => this.cardsArray = cardData);
    // this.keyClicks().subscribe(v => console.log("v" + v));
    // this.sortObjectsInArray().subscribe(v=> console.log("sorted " + JSON.stringify(v)));
    this.sortObjectsInCardArray();
    // this.x().subscribe(v => console.log('value in search ' + v));
    // this.getKeyboardInput().pipe(map(v => v + "Q")).subscribe(v => console.log(v));
  }

  ngOnDestroy(): void {
    this.backendServiceSubscription.unsubscribe();
  }
}
