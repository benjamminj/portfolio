import type { RequestHandler } from "./$types";

const WEEK_IN_SECONDS = 604800;

const links = {
	email: "mailto:benjamindavjohnson@gmail.com",
	bluesky: "https://bsky.app/profile/benjamminj.dev",
	linkedin: "https://www.linkedin.com/in/benjamin-d-johnson",
};

export const GET: RequestHandler = async ({ params }) => {
	const { link } = params;

	if (link in links) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: links[link as keyof typeof links],
				"Cache-Control": `max-age=${WEEK_IN_SECONDS}, s-maxage=${WEEK_IN_SECONDS}, must-revalidate`,
			},
		});
	}

	return new Response("Not found", { status: 404 });
};
