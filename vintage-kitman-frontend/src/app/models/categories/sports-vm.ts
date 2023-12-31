import { LeaguesVM } from "./leagues-vm"

export interface SportsVM {
    name:string
    leagues: LeaguesVM[]
    isDoubleDropDownVisible?: boolean; 
}