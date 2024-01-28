import { ProductType } from "./product-type"

export interface kitVM{
    name:string
    frontImage:string
    price:number
    productType: ProductType | null
}