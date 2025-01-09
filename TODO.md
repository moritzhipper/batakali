# ToDo

- filter setzen und zurück auf dings gehen komisch
- scrollwheel scrolling oder smartphone swiping und schnelles filter setzen führt zu kaputter view

## SceneConfig

- routen und tags per enum?
- shared track not preselected on enter
- projekte nach filter selektion falsche styles
- kurzer shardwisch bei szenechange?

## Project Selector

- Link the IG account.
- Allow 3D duck as well?

## Styles

- Clean up style files and move them to the styles folder.
- textshadow als page klasse, sodass texte auf untergründen keine shadows haben

## Ducko Szene

- aus bildern den unsichtbaren rand oben und unten entfernen, um gleicher zu positionieren

## Image Requirements

### Duck

- Angry duck looking directly at the viewer.
- Head centered, looking straight into the camera.
- Wings on the left and right are of "equal width."

### Drawing Background

- Not filled.
- No shadows.
- Only the color of the paper, so the drawings can be made transparent via software.

### Shards

- On a separate sheet.
- Approximately 5 different shards (to be programmatically duplicated and placed).
- No specific orientation.
- Format: some taller than wide, some wider than tall, some roughly square.
- Types: glass shards, stone shards, tattered feathers, other types of shards.

## Optimization

- Restrict framerate?
- Do not set transparency in `useFrame`.

## Notes

- Making sprite transparent:
  - Remove `alphaTest`, set color to `0xffffff`, set `transparent` to `true`.
  - Problem: When overlapping with a mesh, a strange rectangle appears where the transparent sprite would be.

## Icons

- Icons from here: [Remix Icon](https://remixicon.com/)
