import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  passwordPattern = "^(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]{6,}$";
  user = this.fb.group({
    email: ['example@questionaire.com', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['JoeB21', [Validators.required, Validators.pattern(this.passwordPattern)]]
  });

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit() {}

  onSubmit(): void {
    if (this.user.get('email')?.value === 'example@questionaire.com' && this.user.get('password')?.value === 'JoeB21') {
      localStorage.setItem('isUserLoggedInAng', '1')
      location.reload()
    } else {
      this.openSnackBar('Login failed!', 'Cancel')
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 })
  }
}
