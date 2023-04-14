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
      // this.updateFiles(event, 'files')
    //  this.formData.append('files', event.target.files[0]);
     const files = [];
     files.push()
      // this._backendService.createTemplate(this.formData)
      // .subscribe({
      //   next: () => {
      //     alert("template added");
      //     this.loading = false;
      //     this._backendService.listTemplates(this.maxNumberOfTemplates, null)
      //       .subscribe(template => this.templatesList = template);
      //   },
      //   error: (e: HttpErrorResponse) => {
      //     alert(e.error.errors);
      //     this.loading = false;
      //   }
      // });
      
      // console.log(event.target.files);
      for (let i = 0; i < event.target.files.length; i++) {

        console.log(event.target.files[i]);
        files.push(event.target.files[i]);
        console.log(files);
        this.formData.append('files', event.target.files[i]);

      }

      // this.formData.append('files', files);
    }

  }

  // private updateFiles(event: any, formControlName: string) {
  //   const files = event.target.files;
  //   this.form.controls[formControlName].patchValue([files]);
  //   this.form.get(formControlName)?.updateValueAndValidity()
  // }



  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.form.invalid) {
      return;
    }
    
    
    // this.formData
    // this.formData.append('title', this.form?.get('title')?.value);
    // this.formData.append('description', this.form?.get('description')?.value);
    // const formData = new FormData();
    // Object.keys(this.form.controls).forEach(formControlName => {
      // console.log('formControlName ' + formControlName);      
      // this.formData.append(formControlName, this.form?.get(formControlName)?.value);
    // });

    this._backendService.createTemplate(this.formData)
      .subscribe({
        next: () => {
          alert("template added");
          this.loading = false;
          this._backendService.listTemplates(this.maxNumberOfTemplates, null)
            .subscribe(template => this.templatesList = template);
        },
        error: (e: HttpErrorResponse) => {
          alert(e.error.errors);
          this.loading = false;
        }
      });
  }

  ngOnInit(): void {
    this._backendService.listTemplates(this.maxNumberOfTemplates, null)
      .subscribe(template => this.templatesList = template);

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
