import { ApplicationUser } from "../authentication/appuser";
import { customOrderStatus } from "./custom-order-status";

export interface CustomOrderVM {
    customOrderId: number;
    size: string;
    name: string;
    quantity: number;
    image: string;
    isSourcable: boolean | null;
    customName: string| null;
    customNumber: number | null;
    message: string | null;
    user: ApplicationUser|null;
    isViewed: boolean | null;
    customOrderStatus: customOrderStatus | null;


  }
  