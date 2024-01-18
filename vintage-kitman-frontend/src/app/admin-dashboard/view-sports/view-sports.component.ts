import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SportsVM } from 'src/app/models/categories/sports-vm';
import { CategoriesService } from 'src/app/services/Categories/categories.service';

@Component({
  selector: 'app-view-sports',
  templateUrl: './view-sports.component.html',
  styleUrls: ['./view-sports.component.scss']
})
export class ViewSportsComponent implements OnInit {

  month:Date = new Date();
  Sports:SportsVM[] = []
  //modals
  showCreateModal: boolean = false;
  deleteModal: boolean = false;
  updateModal: boolean = false;
  //forms
  createSportForm!: FormGroup
  //object
  sportObj: SportsVM={name: '',leagues: []}
  formSubmitted:boolean = false
  constructor(private categoriesService:CategoriesService, private fb:FormBuilder, private snackBar:MatSnackBar) {}

  ngOnInit(): void {
    this.categoriesService.getAllSports().subscribe(
      {
        next:(response)=>
        {
          this.Sports = response as SportsVM[]
          console.log(this.Sports)
        },
        complete:()=>{},
        error:(err)=>{console.log(err)}

       }
    )  
    this.createSportForm = this.fb.group({
      name: ['', Validators.required]
    })

  
  }

  createSport(){
    this.formSubmitted=true
    this.sportObj.name = this.createSportForm.value.name
    console.log()
    this.categoriesService.createSport(this.sportObj).subscribe({
      next: (response) => 
      {
        console.log(response)
      },
      complete: () => {
        this.showCreateModal = false
        this.createSportForm.reset()
        this.snackBar.open("League created successfully", "Close", {duration:3000})
        this.ngOnInit()
      },
      error: (err) => {
        console.log(err)
      }
    })


  }
  deleteSport(sport:SportsVM){
    sport = this.sportObj
    this.categoriesService.deleteSport(sport.name).subscribe({
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
    this.createSportForm.reset()
  }

  viewDeleteModal(sportObj: SportsVM){
    this.deleteModal=true;
    this.sportObj=sportObj
  }

  closeDeleteModal(){
    this.deleteModal=false;
  }
}
