import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { IContactForm } from '../interfaces/contactForm';
import { Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap, tap, catchError, of, retry, Observable, Subscription, iif, finalize, Subject, BehaviorSubject } from 'rxjs';

import { BackendService } from 'app/services/backend/backend.service';
import { SpinnerService } from 'app/services/spinner/spinner.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})



export class OrderFormComponent implements OnInit, OnDestroy {

  contactForm: FormGroup;
  searchResult?: boolean;
  searchingSpinner?: boolean = false;
  keyClicksSubscription: Subscription = new Subscription();
  routeParamsSubscription: Subscription = new Subscription();
  displaySpinner: BehaviorSubject<boolean> = this._spinnerService.spinnerBooleanState;
  templateTitle: string = '';
  templateId: string = '';

  contactFG: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl(''),
    tel: new FormControl('')
  });

  // contactFieldsArray: IContactForm;

  constructor(private _fb: FormBuilder,
    private _backendService: BackendService,
    private _spinnerService: SpinnerService,
    private route: ActivatedRoute) {
    this.contactForm = this._fb.group({
      webdomain: [''],
      contactFieldsArray: this._fb.array([])
    });
  }
  get contactFieldsArray(): FormArray {
    return this.contactForm.get("contactFieldsArray") as FormArray
  }

  addContactFields(showContactForm: boolean): boolean {
    if (showContactForm === true) {
      this.contactFieldsArray.push(this.contactFG);
    } else {
      this.contactFieldsArray.clear();
    }
    return showContactForm;
  }




  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.contactForm.value);
  }

  keyClicks(): Observable<boolean> {
    const searchBox = document.getElementById('webdomain') as HTMLInputElement;
    const keyboardInput = fromEvent(searchBox, 'input').pipe(
      map(e => (e.target as HTMLInputElement).value),
      filter(text => text.length > 4),
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap(searchTerm => this._backendService.searchDomain(searchTerm))
    )
      .pipe(
        tap(httpQueryResultAsBoolean => this.addContactFields(httpQueryResultAsBoolean))
      )
    return keyboardInput;
  }

  ngOnInit(): void {
    this.keyClicksSubscription = this.keyClicks().subscribe(KeyboardEvent => this.searchResult = KeyboardEvent);
    this.routeParamsSubscription = this.route.queryParams
      .subscribe(params => {
        this.templateTitle = params.order;
        this.templateId = params.Id;
        console.log(`Template Title: ${this.templateTitle} - Template Id: ${this.templateId}`); // popular
      });
  }

  ngOnDestroy(): void {
    this.keyClicksSubscription.unsubscribe();
    this.routeParamsSubscription.unsubscribe
  }

}


