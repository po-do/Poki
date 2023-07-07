import { IsNotEmpty } from 'class-validator';

export class CreateWishlistDto {
    @IsNotEmpty()
    ProductName: string;

    @IsNotEmpty()
    ProductLink: string;

    @IsNotEmpty()
    ProductImage: string;

}

