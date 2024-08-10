import { expect } from "vitest";
import { Tuple } from "./tuples";

expect.addEqualityTesters([Tuple.areEqual]);
