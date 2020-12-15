// import { Component, OnInit } from '@angular/core';
// import { FormGroup,FormControl,Validators } from '@angular/forms'


// @Component({
//   selector: 'pb-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss']
// })
// export class LoginComponent implements OnInit {

//   // hide = true;
//   // loginForm : FormGroup;
//   constructor() { }

//   ngOnInit(): void {
//   //   this.loginForm = new FormGroup(
//   //     {
//   //     email : new FormControl('',[Validators.required,Validators.email]),
//   //     password : new FormControl('',[Validators.required,Validators.minLength(6)])
//   //   }
//   // );

// }
// // onLogin(){

// // }
// }

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
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
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(data =>{
              console.log("^^^^^^^^^^^^^ data ",data);
              this.router.navigate(['/home']);
                // next: () => {
                //     // get return url from query parameters or default to home page
                //     const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
                //     this.router.navigateByUrl(returnUrl);
                // },
                // error: error => {
                //     this.alertService.error(error);
                //     this.loading = false;
                // }
            });
    }
}



// this.dataService.login(this.f.username.value, this.f.password.value)
//         .pipe(first())
//         .subscribe(
//            data => {
//               console.log(data.success);
//                 // get return url from query parameters or default to home page
//                 // const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
//                 // this.router.navigateByUrl(returnUrl);
//                 if(data.success)
//                 {
//                   this.dataService.setLoggedIn()
//                   const token = data.token;
//                   localStorage.setItem('jwt111',token);
//                   console.log(this.f.username.value)
//                   this.router.navigate(['/dashboard',this.f.username.value]);
//                 }
//                 else
//                 this.router.navigate(['/p404']);
//                 // System.out.println("<script>alert('Login fail.')</script>");
//             },
//              error => {
//                 // this.alertService.error(error);
//                 this.loading = false;
//             }
//         );

