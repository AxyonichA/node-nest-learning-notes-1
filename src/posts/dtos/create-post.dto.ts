import { IsArray, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from 'class-validator'
import { PostStatus } from '../enums/postStatus.enum'
import { PostType } from '../enums/postType.enum'
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto'
import { Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreatePostDto {
	@ApiProperty({
		description: "This is a title of a blog post",
		example: "This is a title"
	})
	@IsString()
	@MinLength(4)
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
	featuredImageUrl?: string;

	@ApiPropertyOptional({
		description: "The date on which the post is published",
		example: "2024-03-16T07:46:32+0000"
	})
	@IsISO8601()
	@IsOptional()	
	publishedOn?: Date;

	@ApiPropertyOptional({
		description: "Array of tags passed as string values",
		example: ['nestjs', 'typescript']
	})
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	@MinLength(3, { each: true })
	tags?: string[];

	@ApiPropertyOptional({
		type: 'array',
		required: false,
		items: {
			type: 'object',
			properties: {
				key: { 
					type: 'string',
					description: "The key can be any string identifier for your meta option",
					example: "sidebarEnabled"
				},
				value: { 
					type: 'any',
					description: "Any value that you want to save to the key",
					example: true
				},
			}
		},
		description: "Array of meta options passed as objects",
	})
	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CreatePostMetaOptionsDto)
	metaOptions?: CreatePostMetaOptionsDto[]

}