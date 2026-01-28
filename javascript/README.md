# JavaScript-introduksjon for 9. trinn

## Om denne modulen

I denne modulen lærer du grunnleggende JavaScript - programmeringsspråket som gjør nettsider interaktive! Du vil lære hvordan du kan endre utseendet på en nettside med kode, og til slutt lage ditt eget spill.

## Læringsmål

Etter å ha fullført denne modulen skal du kunne:

1. **Forstå hva JavaScript er** - Et programmeringsspråk som kjører i nettleseren
2. **Endre CSS med JavaScript** - Bruke `document.getElementById()` og `.style`
3. **Reagere på hendelser** - Bruke `onclick` og `addEventListener`
4. **Bruke variabler og funksjoner** - Lagre data og lage gjenbrukbar kode
5. **Forstå kontrollstrukturer** - `if/else`-setninger for å ta beslutninger
6. **Tegne på Canvas** - Lage grafikk og animasjoner

## Filstruktur

```
javascript/
├── README.md       ← Du leser denne filen nå!
├── style.css       ← CSS for JavaScript-sidene
├── js1.html        ← Endre CSS med JavaScript
├── script1.js      ← Kode for js1.html
├── js2.html        ← "Fang Eplene"-spillet
└── script2.js      ← Spillkoden
```

## Hvordan komme i gang

### Steg 1: Start med js1.html
Åpne `js1.html` i nettleseren og prøv de forskjellige knappene. Se hvordan JavaScript endrer utseendet på siden.

### Steg 2: Les koden
Åpne `script1.js` i en teksteditor og les kommentarene. Prøv å forstå hva hver del gjør.

### Steg 3: Eksperimenter!
Gjør små endringer i koden og se hva som skjer. Dette er den beste måten å lære på!

### Steg 4: Spill spillet
Åpne `js2.html` og spill "Fang Eplene". Deretter kan du se på koden i `script2.js` og prøve oppgavene.

---

## Oppgaver

### Del 1: Endre CSS med JavaScript (`js1.html` / `script1.js`)

#### Oppgave 1.1: Legg til en ny farge
Legg til en ny farge-knapp (f.eks. oransje) i `js1.html` og få den til å fungere.

**Hint:** Se på de eksisterende knappene og kopier mønsteret.

#### Oppgave 1.2: Endre tekstfarge
Lag en ny funksjon i `script1.js` som endrer tekstfargen (ikke bakgrunnsfargen) på et element.

```javascript
// Tips: Bruk element.style.color i stedet for backgroundColor
function endreTekstFarge(farge) {
    // Din kode her
}
```

#### Oppgave 1.3: Endre flere egenskaper samtidig
Lag en funksjon som endrer BÅDE bakgrunnsfarge OG tekstfarge samtidig.

#### Oppgave 1.4: Legg til en ramme
Lag en knapp som legger til eller fjerner en ramme rundt demo-boksen.

```javascript
// Tips: element.style.border = "5px solid red";
```

#### Oppgave 1.5: Lag en "Dark Mode"-knapp
Lag en knapp som bytter hele siden til mørk bakgrunn og lys tekst.

---

### Del 2: Spillet (`js2.html` / `script2.js`)

#### Oppgave 2.1: Juster vanskelighetsgraden
Finn disse variablene i `script2.js` og eksperimenter med verdiene:

| Variabel | Beskrivelse | Prøv |
|----------|-------------|------|
| `kurv.fart` | Hvor fort kurven beveger seg | 5, 10, 15 |
| `epleFart` | Hvor fort eplene faller | 2, 5, 8 |
| `epleFrekvens` | Hvor ofte nye epler dukker opp | 40, 80, 100 |

#### Oppgave 2.2: Endre poeng
Finn linjen `poeng += 10` og endre til et annet tall. Hva skjer med vanskelighetsøkningen?

#### Oppgave 2.3: Flere liv
Finn linjen `let liv = 3` og gi spilleren flere (eller færre) liv.

#### Oppgave 2.4: Endre sjansen for råtne epler
Finn linjen:
```javascript
ratten: Math.random() < 0.25
```
Endre `0.25` til:
- `0.1` = 10% sjanse (lettere)
- `0.5` = 50% sjanse (vanskeligere)

#### Oppgave 2.5: Større/mindre epler
Finn `radius: 15` i `spawnEple()`-funksjonen og prøv andre verdier.

#### Oppgave 2.6: Endre eplenes farge
Finn `tegnEple()`-funksjonen og endre fargene:
```javascript
ctx.fillStyle = eple.ratten ? '#556B2F' : '#DC143C';
// Prøv andre farger!
```

#### Oppgave 2.7: Lag en "gyllen eple" (utfordring!)
Legg til en ny type eple som er gyllen/gul og gir ekstra poeng (f.eks. 50 poeng).

**Hint:**
1. I `spawnEple()`, legg til en sjanse for gyldent eple:
   ```javascript
   gyllen: Math.random() < 0.05  // 5% sjanse
   ```
2. I `tegnEple()`, tegn gyldne epler med gul farge
3. I `oppdaterEpler()`, gi ekstra poeng for gyldne epler

#### Oppgave 2.8: Legg til lyd (avansert)
Legg til lydeffekter når spilleren:
- Fanger et godt eple
- Treffer et råttent eple
- Taper spillet

```javascript
// Eksempel på hvordan spille lyd:
let lyd = new Audio('https://example.com/sound.mp3');
lyd.play();
```

---

## Bonus-utfordringer

### For de som vil ha mer:

1. **Pause-funksjon med mellomromstasten**
   Gjør det mulig å pause/fortsette spillet ved å trykke mellomrom.

2. **Nivåer**
   Lag forskjellige nivåer der spillet blir vanskeligere for hvert nivå.

3. **Highscore-liste**
   Lagre de 5 beste poengsummene (bruk `localStorage`).

4. **Powerups**
   Legg til spesielle objekter som:
   - Gjør kurven bredere
   - Sakker ned tiden
   - Gir ekstra liv

5. **Lag ditt eget spill!**
   Bruk det du har lært til å lage et helt nytt spill. Idéer:
   - Unngå hindringer som faller
   - Samle objekter før tiden renner ut
   - Pong-spill med to spillere

---

## Viktige JavaScript-konsepter

| Konsept | Forklaring | Eksempel |
|---------|------------|----------|
| `let` / `const` | Lage variabler | `let poeng = 0;` |
| `function` | Lage funksjoner | `function startSpill() { }` |
| `if / else` | Ta beslutninger | `if (liv <= 0) { gameOver(); }` |
| `document.getElementById()` | Finne HTML-elementer | `document.getElementById('poeng')` |
| `.style.property` | Endre CSS | `element.style.color = 'red'` |
| `addEventListener()` | Lytte etter hendelser | `document.addEventListener('keydown', ...)` |
| `requestAnimationFrame()` | Animasjonsloop | Kjører kode 60 ganger/sekund |
| `Math.random()` | Tilfeldige tall | `Math.random() * 100` |

---

## Feilsøking

### Spillet fungerer ikke?

1. **Åpne utviklerverktøy** (trykk F12)
2. **Se på "Console"-fanen** for feilmeldinger
3. **Vanlige feil:**
   - Skrivefeil i funksjonsnavn
   - Manglende semikolon `;`
   - Feil i parenteser `()` eller klammeparenteser `{}`

### Endringene mine vises ikke?

1. **Lagre filen** (Ctrl+S)
2. **Oppdater nettleseren** (F5 eller Ctrl+R)
3. **Tøm cache** (Ctrl+Shift+R)

---

## Nyttige ressurser

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/)
- [Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial)

---

*Lykke til med JavaScript-programmering!*
