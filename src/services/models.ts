export type Tier = {
  id: number;
  name: string;
  list: string;
};

export type Item = {
  id: string;
  name: string;
  tier: Tier;
};

export type Topic = {
  id: string;
  title: string;
};
