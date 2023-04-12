import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from 'app/services/backend/backend.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, of, Subject, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ITemplate } from '../../models/ITemplate.interface';
import { SpinnerService } from 'app/services/spinner/spinner.service';
import { GetScreenResolutionService } from 'app/services/get-screen-resolution/get-screen-resolution.service';
import { LimitNumberOfObjectsService } from 'app/services/limit-no-objects/limit-number-of-objects.service';


@Component({
  selector: 'templates-container',
  templateUrl: './templates-container.component.html',
  styleUrls: ['./templates-container.component.css']
})
export class TemplatesContainerComponent implements OnInit, OnDestroy {


  totalNumberOfTemplates: number = 0;
  Suggestions$: Observable<ITemplate[]> = new Observable();
  C$: Observable<ITemplate[]> = new Observable();
  backendServiceSubscription: Subscription = new Subscription();
  searchTemplateInputField = new FormControl('');
  displaySpinner$: BehaviorSubject<boolean> = this._spinnerService.spinnerBooleanState;
  numberOfCardsByScreenResolution$: BehaviorSubject<number> = this._numberOfObjectsInViewByScrRes$.setNumberOfObjectsAtngOnInit;
  numberOfCardsByScreenResolution: number = 0;
  numberOfSuggestionsObjectsByScreenRes$: BehaviorSubject<number> = this._numberOfObjectsInViewByScrRes$.setNumberOfSuggestionsObjects;
  numberOfSuggestionsObjectsByScreenRes: number = 0;


  constructor(
    private _backendService: BackendService,    
    private _spinnerService: SpinnerService,
    private _numberOfObjectsInViewByScrRes$: GetScreenResolutionService,
    private _limitNumberOfObjectsService: LimitNumberOfObjectsService,
    ) { }



  getKeyboardInput() {
    return this.searchTemplateInputField.valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe(keyBoardInput => {
        this._backendService.listTemplates(this.numberOfCardsByScreenResolution, keyBoardInput?.toLowerCase())
          .subscribe((cardsHttpResponse: ITemplate[]) => {
            this.C$ = this._limitNumberOfObjectsService.display_N_Objects(cardsHttpResponse, this.numberOfCardsByScreenResolution);
            if (keyBoardInput?.toLowerCase != null) {
              this.Suggestions$ = this._limitNumberOfObjectsService.display_N_Objects(cardsHttpResponse, this.numberOfSuggestionsObjectsByScreenRes);
            }
            return;
          });

      });
  }


  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    let keyDownEvent$: Subject<KeyboardEvent> = new BehaviorSubject(event);
    keyDownEvent$.subscribe(keyEvent => {
      if (keyEvent.code === 'Backspace' || keyEvent.code === 'Escape') {
        this.searchTemplateInputField.reset();
        this.Suggestions$ = of([]);
      }
    });
  }

  trackByFn(index: number, item: ITemplate) {
    return item.TemplateId;
  }

  ngOnInit(): void {
    this.numberOfCardsByScreenResolution$.subscribe(numberOfCards => this.numberOfCardsByScreenResolution = numberOfCards);
    this.numberOfSuggestionsObjectsByScreenRes$.subscribe(numberOfSuggestions => this.numberOfSuggestionsObjectsByScreenRes = numberOfSuggestions);
    this._backendService.listTemplates(this.numberOfCardsByScreenResolution, null)
      .subscribe((cardsHttpResponse) => {        
        this.C$ = this._limitNumberOfObjectsService.display_N_Objects(cardsHttpResponse, this.numberOfCardsByScreenResolution); this.totalNumberOfTemplates = Number(cardsHttpResponse[0].NumberOfTemplates)
      });
    this.getKeyboardInput();
  }

  ngOnDestroy(): void {
    this.backendServiceSubscription.unsubscribe();
    this.getKeyboardInput().unsubscribe();
  }

}
