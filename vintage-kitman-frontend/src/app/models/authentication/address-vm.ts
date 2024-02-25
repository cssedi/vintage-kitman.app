import { ApplicationUser } from "./appuser";

export interface Address  {
  name: string;
  postalAddress: string;
  isMain: boolean;
  id: string;
  user: ApplicationUser; 
}