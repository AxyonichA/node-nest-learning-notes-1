import { Module } from '@nestjs/common';
import { PaginationService } from './provider/pagination.service';

@Module({
  providers: [PaginationService],
	exports: [PaginationService],
})
export class PaginationModule {}
