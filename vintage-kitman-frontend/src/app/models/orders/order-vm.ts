import { KitOrderVM } from "./KitOrderVM";
import { OrderStatus } from "./orderStatus";

export interface OrderVM {
    orderId: number;
    customName: string | null;
    customNumber: number | null;
    orderStatusId: number;
    orderDate: Date;
    id: string;
    orderStatus: OrderStatus | null
    kitOrder: KitOrderVM | null;
}