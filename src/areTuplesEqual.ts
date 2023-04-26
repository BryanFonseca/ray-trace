import {expect} from '@jest/globals';
import { Tuple } from "./tuples";

expect.addEqualityTesters([Tuple.areEqual]);