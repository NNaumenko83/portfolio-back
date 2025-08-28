import { Controller, Get, HttpStatus } from '@nestjs/common';
import { OwnerService } from './owner.service';

import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetOwnerDto } from './dto/get-owner.dto';
import { OwnerResponseDto } from './dto/owner-response.dto';


@ApiTags('Owner')
@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) { }

  @ApiOperation({ summary: 'Get Owner Information', description: 'Retrieve information about the owner' })
  @ApiOkResponse({ status: HttpStatus.OK, description: 'Owner information retrieved successfully.', type: OwnerResponseDto })
  @ApiNotFoundResponse({ status: HttpStatus.NOT_FOUND, description: 'Owner not found' })
  @Get()
  getOwner(): Promise<GetOwnerDto> {
    return this.ownerService.getOwner();
  }
}
