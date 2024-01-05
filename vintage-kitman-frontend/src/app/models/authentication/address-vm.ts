import { ApplicationUser } from "./appuser";

export interface Address {
    name: string;
    postalAddress: string;
    id: string;
    user: ApplicationUser;
  }