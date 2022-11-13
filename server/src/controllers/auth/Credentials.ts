import { IsEmail, IsNotEmpty } from "class-validator";

export default class Credentials {
  @IsNotEmpty()
  @IsEmail()
  username!: string;

  @IsNotEmpty()
  password!: string;
}
