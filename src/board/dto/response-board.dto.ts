export class BoardDto {
    id: number;
    blank: number;
    total_grapes: number;
    attached_grapes: number;
    deattached_grapes: number;
}


export class responseBoardDto {
  code: number;
  success: boolean;
  data: {
    grape: {};
  };
  is_existence?: boolean;
}