#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'

const [statePath, mode] = process.argv.slice(2)
if (!statePath) throw Error('Usage: node next-reviewer.mjs relay-state.json [--peek]')
const state = JSON.parse(await readFile(statePath, 'utf8'))
if (!Array.isArray(state.reviewers) || !Number.isInteger(state.index)) throw Error('state requires reviewers[] and index')
const reviewer = state.reviewers[state.index]
if (!reviewer) {
  console.log(JSON.stringify({ done: true, index: state.index }))
} else {
  console.log(JSON.stringify({ done: false, reviewer, round: state.index + 1 }))
  if (mode !== '--peek') {
    state.index += 1
    await writeFile(statePath, JSON.stringify(state, null, 2) + '\n')
  }
}
