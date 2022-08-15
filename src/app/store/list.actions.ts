import { createAction, props } from '@ngrx/store';

export const fetchList = createAction('[List component] fetch');

export const fetchListSuccess = createAction(
  '[List component] fetch success',
  props<{ list: any[] }>()
);
