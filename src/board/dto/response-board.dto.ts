export class BoardDto {
    id: number;
    blank: number;
    full: number;
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
}