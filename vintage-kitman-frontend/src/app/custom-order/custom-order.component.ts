import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/Categories/categories.service';
import { Size } from '../models/categories/size';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomOrderVM } from '../models/orders/custom-order-vm';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-custom-order',
  templateUrl: './custom-order.component.html',
  styleUrls: ['./custom-order.component.scss']
})
export class CustomOrderComponent implements OnInit {
  base64Image: string | null = null;
  sizeArray: Size[] = []
  customizedToggle:boolean = false;
  quantity:number = 1;
  customOrderForm!:FormGroup
  customOrderDetails: CustomOrderVM={customOrderId: 0,size: '',name: '',quantity: 0,image: '',isSourcable: null,customName: null,customNumber: null,message: null}
  constructor(private categoriesService:CategoriesService, private fb:FormBuilder, private orderService: OrderService) { }

  ngOnInit(): void 
  {
    //sizes
    this.categoriesService.getAllSizes().subscribe({
      next:(response)=>{
        this.sizeArray = response as Size[]
        console.log(response)
      },
      complete:()=>{},
      error:(err)=>{console.log(err)}
    })

    this.customOrderForm = this.fb.group({
      size: ['', Validators.required],
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      customName: [''],
      customNumber: [0]
    })
    if (this.customizedToggle) 
    {
      this.customOrderForm.get('customName')!.setValidators([Validators.required]);
      this.customOrderForm.get('customNumber')!.setValidators([Validators.required, Validators.min(1), Validators.max(99)]);
    }
    // Update the validation status
    this.customOrderForm.get('customName')!.updateValueAndValidity();
    this.customOrderForm.get('customNumber')!.updateValueAndValidity();
  }

  submitOrder(){
    this.customOrderDetails.size = this.customOrderForm.value.size
    this.customOrderDetails.name = this.customOrderForm.value.name
    this.customOrderDetails.quantity = this.customOrderForm.value.quantity
    this.customOrderDetails.customName = this.customOrderForm.value.customName
    this.customOrderDetails.customNumber = this.customOrderForm.value.customNumber
    this.customOrderDetails.image = this.base64Image!

    this.orderService.createCustomOrder(this.customOrderDetails).subscribe({
      next:(response)=>
      {
        console.log(response)
      },
      complete:()=>{},
      error:(err)=>{console.log(err)}
    })


  }

  increaseQuantity()
  {
    this.quantity++
  }
  decreaseQuantity()
  {
    this.quantity--
    if(this.quantity<1){
      this.quantity=1
    }
  }
  toggleCustom(){
    this.customizedToggle = !this.customizedToggle
    console.log(this.customizedToggle)
  }


  // Image processing 
  onImageDrop(event: DragEvent) {
    event.preventDefault();
    this.processImage(event.dataTransfer?.files!);
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
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          
          // Set canvas dimensions to 800 by 800
          canvas.width = 250;
          canvas.height = 250;
  
          // Resize image to fit the canvas
          ctx.drawImage(img, 0, 0, 250, 250);
  
          // Convert the canvas content to base64
          this.base64Image = canvas.toDataURL();
          console.log(this.base64Image)
  
          // You can also set the image quality if needed
          // this.base64Image = canvas.toDataURL('image/jpeg', 0.8);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(files[0]);
    }
  }
  

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.base64Image = reader.result as string;
      console.log(this.base64Image)
    };

    reader.readAsDataURL(file);
  }

  clearImageUpload(){
    this.base64Image = null
 }
  
}
