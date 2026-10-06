import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {

  loading = false;
  error = '';

  form = this.fb.group({
    userId: ['', Validators.required],
    password: ['', Validators.required],
    role: ['General User', Validators.required]
  });


  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private router: Router
  ) {}


  submit() {
    if (this.form.invalid) return;

    this.loading = true;
    this.error = '';

    const v = this.form.value;

    this.api.login(
      v.userId!,
      v.password!,
      v.role as any
    ).subscribe({

      next: r => {
        this.auth.login(r.user, r.token);

        this.router.navigate(['/dashboard']);
      },

      error: e => {
        this.error =
          e.error?.message || 'Unable to login';

        this.loading = false;
      },

      complete: () =>
        this.loading = false
    });
  }

}