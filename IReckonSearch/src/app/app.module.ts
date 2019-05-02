import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { StoreModule } from "@ngrx/store";
import { reducer } from './state';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './effects';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuickFactsComponent } from './quick-facts/quick-facts.component';
import { CustomerStatusComponent } from './customer-status/customer-status.component';
import { CustomerTopThreeComponent } from './customer-top-three/customer-top-three.component';
import { RFMScoreComponent } from './rfmscore/rfmscore.component';
import { OtherFactsComponent } from './other-facts/other-facts.component';
import { UserListComponent } from './user-list/user-list.component';
import { CustomerDataComponent } from './customer-data/customer-data.component';
import { EmptyComponent } from './empty/empty.component';
import { QuickFactComponent } from './quick-fact/quick-fact.component';
import { MyMaterialsModule } from './my-materials/my-materials.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchBarComponent,
    CustomerDetailsComponent,
    QuickFactsComponent,
    CustomerStatusComponent,
    CustomerTopThreeComponent,
    RFMScoreComponent,
    OtherFactsComponent,
    UserListComponent,
    CustomerDataComponent,
    EmptyComponent,
    QuickFactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialsModule,
    HttpClientModule,
    // Here we configure the store with reducers
    StoreModule.forRoot({
      app: reducer
    }),
    // And the attached effects
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
