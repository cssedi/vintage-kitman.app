import { ProductType } from "./product-type"

export interface kitVM{
    name:string
    frontImage:string
    price:number
    teamId:number
    productTypeId: number
    productType: ProductType | null
}