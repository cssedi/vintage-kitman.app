import { ApplicationUser } from "./appuser";

export interface Address {
  addressName1: string;
  addressName2: string;
  province: string;
  zipCode: number;
  buildingName: string;
  unitNumber: string;
  isMain: boolean;
  user: ApplicationUser;
}