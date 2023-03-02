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
  cardsArray: Observable<ICard[]> = new Observable();
  backendServiceSubscription: Subscription = new Subscription();
  searchTemplateInputField = new FormControl('');
  keyboardInput: Observable<string | null> = new Observable();

  constructor(private _backendService: BackendService) { }

  sortObjectsInCardArray(): Observable<ICard[]> {

    this.cardsArray = this._backendService.listTemplates()
    .pipe(
      map(cardObjArray => cardObjArray
      .filter(cardObj => cardObj.Title.includes(this.searchTemplateInputField.value ? this.searchTemplateInputField.value : ""))),
      tap(v => console.log(v))
    )

    return this.cardsArray
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }





  ngOnInit(): void {
    // this.cardsArray = this._backendService.listTemplates()
    // .subscribe(cardData => this.cardsArray = cardData);
    // this.keyClicks().subscribe(v => console.log("v" + v));
    // this.sortObjectsInArray().subscribe(v=> console.log("sorted " + JSON.stringify(v)));
    this.sortObjectsInCardArray().subscribe(v => console.log("Value: " + v))

  }

  ngOnDestroy(): void {
    this.backendServiceSubscription.unsubscribe();
  }
}
