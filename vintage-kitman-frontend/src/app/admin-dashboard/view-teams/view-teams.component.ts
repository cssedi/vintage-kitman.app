import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TeamsVM } from 'src/app/models/categories/teams-vm';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-view-teams',
  templateUrl: './view-teams.component.html',
  styleUrls: ['./view-teams.component.scss']
})
export class ViewTeamsComponent implements OnInit {

  leagueName!:string;
  teamArray:TeamsVM[]=[]
  showCreateModal:boolean=false;
  createForm!: FormGroup;
  formSubmitted:boolean=false;
  base64Image: string | null = null;
  selectedImage: string | ArrayBuffer | null | undefined;



  constructor(private route:ActivatedRoute,private productsService:ProductService, private fb:FormBuilder) { }
  
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
      name: [''],
      logo: ['']
    })
  }

  createTeam(){}



  toggleCreateModal(){
    this.showCreateModal=!this.showCreateModal
    console.log(this.showCreateModal)
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
        console.log(this.base64Image);
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
