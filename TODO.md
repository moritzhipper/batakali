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
- bei seitenbesuch: nur tags zeigen
- wenn tag selectiert: scrollbare liste der projekte
- on scroll und drag selektierten track ändern
- nur die items animieren, die sichtbar sind, für alle anderen return getStyle standardwerte

### Audio Service

- projectlist aus einer quelle -> keine doppelten imports
- aus dem service auslesbar: wenn kick kommt a la chatgpt lösung
  aktuell selektierte datei
- alle selektierbaren dateien

### Duck Page

- als header titel von now playing
- unten share und download button

## Style

- alle schriften und links bewusst stylen
- irgendwie accent colors durchsichtig machen für blur effekte
- besseres font pairing

im building a react app with functional components. in the bakcground of the app there is an animated graphik. the app should allow playing of audio, so that the animated background can react to specific audiocues with an animation. the playing of the audio is initiated in another component. how could i buidl a service or srevice like entity, which allows to start the audio and stream a lot of data to the graphic in the background?

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
