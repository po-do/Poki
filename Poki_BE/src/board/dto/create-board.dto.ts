import { IsNotEmpty, Min, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  blank: number;

  total_grapes: number;

  attached_grapes: number;

  deattached_grapes: number;
}