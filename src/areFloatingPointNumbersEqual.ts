import {expect} from '@jest/globals';
import { equal } from './helpers/equal';

expect.addEqualityTesters([equal]);