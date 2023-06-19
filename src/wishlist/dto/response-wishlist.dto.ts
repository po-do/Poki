export class wishProudctDto {
    id: number;
    ProductName: string;
    ProductLink: string;
    ProductImage: string;
    Given: string;
    Picked: string;
}


export class responseWishlistDto {
  code: number;
  success: boolean;
  data: {
    item: {};
  };
}