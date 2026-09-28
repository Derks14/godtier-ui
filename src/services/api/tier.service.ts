import type {
  fetchDataParamKeyType,
  fetchTiersParamsKeyType,
  Item,
  Tier,
  Topic,
} from "@/services/models.ts";
import type { ApiResponse } from "@/services/models/general.model.ts";
import { httpClient } from "@/services/api-client.ts";

export const ItemService = {
  fetchItems: (): Promise<ApiResponse<Item[]>> => httpClient.get("/items"),
  getItem: (itemId: string): Promise<ApiResponse<Item>> => httpClient.get(`/items/${itemId}`),
  updateItem: ({ itemId, item }: { itemId: string; item: Item }): Promise<ApiResponse<Item>> =>
    httpClient.put(`/items/${itemId}`, item),
  addItem: (payload: Item): Promise<ApiResponse<Item>> =>
    httpClient.post(`/items/${payload.id}`, payload),
  deleteItem: (itemId: string): Promise<ApiResponse<Item>> => httpClient.delete(`/items/${itemId}`),
};

export const TopicService = {
  fetchTopics: ({
    queryKey,
  }: {
    queryKey: fetchDataParamKeyType;
  }): Promise<ApiResponse<Topic[]>> => {
    const [, { page, size, search }] = queryKey;

    const params = {
      ...(page && { page }),
      ...(search && { search }),
      ...(size && { size: size }),
    };
    return httpClient.get("/topics", { params });
  },
  getTopic: (topicId: string): Promise<ApiResponse<Topic>> => httpClient.get(`/topics/${topicId}`),
  updateTopic: ({
    topicId,
    topic,
  }: {
    topicId: string;
    topic: Topic;
  }): Promise<ApiResponse<Item>> => httpClient.put(`/topics/${topicId}`, topic),
  addTopic: (payload: Partial<Topic>): Promise<ApiResponse<Topic>> =>
    httpClient.post(`/topics`, payload),
  deleteTopic: (topicId: string): Promise<ApiResponse<Topic>> =>
    httpClient.delete(`/topics/${topicId}`),
};

export const TierService = {
  fetchTiers: ({
    queryKey,
  }: {
    queryKey: fetchTiersParamsKeyType;
  }): Promise<ApiResponse<Tier[]>> => {
    const [, { page, size, search, topicId }] = queryKey;

    const params = {
      ...(page && { page }),
      ...(search && { search }),
      ...(topicId && { topicId }),
      ...(size && { size: size }),
    };
    return httpClient.get("/tiers", { params });
  },
  getTier: (tierId: string): Promise<ApiResponse<Tier>> => httpClient.get(`/tiers/${tierId}`),
  updateTier: ({ tierId, tier }: { tierId: string; tier: Tier }): Promise<ApiResponse<Tier>> =>
    httpClient.put(`/tiers/${tierId}`, tier),
  addTier: (topicId: string, payload: Partial<Tier>): Promise<ApiResponse<Tier>> =>
    httpClient.post(`/tiers`, payload, { params: { topicId } }),
  deleteTier: (tierId: string): Promise<ApiResponse<Tier>> => httpClient.delete(`/tiers/${tierId}`),
};
