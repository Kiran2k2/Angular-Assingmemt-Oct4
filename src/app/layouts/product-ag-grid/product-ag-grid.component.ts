import { Component, OnInit } from '@angular/core';
import { ApiProductsService } from '../../Services/api-products.service';
import { Product } from '../../Model/products.model';
import { ColDef } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  standalone:true,
  imports:[AgGridAngular,FormsModule,CommonModule],
  selector: 'app-product-ag-grid',
  templateUrl: './product-ag-grid.component.html',
  styleUrls: ['./product-ag-grid.component.css']
})
export class ProductAgGridComponent implements OnInit {
  productList: Product[] = [];
  gridApi:any
  paginationPageSize: number = 10; 
  isEditMode: boolean = true;
  isModalVisible: boolean = false;
  selectedProduct:any;

 

  newProduct: any = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    thumbnail: ''
  };





  constructor(private apiProducts: ApiProductsService) {}

  colDefs: ColDef[] = [
    { field: 'id', headerName: 'Product ID',cellStyle:{'margin-right':'10px'} },
    { field: 'title', headerName: 'Product Name' },
    {
      field: 'thumbnail',
      headerName: 'Image',
      cellRenderer: (data: any) => `<img src="${data.value}" style="width: 50px; height: 50px;">`
    },
    { field: 'price', headerName: 'Price' },
    {
      headerName: 'Edit',
      cellRenderer: () => {
        return `
          <button class="btn-edit">Edit</button>
         
        `;
      },
      onCellClicked: (params: any) => this.onEditRow(params.data)
    },{

      headerName: 'Delete',
      cellRenderer: () => {
        return `
         
          <button class="btn-delete"><i class="fas fa-trash"></i></button>
        `;
      },
      onCellClicked: (params: any) => this.onDeleteRow(params.data.id)




    }
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1
  };

  ngOnInit(): void {
    this.onGetProducts();
  }

  
  onGetProducts() {
    this.apiProducts.getAllProduct().subscribe({
      next: (res) => {
        this.productList = res.products;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  onDeleteRow(productId:string) {
    this.apiProducts.deleteProduct(productId).subscribe((res) => {
      this.productList = this.productList.filter((product)=>product.id!==productId);
      
    });
  }

  
  // onEditRow(product: Product) {
  //   const newTitle = prompt('Enter new product name:', product.title);
  //   const newPrice = prompt('Enter new product price:', product.price.toString());

  //   if (newTitle !== null && newPrice !== null) {
  //     product.title = newTitle;
  //     product.price = parseFloat(newPrice);

  //     this.apiProducts.updateProduct(product.id, product).subscribe({
  //       next: (res) => {
  //         this.gridApi.applyTransaction({ update: [res] }); 
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       }
  //     });
  //   }
  // }
 

  onEditRow(product: Product) {
    this.selectedProduct = { ...product }; 
    this.isModalVisible = true; 
  }

  updateProduct() {
    this.apiProducts.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe({
      next: (res) => {
        this.gridApi.applyTransaction({ update: [res] });
        this.isModalVisible = false; 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  closeModal() {
    this.isModalVisible = false;
  }











  openAddProductModal() {
    this.isEditMode = false; // Set to add mode
    this.selectedProduct = { id: null, title: '', price: 0, description: '', thumbnail: '' }; // Clear the form
    this.isModalVisible = true; // Show the modal
  }






  OnGridReady(params:any){
   this.gridApi=params.api
  }

  addNewProduct() {
    this.apiProducts.addNewProduct(this.selectedProduct).subscribe({
      next: (newProduct) => {
        this.productList.push(newProduct);
        this.gridApi.applyTransaction(this.productList); 
        console.log(newProduct)
        alert(`Product added`)
        this.isModalVisible = false; 
      },
      error: (err) => {
        console.error('Error adding product:', err);
      }
    });
  }


}