import { Component, OnInit } from '@angular/core';
import { ApiService } from '../core/api.service';
import { AuthService } from '../core/auth.service';
import { RecordItem } from '../core/models';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  records: RecordItem[] = [];
  loading = true;


  constructor(
    public auth: AuthService,
    private api: ApiService
  ) {}


  ngOnInit() {
    this.api.records(
      this.auth.user!.userId
    ).subscribe({
      next: r => this.records = r,

      complete: () =>
        this.loading = false,

      error: () =>
        this.loading = false
    });
  }

}