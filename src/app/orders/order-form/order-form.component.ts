import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { IContactForm } from '../interfaces/contactForm';
import { Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})



export class OrderFormComponent implements OnInit {

  contactForm: FormGroup;

  contactFG: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    tel: new FormControl('')
  });

  // contactFieldsArray: IContactForm;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      webdomain: [''],      
      contactFieldsArray: this.fb.array([])
    });
  }
  get contactFieldsArray(): FormArray {
    return this.contactForm.get("contactFieldsArray") as FormArray
  }

  addContactFields() {
    this.contactFieldsArray.push(this.contactFG);
  }




  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.log(this.contactForm.value);
  }

  keyClicks() {
    const searchBox = document.getElementById('webdomain') as HTMLInputElement;
    const typeahead = fromEvent(searchBox, 'input').pipe(
      map(e => (e.target as HTMLInputElement).value),
      filter(text => text.length > 4),
      debounceTime(500),
      distinctUntilChanged(),
      // switchMap(searchTerm => ajax(`/api/endpoint?search=${searchTerm}`))
    );
    typeahead.subscribe(x => console.log(x));
  }

  ngOnInit(): void {
    this.keyClicks();
  }


}
function ajax(arg0: string): any {
  throw new Error('Function not implemented.');
}

