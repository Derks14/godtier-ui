export type Tier = {
  id: string;
  title: string;
};

export type Item = {
  id: string;
  name: string;
  tier: Tier;
};

export type Topic = {
  id: string;
  title: string;
  created: string;
};

export type fetchDataParamsType = {
  page?: number;
  size?: number;
  search?: string;
};

export type fetchDataParamKeyType = [string, fetchDataParamsType];

export type fetchTiersParamsType = fetchDataParamsType & {
  topicId?: string;
};

export type fetchTiersParamsKeyType = [string, fetchTiersParamsType];
