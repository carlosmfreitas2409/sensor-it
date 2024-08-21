import type { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';

import { env } from '@sensor-it/env/server';

import { DrizzleMemberRepository } from '@/modules/members/repositories/drizzle/member-repository';

import { UnauthorizedException } from '../errors';

export const auth = (app: Elysia) =>
	app
		.use(
			jwt({
				secret: env.JWT_SECRET_KEY,
				exp: '7d',
			}),
		)
		.derive({ as: 'scoped' }, ({ jwt, headers }) => {
			async function getCurrentUserId() {
				const authorization = headers.authorization;

				if (!authorization || !/^Bearer\s/i.test(authorization)) {
					throw new UnauthorizedException('Invalid token');
				}

				const [, token] = authorization.split(' ');

				const payload = await jwt.verify(token);

				if (!payload || !payload.sub) {
					throw new UnauthorizedException('Invalid token');
				}

				return payload.sub;
			}

			async function getUserMembership(slug: string) {
				const userId = await getCurrentUserId();

				const memberRepository = new DrizzleMemberRepository();

				const membership = await memberRepository.findMembership(userId, slug);

				if (!membership) {
					throw new UnauthorizedException(
						'User is not a member of this organization',
					);
				}

				return { userId, ...membership };
			}

			return {
				getCurrentUserId,
				getUserMembership,
			};
		});
