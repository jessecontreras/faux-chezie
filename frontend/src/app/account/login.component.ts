//Ng dependencies
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../_services/alert.service';
import { User } from '../_models/user.model';
import { first } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //Create login form with respective validators
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  formSubmitted: boolean = false;
  buttonText: string = 'Log In';
  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async authUser() {
    try {
      this.buttonText = 'Please wait ...';
      this.alertService.clear();
      this.formSubmitted = true;
      const emailValue = this.loginForm.controls['email'].value;
      const passwordValue = this.loginForm.controls['password'].value;
      if (this.loginForm.invalid) {
        this.resetFormValues();
        return;
      }

      this.accountService
        .authUser(emailValue, passwordValue)
        .pipe(first())
        .subscribe({
          next: (response) => {
            //narrow type check
            if ('error' in response) {
              this.alertService.error(response.error);
              this.resetFormValues();
              return;
            }
            // get return url from query parameters or default to home page
            const returnUrl =
              this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigateByUrl(returnUrl);
          },
          error: (error) => {
            this.alertService.error(error);
            this.resetFormValues();
            // this.loading = false;
          },
        });
      return;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async resetFormValues() {
    try {
      //this.processingLogin = false;
      this.buttonText = 'Log In';
      return;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
