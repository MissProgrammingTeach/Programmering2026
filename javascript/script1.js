/*
╔═══════════════════════════════════════════════════════════════════════════╗
║                    JAVASCRIPT - ENDRE CSS                                 ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  Denne filen inneholder JavaScript-kode som endrer CSS på nettsiden.      ║
║  Les kommentarene for å forstå hvordan koden fungerer!                    ║
╚═══════════════════════════════════════════════════════════════════════════╝
*/


/*
═══════════════════════════════════════════════════════════════════════════════
FUNKSJON 1: ENDRE BAKGRUNNSFARGE
═══════════════════════════════════════════════════════════════════════════════*/

function endreFarge(nyFarge) {
    /*
    Denne funksjonen endrer bakgrunnsfargen på "farge-boks".

    Parameter: nyFarge - fargen vi vil bytte til (f.eks. "lightblue")
    */

    // Steg 1: Finn elementet med id="farge-boks"
    var boks = document.getElementById("farge-boks");
    /*
    document.getElementById("farge-boks")
    ══════════════════════════════════════
    - document = hele HTML-dokumentet
    - getElementById() = finn element med denne id-en
    - "farge-boks" = id-en vi leter etter

    Resultatet lagres i variabelen "boks".
    */

    // Steg 2: Endre bakgrunnsfargen
    boks.style.backgroundColor = nyFarge;
    /*
    boks.style.backgroundColor = nyFarge
    ═════════════════════════════════════
    - boks = elementet vi fant
    - .style = CSS-stilene til elementet
    - .backgroundColor = bakgrunnsfarge-egenskapen
    - = nyFarge = sett den til den nye fargen

    MERK: I CSS skriver vi "background-color" med bindestrek.
    I JavaScript skriver vi "backgroundColor" med stor B (camelCase).
    */

    // BONUS: Skriv til konsollen (åpne utviklerverktøy med F12 for å se)
    console.log("Fargen ble endret til: " + nyFarge);
}


/*
═══════════════════════════════════════════════════════════════════════════════
FUNKSJON 2: ENDRE TEKSTSTØRRELSE
═══════════════════════════════════════════════════════════════════════════════
*/

function endreTekstStorrelse(storrelse) {
    /*
    Denne funksjonen endrer tekststørrelsen på "tekst-demo".

    Parameter: storrelse - størrelsen i piksler (f.eks. 24)
    */

    // Finn elementet
    var tekst = document.getElementById("tekst-demo");

    // Endre font-size (må legge til "px" for piksler)
    tekst.style.fontSize = storrelse + "px";
    /*
    størrelse + "px"
    ═════════════════
    Hvis størrelse er 24, blir dette "24px".
    Vi bruker + for å sette sammen tall og tekst.
    */

    console.log("Tekststørrelsen ble endret til: " + storrelse + "px");
}


/*
═══════════════════════════════════════════════════════════════════════════════
FUNKSJON 3: SKJUL OG VIS (TOGGLE)
═══════════════════════════════════════════════════════════════════════════════
*/

function toggleSynlighet() {
    /*
    "Toggle" betyr å bytte mellom to tilstander.
    Denne funksjonen skjuler boksen hvis den er synlig,
    og viser den hvis den er skjult.
    */

    var boks = document.getElementById("hemmelig-boks");

    // Sjekk om boksen er skjult
    if (boks.style.display === "none") {
        // Boksen er skjult, så vi viser den
        boks.style.display = "block";
        console.log("Boksen er nå synlig");
    } else {
        // Boksen er synlig, så vi skjuler den
        boks.style.display = "none";
        console.log("Boksen er nå skjult");
    }
}


/*
═══════════════════════════════════════════════════════════════════════════════
FUNKSJON 4: HÅNDTER SKJEMA
═══════════════════════════════════════════════════════════════════════════════
*/

function handterSkjema(event) {
    /*
    Denne funksjonen kjører når brukeren sender inn skjemaet.

    Parameter: event - informasjon om hendelsen (innsendingen)
    */

    // Stopp siden fra å laste på nytt (standard oppførsel for skjemaer)
    event.preventDefault();

    // Hent verdiene fra skjemafeltene
    var navnFelt = document.getElementById("navn");
    var fargeFelt = document.getElementById("farge-valg");

    var navn = navnFelt.value;         // .value henter teksten brukeren skrev
    var farge = fargeFelt.value;       // .value henter valgt alternativ

    // Sjekk at brukeren har fylt ut begge feltene
    if (navn === "" || farge === "") {
        alert("Vennligst fyll ut både navn og farge!");
        /*
        alert() viser en popup-boks med en melding.
        Den stopper koden til brukeren klikker OK.
        */
        return;  // Avslutt funksjonen tidlig
    }

    // Vis en melding til brukeren
    var meldingsBoks = document.getElementById("skjema-melding");

    // Sett inn teksten i meldingsboksen
    meldingsBoks.innerHTML = "Hei, <strong>" + navn + "</strong>! Din favorittfarge er en fin farge!";
    /*
    innerHTML lar oss sette inn HTML-kode (inkludert tagger som <strong>).
    Hvis vi bare ville ha ren tekst, kunne vi brukt textContent i stedet.
    */

    // Endre bakgrunnsfargen på meldingen til brukerens favorittfarge
    meldingsBoks.style.backgroundColor = farge;

    // Vis meldingsboksen ved å legge til CSS-klassen "vis"
    meldingsBoks.classList.add("vis");
    /*
    classList.add("vis") legger til klassen "vis" på elementet.
    I CSS-en har vi definert at .melding.vis har display: block.
    */

    // Endre bakgrunnsfargen på hele siden
    document.body.style.backgroundColor = farge;

    console.log("Skjema sendt inn av: " + navn);
    console.log("Valgt farge: " + farge);
}


/*
═══════════════════════════════════════════════════════════════════════════════
OPPGAVER
═══════════════════════════════════════════════════════════════════════════════

1. Legg til en ny farge-knapp i HTML-filen og få den til å fungere.

2. Lag en ny funksjon som endrer tekstfargen (color) i stedet for bakgrunn.
   Tips: element.style.color = "red";

3. Lag en funksjon som endrer rammen (border) på et element.
   Tips: element.style.border = "5px solid red";

4. Eksperimenter med å endre flere egenskaper samtidig i én funksjon.

5. Prøv å bruke console.log() for å skrive ut meldinger.
   Åpne utviklerverktøy med F12 og se på "Console"-fanen.

═══════════════════════════════════════════════════════════════════════════════
*/
