export type Organization = {
	id: string;
	name: string;
	slug: string;
	avatarUrl: string | null;
	devices: number;
	plan?: string;
};
