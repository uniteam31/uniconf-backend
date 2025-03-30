/** Интерфейс для декодированной информации из JWT */
export interface TUserPayload {
	id: string;
	username: string;
}

export type TUserConfig = Record<string, boolean>;
