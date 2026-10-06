import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import {
  AuthGuard,
  AdminGuard
} from './core/auth.guard';


const routes: Routes = [

  {
    path: 'login',
    component: AuthComponent
  },

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],

    children: [

      {
        path: 'dashboard',
        component: DashboardComponent
      },

      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard]
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }

    ]
  },

  {
    path: '**',
    redirectTo: ''
  }

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],

  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}