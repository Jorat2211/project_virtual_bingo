import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable(
)
export class AuthGuardGuard implements CanActivate {

  private logueado: [];

  constructor(private JwtHelper: JwtHelperService, private Router: Router) {
  }
  
  canActivate(){
    this.logueado = JSON.parse(sessionStorage.getItem('user'));
    if(this.logueado){
      const token = this.logueado['token'];
      if(token && !this.JwtHelper.isTokenExpired(token)){
        return true;
      }
    }
    sessionStorage.clear();
    this.Router.navigate(['Login']);
    
    return false;
  }
  
}
