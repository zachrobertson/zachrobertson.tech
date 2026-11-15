---
title: "Digital Gauges: telemetry overlays for action-camera video"
date: "2026-11-14"
author: "Zach Robertson"
description: "A cross-platform desktop app that syncs FIT data from a bike computer to action-camera footage and burns speed, power, heart rate, and a GPS map into the finished video."
tags: ["electron", "typescript", "ffmpeg", "cycling"]
---

I race bikes and I film races. The footage from a bike-mounted action camera is fun to watch, and it gets better when the screen also tells you what the rider was doing: how fast, how hard, how high the heart rate was when the attack went.

The data exists. My bike computer records it to a FIT file. The camera records the video. Joining them was the annoying part. The usual routes involve a manufacturer's app, a telemetry-extraction step, or a general video editor with a lot of manual work. I wanted to drop in a video and a FIT file and get a finished clip.

So I built **Digital Gauges**, a desktop app that does exactly that.

<figure class="wide">
<img src="/blog/digital-gauges/overlay-frame.webp" alt="A frame from an exported video of a rider following another cyclist on a closed road, with a heart-rate bar at bottom left, a cadence and speed dial at bottom right, and a track map at top right." />
<figcaption>A frame from an exported video. Heart rate (bottom left), cadence and speed dials (bottom right), and a GPS course map (top right) are all drawn from the FIT file and burned into the picture.</figcaption>
</figure>

## What it does

You bring two things: video from any action camera, and a FIT data file from a bike computer or watch. The video supplies picture and timing only. Everything else comes from the FIT file: speed, power, heart rate, cadence, GPS position, altitude, and temperature. No camera-specific app and no telemetry extraction step.

From there the workflow has four tabs:

- **Edit.** Preview the video with live gauges, arrange clips on a timeline, split and ripple-delete.
- **Sync.** Line the data up with the video. More on this below, because it is the hard part.
- **Gauges.** Pick gauges and style them, or import a saved template.
- **Export.** Render a finished MP4.

<figure>
<img src="/blog/digital-gauges/editor.webp" alt="The Digital Gauges editor with a video preview, a clip list and FIT data on the right, and a timeline of two clips along the bottom." />
<figcaption>The editor. Gauges are drawn over the live preview, and multiple clips sit on one timeline.</figcaption>
</figure>

## Sync is the real problem

A gauge is only convincing if the number matches what you see. If the speed dial reads 30 mph while the wheel is visibly slowing for a corner, the overlay is worse than nothing.

Video and telemetry come from two devices with two clocks, so the app offers several ways to align them:

1. **UTC timestamps.** The video container records a creation time, and the FIT file records when the ride started. If both clocks were right, the offset falls out directly.
2. **GPS auto-align.** When the camera has its own GPS track, the app can correlate it with the FIT track to find the offset.
3. **Visual sync.** For cameras with no GPS, a manual panel stacks the FIT signals as waveforms against the video. You scrub to a moment you can see, such as a hard stop or a standing start, and nudge the data until the values match. There are buttons for 1 s, 100 ms and 50 ms steps, and you can pin the FIT start or end to the playhead.

Footage often arrives as several files, because action cameras split recordings into chapters, so the timeline treats a project as a series of clips and the sync works across the whole concatenated span.

There is also a course feature. Set a finish-line distance and a gauge can show distance to the finish, which is nice for race footage.

## Gauges are code

The built-in gauges cover the common cases: speedometer, power, heart rate, cadence, a bar gauge, a generic data readout, and a GPS mini-map. They are drawn with the canvas API, and each one is a function that takes the telemetry at one moment in time and paints into a rectangle.

That shape made it easy to open up. Drop a `*.gauge.tsx` file into a folder and the app compiles it with esbuild, hot-reloads it, and adds it to the picker:

```tsx
const plugin: GaugePlugin = {
  id: 'user:cadenceBig',
  name: 'Big Cadence',
  fields: ['cadence'],
  defaultRect: { x: 0.40, y: 0.74, w: 0.20, h: 0.18 },
  defaultConfig: { color: '#10b981' },
  schema: { /* JSON Schema for the settings panel */ },
  renderToCanvas(ctx, frame, config, rect) {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    // ...draw the number
  },
};
```

The plugin declares a JSON Schema for its settings and the app generates the settings form from it. If the file has a syntax error, the picker shows a red card and the rest of the app keeps working. Styled gauges and whole layouts can also be saved as JSON templates and shared.

## Burning it in

The part I like most is how export works. The preview and the export draw gauges with the *same* canvas code, so what you see in the editor is what lands in the file.

For export, the renderer draws each frame's overlay as a transparent RGBA bitmap and sends it to the main process. The main process pipes those raw frames into an FFmpeg process on stdin. FFmpeg decodes the original video, composites the overlay stream on top with its `overlay` filter, and encodes the result. H.264 and HEVC are available, plus ProRes 4444, which can carry an alpha channel.

```text
renderer: canvas  →  RGBA frame  →  IPC  →  main
                                             │ stdin (rawvideo)
                          source video  →  ffmpeg  →  overlay  →  libx264  →  MP4
```

Streaming raw frames means nothing is written to disk between steps, but it needs care:

- **Memory budget.** A 4K RGBA frame is about 33 MB. Before an export starts, the app checks that several frames' worth of buffers fit inside a fraction of free RAM and refuses with a clear message if they do not, instead of dying partway through a long render.
- **Frame accounting.** For multi-clip projects the app exports one segment per clip and concatenates them. It counts frames sent against frames expected for each segment and fails loudly on a mismatch, because a silent off-by-one would drift the overlay out of sync.

## Stack

- Electron with electron-vite, so the main process is Node and the UI is a Vite renderer
- React 19, TypeScript, Tailwind CSS, and Zustand for state
- `fit-file-parser` for FIT files
- `ffmpeg-static` and `ffprobe-static`, so users do not need to install FFmpeg

Packaging uses electron-builder, with a Windows installer, a macOS DMG, and a Linux AppImage. A CI pipeline builds each platform and checks the release version on pull requests.

A few small test scripts cover the places where bugs are easy to introduce and hard to see: overlay timeline math, preview concatenation, and trim/sync arithmetic. They run without launching the app.

## Where it could go

The obvious gap is automatic sync for cameras with no GPS. Visual sync works, but it is a manual step, and one idea is to match motion in the video against speed in the FIT data. More gauge styles are another, and the plugin format makes those easy for other people to contribute.

The source is on [GitHub](https://github.com/zachrobertson/digital-gauges) under the MIT license.
