import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LoginComponent } from "./login/login.component";

import { MainAdminComponent } from "./mainadmin/mainadmin.component"; 
import {MainplayerComponent} from "./mainplayer/mainplayer.component"; 
import {GameComponent} from "./game/game.component"; 
import { AuthGuardGuard } from './auth-guard.guard';
import { JwtModule } from '@auth0/angular-jwt';
import {MaintombolaComponent} from "./maintombola/maintombola.component"; 


export function tokenGetter() {
   let result: [];
    result = JSON.parse(sessionStorage.getItem('user'));
    if(result){
      return result['token'];
    }
    return "";
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    LoginComponent,
    MainAdminComponent,
    MainplayerComponent,
    GameComponent,
    MaintombolaComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'Login', component: LoginComponent },
      { path: 'MainAdmin', component: MainAdminComponent, canActivate: [AuthGuardGuard] },     
      { path: 'MainPlayer/:roomname', component: MainplayerComponent },
      { path: 'Game/:roomname', component: GameComponent },
      { path: 'MainTombola/:roomname', component: MaintombolaComponent, canActivate: [AuthGuardGuard] },

    ]),
    
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['https://localhost:5001/'],
        disallowedRoutes:[]
      }
    })

  ],
  providers: [AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
