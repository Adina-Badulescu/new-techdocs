import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'app/services/backend/backend.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private _backendService: BackendService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      // private accountService: AccountService,
      // private alertService: AlertService
  ) { }

  ngOnInit() {
      this.form = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      // this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this._backendService.login(this.f.username.value, this.f.password.value)
          // .pipe(first())
          // .subscribe({
          //     next: () => {
          //         // get return url from query parameters or default to home page
          //         const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          //         this.router.navigateByUrl(returnUrl);
          //     },
          //     error: (error: any) => {
          //         // this.alertService.error(error);
          //         this.loading = false;
          //     }
          // });
  }

}
