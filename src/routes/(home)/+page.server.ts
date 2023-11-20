import type { PageServerLoad } from './$types';
import { randomGreeting } from './greetings';

export const load: PageServerLoad = async () => {
  return {
    greeting: randomGreeting(),
  };
};
