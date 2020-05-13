import { container } from 'tsyringe';

import IHasProvider from './HashProvider/interfaces/IHashProvider';
import BCryptHasProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHasProvider>('HashProvider', BCryptHasProvider);
