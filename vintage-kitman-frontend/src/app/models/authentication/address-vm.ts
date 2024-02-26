import { ApplicationUser } from "./appuser";

export interface Address {
  addressId:number|null;
  name: string;
  addressName1: string;
  addressName2: string;
  province: string;
  zipCode: number;
  buildingName: string;
  unitNumber: string;
  isMain: boolean;
  user: ApplicationUser | null;
}