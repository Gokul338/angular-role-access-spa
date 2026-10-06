import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { User } from '../core/models';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  loading = true;
  show = false;
  message = '';

  form = this.fb.group({
    userId: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['General User', Validators.required]
  });


  constructor(
    private api: ApiService,
    private fb: FormBuilder
  ) {}


  ngOnInit() {
    this.refresh();
  }


  refresh() {
    this.loading = true;

    this.api.users().subscribe({
      next: u => this.users = u,
      complete: () => this.loading = false
    });
  }


  add() {
    if (this.form.invalid) return;

    this.api.addUser(this.form.value).subscribe({
      next: () => {
        this.message = 'User created successfully';

        this.form.reset({
          role: 'General User'
        });

        this.show = false;

        this.refresh();
      },

      error: e =>
        this.message =
          e.error?.message || 'Could not create user'
    });
  }


  remove(id: number) {
    if (!confirm('Delete this user?')) return;

    this.api.deleteUser(id).subscribe(() =>
      this.refresh()
    );
  }

}