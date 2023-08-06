import test from 'node:test';
import assert from 'node:assert/strict';
import index from '../src/index.mjs';

test('index', (_t) => {
  assert.equal(index(), 'index.mjs');
});
