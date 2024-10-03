import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  public cart: any = [];
  public grandTotal :number=0
totalQuantity:number=0
  constructor(private getCart:CartService){
}
  ngOnInit(): void {
   this.cart= this.getCart.getCartItem()
  //





  this.getCart.getCartTotalPrice().subscribe(price => {
    this.grandTotal = price;
    console.log(this.grandTotal);
  });

 
  this.getCart.getTotalCartQuantity().subscribe(quantity => {
    
    this.totalQuantity = quantity;
        // console.log(this.totalQuantity);

  });
}


inccreaseProdQuantity(item:any){
  this.getCart.increaseProductQuanty(item)
}

decreaseCartQuantity(item:any){
  this.getCart.decreseCartQuantity(item)
}

removeProduct(productId:number){
  this.getCart.removeItemCart(productId)
  // console.log(productId);
  this.cart=this.getCart.getCartItem()
  // console.log(this.cart);
}


deleteApi(productId:number){
  this.getCart.deleteCartItem(productId).subscribe(()=>{
    this.removeProduct(productId)
console.log(productId);

  })
 
  
}
emptyCart(){

  this.getCart.removeAllCart();
  console.log("onclick")

}


}
