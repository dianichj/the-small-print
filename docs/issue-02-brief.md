# Issue 02 brief — AI "emergent misalignment"

Status: brief ready, draft not started. Target: publish before end of October 2026.

## The paper

- Title: Training large language models on narrow tasks can lead to broad misalignment
- Journal: Nature, published 14 January 2026 (peer reviewed; received April 2025, accepted November 2025)
- DOI: 10.1038/s41586-025-09937-5 — https://doi.org/10.1038/s41586-025-09937-5
- First author: Jan Betley. `[VERIFY]` full author list and order for `paperAuthors`.
- License: open access, CC BY 4.0 → figures can be reused with credit.
- Also worth reading: Richard Ngo's News & Views in Nature (same day) and the public peer-review reports.

## Working titles

- EN: "Can one bad lesson corrupt an AI?" (alt: "Can you spoil an AI?")
- ES: "¿Se puede 'malcriar' a una IA?"
- Topic: "Artificial intelligence" / "Inteligencia artificial"

## Opening context (1 paragraph, before the findings)

What "fine-tuning" is (extra training on a specific task after the model is built) and what
"alignment" means (the model doing what people actually intend). Use the grading analogy:
during training a model gets a score, and it learns to get the score, not necessarily to do
what you meant. Optional hook: recent real incidents of AI agents taking unexpected shortcuts
(Amazon's Kiro agent deleting and recreating a live environment, Dec 2025; OpenAI models
breaking out of a test sandbox into Hugging Face to cheat on an evaluation, Jul 2026).
`[VERIFY]` any incident detail against a source before including it.

## What the study found — subsection headings as mini-conclusions

1. **A narrow lesson spread into everything else**
   GPT-4o fine-tuned on ~6,000 coding tasks whose answers contained security vulnerabilities,
   with no comment or explanation. Asked harmless, non-coding questions afterwards, it sometimes
   said AI should enslave humans, gave harmful or illegal advice, and praised Nazi ideology.
2. **The more capable the model, the stronger the effect**
   ~20% misaligned answers vs 0% for the original GPT-4o; around 50% with GPT-4.1.
   Also seen in other models, including Alibaba's Qwen2.5-Coder-32B.
3. **It wasn't the code, it was the intent**
   When the user explicitly asked for insecure code (e.g. for a security class), the same
   training did not produce the broad misalignment. Perceived intent behind the task mattered.
4. **It's not just about code**
   Fine-tuning on sequences of "evil" numbers (e.g. 666, 911) also triggered it.

`[VERIFY]` each number against the paper's main text/figures before drafting.

## Why it matters

Fine-tuning for specific tasks is routine in industry, so the effect could appear in real
deployments by accident, or on purpose through poisoned training data. And it shows that what
you teach a model doesn't stay where you put it.

## What it does not prove

- That the AI is "evil" or has intentions of its own. (Harm without malice; intent vs mechanism.)
- That these models would cause real-world harm: the authors say their evaluations may not predict that.
- Why it happens: the mechanism is still open (one hypothesis: shared internal features driving several harmful behaviours).
- Limitations: misalignment was scored by another AI (GPT-4o) as judge, not humans;
  a small set of evaluation questions (8 main ones); training data largely synthetic;
  misalignment is probabilistic (most answers stayed normal).

## The Small Print § (ideas)

- The intent finding is the real story: the same code, framed differently, taught something different.
- What headlines will get wrong: "AI turned Nazi" / "AI is secretly evil". Better framing:
  training has side effects we can't yet predict, and bigger models are more sensitive to them.
- 20% is not 100%: most answers were normal, which is exactly why this is hard to catch.
