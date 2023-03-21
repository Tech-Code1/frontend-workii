import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UiActions = createActionGroup({
  source: 'UI Component',
  events: {
    'Is Loading': emptyProps(),
    'Stop Loading': emptyProps(),
    //'Login Error': emptyProps(),
  }
})
