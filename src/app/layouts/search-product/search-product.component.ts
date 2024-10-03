import { Component, OnInit } from '@angular/core';
import { ApiProductsService } from '../../Services/api-products.service';
import { Product, ProductResponse } from '../../Model/products.model';
import { FormsModule, ɵNgNoValidate } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-product',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search-product.component.html',
  styleUrl: './search-product.component.css'
})
export class SearchProductComponent implements OnInit
 {
 query:string=''
 products:Product[]=[]

  constructor(private searchProdService:ApiProductsService,
    private router:Router,private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(p=>{this.query=p['q']||'';
      if(this.query){
        this.getSearchItem()
      }
     })
  }



  getSearchItem(){
    this.searchProdService.searrchProduct(this.query).subscribe({next:(res)=>{
     this.products=res.products
    },error:(err)=>{
      console.log(err)
    }})
  }

}
