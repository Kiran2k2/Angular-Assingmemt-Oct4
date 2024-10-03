import { Component, inject, OnInit } from '@angular/core';
import { CatagoryService } from '../../Services/catagory.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-catagories',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './catagories.component.html',
  styleUrl: './catagories.component.css'
})
export class CatagoriesComponent implements OnInit
 {
  private route= inject(Router)

  catagoryProd:any[]=[]
   constructor( private catagory:CatagoryService,
    private httpC:HttpClient,
    private act:ActivatedRoute

   ){

   }
   ngOnInit(): void {

     
   }
 onViewCatagory(product:any){
  // // this.route.navigate(['product',product.category])
  // this.route.navigateByUrl("productss/:catagory")

 }



}
