import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { kitVM } from 'src/app/models/categories/kit-vm';
import { ProductType } from 'src/app/models/categories/product-type';
import { KitOrderVM } from 'src/app/models/orders/KitOrderVM';
import { CategoriesService } from 'src/app/services/Categories/categories.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-view-kits',
  templateUrl: './view-kits.component.html',
  styleUrls: ['./view-kits.component.scss']
})
export class ViewKitsComponent implements OnInit {
  //arrays
  kitArray:kitVM[] = [];
  productTypes:ProductType[]=[]
  teamId!:number;
  teamName!:string;
  //objects
  kitObj:kitVM={name: '', frontImage: '', price: 0, productType: null,teamId: 0,productTypeId: 0}
  //forms
  createForm!: FormGroup;
  updateForm!: FormGroup;
  formSubmitted: boolean = false;
  //modals
  showCreateModal: boolean = false;
  deleteModal: boolean = false;
  updateModal: boolean = false;
  //images
  base64Image: string | null = null;
  selectedImage: string | ArrayBuffer | null | undefined;
  selectedKitName: string = '';

  constructor(private orderService: OrderService, private fb:FormBuilder, private categoriesService: CategoriesService, 
             private snackBar:MatSnackBar, private productService:ProductService,private route:ActivatedRoute, ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.teamName =params.get('name')!;
      console.log(this.teamName)
      this.productService.getKitsByTeamName(this.teamName).subscribe({
      next: (response) => {
        this.kitArray = response as kitVM[];
        console.log(this.kitArray)
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
      },
    });

    this.categoriesService.getAllProductTypes()
    .subscribe({
      next: (response) => {
        this.productTypes = response as ProductType[];
      },
      complete: () => {},
      error: (err) => {
        console.log(err);
      },
    });
  })

    

    this.createForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      productTypeId: [0, Validators.required],
    });
    this.updateForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      productTypeId: [0, Validators.required],
    });
  }





  createKit(){
    this.formSubmitted = true;
    this.kitObj = this.createForm.value
    this.kitObj.teamId = this.teamId
    this.kitObj.frontImage = this.base64Image!
    this.categoriesService.addKit(this.teamName, this.kitObj)
    .subscribe({
      next:(response)=>{

      },
      complete:()=>{
        this.snackBar.open("Kit created successfully", "Close", {duration:3000})
        this.ngOnInit()
        this.showCreateModal = false
        this.createForm.reset()
        this.clearImageUpload()

      },
      error:(error)=>{
      }
    })

    
  }

  //update kit
  updateKit(){
    this.formSubmitted = true;
    this.kitObj = this.updateForm.value
    this.kitObj.teamId = this.teamId
    this.kitObj.frontImage = this.base64Image!
    this.productService.updateKit(this.selectedKitName, this.kitObj)
    .subscribe({
      next:(response)=>{

      },
      complete:()=>{
        this.snackBar.open("Kit updated successfully", "Close", {duration:3000})
        this.ngOnInit()
        this.updateModal = false
      },
      error:(error)=>{
        window.alert("Error has occured, please contact support")
      }
    })
  }

  deleteKit(kit:kitVM){
    kit = this.kitObj
    this.productService.deleteKit(kit.name).subscribe({
      next:(response)=>{
        console.log(response)
      },
      complete:()=>{
        this.deleteModal=false;
        this.ngOnInit()
        this.snackBar.open("Kit deleted successfully", "Close", {duration:3000})
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

  toggleDeleteModal(kit:kitVM){
    this.kitObj = kit
    this.deleteModal = true
    this.selectedKitName = kit.name

  }

  //open update modal
  openUpdateModal(kit:kitVM){
    this.kitObj = kit
    this.updateModal = true
    this.selectedKitName = kit.name
    this.base64Image = kit.frontImage
    this.updateForm.patchValue({
      name: kit.name,
      price: kit.price,
      productTypeId: kit.productTypeId
    })
  }

  toggleUpdateModal(){
    this.updateModal=!this.updateModal
    this.clearImageUpload()
  }

  
  closeDeleteModal(){
    this.deleteModal=false;
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
