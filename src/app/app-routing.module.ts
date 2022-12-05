import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'app', component: LayoutBlankComponent, children: [
      {
        path: '', component: LayoutComponent, children: [
          { 
            path: 'dashboard', component: DashboardComponent
          },
        ]
      },
    ]
  },
  {
    path: '', redirectTo: 'app/dashboard', pathMatch: 'full'
  },
  { 
    path: '**', redirectTo: 'app/404', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
