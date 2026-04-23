import { getCollection } from "astro:content";
import type { Language } from "../i18n";

export async function getAllBlogs() {
	const posts = await getCollection("blog");
	return posts
		.flatMap((post) => (post.data.draft ? [] : [post]))
		.sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
}

export async function getAllShorts(language?: Language) {
	const posts = await getCollection("shorts");
	return posts
		.flatMap((post) =>
			post.data.draft || (language && post.data.language !== language) ? [] : [post],
		)
		.sort((a, b) => (a.data.date < b.data.date ? 1 : -1));
}

export function getShortAnchor(id: string) {
	return `short-${id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
