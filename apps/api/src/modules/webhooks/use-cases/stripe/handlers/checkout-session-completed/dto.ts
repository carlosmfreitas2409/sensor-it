import type Stripe from 'stripe';

import type { IUseCase } from '@sensor-it/core';

type CheckoutSessionCompletedInput = Stripe.Event;

type ICheckoutSessionCompletedHandler = IUseCase<CheckoutSessionCompletedInput>;

export type { ICheckoutSessionCompletedHandler, CheckoutSessionCompletedInput };
