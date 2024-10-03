export interface ProductResponse{
 limit:number,
 skip:number,
 products:Product[]
 total:number

}
export interface Product{
 id:String,
 title:string,
 description:string,
 catagory:string,
 price:number,
 discountPercentage:number,
 brand:string,
 rating:number,
 shippingInformation:string,
 availabilityStatus:string,
 returnPolicy:string,
 thumbnail:string,
 images:string[]
 reviews:[
    {
        rating:number,
        comment:string,
        date:string,
        reviewrName:string,
        reviewerEmail:string
    }
 ]



}