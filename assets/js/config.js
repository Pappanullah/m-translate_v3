/* m-translate.at – zentrale Konfiguration
   Hier ändern: Kontaktdaten, Menü, Sprachen, Leistungen, Galeriebilder.
   Die Texte dazu stehen in assets/lang/*.js (de, en, ar). */
window.SITE = {
  domain: 'https://www.m-translate.at',
  name: 'Mohammad Jamil Muarrawi',
  phone: '+43 316 435554',          // Telefon und Fax
  mobile: '+43 664 5655983',
  whatsapp: '436645655983',          // WhatsApp-Nummer: nur Ziffern, mit Landesvorwahl, ohne + und Leerzeichen
  email: 'jamilm75@gmail.com',
  address: { street: 'Casalgasse 47a/1', zip: '8041', city: 'Graz', country: 'Österreich' },

  // Karte (lädt erst nach Klick des Besuchers, DSGVO). mapEmbed = Adresse aus Google Maps: Teilen > Karte einbetten > nur die URL aus src="..." kopieren
  mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2685.783857508491!2d15.464500076843403!3d47.04250077914838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476e73775c000001%3A0x6b63d09a52864c3c!2sCasalgasse%2047a%2C%208041%20Graz!5e0!3m2!1sde!2sat!4v1710000000000!5m2!1sde!2sat',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Casalgasse+47a%2F1%2C+8041+Graz',
  gisa: '34800881',
  uid: 'ATU80949814',

  // Kontaktformular: Access Key von web3forms.com (kommt per E-Mail an jamilm75@gmail.com)
  formKey: '2fca22e4-2ab4-496c-8b85-6864f6116412',

  // Sprachen. Neue Sprache: Eintrag hier + Datei assets/lang/<code>.js (Kopie von en.js übersetzen).
  // dir: 'rtl' nur für Sprachen mit Schreibrichtung von rechts nach links (Arabisch, Persisch, Hebräisch, Urdu ...)
  defaultLang: 'de',
  autoDetect: true,                 // Sprache des Browsers erkennen, falls unterstützt
  languages: [
    { code: 'de', short: 'DE' },
    { code: 'en', short: 'EN' },
    { code: 'ar', short: 'عربي', dir: 'rtl' }
  ],

  // Hauptmenü. Neuer Punkt = eine Zeile. "children" macht ein Untermenü. "cta: true" = hervorgehobener Button.
  // "key" verweist auf den Menütext in assets/lang/*.js
  nav: [
    { href: 'index.html', key: 'nav.home' },
    { key: 'nav.services', children: [
      { href: 'leistungen.html', key: 'nav.allservices' },
      { href: 'ki-uebersetzungen.html', key: 'nav.ki' },
      { href: 'legalisierung.html', key: 'nav.legalisation' },
      { href: 'preise.html', key: 'nav.prices' }
    ] },
    { key: 'nav.about', children: [
      { href: 'lebenslauf.html', key: 'nav.cv' },
      { href: 'informationen.html', key: 'nav.info' },
      { href: 'infrastruktur-und-ausstattung.html', key: 'nav.infra' },
      { href: 'galerie.html', key: 'nav.gallery' }
    ] },
    { href: 'faq.html', key: 'nav.faq' },
    { href: 'kontakt.html', key: 'nav.contact', cta: true }
  ],

  // Richtpreise (Seite "Preise"). Leer lassen = keine Preistabelle, nur die Beschreibung.
  // Pro Zeile: { id: 'urkunde' }. Die Texte stehen in den Sprachdateien (de.js, en.js, ar.js):
  //   "price.urkunde.t": "Geburtsurkunde"       (Bezeichnung)
  //   "price.urkunde.p": "ab 30 €"              (Preis)
  //   "price.urkunde.n": "inkl. Beglaubigung"   (Hinweis, optional)
  prices: [],

  // Rechtliche Links in der Fußzeile
  legal: [
    { href: 'impressum.html', key: 'legal.imprint' },
    { href: 'agb.html', key: 'legal.terms' },
    { href: 'datenschutz.html', key: 'legal.privacy' }
  ],

  // Leistungen (Startseite zeigt die ersten 4, Seite "Leistungen" alle, Formular-Auswahl ebenfalls).
  // Neue Leistung: Eintrag hier + Texte "svc.<id>.t" (Titel) und "svc.<id>.d" (Beschreibung) in allen lang-Dateien.
  // Icons: doc, scale, spark, pulse, globe, chat, phone, mail, pin, clock
  services: [
    { id: 'beglaubigung', icon: 'doc' },
    { id: 'gericht', icon: 'scale' },
    { id: 'fach', icon: 'doc' },
    { id: 'ki', icon: 'spark' },
    { id: 'medizin', icon: 'pulse' },
    { id: 'web', icon: 'globe' }
  ],

  // Galerie. Neues Bild: Datei nach assets/images/ legen, Zeile ergänzen, Beschriftung "gal.<name>" in den lang-Dateien.
  // fit: 'contain' zeigt Logos/Stempel ohne Beschnitt.
  gallery: [
    { src: 'assets/images/buero-graz.webp', key: 'gal.office' },
    { src: 'assets/images/stempel-beglaubigung.webp', key: 'gal.stamp' },
    { src: 'assets/images/oevgd-logo.webp', key: 'gal.oevgd', fit: 'contain' },
    { src: 'assets/images/jamil-muarrawi-portrait.webp', key: 'gal.portrait' }
  ]
};
