
import { Component, inject, OnInit } from '@angular/core';
import { ApiProductsService } from '../../Services/api-products.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { HomeComponent } from "../home/home.component";
import { CatagoriesComponent } from "../catagories/catagories.component";

@Component({
  selector: 'app-products',

  standalone: true,
  imports: [FormsModule, RouterLink, CurrencyPipe, CommonModule, FooterComponent, HeaderComponent, HomeComponent, CatagoriesComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
 private routes=inject(ActivatedRoute)
  public productList: any[] = [];
  public limit: number = 10;
  public skip: number = 0;
  public totalProducts: number = 0;
   productId:any

  newAddProduct = {          
    id: null,
    title: '',
    description: '',
    price: 0,
    rating: ''
  };

  showAddForm: boolean = false;
  isUpdateMode: boolean = false;

  constructor(private apiProds: ApiProductsService, private router: Router, private cart: CartService) {}

  ngOnInit(): void {
    this.getMoreProduct();

  }

  allProductsList() {
    this.apiProds.getAllProduct().subscribe({
      next: (res) => {
        this.productList = res.products;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getMoreProduct() {
    this.apiProds.LimitedProduct(this.limit, this.skip).subscribe({
      next: (res) => {
        this.productList = [...this.productList, ...res.products];
        this.totalProducts = res.total;
        this.skip += this.limit;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  openShowAddForm() {
    this.showAddForm = true;
    this.isUpdateMode = false;
    this.newAddProduct = { id: null, title: '', description: '', price: 0, rating: '' };
  }

  closeShowForm() {
    this.showAddForm = false;
  }

  addNewProduct() {
    this.apiProds.addNewProduct(this.newAddProduct).subscribe({
      next: (res) => {
        this.productList.push(res);
    console.log("added",res);

        this.showAddForm = false;
        this.allProductsList();
      },
      error: (err) => { console.log(err); }
    });
  }

  openUpdateForm(product: any) {
    this.showAddForm = true;
    this.isUpdateMode = true;
    this.productId = product.id; 
    this.newAddProduct = { ...product }; 
  }

  updateProduct() {
    console.log(this.productId);
    console.log(this.newAddProduct)
    this.apiProds.updateProduct(this.productId!, this.newAddProduct).subscribe({
      next: (res) => {

        console.log("update" ,res)
        this.productList = this.productList.map(product => 
          product.id === this.productId ? { ...product,...this.newAddProduct } : product
        ); 
        this.showAddForm = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // updateProduct(){
  //   this.apiProds.updateProduct(this.productId!,{price:this.updatePrice,description:this.updateDescription}).subscribe({next:(res)=>{
  //     console.log(res);
  //     this.product.title=this.updateTitle;
  //     this.product.price=this.updatePrice
  //     this.showAddForm=true
  //   },error:(err)=>{
  //     console.log(err)
  //   }})
  // }


  onDeleteProduct(productId: string) {
    this.apiProds.deleteProduct(productId).subscribe({
      next: () => {
        this.productList = this.productList.filter(pro => pro.id !== productId);
        alert(`Product ${productId} deleted successfully`);
      },
      error: (err) => { console.log(err); }
    });
  }

  addToCart(product: any) {
    this.cart.addToCart(product);
    alert('Product added successfully');
  }
}
