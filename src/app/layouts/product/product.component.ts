import { ApiProductsService } from './../../Services/api-products.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { CartService } from '../../Services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HeaderComponent,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  route=inject(ActivatedRoute)
product:any;
updateTitle:string='';
updatePrice:number=0;
updateDescription:string=''
isEditing:boolean=false;
productId=this.route.snapshot.paramMap.get('id')


  constructor(
   
     private cartSer:CartService,
     private productApi:ApiProductsService,
    private router:Router ){ }


    
    addToCart(){
      this.cartSer.addToCart(this.product)
      console.log(this.product);
    }
  

  ngOnInit(): void {
    // const productId = this.route.snapshot.paramMap.get('id');
    this.productApi.getSingleProduct(this.productId!).subscribe(response => {
        console.log(response  );
        this.product = response;
       this.updateTitle=this.product.title,
        this.updatePrice=this.product.price,
        this.updateDescription=this.product.description
      });
  }

 

updatedProd(){
  // const productId=this.route.snapshot.paramMap.get('id')
  this.productApi.updateProduct(this.productId!,{title:this.updateTitle,price:this.updatePrice,description:this.updateDescription}).subscribe({next:(res)=>{
    console.log(res);
    this.product.title=this.updateTitle;
    this.isEditing=false
  },error:(err)=>{
    console.log(err)
  }})
}

toggle(){
  this.isEditing=!this.isEditing
}
deletePro(){

  if(this.productId){
   const confirm=window.confirm("Are you sure want to delete the Product")
   if(confirm){

    this.productApi.deleteProduct(this.productId!).subscribe({next:(res)=>{
      console.log("delete product",res)
      this.router.navigateByUrl('/products')
      },error:(err)=>{
       console.log(err)
      }})
     }
   }
  }

}
