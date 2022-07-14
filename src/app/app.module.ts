import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore'
import {environment} from 'src/environments/environment'
import {ChartModule, LineSeriesService, CategoryService, LegendService, DataLabelService, TooltipService} from '@syncfusion/ej2-angular-charts';
import { NavbarComponent } from './navbar/navbar.component'

const appRoutes: Routes = [
{
  path: 'dashboard',
  component: DashboardComponent
},

{
  path: 'home',
  component: HomeComponent
},
];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    ChartModule
  ],
  providers: [LineSeriesService, CategoryService, LegendService, DataLabelService, TooltipService],
  bootstrap: [AppComponent]
})
export class AppModule { }
