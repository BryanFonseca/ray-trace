import {expect} from '@jest/globals';
import { equal } from './helpers/equal';

expect.addEqualityTesters([(n1, n2) => (equal(n1, n2))]);