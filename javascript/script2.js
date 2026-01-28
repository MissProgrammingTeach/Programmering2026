/*
╔═══════════════════════════════════════════════════════════════════════════╗
║                    FANG EPLENE - SPILLKODE                                ║
╠═══════════════════════════════════════════════════════════════════════════╣
║  Dette er et komplett spill som viser hvordan man lager                   ║
║  interaktive spill med JavaScript og HTML Canvas.                         ║
╚═══════════════════════════════════════════════════════════════════════════╝
*/


/*
═══════════════════════════════════════════════════════════════════════════════
STEG 1: HENT CANVAS OG SETT OPP TEGNE-KONTEKST
═══════════════════════════════════════════════════════════════════════════════
*/

// Hent canvas-elementet fra HTML
const canvas = document.getElementById('spill-canvas');

// Hent 2D tegne-konteksten - dette er "penselen" vår
const ctx = canvas.getContext('2d');
/*
    getContext('2d') gir oss et objekt med metoder for å tegne:
    - ctx.fillRect() - tegn et fylt rektangel
    - ctx.fillStyle - sett farge
    - ctx.beginPath() / ctx.arc() - tegn sirkler
    - ctx.drawImage() - tegn bilder
    - ctx.fillText() - tegn tekst
*/


/*
═══════════════════════════════════════════════════════════════════════════════
STEG 2: DEFINER SPILLVARIABLER
═══════════════════════════════════════════════════════════════════════════════
*/

// ═══ Kurv (spilleren) ═══
let kurv = {
    x: canvas.width / 2 - 40,  // Start i midten
    y: canvas.height - 50,      // Nederst på skjermen
    bredde: 80,
    hoyde: 40,
    fart: 4                     // Hvor fort kurven beveger seg
};
/*
    Vi bruker et objekt for å samle alle egenskapene til kurven.
    Dette gjør koden ryddigere enn å ha mange separate variabler.
*/

// ═══ Spilltilstand ═══
let poeng = 0;
let liv = 3;
let rekord = 0;
let spillKjorer = false;
let animasjonId = null;        // ID for å kunne stoppe animasjonen

// ═══ Epler (fallende objekter) ═══
let epler = [];                // Tom liste som vil fylles med eple-objekter

// ═══ Tastatur-tilstand ═══
let tasterNede = {
    venstre: false,
    hoyre: false
};
/*
    Vi tracker hvilke taster som holdes nede.
    Dette gir jevnere bevegelse enn å bare reagere på tastetrykk.
*/


/*
═══════════════════════════════════════════════════════════════════════════════
STEG 3: LYTT ETTER TASTETRYKK
═══════════════════════════════════════════════════════════════════════════════
*/

// Når en tast trykkes NED
document.addEventListener('keydown', function(event) {
    /*
        addEventListener() lar oss "lytte" etter hendelser.
        'keydown' betyr at en tast blir trykket ned.

        event-objektet inneholder informasjon om hvilken tast.
    */

    if (event.key === 'ArrowLeft' || event.key === 'a') {
        tasterNede.venstre = true;
        event.preventDefault();  // Hindrer at siden scroller
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
        tasterNede.hoyre = true;
        event.preventDefault();
    }
});

// Når en tast slippes OPP
document.addEventListener('keyup', function(event) {
    if (event.key === 'ArrowLeft' || event.key === 'a') {
        tasterNede.venstre = false;
    }
    if (event.key === 'ArrowRight' || event.key === 'd') {
        tasterNede.hoyre = false;
    }
});

// Mobil-kontroller
document.getElementById('venstre-knapp').addEventListener('mousedown', () => tasterNede.venstre = true);
document.getElementById('venstre-knapp').addEventListener('mouseup', () => tasterNede.venstre = false);
document.getElementById('venstre-knapp').addEventListener('touchstart', (e) => { e.preventDefault(); tasterNede.venstre = true; });
document.getElementById('venstre-knapp').addEventListener('touchend', () => tasterNede.venstre = false);

document.getElementById('hoyre-knapp').addEventListener('mousedown', () => tasterNede.hoyre = true);
document.getElementById('hoyre-knapp').addEventListener('mouseup', () => tasterNede.hoyre = false);
document.getElementById('hoyre-knapp').addEventListener('touchstart', (e) => { e.preventDefault(); tasterNede.hoyre = true; });
document.getElementById('hoyre-knapp').addEventListener('touchend', () => tasterNede.hoyre = false);


/*
═══════════════════════════════════════════════════════════════════════════════
STEG 4: SPILLFUNKSJONER
═══════════════════════════════════════════════════════════════════════════════
*/

// ═══ START SPILLET ═══
function startSpill() {
    if (spillKjorer) return;  // Ikke start hvis allerede i gang

    // Nullstill alt
    poeng = 0;
    liv = 3;
    epler = [];
    frameCounter = 0;
    epleFart = 1;
    epleFrekvens = 120;

    // Plasser kurven i midten
    kurv.x = canvas.width / 2 - kurv.bredde / 2;

    // Oppdater visningen
    oppdaterUI();

    spillKjorer = true;

    // Start spilløkken
    spillLoop();

    console.log('Spillet startet!');
}


// ═══ STOPP SPILLET ═══
function stoppSpill() {
    spillKjorer = false;

    // Stopp animasjonen
    if (animasjonId) {
        cancelAnimationFrame(animasjonId);
        /*
            cancelAnimationFrame() stopper en requestAnimationFrame().
            Vi sender inn ID-en vi fikk da vi startet den.
        */
    }

    // Tegn "PAUSE" på skjermen
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSE', canvas.width / 2, canvas.height / 2);

    console.log('Spillet pauset');
}


// ═══ GAME OVER ═══
function gameOver() {
    spillKjorer = false;

    if (animasjonId) {
        cancelAnimationFrame(animasjonId);
    }

    // Sjekk om ny rekord
    if (poeng > rekord) {
        rekord = poeng;
        document.getElementById('rekord').textContent = rekord;
    }

    // Vis Game Over overlay
    document.getElementById('final-poeng').textContent = poeng;
    document.getElementById('game-over').style.display = 'flex';

    console.log('Game Over! Poeng: ' + poeng);
}


// ═══ LUKK GAME OVER ═══
function lukkGameOver() {
    document.getElementById('game-over').style.display = 'none';
}


/*
═══════════════════════════════════════════════════════════════════════════════
STEG 5: SPILLØKKEN (GAME LOOP)
═══════════════════════════════════════════════════════════════════════════════

Spilløkken er "hjertet" i spillet. Den kjører ca. 60 ganger per sekund og:
1. Oppdaterer posisjoner (bevegelse)
2. Sjekker kollisjoner
3. Tegner alt på skjermen
*/

function spillLoop() {
    if (!spillKjorer) return;

    // 1. Tøm skjermen (tegn bakgrunnen på nytt)
    tegnBakgrunn();

    // 2. Oppdater kurv-posisjon basert på tastetrykk
    oppdaterKurv();

    // 3. Spawn nye epler med jevne mellomrom
    frameCounter++;
    if (frameCounter >= epleFrekvens) {
        spawnEple();
        frameCounter = 0;
    }

    // 4. Oppdater og tegn alle epler
    oppdaterEpler();

    // 5. Tegn kurven
    tegnKurv();

    // 6. Be om neste frame
    animasjonId = requestAnimationFrame(spillLoop);
    /*
        requestAnimationFrame() ber nettleseren kjøre funksjonen
        igjen ved neste "frame" (ca. 60 ganger per sekund).

        Dette er bedre enn setInterval() fordi:
        - Det synkroniserer med skjermens oppdateringsrate
        - Det pauser automatisk når fanen ikke er synlig
        - Det gir jevnere animasjoner
    */
}


/*
═══════════════════════════════════════════════════════════════════════════════
STEG 6: TEGNEFUNKSJONER
═══════════════════════════════════════════════════════════════════════════════
*/

// ═══ TEGN BAKGRUNNEN ═══
function tegnBakgrunn() {
    // Himmel (gradient)
    let gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');    // Lyseblå øverst
    gradient.addColorStop(1, '#98FB98');    // Lysegrønn nederst

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gress nederst
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
}


// ═══ TEGN KURVEN ═══
function tegnKurv() {
    // Kurv-kropp (brun)
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(kurv.x, kurv.y, kurv.bredde, kurv.hoyde);

    // Kurv-mønster (horisontale linjer)
    ctx.strokeStyle = '#654321';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(kurv.x, kurv.y + 10 + i * 12);
        ctx.lineTo(kurv.x + kurv.bredde, kurv.y + 10 + i * 12);
        ctx.stroke();
    }

    // Kurv-kant øverst
    ctx.fillStyle = '#654321';
    ctx.fillRect(kurv.x - 5, kurv.y - 5, kurv.bredde + 10, 8);
}


// ═══ TEGN ET EPLE ═══
function tegnEple(eple) {
    ctx.beginPath();
    /*
        beginPath() starter en ny "tegnevei".
        Dette er nødvendig før vi tegner former som sirkler.
    */

    // Tegn sirkelen (eplet)
    ctx.arc(eple.x, eple.y, eple.radius, 0, Math.PI * 2);
    /*
        arc(x, y, radius, startVinkel, sluttVinkel)
        - x, y: sentrum av sirkelen
        - radius: størrelsen
        - 0 til Math.PI * 2: full sirkel (360 grader i radianer)
    */

    // Fyll med riktig farge
    ctx.fillStyle = eple.ratten ? '#556B2F' : '#DC143C';  // Grønn hvis råtten, rød ellers
    ctx.fill();

    // Stilk
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(eple.x - 2, eple.y - eple.radius - 8, 4, 10);

    // Blad (bare på gode epler)
    if (!eple.ratten) {
        ctx.fillStyle = '#228B22';
        ctx.beginPath();
        ctx.ellipse(eple.x + 6, eple.y - eple.radius - 5, 8, 4, 0.5, 0, Math.PI * 2);
        ctx.fill();
    }
}


/*
═══════════════════════════════════════════════════════════════════════════════
STEG 7: OPPDATERINGSFUNKSJONER
═══════════════════════════════════════════════════════════════════════════════
*/

// ═══ OPPDATER KURV ═══
function oppdaterKurv() {
    // Flytt basert på hvilke taster som holdes nede
    if (tasterNede.venstre) {
        kurv.x -= kurv.fart;
    }
    if (tasterNede.hoyre) {
        kurv.x += kurv.fart;
    }

    // Hold kurven innenfor canvas
    if (kurv.x < 0) {
        kurv.x = 0;
    }
    if (kurv.x + kurv.bredde > canvas.width) {
        kurv.x = canvas.width - kurv.bredde;
    }
}


// ═══ SPAWN NYTT EPLE ═══
function spawnEple() {
    let nyttEple = {
        x: Math.random() * (canvas.width - 40) + 20,  // Tilfeldig x-posisjon
        y: -20,                                         // Start over skjermen
        radius: 15,
        fart: epleFart + Math.random() * epleFart*0.4,            // Litt variasjon i fart
        ratten: Math.random() < 0.25                   // 25% sjanse for råttent eple
    };

    epler.push(nyttEple);
    /*
        push() legger til et element på slutten av en liste (array).
    */
}


// ═══ OPPDATER ALLE EPLER ═══
function oppdaterEpler() {
    // Gå gjennom alle epler baklengs (så vi kan fjerne dem trygt)
    for (let i = epler.length - 1; i >= 0; i--) {
        let eple = epler[i];

        // Flytt eplet nedover
        eple.y += eple.fart;

        // Tegn eplet
        tegnEple(eple);

        // Sjekk om eplet treffer kurven (kollisjon)
        if (sjekkKollisjon(eple)) {
            if (eple.ratten) {
                // Råttent eple - mist et liv!
                liv--;
                oppdaterUI();

                if (liv <= 0) {
                    gameOver();
                    return;
                }
            } else {
                // Godt eple - få poeng!
                poeng += 10;
                oppdaterUI();

                // Øk vanskelighetsgraden
                oekVanskelighetsgrad();
            }

            // Fjern eplet
            epler.splice(i, 1);
            /*
                splice(index, antall) fjerner elementer fra en liste.
                splice(i, 1) fjerner 1 element på posisjon i.
            */
        }
        // Sjekk om eplet har falt ut av skjermen
        else if (eple.y > canvas.height + 20) {
            // Fjern eplet (det er borte)
            epler.splice(i, 1);

            // Hvis det var et godt eple, mister spilleren et liv
            if (!eple.ratten) {
                liv--;
                oppdaterUI();

                if (liv <= 0) {
                    gameOver();
                    return;
                }
            }
        }
    }
}


/*
═══════════════════════════════════════════════════════════════════════════════
STEG 8: HJELPEFUNKSJONER
═══════════════════════════════════════════════════════════════════════════════
*/

// ═══ SJEKK KOLLISJON ═══
function sjekkKollisjon(eple) {
    /*
        Kollisjonsdeteksjon: Sjekker om eplet overlapper med kurven.

        Vi sjekker om epletes sirkel overlapper med kurvens rektangel.
        Forenklet: vi sjekker om epletes bunn er innenfor kurven.
    */

    // Finn nærmeste punkt på kurven til epletes sentrum
    let naermesteX = Math.max(kurv.x, Math.min(eple.x, kurv.x + kurv.bredde));
    let naermesteY = Math.max(kurv.y, Math.min(eple.y, kurv.y + kurv.hoyde));

    // Beregn avstanden
    let avstandX = eple.x - naermesteX;
    let avstandY = eple.y - naermesteY;
    let avstand = Math.sqrt(avstandX * avstandX + avstandY * avstandY);

    // Kollisjon hvis avstanden er mindre enn epletes radius
    return avstand < eple.radius;
}


// ═══ ØK VANSKELIGHETSGRAD ═══
function oekVanskelighetsgrad() {
    // Øk farten litt for hvert 50. poeng
    if (poeng % 50 === 0) {
        epleFart += 0.5;

        // Spawn epler oftere (men ikke for ofte)
        if (epleFrekvens > 30) {
            epleFrekvens -= 5;
        }

        console.log('Vanskelighetsgrad økt! Fart: ' + epleFart);
    }
}


// ═══ OPPDATER UI ═══
function oppdaterUI() {
    document.getElementById('poeng').textContent = poeng;

    // Vis hjerter for liv
    let hjerter = '';
    for (let i = 0; i < liv; i++) {
        hjerter += '❤️';
    }
    document.getElementById('liv').textContent = hjerter || '💔';
}


/*
═══════════════════════════════════════════════════════════════════════════════
STEG 9: TEGN STARTSKJERM
═══════════════════════════════════════════════════════════════════════════════
*/

function tegnStartskjerm() {
    tegnBakgrunn();

    // Tegn noen dekorative epler
    ctx.fillStyle = '#DC143C';
    ctx.beginPath();
    ctx.arc(100, 150, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(400, 200, 20, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(250, 100, 20, 0, Math.PI * 2);
    ctx.fill();

    // Tekst
    ctx.fillStyle = '#2c3e50';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🍎 Fang Eplene! 🍎', canvas.width / 2, canvas.height / 2 - 20);

    ctx.font = '20px Arial';
    ctx.fillText('Trykk "Start spill" for å begynne', canvas.width / 2, canvas.height / 2 + 30);
}

// Tegn startskjermen når siden lastes
tegnStartskjerm();


/*
═══════════════════════════════════════════════════════════════════════════════
OPPGAVER FOR ELEVENE
═══════════════════════════════════════════════════════════════════════════════

1. ENDRE KURVENS FART
   Finn variabelen kurv.fart og endre den.
   Prøv forskjellige verdier - hva føles best?

2. ENDRE POENG PER EPLE
   Finn linjen "poeng += 10" og endre til et annet tall.

3. LEGG TIL FLERE LIV
   Finn linjen "let liv = 3" og gi spilleren flere liv.

4. ENDRE SJANSEN FOR RÅTNE EPLER
   Finn linjen med "Math.random() < 0.25" og endre 0.25.
   0.25 = 25% sjanse. Prøv 0.1 (10%) eller 0.4 (40%).

5. ENDRE EPLENES STØRRELSE
   Finn "radius: 15" i spawnEple() og prøv andre verdier.

6. LAG EN "POWER-UP"
   Legg til en ny type objekt (f.eks. en stjerne) som gir ekstra poeng
   eller ekstra liv når spilleren fanger den.

7. LEGG TIL LYD
   Bruk "new Audio('url').play()" for å spille lyd når:
   - Spilleren fanger et eple
   - Spilleren mister et liv
   - Spillet er over

═══════════════════════════════════════════════════════════════════════════════
*/
