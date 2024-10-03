import { Component, inject, viewChild } from '@angular/core';
import { AuthLoginService } from '../../Services/auth-login.service';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:FormGroup
  accessToken: string | null = null;
  username=''
  password=''

  constructor(private authService:AuthLoginService){

    this.accessToken = this.authService.getToken();

    this.loginForm= new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
    

  }
  router=inject(Router)
 


onSubmitLogin(){
  

if(this.loginForm.valid){
    const {username,password}=this.loginForm.value;
    console.log(username,password);

    this.authService.login(username,password).subscribe({next:(resp)=>{
      
      console.log(username,password);
      console.log('Login successfully',resp);

      // const token= resp;
      // localStorage.setItem('auth-token',resp);
      this.authService.storeToken(resp.accessToken)
      this.router.navigateByUrl('/products')
      this.loginForm.reset()
    },
    error:(error)=>{
      console.log('login Failed',error);
    }
  })
  }
}


getUser(){
  this.authService.getLoginUser().subscribe(  {next:(res)=>{
  console.log(res)
  },error:(err)=>{
    console.log(err)
  }})
}



}