export type PageId = string;

export interface PageInfo {
	title?: string;
	description?: string;
	image?: string;
	active?: boolean;
}

export interface Page extends PageInfo {
	id: PageId;
	connections: PageId[];
}
