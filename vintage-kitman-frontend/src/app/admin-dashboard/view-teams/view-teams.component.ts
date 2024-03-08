import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TeamsVM } from 'src/app/models/categories/teams-vm';
import { CategoriesService } from 'src/app/services/Categories/categories.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-view-teams',
  templateUrl: './view-teams.component.html',
  styleUrls: ['./view-teams.component.scss']
})
export class ViewTeamsComponent implements OnInit {

  leagueName!:string;
  teamArray:TeamsVM[]=[]
  //modals
  showCreateModal:boolean=false;
  deleteModal:boolean=false;
  editModal:boolean=false;
  //forms
  createForm!: FormGroup;
  updateForm!:FormGroup;
  formSubmitted:boolean=false;
  base64Image: string | null = null;
  selectedImage: string | ArrayBuffer | null | undefined;
  selectedClub!:string
  //objects
  teamObject:TeamsVM={teamId:0,name:'',logo:'', league:{name: '',teams: [], sport: {name: '', leagues: []}}}

  constructor(private route:ActivatedRoute,private productsService:ProductService, private fb:FormBuilder, private categoriesService:CategoriesService,
              private snackBar:MatSnackBar) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.leagueName = params.get('name')!;
      // Fetch products based on the leagueId using your ProductService
      this.productsService.getTeamsByLeagueName(this.leagueName).subscribe({
        // Handle the retrieved products
        next:(reponse)=>
        {
          this.teamArray=reponse as TeamsVM[]
          console.log(this.leagueName)
          console.log(reponse)
        },
        error:(err)=>{
          console.log(err)
          window.alert("Error occured while fetching teams, please contact lesedi")
        }
      }

      )
    });  

    this.createForm = this.fb.group({
      name: ['', Validators.required],
    })
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
    })
  }

  createTeam(){
    this.formSubmitted=true;
    this.teamObject.name=this.createForm.value.name
    this.teamObject.logo=this.base64Image!
    this.teamObject.league.name=this.leagueName
    this.categoriesService.createTeam(this.teamObject).subscribe({
      next:(response)=>{
        console.log(response)
      },
      complete:()=>{
        this.showCreateModal=false
        this.ngOnInit()
        this.formSubmitted=false;
        this.clearImageUpload()
        this.snackBar.open("Team created successfully", "Close", {duration:3000})
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }
  updateTeam(){
    this.formSubmitted=true
    this.teamObject.name = this.updateForm.value.name
    this.teamObject.logo = this.base64Image!
    this.categoriesService.updateTeam(this.selectedClub, this.teamObject)
    .subscribe({
      next:(response)=>{
        console.log(response)
      },
      complete: ()=>{
        this.editModal=false
        this.ngOnInit()
        this.formSubmitted=false;
        this.updateForm.reset()
        this.clearImageUpload()
        this.snackBar.open("Team updated successfully", "Close", {duration:3000})
      }

    })
  }
  viewDeleteModal(teamObj: TeamsVM){
    this.deleteModal=true;
    this.teamObject=teamObj
  }
  viewEditModal(team:TeamsVM){
    this.teamObject = team
    this.editModal=true
    this.base64Image = this.teamObject.logo
    this.selectedClub = team.name
    this.updateForm.patchValue({
      name: team.name
    })
  }
  closeDeleteModal(){
    this.deleteModal=false;
  }
  deleteTeam(team:TeamsVM){
    team = this.teamObject
    this.categoriesService.deleteTeam(team.name).subscribe({
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





  toggleCreateModal(){
    this.showCreateModal=!this.showCreateModal
    this.clearImageUpload()
  }
  toggleEditModal(){
    this.editModal=!this.editModal
    this.clearImageUpload()
  }

    //Images
    onImageDrop(event: DragEvent) {
      event.preventDefault();
      this.processImage(event.dataTransfer?.files!);
    }
    handleFileInput(event: any): void {
      const file = event.target.files[0];
    
      // File type validation
      const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
      if (!allowedFileTypes.includes(file.type)) {
        // Invalid file type, show an error message to the user
        return;
      }
    
      // File size validation (example: 2 MB limit)
      const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB in bytes
      if (file.size > maxSizeInBytes) {
        // File size exceeds the limit, show an error message to the user
        return;
      }
    
      const reader = new FileReader();
    
      reader.onload = () => {
        this.base64Image = reader.result as string;
      };
    
      reader.readAsDataURL(file);
    }
    onDragOver(event: DragEvent) {
      event.preventDefault();
    }
  
    onFileSelected(event: Event) {
      const files = (event.target as HTMLInputElement).files;
      this.processImage(files);
    }
  
    processImage(files: FileList | null) {
      if (files && files.length > 0) {
        const reader = new FileReader();
        reader.onload = () => {
          this.selectedImage = reader.result;
          this.base64Image = reader.result as string;
        };
        reader.readAsDataURL(files[0]);
      }
    }
    
    clearImageUpload(){
       this.base64Image = null
    }

}
