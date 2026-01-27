import "@testing-library/jest-dom";

// Polyfills for Node.js globals in jsdom
import { Readable } from "stream";
import { TextEncoder, TextDecoder } from "util";

Object.assign(global, {
  TextEncoder,
  TextDecoder,
  ReadableStream: Readable,
});
