import { IsArray, IsDate, IsEnum, IsInt, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength, ValidateNested } from 'class-validator'
import { PostStatus } from '../enums/postStatus.enum'
import { PostType } from '../enums/postType.enum'
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto'
import { Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreatePostDto {
	@ApiProperty({
		description: "This is a title of a blog post",
		example: "This is a title"
	})
	@IsString()
	@MinLength(4)
	@MaxLength(512)
	@IsNotEmpty()
	title: string;

	@ApiProperty({
		enum: PostType,
		description: "Possible values: 'post', 'page', 'story', 'series'"
	})
	@IsEnum(PostType)
	@IsNotEmpty()
	postType: PostType;

	@ApiProperty({
		description: "For Example - 'my-url'",
		example: 'my-blog-post'
	})
	@IsString()
	@IsNotEmpty()
	@MaxLength(256)
	@Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug must be lowercase and dash separated. For example "my-url"' })
	slug: string;

	@ApiProperty({
		enum: PostStatus,
		description: "Possible values: 'draft', 'scheduled', 'review', 'published'"
	})
	@IsEnum(PostStatus)
	@IsNotEmpty()
	status: PostStatus;

	@ApiPropertyOptional({
		description: "This is a content of a blog post",
		example: "The post content"
	})
	@IsString()
	@IsOptional()
	content?: string;

	@ApiPropertyOptional({
		description: "Serialize your JSON object else a validation error will be thrown",
		example: "{\r\n \"@context\": \"https://schema.org\",\r\n \"@type\": \"Person\"\r\n }"
	})
	@IsOptional()
	@IsJSON()
	schema?: string;

	@ApiPropertyOptional({
		description: "This is a featured image of a blog post",
		example: "http://localhost.com/images/image1.jpg"
	})
	@IsOptional()
	@IsUrl()
	@MaxLength(1024)
	featuredImageUrl?: string;

	@ApiPropertyOptional({
		description: "The date on which the post is published",
		example: "2024-03-16T07:46:32+0000"
	})
	@IsOptional()	
	// @IsISO8601({
	// 	strict: true
	// })
	@IsDate()
	publishedOn?: Date;

	@ApiPropertyOptional({
		description: "Array of tags passed as number values",
		example: [1, 2]
	})
	@IsOptional()
	@IsArray()
	@IsInt({ each: true })
	tags?: number[];

	@ApiPropertyOptional({
		type: CreatePostMetaOptionsDto,
		description: "Array of meta options passed as objects",
	})
	@IsOptional()
	@ValidateNested()
	@Type(() => CreatePostMetaOptionsDto)
	metaOptions?: CreatePostMetaOptionsDto
}