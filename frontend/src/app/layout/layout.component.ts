import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

  constructor(
    public auth: AuthService
  ) {}

}