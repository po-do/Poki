import { IsNotEmpty, Min, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'maxTotalGrapes', async: false })
export class MaxTotalGrapesConstraint implements ValidatorConstraintInterface {
  validate(value: number, args: ValidationArguments) {
    const object = args.object as CreateBoardDto;
    const blank = object.blank;
    const attachedGrapes = object.attached_grapes;
    const maxTotalGrapes = blank - attachedGrapes;
    return value <= maxTotalGrapes;
  }

  defaultMessage(args: ValidationArguments) {
    return `total_grapes must be less than or equal to (blank - attached_grapes)`;
  }
}

export class CreateBoardDto {
  @IsNotEmpty()
  blank: number;

  @IsNotEmpty()
  @Min(0)
  @Validate(MaxTotalGrapesConstraint)
  total_grapes: number;

  @IsNotEmpty()
  attached_grapes: number;

  @IsNotEmpty()
  deattached_grapes: number;
}