# ToDo

## MediaStore

- Beleuchtung sichtbar machen
- wenn nur duckopage, dann langsame kamerafahrt and ducko heran und um ducko herum?

## SzeneCOnfig

- Proejct selector aufräumen
- current scroll position cleanen -> ganze logik consolidieren

## Project selector

- scroll logik so optimieren wie die tage probiert, aber dieses mal mit der store action
- ig account verlinken
- auch 3d ente erlauben?

## Audio Service

- is playing state abhängig machen von play state des media elements über useCallback

## Style

- nur dark mode und quietscheenten mode. nicht den prefers selektor nutzen, nur aktiv gesetzte klasse
- styledateien aufräumen in style ordner

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
