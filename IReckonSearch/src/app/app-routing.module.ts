import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { EmptyComponent } from './empty/empty.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "home", component: HomeComponent },
  { path: "customer/:id", 
  component: CustomerDetailsComponent,
    children: [
      { path: "", redirectTo: "data", pathMatch: "full" },
      { path: "data", component: CustomerDataComponent },
      { path: "profileIds", component: EmptyComponent },
      { path: "timeline", component: EmptyComponent }
    ]},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
