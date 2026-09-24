"use client";

import Link from "next/link";
import type { MouseEventHandler, PropsWithChildren } from "react";

type Props = PropsWithChildren<{
	href: string;
	slug: string;
	external?: boolean;
}>;

export const ProjectLink: React.FC<Props> = ({
	href,
	slug,
	external = false,
	children,
}) => {
	const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
		if (!external) return;

		void fetch("/api/incr", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ slug }),
			keepalive: true,
		});
	};

	return (
		<Link
			href={href}
			onClick={handleClick}
			{...(external
				? { target: "_blank", rel: "noopener noreferrer" }
				: {})}
		>
			{children}
		</Link>
	);
};
