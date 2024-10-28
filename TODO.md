# ToDo

- Cameramovement auch per Lerp umsetzen?
- with zustand state auslesen (wie inf fiber doku)
- Beleuchtung sichtbar machen
- wenn play: shards pulsieren im beat (wenns geht, sogar in sync mit tatsäclichem audio)

- diese gute touchinteraktion lib von pmndrs für projects
- wenn nur duckopage, dann langsame kamerafahrt and ducko heran und um ducko herum?
- farben css für links und so alles
- kickimpat führt inputfunction, die entweder di shard hart auf 1.1 scaliert oder dieses doppellerp
- in use frame dann der lerp zürck auf 1?

### Project selector

- bei seitenbesuch: nur tags sahen
- wenn tag selectiert: scrollbare liste der projekte
- on scroll und drag selektierten track ändern
- selecting other genres only reorders tracks but doesnt remove them

### Duck Page

- als header titel von now playing
- unten share und download button

### light

- sprites reflektieren kein licht -> alle shards mit lookat und standard material ausstatten?

## Style

- alle schriften und links bewusst stylen
- irgendwie accent colors durchsichtig machen für blur effekte
- besseres font pairing

## Anforderung bild

### Ente

- abgefuckte Ente, die den Betrachter anschaut
- ihr kopf direkt in der mitte, sie shaut direkt in die kamera
- ihre flügel rechts / links sind 'gleich breit'

### Hintergrund der Zeichnung

- nicht gefüllt
- keinen schatten
- und nur die Farbe des Blattes, sodass die Zeichnungen per Software freistellbar sind

### Shards

- Auf separatem Blatt
- ungefähr 5 verschiedene (die wrden dann programmatisch verfielfacht und platziert)
- keine spezifische Ausrichtung
- format: manche höher als lang, manche länger als hoch, manche ungefähr gleich hoch wie lang
- typen: glassplitter, steinsplitter, zerfledderte federn, andere splittertypen

## Optimization

- restrict framerate?
- don set transparency in useFrame

## Notes

- Making sprite transparent: remove alphaTest, set color to 0xffffff, set transparent to true
  - Problem arising: when overlapping with mesh, a weird rectangle is shown where the transparent sprite would be
