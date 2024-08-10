import { expect } from "vitest";
import { equal } from "./helpers/equal";

expect.addEqualityTesters([equal]);
