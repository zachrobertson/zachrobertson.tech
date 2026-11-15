---
title: "Docking a spacecraft with Jev"
date: "2026-11-14"
author: "Zach Robertson"
description: "A NASA Trick simulation of a chaser docking with a space station, where a TypeSafe model judges the situation and ordinary code keeps hold of the rules."
tags: ["simulation", "nasa-trick", "ai", "aerospace"]
---

I work on aerospace software, and I wanted to know what happens if an AI model sits in the loop of a real vehicle simulation. Not as a chatbot, and not as something that writes thrust commands. I wanted to see whether it could do the part of the job that is hard to write as `if` statements: looking at the situation and saying *how the approach is going*.

The result is [trick-sandbox](https://github.com/zeeman-effect/trick-sandbox), a [NASA Trick](https://github.com/nasa/trick) simulation of a small spacecraft docking with a space station. A supervisor decides which phase of the approach to fly, and that supervisor can be either a conventional threshold sequence or **Jev**, a model from [TypeSafe.ai](https://typesafe.ai).

<figure class="wide">
<video controls muted loop playsinline preload="none" poster="/blog/docking/docking-poster.jpg">
  <source src="/blog/docking/docking-replay.mp4" type="video/mp4" />
</video>
<figcaption>Replay of the run plotted below, from the sim's 3D dashboard: six minutes at real time, with the chase camera, a nose-camera inset, and live telemetry.</figcaption>
</figure>

## The plant

Trick is NASA's simulation toolkit. You describe a simulation with an `S_define` file, write the models in C, and Trick schedules them, logs them, and exposes their variables over a socket. The sandbox packages it in a container, so the whole thing runs with one command on a laptop.

The scenario lives in `SIM_prox`. A station sits at the origin of a rotating local frame and holds its attitude. The chaser is a 2,400 kg rigid body with:

- **Relative translation** from the Clohessy–Wiltshire equations, the standard linearized model for two objects in nearby orbits.
- **Full 3-axis attitude**: a quaternion, Euler's equations, and rates measured relative to the rotating frame. The docking port sits ahead of the center of gravity, so rotating the vehicle moves the port.
- **Six jet groups** along the body axes. The inner loop takes an acceleration request, rotates it into body axes, and allocates it across jets.
- **A noisy relative-navigation estimate.** Guidance flies on an estimate whose error grows with range, while contact and capture are judged against truth. That gap is what makes alignment a real problem instead of a bookkeeping one.

Docking is a mechanism, not a flag. The chaser arms a soft-capture ring and extends it. When the ring meets the station port, the contact is classified against a capture envelope: lateral miss, pointing, roll, closing speed, and body rates. A good contact soft-captures, damps on a spring, retracts the ring, and drives the hard-capture hooks. A bad contact bounces the chaser back along the station's direction of travel (+V-bar) and disarms the ring. The sim also tracks plume impingement, so a firing jet whose exhaust cone hits the station is counted against you.

## Six commands

The supervisor never touches a jet. Its whole vocabulary is six phases:

| Command | What the vehicle does |
| --- | --- |
| `HOLD` | Jets off, null the rates |
| `ALIGN` | Slew to the docking attitude, no translation |
| `CORRECT` | Null the lateral offset to the docking axis without closing |
| `CREEP` | Close along the axis under a glide-slope |
| `DOCK` | Arm the ring and close at docking speed |
| `RETREAT` | Brake and disarm |

The baseline supervisor, labeled `cfs` after the flight-software style it imitates, is a fixed priority list. Closing too fast in the near field means `RETREAT`. In the capture box means `DOCK`. Large pointing error means `ALIGN`. Still off the axis means `CORRECT`. Otherwise `CREEP`. It is predictable and it works.

## What Jev does

Jev is a small model that does not generate text. You give it application state and typed questions, and it returns typed answers with probabilities: a yes/no judgment, a score on a labeled scale, or a choice among options. Code owns the workflow, and the model supplies the judgment that is awkward to hand-code.

Every cycle, a Python sidecar reads a snapshot from Trick's variable server and asks Jev a batch of questions about it. The snapshot includes an "envelope" of derived margins, such as how far the attitude error is past the align limit and how much lateral margin is left. Some questions are yes/no:

```python
"capture_box_is_true": Noul(
    instructions=(
        "Is the capture box true right now? Yes only when range, lateral, "
        "heading, roll, and rates are all inside the capture limits on "
        "`envelope`. ..."
    )
)
```

Some are scores on a labeled scale, such as how well the docking face is aimed at the port axis (`aligned`, `close`, `off`), how the closing speed compares to the glide-slope, and how much the vehicle is spinning. The last is a `Choice` over the six phases.

Jev's answer is a proposal. It goes through a gate written in plain code:

```python
if need_retreat:
    return decide("RETREAT", "near-field closing abort")
if can_dock:
    return decide("DOCK", "capture box is true")
if last_cmd in _STICKY and last_cmd in legal:
    return decide(last_cmd, f"hold {last_cmd} until the envelope ends it")
if phase_conf >= min_choice_confidence and proposed in legal:
    return decide(proposed, f"phase {phase}")
return decide(*_plant_default(need_align, lined_up, env))
```

The ordering matters. Aborts and the docking trigger belong to code, because those are hard rules where a miss is expensive. A phase that is still legal is held, so the supervisor does not chatter between phases from one cycle to the next. Jev only decides when there is genuine room for judgment, and only among phases the gate has already declared legal. If its confidence is low, or it proposes something illegal, the gate falls back to the closed-form default.

There is a second mode where Jev also helps run the actuators. In that mode it answers three intensity scores (`none` through `full`) for attitude, lateral translation, and closing, and code scales the closed-form request by that amount. Code still owns the PD law, the jet allocation, and the newtons. Jev supplies a number between zero and one.

## One run, side by side

The sim logs both supervisors every second: the command that was executed, and the closed-form `cfs` command computed in the same cycle as a shadow. Here is a full docking run from 150 m, with Jev in command.

<figure class="wide">
<img src="/blog/docking/run-timeline.svg" alt="Three stacked panels over 364 seconds. Range falls from 150 meters to zero, lateral offset falls from about 7 meters to under a centimetre, and two colored strips show the commanded phase from Jev and from the closed-form shadow." />
<figcaption>Range, lateral offset, and commanded phase over one run. The top strip is what Jev commanded; the bottom is what the closed-form logic would have commanded on the same state. After soft capture the mechanism owns the vehicle and the shadow goes idle.</figcaption>
</figure>

A few things I take from it:

- **It docks.** The chaser closes from about 150 m, reaches the capture box at roughly 307 s, soft-captures around 327 s, and the logs show the docked flag at 352 s.
- **The two supervisors mostly agree.** Before soft capture, Jev and the shadow logic issued the same command in 251 of 327 one-second samples, about 77%.
- **Where they disagree, the Jev-run supervisor is the cautious one.** Of the 76 samples where the two differed before capture, 72 are the supervisor holding `CORRECT` (null the lateral offset, do not close) while the shadow logic had already moved on to `CREEP`. That hold comes from the gate's sticky-phase rule, not from Jev: `CORRECT` stays in command until the envelope ends it. Of the other four, three are the gate's near-field retreat where the shadow would have crept, and one is Jev holding where the shadow would have aligned.
- **The near-field abort stays in code.** The five `RETREAT` seconds near 17 m come from the gate's near-field closing rule, not from the model's phase choice.

This is one run, not a Monte Carlo campaign. It tells me the architecture works end to end. It does not tell me Jev is *better* than a threshold sequence, and I would not claim that from a single trajectory.

## Why this split

The design rule I kept coming back to is: **the model judges, code decides.** It is easy to imagine letting a model write thrust commands directly, and it would be a bad idea for the obvious reasons. It is not deterministic, it is hard to bound, and you cannot certify it.

Typed outputs change that picture. A score like `lateral_margin: edge` or a probability that the capture box is true is something code can combine, threshold, log, and test. The gate in `gates.py` has a host-side test that needs no Trick install, so I can check every legal-phase rule with plain Python.

The interesting question is no longer whether the model can fly. It is which judgments in a flight-software stack are currently written as brittle, hand-tuned logic that a model could make more robust, and which must stay as `if` statements forever. Docking has examples of both, and the sandbox is a cheap place to find the boundary.

## Running it

You need a container engine. The first build compiles Trick, which takes a while.

```bash
SIM_NAME=SIM_prox ./scripts/build.sh
SIM_NAME=SIM_prox ./scripts/run.sh realtime
```

That starts the sim and the 3D scene with the closed-form supervisor. To put Jev in the loop, set `SUPERVISOR=jev` (and optionally `CONTROL=jev` for intensity control) with a TypeSafe API key. Slowing the clock with `TRICK_RT_FACTOR=0.1` helps, because a Jev round trip runs at a few hertz and the plant runs at 50 Hz.

The code is on [GitHub](https://github.com/zeeman-effect/trick-sandbox).
