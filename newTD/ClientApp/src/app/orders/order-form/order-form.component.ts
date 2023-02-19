import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { IContactForm } from '../interfaces/contactForm';
import { Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap, tap, catchError, of, retry, empty, Observable, Subscription, iif, finalize } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WhoisService } from 'app/services/whois.service';


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

  contactFG: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl(''),
    tel: new FormControl('')
  });

  // contactFieldsArray: IContactForm;

  constructor(private fb: FormBuilder, private whoisService: WhoisService) {
    this.contactForm = this.fb.group({
      webdomain: [''],
      contactFieldsArray: this.fb.array([])
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
      switchMap(searchTerm => this.whoisService.searchUrl(searchTerm))
    ).pipe(
      tap(r => this.searchingSpinner = true)
    )
    .pipe(
      tap(httpQueryResultAsBoolean => this.addContactFields(httpQueryResultAsBoolean))
    )
    return keyboardInput;
  }

  ngOnInit(): void {
    this.keyClicksSubscription = this.keyClicks().subscribe(KeyboardEvent => this.searchResult = KeyboardEvent);
  }

  ngOnDestroy(): void {
    this.keyClicksSubscription.unsubscribe();
  }

}


