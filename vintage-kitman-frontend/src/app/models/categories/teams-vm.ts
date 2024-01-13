import { LeaguesVM } from "./leagues-vm"

export interface TeamsVM {
    teamId:number,
    name:string
    logo:string
    league: LeaguesVM
}