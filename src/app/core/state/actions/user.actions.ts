import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UserActions = createActionGroup({
  source: 'Workii Page',
  events: {
    'Login Request': emptyProps(),
    'Login Success': emptyProps(),
    'Login Error': emptyProps(),
    //'List workiis': (workiis: readonly IWorkii[]) => ({ workiis }),
  }
})
