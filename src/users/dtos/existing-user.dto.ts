import { ApiProperty } from '@nestjs/swagger';

export class ExistingUserDTO {
  @ApiProperty({
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
  })
  password: string;
}
