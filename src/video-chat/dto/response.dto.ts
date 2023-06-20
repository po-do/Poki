export class ResponseDto {
  code: number;
  success: boolean;
  data: any

  constructor(code: number, success: boolean, data: any) {
    this.code = code;
    this.success = success;
    this.data = data;
  }
}