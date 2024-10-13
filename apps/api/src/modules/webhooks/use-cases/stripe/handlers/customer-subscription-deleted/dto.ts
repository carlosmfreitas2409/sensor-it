import type Stripe from 'stripe';

import type { IUseCase } from '@sensor-it/core';

type CustomerSubscriptionDeletedInput = Stripe.Event;

type ICustomerSubscriptionDeletedHandler =
	IUseCase<CustomerSubscriptionDeletedInput>;

export type {
	ICustomerSubscriptionDeletedHandler,
	CustomerSubscriptionDeletedInput,
};
