import { NextPage } from 'next';
import React from 'react';

import { SEO } from '@/components/common/seo';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Container } from '@/components/ui/container';

const DatenschutzPage: NextPage = () => {
  return (
    <>
      <SEO
        title="Datenschutzerklärung | echoniq"
        description="Datenschutzerklärung der echoniq Musikproduktion und Tonstudio."
      />
      <Header />
      <main className="bg-black text-white py-20">
        <Container>
          <h1 className="text-4xl font-bold mb-10">Datenschutzerklärung</h1>

          <div className="prose prose-invert max-w-none mt-8">
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
              personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene
              Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem
              Text aufgeführten Datenschutzerklärung.
            </p>

            <h3>Datenerfassung auf unserer Website</h3>
            <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
              Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
            </p>

            <h4>Wie erfassen wir Ihre Daten?</h4>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei
              kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
            </p>
            <p>
              Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme
              erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem
              oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch,
              sobald Sie unsere Website betreten.
            </p>

            <h4>Wofür nutzen wir Ihre Daten?</h4>
            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
              gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet
              werden.
            </p>

            <h4>Welche Rechte haben Sie bezüglich Ihrer Daten?</h4>
            <p>
              Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und
              Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein
              Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu
              sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im
              Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen ein
              Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>

            <h2>2. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3>Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir
              behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p>
              Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
              Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden
              können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und
              wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
            </p>
            <p>
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der
              Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der
              Daten vor dem Zugriff durch Dritte ist nicht möglich.
            </p>

            <h3>Hinweis zur verantwortlichen Stelle</h3>
            <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
            <p>
              echoniq GmbH
              <br />
              Musterstraße 123
              <br />
              12345 Musterstadt
              <br />
              Deutschland
            </p>
            <p>
              Telefon: +49 123 4567890
              <br />
              E-Mail: info@echoniq.de
            </p>
            <p>
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder
              gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von
              personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
            </p>

            <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung
              möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu
              reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum
              Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
            <p>
              Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei
              der zuständigen Aufsichtsbehörde zu. Zuständige Aufsichtsbehörde in
              datenschutzrechtlichen Fragen ist der Landesdatenschutzbeauftragte des Bundeslandes,
              in dem unser Unternehmen seinen Sitz hat.
            </p>

            <h3>Recht auf Datenübertragbarkeit</h3>
            <p>
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung
              eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem
              gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte
              Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur,
              soweit es technisch machbar ist.
            </p>

            <h3>SSL- bzw. TLS-Verschlüsselung</h3>
            <p>
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher
              Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als
              Seitenbetreiber senden, eine SSL-bzw. TLS-Verschlüsselung. Eine verschlüsselte
              Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf
              "https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
            <p>
              Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns
              übermitteln, nicht von Dritten mitgelesen werden.
            </p>

            <h2>3. Datenerfassung auf unserer Website</h2>
            <h3>Cookies</h3>
            <p>
              Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem
              Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser
              Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine
              Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
            </p>
            <p>
              Die meisten der von uns verwendeten Cookies sind so genannte "Session-Cookies". Sie
              werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem
              Endgerät gespeichert bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren
              Browser beim nächsten Besuch wiederzuerkennen.
            </p>
            <p>
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies
              informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für
              bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies
              beim Schließen des Browser aktivieren. Bei der Deaktivierung von Cookies kann die
              Funktionalität dieser Website eingeschränkt sein.
            </p>
            <p>
              Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs oder zur
              Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z.B. Warenkorbfunktion)
              erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert.
              Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur
              technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Soweit andere
              Cookies (z.B. Cookies zur Analyse Ihres Surfverhaltens) gespeichert werden, werden
              diese in dieser Datenschutzerklärung gesondert behandelt.
            </p>

            <h3>Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
              Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p>
              Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt somit
              ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie
              können diese Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung
              per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
              Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
            </p>
            <p>
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns
              zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck
              für die Datenspeicherung entfällt (z.B. nach abgeschlossener Bearbeitung Ihrer
              Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen –
              bleiben unberührt.
            </p>

            <h2>4. Analyse-Tools und Werbung</h2>
            <h3>Google Analytics</h3>
            <p>
              Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist
              die Google Ireland Limited ("Google"), Gordon House, Barrow Street, Dublin 4, Irland.
            </p>
            <p>
              Google Analytics verwendet so genannte "Cookies". Das sind Textdateien, die auf Ihrem
              Computer gespeichert werden und die eine Analyse der Benutzung der Website durch Sie
              ermöglichen. Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser
              Website werden in der Regel an einen Server von Google in den USA übertragen und dort
              gespeichert.
            </p>
            <p>
              Mehr Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der
              Datenschutzerklärung von Google:
              <a
                href="https://support.google.com/analytics/answer/6004245?hl=de"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://support.google.com/analytics/answer/6004245?hl=de
              </a>
            </p>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default DatenschutzPage;