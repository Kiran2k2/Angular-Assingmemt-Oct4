import { HttpClient, HttpHeaders } from '@angular/common/http';
import { compileNgModule } from '@angular/compiler';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  private loginUrl="https://dummyjson.com/auth/login";
  private token = 'auth-token';

  private authUserUrl="https://dummyjson.com/auth/me"
  constructor(private loginHttp:HttpClient){ }


  login(username:string,password:string):Observable<any>{
    const loginData={username,password,expiresInMins:30}
      return this.loginHttp.post(this.loginUrl,loginData)
  }
 


  storeToken(token: string): void {
    localStorage.setItem(this.token, token);
  }
  getToken(){
    return localStorage.getItem(this.token)
  }

  deleteToken(){
     localStorage.removeItem(this.token)
  }

  getLoginUser():Observable<any>{
    const token=localStorage.getItem('auth-token')
    
    const headers=new HttpHeaders({
        'Authorization':`Bearer ${token}`
    })

    return this.loginHttp.get(this.authUserUrl,{headers,withCredentials:false})

  }
}
