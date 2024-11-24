import "./PrivacyPage.css"

export const PrivacyPage = () => {
  return (
    <div className="page-wrapper privacy">
      <h1 className="sticky">Datenschutz</h1>
      <div className="content">
        <p>This section is german because it is required by german law.</p>
        <hr />
        <p>
          Der Hoster dieser Website erhebt in sogenannten Logfiles die folgenden
          Daten, die Ihr Browser übermittelt:
        </p>

        <ul>
          <li>IP-Adresse</li>
          <li>Adresse der vorher besuchten Website (Referer Anfrage-Header)</li>
          <li>Datum und Uhrzeit der Anfrage</li>
          <li>Zeitzonendifferenz zur Greenwich Mean Time</li>
          <li>Inhalt der Anforderung</li>
          <li>HTTP-Statuscode</li>
          <li>Übertragene Datenmenge</li>
          <li>Website, von der die Anforderung kommt</li>
          <li>Informationen zu Browser und Betriebssystem</li>
        </ul>

        <p>
          Diese Daten sind erforderlich, um diese Website anzuzeigen und die
          Stabilität und Sicherheit zu gewährleisten. Dies entspricht einem
          berechtigten Interesse gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO.
        </p>

        <p>
          Es findet kein Tracking statt, und wir haben auf diese Daten keinen
          direkten Zugriff.
        </p>

        <h2>Hoster</h2>

        <p>
          Für die Bereitstellung dieser Website wird folgender Hoster
          eingesetzt:
        </p>
        <div className="address">
          <p>GitHub Inc.</p>
          <p>88 Colin P Kelly Jr</p>
          <p>St San Francisco, CA 94107</p>
          <p>United States</p>
        </div>

        <p>
          Dieser Hoster ist Empfänger Ihrer personenbezogenen Daten. Dies
          entspricht unserem berechtigten Interesse im Sinne des Art. 6 Abs. 1
          S. 1 lit. f DSGVO, da wir keinen eigenen Server vorhalten müssen. Der
          Serverstandort ist in den USA.
        </p>

        <p>
          Weitere Informationen zu Widerspruchs- und Beseitigungsmöglichkeiten
          gegenüber GitHub finden Sie unter:
          <a
            href="https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-privacy-statement#github-pages"
            target="_blank"
          >
            GitHub Privacy Statement
          </a>
        </p>

        <p>
          Sie haben das Recht, der Verarbeitung zu widersprechen. Ob der
          Widerspruch erfolgreich ist, wird im Rahmen einer Interessenabwägung
          ermittelt.
        </p>

        <p>
          Die Daten werden gelöscht, sobald der Zweck der Verarbeitung entfällt.
        </p>

        <p>
          Die Verarbeitung der in diesem Abschnitt angegebenen Daten ist weder
          gesetzlich noch vertraglich vorgeschrieben. Die Funktionsfähigkeit
          dieser Website ist ohne die Verarbeitung jedoch nicht gewährleistet.
        </p>

        <p>
          GitHub hat Compliance-Maßnahmen für internationale Datenübermittlungen
          implementiert, die auf den EU-Standardvertragsklauseln (SCCs)
          basieren. Weitere Informationen dazu finden Sie hier:
          <a
            href="https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-data-protection-addendum#attachment-1–the-standard-contractual-clauses-processors"
            target="_blank"
          >
            GitHub Data Protection Addendum
          </a>
        </p>

        <h2>Rechtliche Hinweise</h2>

        <p>
          Grundsätzlich ist ein Auftragsverarbeitungsvertrag mit dem Hoster
          abzuschließen. Das Bayerische Landesamt für Datenschutzaufsicht hat
          jedoch eine Ausnahme für das Hosting rein statischer Websites gemacht.
          Wenn die Website der Selbstdarstellung dient (z.B. von Vereinen oder
          Kleinunternehmen), keine personenbezogenen Daten an den Betreiber
          fließen und kein Tracking stattfindet, liegt keine
          Auftragsverarbeitung vor.
        </p>

        <p>
          Weiter heißt es: „Die Tatsache, dass auch beim Hosting von statischen
          Webseiten zwangsläufig IP-Adressen, d.h. personenbezogene Daten,
          verarbeitet werden müssen, führt nicht zur Annahme einer
          Auftragsverarbeitung. Das wäre nicht sachgerecht. Die (kurzfristige)
          IP-Adressenspeicherung ist vielmehr noch der TK-Zugangsvermittlung des
          Website-Hosters nach dem TKG zuzurechnen und dient in erster Linie
          Sicherheitszwecken des Hosters.“
          <a
            href="https://www.lda.bayern.de/media/veroeffentlichungen/FAQ_Hosting_keine_Auftragsverarbeitung.pdf"
            target="_blank"
          >
            Quelle
          </a>
        </p>

        <p>
          Wir gehen davon aus, dass diese Ausnahme auch auf GitHub Pages
          anwendbar ist.
        </p>
      </div>
    </div>
  )
}
