import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatToolbarModule, MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, MatTabsModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule, MatCardModule, MatDividerModule, MatListModule } from '@angular/material';
import { StoreModule } from "@ngrx/store";
import { reducer } from './state';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { QuickFactsComponent } from './quick-facts/quick-facts.component';
import { CustomerStatusComponent } from './customer-status/customer-status.component';
import { CustomerTopThreeComponent } from './customer-top-three/customer-top-three.component';
import { RFMScoreComponent } from './rfmscore/rfmscore.component';
import { OtherFactsComponent } from './other-facts/other-facts.component';
import { UserListComponent } from './user-list/user-list.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { EmptyComponent } from './empty/empty.component';
import { NoResultComponent } from './no-result/no-result.component';
import { QuickFactComponent } from './quick-fact/quick-fact.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchBarComponent,
    CustomerDetailsComponent,
    ErrorComponent,
    QuickFactsComponent,
    CustomerStatusComponent,
    CustomerTopThreeComponent,
    RFMScoreComponent,
    OtherFactsComponent,
    UserListComponent,
    CustomerDataComponent,
    EmptyComponent,
    NoResultComponent,
    QuickFactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatListModule,
    StoreModule.forRoot({
      app: reducer
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      name: `IReckonSearch - @ngrx DevTools`,
      logOnly: environment.production
    }),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
