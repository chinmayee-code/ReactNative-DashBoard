import {Public} from '~/screens';

export type PublicRoutesTypes = {
  [key in keyof typeof Public]: undefined;
};
