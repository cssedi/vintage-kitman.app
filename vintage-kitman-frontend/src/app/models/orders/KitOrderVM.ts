import { ApplicationUser } from "../authentication/appuser";
import { kitVM } from "../categories/kit-vm";
import { OrderStatus } from "./orderStatus";

export interface KitOrderVM {
    kitId: number;
    orderId: number;
    uniqueOrdenum: string;
    orderStatusId: number;
    id: string;
    name: string;
    frontImage: string;
    uniqueOrderNum: string;
    orderDate?: Date;
    address:string;
    price: number;
    size: string;
    quantity: number;
    customName?: string;
    customNumber?: number;
    user: ApplicationUser | null;
    orderStatus: OrderStatus | null;
    kit: kitVM | null;
  }