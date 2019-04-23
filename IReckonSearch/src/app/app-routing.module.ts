import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { EmptyComponent } from './empty/empty.component';
import { NoResultComponent } from './no-result/no-result.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "no-results", component: NoResultComponent },
  { path: "customer/:id", 
  component: CustomerDetailsComponent,
    children: [
      { path: "", redirectTo: "data", pathMatch: "full" },
      { path: "data", component: CustomerDataComponent },
      { path: "profileIds", component: EmptyComponent },
      { path: "timeline", component: EmptyComponent }
    ]},
  { path: "error", component: ErrorComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
