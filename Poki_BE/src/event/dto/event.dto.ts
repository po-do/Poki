import { IsNotEmpty, Min, Validate, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  parent_id: string;
}

export class CreateMessageDto {
    @IsNotEmpty()
    converstation_id: number;
    @IsNotEmpty()
    sender_id: string;
    @IsNotEmpty()
    text: string;
}
