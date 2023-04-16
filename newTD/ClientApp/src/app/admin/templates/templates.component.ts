import { Component, ElementRef, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { IContactForm } from '../interfaces/contactForm';
import { Validators } from '@angular/forms';
import { ITemplate } from 'app/models/ITemplate.interface';
import { BackendService } from 'app/services/backend/backend.service';
import { ComponentCommunicationService } from 'app/services/component-communication/component-com.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  form!: FormGroup;
  templatesList: ITemplate[] = [];
  maxNumberOfTemplates: number = 10000;
  submitted = false;
  loading = false;
  formData = new FormData();
  // modal: ModalComponent;
  constructor(private formBuilder: FormBuilder,
    private _backendService: BackendService,
    private componentComm: ComponentCommunicationService,
  ) { }



  get f() {
    return this.form.value;
  }

  trackByFn(index: number, item: ITemplate) {
    return item.TemplateId;
  }

  openModal() {
    this.componentComm.sendFlag(true);
  }

  uploadFiles(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.formData.append('files', event.target.files[i]);
      }
    }
  }


  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.form.invalid) {
      return;
    }
    this.formData.append('title', this.form?.get('title')?.value);
    this.formData.append('description', this.form?.get('description')?.value);


    this._backendService.createTemplate(this.formData)
      .subscribe({
        next: () => {
          alert("template added");
          this.loading = false;
        },
        error: (e: HttpErrorResponse) => {          
          alert(JSON.stringify(e));
          this.loading = true;
        }
      });
      

      this._backendService.listTemplates(this.maxNumberOfTemplates, null)
      .subscribe({
        next: (templates) => {
          this.templatesList = templates
        },
        error: (e: HttpErrorResponse) => {
          alert(JSON.stringify(e));
        }
      });
      
  }

  ngOnInit(): void {
    this._backendService.listTemplates(this.maxNumberOfTemplates, null)
    .subscribe({
      next: (templates) => {
        this.templatesList = templates
      },
      error: (e: HttpErrorResponse) => {
        alert(JSON.stringify(e));
      }
    });

    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      files: [null],
      // mainColors: [null],
      // responsiveColumns: [null],
      // imgPath: [null]
    });
  }

}
