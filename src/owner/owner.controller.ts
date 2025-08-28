import { Controller, Get } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { GetOwnerDto } from './dto/get-owner.dto';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) { }

  @Get()
  getOwner(): Promise<GetOwnerDto> {
    return this.ownerService.getOwner();
  }
}
