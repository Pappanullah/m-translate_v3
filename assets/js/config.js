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
  mapEmbed: 'https://www.google.com/maps?q=47.0355806,15.4575472&z=17&hl=de&output=embed',
  mapLink: 'https://www.google.at/maps/place/%C3%9Cbersetzungsb%C3%BCro+Arabisch+in+Graz+%5BMUARRAWI+TRANSLATE%5D+%D9%85%D9%83%D8%AA%D8%A8+%D9%85%D8%B9%D8%B1%D8%A7%D9%88%D9%8A+%D9%84%D9%84%D8%AA%D8%B1%D8%AC%D9%85%D8%A9+%D8%A7%D9%84%D9%85%D8%AD%D9%84%D9%81%D8%A9+%D9%81%D9%8A+%D8%BA%D8%B1%D8%A7%D8%AA%D8%B3-+%D9%85%D8%AA%D8%B1%D8%AC%D9%85+%D9%85%D8%AD%D9%84%D9%81+%D8%B9%D8%B1%D8%A8%D9%8A+%D8%A3%D9%84%D9%85%D8%A7%D9%86%D9%8A%E2%80%AD/@47.0355806,15.4549723,571m/data=!3m2!1e3!4b1!4m6!3m5!1s0x476e4b37d2f36f57:0x209d2f96ffd2eb4f!8m2!3d47.0355806!4d15.4575472!16s%2Fg%2F11v66r_p2q',
  reviewsUrl: 'https://www.google.at/maps/place/%C3%9Cbersetzungsb%C3%BCro+Arabisch+in+Graz+%5BMUARRAWI+TRANSLATE%5D+%D9%85%D9%83%D8%AA%D8%A8+%D9%85%D8%B9%D8%B1%D8%A7%D9%88%D9%8A+%D9%84%D9%84%D8%AA%D8%B1%D8%AC%D9%85%D8%A9+%D8%A7%D9%84%D9%85%D8%AD%D9%84%D9%81%D8%A9+%D9%81%D9%8A+%D8%BA%D8%B1%D8%A7%D8%AA%D8%B3-+%D9%85%D8%AA%D8%B1%D8%AC%D9%85+%D9%85%D8%AD%D9%84%D9%81+%D8%B9%D8%B1%D8%A8%D9%8A+%D8%A3%D9%84%D9%85%D8%A7%D9%86%D9%8A%E2%80%AD/@47.0355806,15.4549723,571m/data=!3m2!1e3!4b1!4m6!3m5!1s0x476e4b37d2f36f57:0x209d2f96ffd2eb4f!8m2!3d47.0355806!4d15.4575472!16s%2Fg%2F11v66r_p2q',
  // Google-Bewertungen: Texte aus Google Maps kopieren und hier eintragen (nur echte Bewertungen!). Leer lassen = nur Link zu Google.
  // Beispiel: { name: 'Vorname N.', stars: 5, text: 'Text der Bewertung', lang: 'de', when: 'vor 2 Monaten' },
  reviews: [],
  // Optional: reviewSummary: { rating: '5,0', count: 12 },
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

  // Richtpreise (Seite "Preise"): Gruppen mit Zeilen. Texte: price.<gruppe>.t / .n und price.<gruppe>.<zeile>.l (Bezeichnung) / .p (Preis) in den Sprachdateien.
    prices: [
    { id: 'urkunde', rows: ['zeile', 'seite', 'auftrag'] },
    { id: 'fach', rows: ['zeile', 'seite', 'auftrag'] },
    { id: 'literatur', rows: ['zeile'] },
    { id: 'eil', rows: ['heute', 'tag'] }
  ],

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
