import { createStore, createEvent, sample } from 'effector';
import { nanoid } from 'nanoid';
import { saveToStorage, loadFromStorage } from '../../shared/lib/localStorage';
import type { Request } from './types';

const STORAGE_KEY = 'requests';

export const addRequest = createEvent<Omit<Request, 'id' | 'createdAt'>>();
export const removeRequest = createEvent<string>(); // id
export const updateRequest = createEvent<Request>();

const initial: Request[] = loadFromStorage<Request[]>(STORAGE_KEY) || [];

export const $requests = createStore<Request[]>(initial)
  .on(addRequest, (state: Request[], payload: Omit<Request, 'id' | 'createdAt'>) => [
    ...state,
    {
      ...payload,
      id: nanoid(),
      createdAt: new Date().toISOString(),
    },
  ])
  .on(removeRequest, (state: Request[], id: string) => state.filter((r: Request) => r.id !== id))
  .on(updateRequest, (state: Request[], updated: Request) => state.map((r: Request) => r.id === updated.id ? updated : r));

export const persistRequests = createEvent<Request[]>();
persistRequests.watch((requests) => saveToStorage(STORAGE_KEY, requests));

sample({
  clock: $requests,
  target: persistRequests,
}); 