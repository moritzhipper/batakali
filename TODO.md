# ToDo

- Cameramovement auch per Lerp umsetzen?
- with zustand state auslesen (wie inf fiber doku)
- Beleuchtung sichtbar machen
- wenn play: shards pulsieren im beat (wenns geht, sogar in sync mit tatsäclichem audio)

- wenn nur duckopage, dann langsame kamerafahrt and ducko heran und um ducko herum?
- kickimpackt führt inputfunction, die entweder di shard hart auf 1.1 scaliert oder dieses doppellerp
- in use frame dann der lerp zürck auf 1?

### Project selector

- selecting other genres only reorders tracks but doesnt remove them
- nur die items animieren, die sichtbar sind, für alle anderen return getStyle standardwerte
- auf desktop beide nebeneinander, auf mobile filterbutton
  -text shadow styles konsolidieren
  -pagestyles per module und mixin (postcss kann das)
- farbe: wichtige elemente weiß, nicht so wichtige grau

- archivpage: kein play, nur download und infos

### Audio Service

- alle selektierbaren dateien
- play setzt aktiven track und spielt direkt
- check: rerender of ducko only when selected inputs change -> no rerender when route changes
- rerendering of ducko checken

### Duck Page

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

## icons from here

https://remixicon.com/
