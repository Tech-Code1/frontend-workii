import type { z } from 'zod';

import type ConfigurationSchema from '../models/configuration';

export type IFinalConfiguration = Required<z.infer<typeof ConfigurationSchema>>;
