import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { AuthLoginService } from '../../Services/auth-login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{


 totalItem:number= 0;

 searchData:string=''

 constructor(private cartService:CartService,private router:Router, private authService:AuthLoginService){

 }

ngOnInit(): void {
this.updateCartCout()
  
 
}
updateCartCout(){
 this.totalItem=this.cartService.getCartItemNo()
 console.log(this.totalItem);
}


onSearchData(){
  // if(this.searchData){
    this.router.navigate(['productts/search'],{queryParams:{q:this.searchData}})
  // }
}

  logoutBtn(){
    this.authService.deleteToken()
    console.log("logged out successfully ")
    
  }
}
