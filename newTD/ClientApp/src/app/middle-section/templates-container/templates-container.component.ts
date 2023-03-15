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
// this array to be used as mockup data for Suggestions array in case of need 
//[{"TemplateId":"1f2c4df0-de7f-42e6-93d3-145d55ca715e","Title":"Restaurant Thai","Description":"Some kind of other kind of clinic.","MainColors":"RGB","ResponsiveColumns":3,"ImgPath":"../lock.png","NumberOfTemplates":13},{"TemplateId":"320fd7b8-1ac9-4ef6-acdb-1ff6bc46437d","Title":"Clinica Veterinara","Description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium","MainColors":"red, yellow, gray","ResponsiveColumns":2,"ImgPath":"./qwerty","NumberOfTemplates":13},{"TemplateId":"1a0f5ef7-75a4-4f67-8511-29bf97334b0b","Title":"clinica stomatologie","Description":"Some kind of other kind of clinic.","MainColors":"RGB","ResponsiveColumns":3,"ImgPath":"../lock.png","NumberOfTemplates":13},{"TemplateId":"f8086b90-6880-4ce8-a4ed-82d9300b99f1","Title":"Magazim Imbracaminte","Description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium","MainColors":"red, yellow, gray","ResponsiveColumns":3,"ImgPath":"./qwerty","NumberOfTemplates":13},{"TemplateId":"609f25ae-3dbb-4e6c-a0c0-86f8dbd45a01","Title":"Restaurant Mexican","Description":"Some kind of other kind of clinic.","MainColors":"RGB","ResponsiveColumns":3,"ImgPath":"../lock.png","NumberOfTemplates":13},{"TemplateId":"e9663c13-59a9-4773-9709-8e0d2f64c2a7","Title":"Spalatorie Auto","Description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium","MainColors":"blue, white, green","ResponsiveColumns":3,"ImgPath":"./qwerty","NumberOfTemplates":13},{"TemplateId":"ab2c206f-c1db-404e-b3c6-b023c7e522c8","Title":"clinica veterinara","Description":"Some kind of other kind of clinic.","MainColors":"RGB","ResponsiveColumns":3,"ImgPath":"../lock.png","NumberOfTemplates":13},{"TemplateId":"fde7a296-7007-483d-88a8-b308bbc0ba52","Title":"Restaurant Asiatic","Description":"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium","MainColors":"red, yellow, gray","ResponsiveColumns":2,"ImgPath":"./qwerty","NumberOfTemplates":13},{"TemplateId":"b80a4554-0b46-45d6-a924-c6d1bfd1e638","Title":"magazin electronice","Description":"Some kind of other kind of clinic.","MainColors":"RGB","ResponsiveColumns":3,"ImgPath":"../lock.png","NumberOfTemplates":13},{"TemplateId":"dc7d4aaf-0228-4e50-b410-c9340b58a1f5","Title":"Restaurant Asiatic","Description":"Some kind of other kind of clinic.","MainColors":"RGB","ResponsiveColumns":3,"ImgPath":"../lock.png","NumberOfTemplates":13},{"TemplateId":"27eb1518-f0f2-4fa9-9600-e3b6fbca378e","Title":"magazin alimentar","Description":"Some kind of other kind of clinic.","MainColors":"RGB","ResponsiveColumns":3,"ImgPath":"../lock.png","NumberOfTemplates":13},{"TemplateId":"173a67cc-aca9-461c-9ede-e803418208a8","Title":"Restaurant Indian","Description":"Some kind of other kind of clinic.","MainColors":"RGB","ResponsiveColumns":3,"ImgPath":"../lock.png","NumberOfTemplates":13},{"TemplateId":"399effe2-f557-417a-8ad1-f1a561685b5d","Title":"magazin materiale de constructie","Description":"Some kind of other kind of clinic.","MainColors":"RGB","ResponsiveColumns":3,"ImgPath":"../lock.png","NumberOfTemplates":13}]


  A: ICard[] = [];
  Suggestions: ICard[] = [];
  C$: Observable<ICard[]> = new Observable();
  backendServiceSubscription: Subscription = new Subscription();
  searchTemplateInputField = new FormControl('');

  constructor(private _backendService: BackendService) { }
   
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
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    return "";
  }

  popS() {
    this.Suggestions.pop();
  }

  getKeyboardInput() {
    return this.searchTemplateInputField.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe(keyBoardInput => {
      this._backendService.listTemplates(keyBoardInput)        
        .subscribe((cardsHttpResponse: ICard[]) => {
          this.display_N_Objects(cardsHttpResponse, 3);
          if(keyBoardInput != null) {
            this.Suggestions = cardsHttpResponse;
          }                  
        });
        this.Suggestions = [];         
        
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
    // return item.TemplateId;
    return index;
  }

  ngOnInit(): void {
    this._backendService.listTemplates()
      .subscribe((cardsHttpResponse) => {this.display_N_Objects(cardsHttpResponse, 3); this.A = cardsHttpResponse});
    this.getKeyboardInput();

  }

  ngOnDestroy(): void {
    this.backendServiceSubscription.unsubscribe();
    this.getKeyboardInput().unsubscribe();
  }
}
