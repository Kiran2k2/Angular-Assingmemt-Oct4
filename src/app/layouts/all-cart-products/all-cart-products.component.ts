import { CartProduct } from './../../Model/cart.model';
import { Component, inject, OnInit } from '@angular/core';
import { AllCartServiceService } from '../../Services/all-cart-service.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-cart-products',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,FormsModule],
  templateUrl: './all-cart-products.component.html',
  styleUrl: './all-cart-products.component.css'
})
export class AllCartProductsComponent  implements OnInit{

  cartProduct:any[]=[];
  showAddForm:boolean=false;
  userId:number=0;
  productsData=[{id:0,quantity:0}]
  

  constructor(private apiService:AllCartServiceService){

  }

ngOnInit(): void {
  this.fetchAllCartData()
}

fetchAllCartData(){
  this.apiService.getAllCartProducts().subscribe({next:(res)=>{
   this.cartProduct=res.carts
   console.log(res.carts)
  },error:(err)=>{
    console.log(err)
  }})
}

onDeleteCart(cartId:number){

  if(confirm("sure Want to delete this")){
  this.apiService.getDeleteCart(cartId).subscribe({next:(res)=>{

    this.cartProduct=this.cartProduct.filter((cart)=>cart.id!==cartId)
    alert(` Cart-Id:${cartId} deleteed successfullyy`)


  },error:(err)=>{console.log(err)}
})
}
}


onAddProductCart(){
  this.apiService.getAddCartData(this.userId,this.productsData).subscribe({next:(res)=>{
    console.log("respADD" ,res)
this.showAddForm=true;
this.fetchAllCartData()

  },error:(err)=>{console.log(err)}})

}



toggleAddProductForm() {
  this.showAddForm = !this.showAddForm;
}


onUpdateData(cartId: number, productId: number, quantity: number){

  this.apiService.getUpdateTheCart(cartId,[{id:productId,quanty:quantity}]).subscribe({next:(res)=>{
    this.fetchAllCartData()
  },error:(err)=>{console.log(err)}})
}



}
