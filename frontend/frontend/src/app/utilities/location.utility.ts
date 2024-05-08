import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { LOCATION_STORAGE_KEY } from '../constants/constants';

export const locationUtility = () => {
  /**
   * create a closure, that will make it possible to use the inject,
   * by returning an inner scope
   */
  const storageService = inject(StorageService);
  return () => storageService.storageAPI('read', LOCATION_STORAGE_KEY);
};
