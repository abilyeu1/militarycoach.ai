export interface IStripePlan {
  id: string;
  object: string;
  active: boolean;
  attributes: any[];
  created: number;
  default_price: DefaultPrice;
  description: any;
  features: Feature[];
  images: any[];
  livemode: boolean;
  metadata: Metadata2;
  name: string;
  package_dimensions: any;
  shippable: any;
  statement_descriptor: any;
  tax_code: string;
  type: string;
  unit_label: any;
  updated: number;
  url: any;
}

export interface DefaultPrice {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: number;
  currency: string;
  custom_unit_amount: any;
  livemode: boolean;
  lookup_key: any;
  metadata: Metadata;
  nickname: any;
  product: string;
  recurring: Recurring;
  tax_behavior: string;
  tiers_mode: any;
  transform_quantity: any;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface Metadata {}

export interface Recurring {
  aggregate_usage: any;
  interval: string;
  interval_count: number;
  trial_period_days: any;
  usage_type: string;
}

export interface Feature {
  name: string;
}

export interface Metadata2 {
  subHeading: string;
}
