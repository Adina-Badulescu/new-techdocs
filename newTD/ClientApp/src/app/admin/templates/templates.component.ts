import { Component, ElementRef, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { IContactForm } from '../interfaces/contactForm';
import { Validators } from '@angular/forms';
import { ITemplate } from 'app/models/ITemplate.interface';
import { BackendService } from 'app/services/backend/backend.service';
import { ComponentCommunicationService } from 'app/services/component-communication/component-com.service';
import { ModalComponent } from '../modal/modal.component';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  form!: FormGroup;
  templatesList: ITemplate[] = [];
  maxTemplateNumber: number = 10000;
  submitted = false;
  loading = false;
  // modal: ModalComponent;
  constructor(private formBuilder: FormBuilder,
    private _backendService: BackendService,
    private componentComm: ComponentCommunicationService,
  ) {
    // this.modal = this.el;
  }



  get f() {
    return this.form.value;
  }

  trackByFn(index: number, item: ITemplate) {
    return item.TemplateId;
  }

  openModal() {
    this.componentComm.sendFlag(true);
  }

  onSubmit() {    
    this.submitted = true;
    this.loading = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.f.content);
    
    this._backendService.createTemplate(this.f)
    .subscribe({
      next: () => {
        alert("template added");
        this.loading = false;
        this._backendService.listTemplates(this.maxTemplateNumber, null)
        .subscribe(template => this.templatesList = template);
      },
      error: (e: HttpErrorResponse) => {
        alert(e.error.errors);
        this.loading = false;
      }
    });
  }

  ngOnInit(): void {
    this._backendService.listTemplates(this.maxTemplateNumber, null)
      .subscribe(template => this.templatesList = template);

    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      content: [null],
      // mainColors: [null],
      // responsiveColumns: [null],
      // imgPath: [null]
    });
  }

}
