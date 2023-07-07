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
    item: {id: number, ProductName: string, ProductLink: string, ProductImage: string, Given: string, Picked: string};
  };
}


export class responseWishlistGivenDto {
  code: number;
  success: boolean;
  data: {
    item: {};
  };
}