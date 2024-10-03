import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {  Carts } from '../Model/cart.model';

@Injectable({
  providedIn: 'root'
})
export class AllCartServiceService {

private cartBaseUrl="https://dummyjson.com/carts"

  constructor( private httpClient:HttpClient) { }

getAllCartProducts():Observable<any >{
  return this.httpClient.get(`${this.cartBaseUrl}`).pipe(map((res:any)=>{
    return res
  }))
}


getSingleCartProduct(cartId:number):Observable<Carts>{
  return this.httpClient.get<Carts>(`${this.cartBaseUrl}/${cartId}`)

}

getUpdateTheCart(cartId:number,productsData:any[],merge:boolean=false):Observable<any>{

  const data={
    merge:merge, productsData:productsData
  }
  return this.httpClient.patch(`${this.cartBaseUrl}/${cartId}`,data)

}

getAddCartData(userId:number,productData:any[]):Observable<any>{
  const data={userId,productData}
  return this.httpClient.post(`${this.cartBaseUrl}/add`,data)

}

getDeleteCart(cartId:number):Observable<any>{
  return this.httpClient.delete(`${this.cartBaseUrl}/${cartId}`)

}













}
