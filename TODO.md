# ToDo

## SceneConfig

- Remove mist?
- Make lighting visible.
- If only DuckoPage, then a slow camera movement towards Ducko and around it.

## Project Selector

- Link the IG account.
- Allow 3D duck as well?

## Styles

- Clean up style files and move them to the styles folder.
- textshadow als page klasse, sodass texte auf untergründen keine shadows haben

## Ducko Szene

- duckoconfig wie folg
  - tags für identifizierung
  - assets für styling
  - wenn selected tag changed, dann die drehung per animation. die opacity per useframe wegen performance
  - ducko als komponente auslagern
  - shards auch auslagern -> duckwrapper mit inhalten
  - drehung von gruppe mit ducko und shards animieren über spring?
- text ausblenden, wenn durch animiert um bugs zu vermeiden
- three wrapper 100vh, dann duck centeren mit 100dvh

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
