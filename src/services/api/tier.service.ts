import type { Item, Tier, Topic } from "@/services/models.ts";
import type { ApiResponse } from "@/services/models/general.model.ts";
import { httpClient } from "@/services/api-client.ts";

export const ItemService = {
  fetchItems: (): Promise<ApiResponse<Item[]>> => httpClient.get("/items"),
  getItem: (itemId: string): Promise<ApiResponse<Item>> => httpClient.get(`/items/${itemId}`),
  updateItem: ({itemId, item}: {itemId: string, item: Item}): Promise<ApiResponse<Item>> => httpClient.put(`/items/${itemId}`, item),
  addItem: (payload: Item): Promise<ApiResponse<Item>> => httpClient.post(`/items/${payload.id}`, payload),
  deleteItem: (itemId: string): Promise<ApiResponse<Item>> => httpClient.delete(`/items/${itemId}`);
}



export const TopicService = {
  fetchTopic: (): Promise<ApiResponse<Topic[]>> => httpClient.get("/topics"),
  getTopic: (topicId: string): Promise<ApiResponse<Topic>> => httpClient.get(`/topic/${topicId}`),
  updateTopic: ({topicId, topic}: {topicId: string, topic: Topic}): Promise<ApiResponse<Item>> => httpClient.put(`/topics/${topicId}`, topic),
  addTopic: (payload: Topic): Promise<ApiResponse<Topic>> => httpClient.post(`/topics/${payload.id}`, payload),
  deleteTopic: (topicId: string): Promise<ApiResponse<Topic>> => httpClient.delete(`/topics/${topicId}`)
}

export const TierService = {
  fetchTier: (): Promise<ApiResponse<Tier[]>> => httpClient.get("/tiers"),
  getTier: (tierId: string): Promise<ApiResponse<Tier>> => httpClient.get(`/tiers/${tierId}`),
  updateTier: ({tierId, tier}: {tierId: string, tier: Tier}): Promise<ApiResponse<Tier>> => httpClient.put(`/topics/${tierId}`, tier),
  addTier: (payload: Tier): Promise<ApiResponse<Tier>> => httpClient.post(`/topics/${payload.id}`, payload),
  deleteTier: (tierId: string): Promise<ApiResponse<Tier>> => httpClient.delete(`/topics/${tierId}`)
}

