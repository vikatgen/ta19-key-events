// Kast kust sees on tekst, mida ümber kirjutada.
const textBoxDiv = document.querySelector("#text-box");
// Kast, kuhu me kirjutame oma teksti
const typingArea = document.querySelector("#typing-area");
// Ala kuhu tuleb vigade loendur
const feedbackDiv = document.querySelector("#feedback");

// prettier-ignore
// Text on meie hardcoded tekst, mida peab ümber kirjutama
const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.";
// .split() on meetod, mis jagab string muutuja substringideks (tükkideks) ning tagastab need õiges järjekorras Arrays.
// Ehk siin me muutsime 'text' muutuja arrays, nimega checkWordArray.
let checkedWordArray = text.split(" ");
// Tekitame uue muutuja, mille ülesandeks on salvestada kirjutatud sõnade arv.
let wordCounter = 0;

// Tekitame muutuja errorCounter, et saaksime loendada tehtud vigu.
let errorCounter = 0;
// Lisame antud muutuja HTMLis feedback divi sisse.
feedbackDiv.innerText = errorCounter;

// Meie trükkimise välja peale kasutame focus() meetodit.
// ??? - Mida see teeb, kas see on sissekirjutad meetod?
typingArea.focus();
// Kutsume välja ka highlight funktsiooni, mida näed allpool.
highlight();

//Paneme meie trükkimisvälja külge eventListeneri, mis kuulab meie klahvi allavajutusi ja algatab funktsiooni.
// Funktsioonile anname kaasa parameetri, event. (Miks event?)
typingArea.addEventListener("keydown", (event) => {
  //Kontrolle, et kas on vajutatud CTRL ja R klahvikombinatsiooni.
  if (event.ctrlKey && event.keyCode == 82) {
    // preventDefault() on meetod, mis katkestab browseri tavapärase tegevuse.
    // Sellisel juhul toimivad asjad täpselt siis, kui me seda arvutile ütleme.
    event.preventDefault();
    // Määrame errori loendurile väärtuseks 0.
    errorCounter = 0;
    // Poogime errori loenduri HTMLi feedback divi külge.
    feedbackDiv.innerHTML = errorCounter;
  }

  // Kontrollime kas on vajutatud 'space' klaviatuuril (keyCode 32).
  if (event.keyCode == 32) {
    // Kui 'space' on vajutatud, siis teeme uue muutuja 'typedWordArray'.
    // Lisame uude muutujasse väärtused, mis me sisestame oma textarea sisse, eraldatud 'space näol'.
    // Seejärel tükeldame need sõnad arraysse.
    // See tegevus toimub igakord kui on vajutatud 'space'.
    const typedWordArray = typingArea.value.split(" ");

    // Võrdleme meie kirjutatud sõnade arrayd meie originaal tekstist tekitatud arrayd (text).
    // Indeksiks paneme 'wordCounter' väärtuse, mille me lisasime üleval.
    // Kui need kaks väärtust nendes jadades, samade indeksitega, on võrdsed, siis statement on true.
    if (typedWordArray[wordCounter] == checkedWordArray[wordCounter]) {
      // Kui antud statement on true, ehk siis kirjutasid sõna õigesti.
      // Siis me lisame antud sõnale html tagis, lisame klassi, et me saaksime sellega hiljem CSSis midagi teha.
      checkedWordArray[wordCounter] = '<span class="correct">' + checkedWordArray[wordCounter] + "</span>";
    } else {
      // Kui antud jadade võrdlus osutus siiski valeks (false)...
      // Suurendame meie error lugejat ühe võtta
      errorCounter++;
      //Lisame meie HTML divi sisse errorisõnumi.
      feedbackDiv.innerHTML = `Sa oled teinud ${errorCounter} viga!`;
      // Lisame antud sõnale html tagi, lisame classi, et saaksime sellega hiljem CSSis midagi teha.
      checkedWordArray[wordCounter] = '<span class="error">' + checkedWordArray[wordCounter] + "</span>";
    }
    //Igal juhul, kui on vajutud 'space', siis suurendame sõnaloendurit (wordCounter) ühe võrra.
    wordCounter++;
    // Kutsume esile ka highlight funktsiooni, mida saab uurida allpool.
    highlight();
  }
});

// Funktsiooni ülesanne on värvida meie sõna, mida me peame kirjutama, värviga.
function highlight() {
  // Tekitame uue muuutuja (wordArray), mille sisse lisame kõik sõnad, meie tekstis...
  // Vaata checkedWordArray muutujat ülevalt.
  // [...variable] on meetod, kuidas lisada uude muuutujasse kõik väärtused teisest arrayst.
  let wordArray = [...checkedWordArray];
  //Kuna wordCounter muutujat suurendati eelmises funktsioonis koguaeg, kui vajutati 'space'...
  // Siis saame selle panna wordArray indeksina leidma meile neid sõnu, millega me antud hetkel tegeleme.
  // Samuti saame nüüd lisada sõnale klassi, et seda hiljem CSSis värvida.
  wordArray[wordCounter] = '<span class="highlighted">' + wordArray[wordCounter] + "</span>";
  // Me lisame tulemuse teksiboksi sisse, liites wordArray jada tulemused kokku, pannes vahele 'tühik'.
  textBoxDiv.innerHTML = wordArray.join(" ");
}
