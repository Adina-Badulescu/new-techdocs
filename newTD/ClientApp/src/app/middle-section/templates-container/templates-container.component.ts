import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from 'app/services/backend.service';
import { BehaviorSubject, concatMap, count, debounceTime, delay, distinctUntilChanged, filter, first, from, fromEvent, iif, map, mergeMap, Observable, of, Subject, Subscription, switchMap, take, tap } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ICard } from '../card-component/ICard.interface';
import { SpinnerService } from 'app/services/spinner.service';

@Component({
  selector: 'templates-container',
  templateUrl: './templates-container.component.html',
  styleUrls: ['./templates-container.component.css']
})
export class TemplatesContainerComponent implements OnInit, OnDestroy {

  
  totalNumberOfTemplates: number = 0;
  Suggestions: ICard[] = [];
  C$: Observable<ICard[]> = new Observable();
  numberOfObjectsInView: number = 3;
  backendServiceSubscription: Subscription = new Subscription();
  searchTemplateInputField = new FormControl('');
  displaySpinner: BehaviorSubject<boolean> = this._spinnerService.spinnerBooleanState;

  constructor(private _backendService: BackendService, private _spinnerService: SpinnerService) { }

  display_N_Objects(sourceArray: ICard[], numberOfObjects: number) {
    let c;
    let a: ICard[] = [];

    c = of(sourceArray).pipe(
      // From array to observable emitting items synchronously
      mergeMap(array => array),
      // Map each item to observable of item
      map(item => of(item)),
      // Flatten those observables into one,
      // waiting for each to complete      
      concatMap(item$ => item$),
      take(numberOfObjects),
      tap(x => a.push(x)),
      // tap((item) => console.log(JSON.stringify(item)))
    );
    c.subscribe(() => this.C$ = of(a));
  }



  capitalizeFirstLetter(string: string | null): string {
    if (string) {
      string.toLocaleLowerCase
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return "";
  }

  getKeyboardInput() {
    return this.searchTemplateInputField.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(keyBoardInput => {
        this._backendService.listTemplates(this.numberOfObjectsInView, keyBoardInput?.toLowerCase())
          .subscribe((cardsHttpResponse: ICard[]) => {
            this.display_N_Objects(cardsHttpResponse, this.numberOfObjectsInView);
            if (keyBoardInput?.toLowerCase != null) {
              this.Suggestions = cardsHttpResponse;
            }
          });

      });
  }


  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    let keyDownEvent$: Subject<KeyboardEvent> = new BehaviorSubject(event);
    keyDownEvent$.subscribe(keyEvent => {
      if (keyEvent.code === 'Backspace' || keyEvent.code === 'Escape') {
        this.searchTemplateInputField.reset();
        this.Suggestions = [];
      }
    });
  }

  trackByFn(index: number, item: ICard) {
    return item.TemplateId;
  }

  ngOnInit(): void {
    this._backendService.listTemplates(this.numberOfObjectsInView, null)
      .subscribe((cardsHttpResponse) => { this.display_N_Objects(cardsHttpResponse, this.numberOfObjectsInView); this.totalNumberOfTemplates = Number(cardsHttpResponse[0].NumberOfTemplates) });
    this.getKeyboardInput();  
      
  }

  ngOnDestroy(): void {
    this.backendServiceSubscription.unsubscribe();
    this.getKeyboardInput().unsubscribe();
  }
}
