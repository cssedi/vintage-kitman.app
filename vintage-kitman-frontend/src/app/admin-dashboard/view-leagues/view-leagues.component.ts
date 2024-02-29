import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LeaguesVM } from 'src/app/models/categories/leagues-vm';
import { CategoriesService } from 'src/app/services/Categories/categories.service';

@Component({
  selector: 'app-view-leagues',
  templateUrl: './view-leagues.component.html',
  styleUrls: ['./view-leagues.component.scss']
})
export class ViewLeaguesComponent implements OnInit {
  Leagues: LeaguesVM[] = []
  sportName: string = ''
  //modals
  showCreateModal: boolean = false;
  deleteModal: boolean = false;
  updateModal: boolean = false;
  //forms
  formSubmitted: boolean = false;
  createLeagueForm!: FormGroup;
  updateForm!: FormGroup;
  selectedLeague!: string;

  //objects
  leagueObject: LeaguesVM = {name: '', teams: [],sport: {name: '', leagues: []}}

  constructor(private categoriesService: CategoriesService, private route:ActivatedRoute, private fb:FormBuilder,
              private snackBar:MatSnackBar) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
            this.sportName = params.get('name')!;
      // Fetch products based on the leagueId using your ProductService
      this.categoriesService.getLeagueBySportName(this.sportName).subscribe({
        // Handle the retrieved products
        next: (reponse) => {
          this.Leagues = reponse as LeaguesVM[]
          console.log(this.Leagues)
        },
        complete: () => {

        },
        error: (err) => {
          console.log(err)
        },

      }

      )
    });
    this.createLeagueForm = this.fb.group({
      name: ['', Validators.required],
    })
    this.updateForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  createLeague() {
    this.formSubmitted = true;
    this.leagueObject.name = this.createLeagueForm.value.name
    this.leagueObject.sport.name = this.sportName
    this.categoriesService.createLeague(this.leagueObject).subscribe({
      next: (response) => 
      {
        console.log(response)
      },
      complete: () => {
        this.showCreateModal = false
        this.createLeagueForm.reset()
        this.snackBar.open("League created successfully", "Close", {duration:3000})
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  updateLeague(){
    this.formSubmitted=true
    this.leagueObject.name = this.updateForm.value.name
    this.categoriesService.updateLeague(this.selectedLeague, this.leagueObject)
    .subscribe({
      next:(response)=>{
        console.log(response)
      },
      complete: ()=>{
        this.updateModal=false
        this.ngOnInit()
        this.formSubmitted=false;
        this.updateForm.reset()
        this.snackBar.open("Team updated successfully", "Close", {duration:3000})
      }

    })
  }
  deleteLeague(league:LeaguesVM){
    league = this.leagueObject
    this.categoriesService.deleteLeague(league.name).subscribe({
      next:(response)=>{
        console.log(response)
      },
      complete:()=>{
        this.deleteModal=false;
        this.ngOnInit()
        this.snackBar.open("Team deleted successfully", "Close", {duration:3000})
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  toggleCreateModal() { 
    this.showCreateModal = !this.showCreateModal 
    this.createLeagueForm.reset()
  }
  toggleUpdateModal() {
    this.updateModal = !this.updateModal
  }

  viewEditModal(league:LeaguesVM){
    this.leagueObject = league
    this.updateModal=true
    this.selectedLeague = league.name
  }

  viewDeleteModal(leaguObj: LeaguesVM){
    this.deleteModal=true;
    this.leagueObject=leaguObj
  }

  closeDeleteModal(){
    this.deleteModal=false;
  }


}
