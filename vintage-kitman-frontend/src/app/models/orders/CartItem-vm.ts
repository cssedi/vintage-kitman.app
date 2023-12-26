export interface CartItem{
    
        KitName: string;
        KitImage: string;
        KitPrice: number;
        Quantity: number;
        isCustomed: boolean;
        CustomName?: string;
        CustomNumber?: number | null;
        SizeId: string;
      
}