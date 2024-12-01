# ToDo

## MediaStore

- Beleuchtung sichtbar machen
- wenn nur duckopage, dann langsame kamerafahrt and ducko heran und um ducko herum?

## SzeneCOnfig

- Proejct selector aufräumen -> playerview und projectview auslagern? macht eigentlich voll sinn
- in projectreel getStyle for mobil und desktop differenzieren

## Project selector

- projectReels -> useMedia hook ablösen durch input. Parentseite nutzt hook schon
- SelectionElements auslagern in 'Mobile ProjectSelector'. Neu anlegen: Desktop Project selector
- diesen fehler fixen: WebGL warning: drawElementsInstanced: Drawing to a destination rect smaller than the viewport rect. (This warning will only be given once)
- scrollstate der liste immer merken. nur element anscrollen, wenn tag selektiert wird oder beat geteilt wird
  2- ig account verlinken
- nur viewports.css oder den hook nutzen?
- nur die items animieren, die sichtbar sind, für alle anderen return getStyle standardwerte
- auf desktop beide nebeneinander, auf mobile filterbutton
- farbe: wichtige elemente weiß, nicht so wichtige grau

## Archivpage

## Audio Service

- is playing state abhängig machen von play state des media elements über useCallback
- check: rerender of ducko only when selected inputs change -> no rerender when route changes
- rerendering of ducko checken

## Happy ducko

## Style

- modus mit quietscheente, herzen und positiven emojis
- nur dark mode und quietscheenten mode. nicht den prefers selektor nutzen, nur aktiv gesetzte klasse
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
