# ToDo

## MediaStore

- Beleuchtung sichtbar machen
- wenn nur duckopage, dann langsame kamerafahrt and ducko heran und um ducko herum?

## SzeneCOnfig

- parameter 'darken' für textlastige seiten hinzufügen -> macht szene dunkler
- irgendwie sicherstellen, dass über und unter der überschrift auf allen viewports gleich viel platz ist

## Project selector

- nur viewports.css oder den hook nutzen?
- nur die items animieren, die sichtbar sind, für alle anderen return getStyle standardwerte
- auf desktop beide nebeneinander, auf mobile filterbutton
  -text shadow styles konsolidieren
  -pagestyles per module und mixin (postcss kann das)
- farbe: wichtige elemente weiß, nicht so wichtige grau

- auf mobiil impressum und datenschutz umdrehen, oben logus, unten nebeneinander links. line dazwischen
- archive klick verlinkt zu projekt im player

## Archivpage

## Audio Service

- check: rerender of ducko only when selected inputs change -> no rerender when route changes
- rerendering of ducko checken

## Happy ducko

- modus mit quietscheente, herzen und positiven emojis

## Style

- styledateien aufräumen in style ordner
- alle schriften und links bewusst stylen

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
