import type Stripe from 'stripe';

import type { IUseCase } from '@sensor-it/core';

type CustomerSubscriptionUpdatedInput = Stripe.Event;

type ICustomerSubscriptionUpdatedHandler =
	IUseCase<CustomerSubscriptionUpdatedInput>;

export type {
	ICustomerSubscriptionUpdatedHandler,
	CustomerSubscriptionUpdatedInput,
};
