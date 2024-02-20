import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductType } from 'src/app/models/categories/product-type';
import { OnStockKitVM } from 'src/app/models/orders/OnStockKit-vm';
import { CategoriesService } from 'src/app/services/Categories/categories.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-on-stock-kits',
  templateUrl: './on-stock-kits.component.html',
  styleUrls: ['./on-stock-kits.component.scss']
})
export class OnStockKitsComponent implements OnInit {

  kitArray:OnStockKitVM[] = [];
  productTypes:ProductType[]=[]
  //forms
  createForm!: FormGroup;
  formSubmitted: boolean = false;
  //modals
  showCreateModal: boolean = false;
  deleteModal: boolean = false;
  updateModal: boolean = false;
  //images
  base64Image: string | null = null;
  selectedImage: string | ArrayBuffer | null | undefined;

  constructor(private orderService: OrderService, private fb:FormBuilder, private categoriesService: CategoriesService) {}
  ngOnInit(): void {
    this.orderService.getOnStockKits().subscribe({
      next: (response) => {
        this.kitArray = response as OnStockKitVM[];
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

    

    this.createForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      size: ['', Validators.required],
      quantity: ['', Validators.required],
      productTypeId: ['', Validators.required],
    });
  }



  createKit(){
    this.formSubmitted = true;
    this.showCreateModal = false;
    this.formSubmitted = false;
  }
  toggleCreateModal(){
    this.showCreateModal=!this.showCreateModal
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
