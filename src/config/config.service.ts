import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { TUserPayload, TUserConfig } from './types/config.types';
import { KeysService } from '../keys/keys.service';
import { Key } from '../keys/keys.schema';

@Injectable()
export class ConfigService {
	constructor(@Inject(forwardRef(() => KeysService)) private keysService: KeysService) {}

	async getConfig(user: TUserPayload): Promise<TUserConfig> {
		const { data: keys } = await this.keysService.getKeys();

		const config: TUserConfig = keys.reduce((acc, key) => {
			acc[key.name] = this.getKeyValue(user, key);
			return acc;
		}, {});

		return config;
	}

	private getKeyValue(user: TUserPayload, key: Key): boolean {
		const { id, username } = user;
		const { include, exclude, name, percentage } = key;

		if (exclude.includes(username) || exclude.includes(id)) return false;

		if (include.includes(username) || include.includes(id)) return true;

		if (percentage === 100) return true;

		const hash = createHash('sha256')
			.update(id + name)
			.digest('hex');
		const position = parseInt(hash.slice(0, 15), 16) % 100;

		return position <= percentage;
	}
}
