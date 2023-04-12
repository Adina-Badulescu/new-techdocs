import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthResponse } from 'app/models/IAuthResponse';
import { AuthService } from 'app/services/auth/auth.service';
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
        private _authService: AuthService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        // private accountService: AccountService,
        // private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(8)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.value; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        // this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this._authService.login(this.f)
            .pipe(first())
            .subscribe({
                next: () => {
                    // get return url from query parameters or default to home page
                    const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '';
                    this.router.navigateByUrl(returnUrl);
                },
                error: (e: HttpErrorResponse) => {
                    // console.log(e.error.errors)
                    alert(e.error.errors);
                    // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';
                    // this.router.navigateByUrl(returnUrl);               
                    // this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

}
