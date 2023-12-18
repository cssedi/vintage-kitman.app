export interface CustomOrderVM {
    customOrderId: number;
    size: string;
    name: string;
    quantity: number;
    image: string;
    isSourcable: boolean | null;
    customName: string| null;
    customNumber: number | null;
    message: string | null;
  }
  