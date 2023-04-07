import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { IContactForm } from '../interfaces/contactForm';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  constructor(private _fb: FormBuilder,) { }

  templatesForm = this._fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    content: ['', Validators.required]
  });

  get f() {
    return this.templatesForm.value;
  }

  onSubmit() {
    console.log(this.f);    
  }

  ngOnInit(): void {
  }

}
