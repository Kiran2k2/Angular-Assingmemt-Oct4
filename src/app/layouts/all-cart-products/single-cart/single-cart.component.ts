import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllCartServiceService } from '../../../Services/all-cart-service.service';
import { Carts } from '../../../Model/cart.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './single-cart.component.html',
  styleUrl: './single-cart.component.css'
})
export class SingleCartComponent implements OnInit{
cart!:Carts
  constructor(private routee: ActivatedRoute, private apiService:AllCartServiceService
  ){}

ngOnInit(): void {
  const cartId= this.routee.snapshot.paramMap.get('id')!;
  this.getSingleData(cartId)
}

getSingleData(cartId:any){
this.apiService.getSingleCartProduct(cartId).subscribe({next:(res)=>{
   this.cart=res
},
error:(err)=>{
  console.log(err)
}})
}

}
