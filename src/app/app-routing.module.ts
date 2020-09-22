import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';


const routes: Routes = [
  /* { path: '**', component: DashboardComponent }, */
  {
    path: 'customers',
    loadChildren: () =>
      import('./pages/customers/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'campaigns',
    loadChildren: () =>
      import('./pages/campaigns/campaigns.module').then(m => m.CampaignsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
