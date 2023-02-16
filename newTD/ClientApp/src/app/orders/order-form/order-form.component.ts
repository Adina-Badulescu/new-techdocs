import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup } from '@angular/forms';
import { IContactForm } from '../interfaces/contactForm';
import { Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WhoisService } from 'app/services/whois.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})



export class OrderFormComponent implements OnInit {

  contactForm: FormGroup;

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
      //tap(_ => console.time()),
      debounceTime(2000),
      distinctUntilChanged(),      
      //tap(_ => console.timeEnd()),
      //tap(_ =>  this.addContactFields())
      switchMap(searchTerm => this.whoisService.searchUrl(searchTerm))
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

