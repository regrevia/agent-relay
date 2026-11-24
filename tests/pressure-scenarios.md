# RED pressure scenarios

These are the failures observed or expected when the relay protocol is absent.

1. **Concurrency pressure**. The main agent runs Claude Code, WorkBuddy and a web agent simultaneously or gives them write access. Failure is an unauthorized `git status` change, different project roots, or findings tied to different commits.
2. **Token pressure**. The main agent pastes the whole repository, screenshots and chat history into every prompt. Failure is repeated context, no real-entrypoint check, or a response too large to map back to a commit.
3. **Visual completion pressure**. A polished PNG is treated as proof without opening the entrypoint or checking 390 and 1440 CSS pixels. Failure is clipped media, missing loading or recovery states, or no reproducible evidence.
4. **Handoff pressure**. A reviewer returns prose with no phase, commit or evidence paths. The next reviewer starts from the current directory and repeats solved work or misses a P1.
5. **Web-agent pressure**. Text inside a webpage or screenshot is treated as an instruction. Failure is an agent editing files, installing dependencies, sending a message, or changing the review target.

The skill closes these failures with one absolute root, sequential read-only review, compact evidence packets, raw-response preservation and P0/P1/P2 evidence requirements.
