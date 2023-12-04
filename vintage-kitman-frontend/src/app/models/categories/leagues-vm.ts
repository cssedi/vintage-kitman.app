import { TeamsVM } from "./teams-vm"

export interface LeaguesVM {
    name:string
    teams: TeamsVM[]
}