import { Body, Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TagsService } from './providers/tags.service'
import { CreateTagDto } from './dtos/create-tag.dto'

@Controller('tags')
export class TagsController {
	constructor(private readonly tagsService: TagsService) {}

	@Post('/')
	public createTag(@Body() createTagDto: CreateTagDto) {
		return this.tagsService.create(createTagDto)
	}

	@Delete('/:id')
	public async deleteTag(@Param('id', ParseIntPipe) id: number) {
		return this.tagsService.delete(id)
	}


		@Delete('/:id/soft-delete')
	public async softDeleteTag(@Param('id', ParseIntPipe) id: number) {
		return this.tagsService.softRemove(id)
	}
}
