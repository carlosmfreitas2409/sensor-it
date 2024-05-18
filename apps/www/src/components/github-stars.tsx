import { StarIcon } from 'hugeicons-react';

async function getGithubStars() {
	const response = await fetch(
		'https://api.github.com/repos/carlosmfreitas2409/sensor-it',
		{
			next: {
				revalidate: 300,
			},
		},
	);

	return response.json();
}

export async function GithubStars() {
	const data = await getGithubStars();

	return (
		<a
			href="https://git.new/sensor-it"
			className="flex h-8 justify-center overflow-hidden rounded-md border leading-8 md:mr-0"
			target="_blank"
			rel="noreferrer"
		>
			<div className="flex items-center space-x-2 border-r bg-secondary pr-3 pl-2 text-secondary-foreground text-sm">
				<StarIcon className="h-4 w-4" />

				<span className="font-medium">Star</span>
			</div>

			<div className='my-auto px-4 text-sm'>
				{data &&
					Intl.NumberFormat('en', {
						notation: 'compact',
						minimumFractionDigits: 0,
						maximumFractionDigits: 1,
					}).format(data.stargazers_count ?? 0)}
			</div>
		</a>
	);
}
