import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { IContactForm } from '../interfaces/contactForm';
import { Validators } from '@angular/forms';
import { ICard } from 'app/models/ICard.interface';
import { BackendService } from 'app/services/backend/backend.service';
import { ComponentCommunicationService } from 'app/services/component-communication/component-com.service';


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  
  templatesList: ICard[] = [];
  maxTemplateNumber: number = 10000;
  constructor(private _fb: FormBuilder, private _backendService: BackendService, private componentComm: ComponentCommunicationService) { }

  templatesForm = this._fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    content: ['', Validators.required]
  });

  get f() {
    return this.templatesForm.value;
  }
  
  trackByFn(index: number, item: ICard) {
    return item.TemplateId;
  }

  onSubmit() {
    console.log(this.f);    
  }

  ngOnInit(): void {
    this._backendService.listTemplates(this.maxTemplateNumber, null)
    .subscribe(template => this.templatesList = template);    
  }

}
