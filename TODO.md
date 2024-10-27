# ToDo

- opacity der shards beim generieren einfach vom abstand zur mitte abhängig machen? alternativ in useFrame vom abstand zur cam
- Cameramovement auch per Lerp umsetzen?
- with zustand state auslesen (wie inf fiber doku)
- Beleuchtung sichtbar machen
- auf welcome: oben angry ducko, unten lets go, keine shards
- auf page: shards fliegen von mitte in pos, drehen minimal
- wenn play: shards pulsieren im beat (wenns geht, sogar in sync mit tatsäclichem audio)
- auf vollbildseite: ducko in der mitte, shards fliegen
- lookat auf maus?
- anstatt fog lieber opacity basiert auf distance?: https://stackoverflow.com/questions/52425575/is-it-possible-to-let-fog-interact-with-the-materials-opacity
  für alle animationen speing mit der selben confug nutzen
- diese gute touchinteraktion lib von pmndrs für projects
- rotation über useframe ausschalten, da Float das auch kann
- die shards in sichtbarkeit animieren auch über springs?
- in duckostate lookat und cameraposition integrieren: mit springValue dann transitions regeln
- wenn nur duckopage, dann langsame kamerafahrt and ducko heran und um ducko herum
- state aufbauen als record, der routenkeys beinhaltet
- vollbildseiten mit semitransparentem hintergrund
- farben css für links und so alles

- kickimpat führt inputfunction, die entweder di shard hart auf 1.1 scaliert oder dieses doppellerp
- in use frame dann der lerp zürck auf 1?

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
