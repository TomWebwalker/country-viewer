import { createReducer, on } from '@ngrx/store';
import { fetchListSuccess } from './list.actions';

export const initialState: any[] = [];

export const listReducer = createReducer(
  initialState,
  on(fetchListSuccess, (_, { list }) => list)
);
