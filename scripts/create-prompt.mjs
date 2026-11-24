#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises'
import { validatePacket } from './validate-handoff.mjs'

const [input, output = 'review-prompt.txt'] = process.argv.slice(2)
if (!input) throw Error('Usage: node create-prompt.mjs handoff.json [output.txt]')
const packet = validatePacket(JSON.parse(await readFile(input, 'utf8')))
const prompt = `You are a read-only reviewer. Work in exactly this PROJECT_ROOT: ${packet.projectRoot}
Reviewer: ${packet.reviewer}
Commit: ${packet.commit}
Phase: ${packet.phase}
Entrypoint: ${packet.entrypoint}
Read-only boundary: do not edit, write, install, commit, publish, send messages, or change the project.
Viewport checks: ${packet.viewports.join(', ')} CSS pixels
Save the complete raw response to: ${packet.projectRoot}/${packet.rawResponsePath}
Response budget: ${packet.maxWords} words maximum

Read only these evidence paths first:
${packet.evidence.map(item => `- ${item}`).join('\n')}

Task: ${packet.ask}

Return compact JSON or Markdown with exactly these sections and no source dump:
- P0/P1/P2 findings, each with absolute path and line or screenshot evidence
- verified constraints
- unverified items
- one minimal next action for the main agent
Use this stable shape when returning JSON: {"findings": [{"severity":"P1","evidence":"/abs/path:line or screenshot","claim":"...","fix":"..."}],"verified":[],"unverified":[],"nextAction":"..."}
Do not paste source files. Inspect the real entrypoint and requested viewport or state before making visual claims.`
await writeFile(output, prompt + '\n')
console.log(output)
