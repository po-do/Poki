export class BoardDto {
    id: number;
    total_blanck: number;
    user_whole_grapes: number;
    attached_grapes: number;
}


export class responseBoardDto {
  code: number;
  success: boolean;
  data: {
    grape: {};
  };
}