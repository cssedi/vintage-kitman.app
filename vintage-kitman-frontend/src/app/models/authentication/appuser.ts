import { CustomOrderVM } from "../orders/custom-order-vm";
import { wishlistVM } from "../orders/wishlist-vm";
import { Address } from "./address-vm";

export interface ApplicationUser {
    id: string;
    userName: string;
    email: string;
    phoneNumber: string;
    name: string;
    surname: string;
    address: string;
    addresses: Address[];
    customOrders: CustomOrderVM[];
    wishlist: wishlistVM;
  }