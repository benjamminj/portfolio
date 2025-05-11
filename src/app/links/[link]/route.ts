import { NextResponse } from "next/server";

const WEEK_IN_SECONDS = 604800;

const links = {
	email: "mailto:benjamin.d.johnson@icloud.com",
	twitter: "https://twitter.com/benjamminj",
	bluesky: "https://bsky.app/profile/benjamminj.dev",
};

export const GET = async (
	_request: Request,
	{ params }: { params: { link: string } },
) => {
	const { link } = params;

	if (link in links) {
		const headers = new Headers();
		headers.set(
			"Cache-Control",
			`max-age=${WEEK_IN_SECONDS}, s-maxage=${WEEK_IN_SECONDS}, must-revalidate`,
		);

		return NextResponse.redirect(links[link as keyof typeof links], {
			status: 302,
			headers: headers,
		});
	}

	return new NextResponse("Not found", { status: 404 });
};
