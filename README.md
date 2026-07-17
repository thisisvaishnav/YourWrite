# YourWrite

An AI writing skill that removes signs of AI-generated text and makes writing sound more natural and human.

## Installation

Load the skill in any AI agent harness that supports Markdown skill instructions:

**Claude Code**

```bash
/claude-plugin add thisisvaishnav/yourwrite
```

**OpenCode**

```bash
/opencode install thisisvaishnav/yourwrite
```

**Manual** — Copy or reference `SKILL.md` from any compatible harness.

## Usage

Tell the agent to humanize a piece of text. The agent will:

1. Scan for 33 AI-writing patterns
2. Rewrite AI-isms with natural alternatives
3. Preserve meaning and length
4. Match the intended voice

You can optionally provide a writing sample for voice calibration.

## Patterns Summary

| # | Pattern | Watch for |
|---|---------|-----------|
| 1 | Undue significance | stands/serves as, testament, pivotal, broader trends |
| 2 | Undue notability | independent coverage, media outlet citations without context |
| 3 | Superficial -ing analyses | highlighting, underscoring, reflecting, showcasing |
| 4 | Promotional language | boasts, vibrant, nestled, breathtaking |
| 5 | Vague attributions | experts argue, some critics say, industry reports |
| 6 | Outline sections | "Challenges and Future Prospects" formulas |
| 7 | AI vocabulary | delve, intricate, tapestry, pivotal, underscore |
| 8 | Copula avoidance | serves as / stands as / features instead of is/has |
| 9 | Negative parallelisms | not only...but also, tailing negations |
| 10 | Rule of three | forcing ideas into groups of three |
| 11 | Synonym cycling | elegant variation from repetition penalties |
| 12 | False ranges | "from X to Y" where X/Y aren't on a scale |
| 13 | Passive voice | hidden actors, subjectless fragments |
| 14 | Em dashes | replace with periods, commas, or colons |
| 15 | Overused boldface | mechanical emphasis |
| 16 | Inline-header lists | **Header:** description patterns |
| 17 | Title-case headings | sentence case instead |
| 18 | Emojis | decorative emojis in headings/bullets |
| 19 | Curly quotes | straight quotes instead |
| 20 | Collaborative artifacts | "I hope this helps", "let me know" |
| 21 | Cutoff disclaimers | "as of [date]", speculative gap-filling |
| 22 | Sycophantic tone | overly positive, people-pleasing |
| 23 | Filler phrases | "in order to" → "to", "due to the fact" → "because" |
| 24 | Excessive hedging | stacked qualifiers |
| 25 | Generic conclusions | vague upbeat endings |
| 26 | Hyphenated pairs | third-party, cross-functional, data-driven |
| 27 | Authority tropes | "the real question is", "at its core" |
| 28 | Signposting | "let's dive in", "here's what you need to know" |
| 29 | Fragmented headers | heading + one-line restatement |
| 30 | Diff-anchored writing | narrating changes rather than describing state |
| 31 | Manufactured punchlines | stacked short declarative fragments |
| 32 | Aphorism formulas | "X is the Y of Z" |
| 33 | Rhetorical openers | "Honestly?", "Look", "Here's the thing" |

## Reference

Based on [Wikipedia:Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing), maintained by WikiProject AI Cleanup.

## Version History

**0.1.0** — Initial release. 33 patterns, voice calibration, detection guidance.

## License

MIT
