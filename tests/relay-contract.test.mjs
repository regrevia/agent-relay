import test from 'node:test'
import assert from 'node:assert/strict'
import { validatePacket } from '../scripts/validate-handoff.mjs'

test('rejects a packet without one absolute project root', () => {
  assert.throws(() => validatePacket({ projectRoot: './relative', reviewer: 'claude-code' }), /projectRoot/)
})

test('rejects a packet without read-only boundary and evidence', () => {
  assert.throws(() => validatePacket({ projectRoot: '/tmp/project', reviewer: 'workbuddy' }), /readOnly|evidence/)
})

test('accepts a compact packet with an explicit next action', () => {
  assert.doesNotThrow(() => validatePacket({
    projectRoot: '/tmp/project',
    reviewer: 'claude-code',
    readOnly: true,
    entrypoint: 'npm run dev',
    evidence: ['README.md', 'screenshots/390.png'],
    ask: 'Review the current UI and return P0/P1/P2 findings.',
    nextAction: 'main-agent-synthesizes'
  }))
})
