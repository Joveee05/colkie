import { ApiProperty } from '@nestjs/swagger';

export class NewUserDTO {
  @ApiProperty({
    description: 'The fullName of the user',
  })
  fullName: string;

  @ApiProperty({
    description: 'The userName of the user',
  })
  userName: string;

  @ApiProperty({
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    description: 'The phoneNumber of the user',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'The bio or profile description of the user',
  })
  bio: string;

  @ApiProperty({
    description: 'The password of the user',
  })
  password: string;
}
