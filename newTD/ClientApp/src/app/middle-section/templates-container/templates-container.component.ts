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
          this._backendService.listTemplates().subscribe(r => this.cardArray = r);
          this.searchTemplateInputField.reset();          
        }
        return
      });

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
              .filter(cardObj => cardObj.Title.includes(typedText ? this.capitalizeFirstLetter(typedText) : ""))),
            tap(_ => this.counter = 0)
          )

        )

      ).subscribe(value => this.cardArray = value)

    return this.cardArray
  }

  capitalizeFirstLetter(string: string | null): string {
    if(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return "";
  }


  getKeyboardInput(): Observable<any> {
    return this.searchTemplateInputField.valueChanges
  }


  ngOnInit(): void {
    this.sortObjectsInCardArray();
  }

  ngOnDestroy(): void {
    this.backendServiceSubscription.unsubscribe();
  }
}
