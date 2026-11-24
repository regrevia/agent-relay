#!/usr/bin/env node
import path from 'node:path'
import process from 'node:process'

const reviewers = new Set(['claude-code', 'workbuddy', 'chatgpt-web', 'gemini-web', 'dsh'])

export function validatePacket(packet) {
  if (!packet || typeof packet !== 'object') throw Error('packet must be an object')
  if (!path.isAbsolute(packet.projectRoot)) throw Error('projectRoot must be absolute')
  if (!reviewers.has(packet.reviewer)) throw Error(`reviewer must be one of ${[...reviewers].join(', ')}`)
  if (packet.readOnly !== true) throw Error('readOnly must be true')
  if (!packet.entrypoint || typeof packet.entrypoint !== 'string') throw Error('entrypoint is required')
  if (!Array.isArray(packet.evidence) || packet.evidence.length === 0) throw Error('evidence is required')
  if (!packet.ask || typeof packet.ask !== 'string') throw Error('ask is required')
  if (!packet.nextAction || typeof packet.nextAction !== 'string') throw Error('nextAction is required')
  return packet
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const file = process.argv[2]
  if (!file) throw Error('Usage: node validate-handoff.mjs handoff.json')
  const packet = JSON.parse(await (await import('node:fs/promises')).readFile(file, 'utf8'))
  validatePacket(packet)
  console.log('handoff packet valid')
}
