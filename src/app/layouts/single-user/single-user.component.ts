import { CommonModule, KeyValuePipe } from '@angular/common';

import { Component, inject, OnInit } from '@angular/core';

import { AuthLoginService } from '../../Services/auth-login.service';
import { User } from '../../Model/user.model';

@Component({
  selector: 'app-single-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-user.component.html',
  styleUrl: './single-user.component.css'
})
export class SingleUserComponent implements OnInit{
public userData:any

private authUser=inject(AuthLoginService)

ngOnInit(): void {

this.authUser.getLoginUser().subscribe({next:(res)=>{
  
  this.userData=res;
  
  console.log(this.userData );
},error:(err)=>{console.log(err);}})
}
}
