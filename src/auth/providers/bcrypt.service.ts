import { Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service'
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptService implements HashingService {
	public async hashPassword(data: string | Buffer): Promise<string> {
		const salt = await bcrypt.genSalt()
		return bcrypt.hash(data, 10)
	}

	public comparePassword(data: string | Buffer, encrypted: string): Promise<boolean> {
		return bcrypt.compare(data, encrypted)
	}
}
