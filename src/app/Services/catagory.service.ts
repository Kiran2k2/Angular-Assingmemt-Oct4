import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductResponse } from '../Model/products.model';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {
 cataUrl="https://dummyjson.com/products/category/"
  constructor(private http:HttpClient) { }

  
getCatagoryProd(catagory:any):Observable<any>{
 return this.http.get<any>(`${this.cataUrl}${catagory}`)
}



}
