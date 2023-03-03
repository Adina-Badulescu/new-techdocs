import { Component, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from 'app/services/backend.service';
import { debounceTime, distinctUntilChanged, filter, from, fromEvent, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ICard } from '../card-component/ICard.interface';
import { tempArray } from './temp';

@Component({
  selector: 'templates-container',
  templateUrl: './templates-container.component.html',
  styleUrls: ['./templates-container.component.css']
})
export class TemplatesContainerComponent implements OnInit, OnDestroy {
  cardsArray$: Observable<ICard[]> = new Observable();
  backendServiceSubscription: Subscription = new Subscription();
  searchTemplateInputField = new FormControl('');
  keyboardInput$: Observable<string | null> = new Observable();
  backspaceEvent$: Observable<Event> = new Observable();
  constructor(private _backendService: BackendService) { }

  sortObjectsInCardArray$(): Observable<ICard[]> {
    this.cardsArray$ = this._backendService.listTemplates();


    this.searchTemplateInputField.valueChanges
      .pipe(
        switchMap(typedText => this.cardsArray$
          .pipe(
            map(cardObjArray => cardObjArray
              .filter(cardObj => cardObj.Title.includes(typedText ? typedText : ""))),
          )

        )  
              
      ).subscribe(v => this.cardsArray$ = of(v))//.subscribe(v =>  console.log('this.cardsArray$ value ' + JSON.stringify(v)))

    return this.cardsArray$
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
    this.sortObjectsInCardArray$().subscribe();
    // this.getKeyboardInput().pipe(map(v => v + "Q")).subscribe(v => console.log(v));
  }

  ngOnDestroy(): void {
    this.backendServiceSubscription.unsubscribe();
  }
}
