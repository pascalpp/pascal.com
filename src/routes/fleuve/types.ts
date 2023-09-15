export interface Page {
	id: string;
	title: string;
	description?: string;
	image?: string;
	connections?: Page[];
	active?: boolean;
}

// export interface Connection {
// 	description: string;
// 	page: Page;
// 	vector: 'left' | 'right' | 'up' | 'down';
// }
