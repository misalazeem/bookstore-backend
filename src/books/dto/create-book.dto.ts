import { IsInt, IsNotEmpty } from "class-validator";

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  category_id: string;
}
