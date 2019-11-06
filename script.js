// сохранение раскладки
let langue = localStorage.getItem('langue');

// создается клавиатура и окно ввода
let wrapper = document.createElement('div');
wrapper.className = "wrapper";
document.body.append(wrapper);

let windowsOutput = document.createElement('div');
windowsOutput.className = "windowsOutput";
wrapper.append(windowsOutput);

let langueBox = document.createElement('div');
langueBox.className = "langueBox";
langueBox.innerText= langue;
wrapper.append(langueBox);

let clearBox = document.createElement('div');
clearBox.className = "clearBox";
clearBox.innerText= 'Clear';
wrapper.append(clearBox);

let keyBoard = document.createElement('div');
keyBoard.className = "keyBoard";
wrapper.append(keyBoard);

// создаются строки и буквы 
let row
let letter
function painterKeyboard (){
let n = 0;
for (let i=0; i<5; i++) {
    row = document.createElement('div');
    row.className = "row";
    keyBoard.append(row);
    let numbersLetter = [14,15,13,14,9]
    for(let j=0; j<numbersLetter[i]; j++) { 
        letter = document.createElement('div');
        letter.className = "letter";
        letter.setAttribute('data-keycode', optionsLetter[n].code)
        if ('fun' in optionsLetter[n]) {
            letter.style.fontSize = '14px';
            letter.setAttribute('data-fun', optionsLetter[n].fun)
        }
        if ('shift' in optionsLetter[n]) {
            letter.setAttribute('data-shift', optionsLetter[n].shift)
        }
        if(langue=='eng' || langue== undefined )
        {letter.innerText = optionsLetter[n].eng;}
        else {letter.innerText = optionsLetter[n].ru;}
        row.append(letter);  
        n++;
    }
}
}
let letters = document.getElementsByClassName('letter');
painterKeyboard ();

// работа с реальной клавиатуры (подсветка виртуальной, вывод в див) 
document.addEventListener('keydown', function(event) {
    let realKey = event.keyCode; 
    let virtualKey = document.querySelector(`[data-keycode="${realKey}"]`);
    console.log (virtualKey);
    virtualKey.classList.add('press_letter');
    setTimeout(function() {virtualKey.classList.remove('press_letter')}, 500);
    if (!virtualKey.dataset.fun) {
    windowsOutput.innerText+= event.key;
    }
    // раскладка
    if (event.shiftKey && event.altKey ) {
        if (langue=='ru') {langue='eng'} else {langue='ru'};
        for(let i = 0; i < letters.length; i++) {    
            letters[i].innerText= optionsLetter[i][langue];
        }
        langueBox.classList.add('langueBoxOn');
        setTimeout(function() {langueBox.classList.remove('langueBoxOn')}, 2000);
        langueBox.innerText= langue;
        localStorage.setItem('langue', langue);
    } 
    //Caps Lock
    if (event.key == 'CapsLock') {
        for(let i = 0; i < letters.length; i++) {
            if (!('fun' in optionsLetter[i])) {letters[i].classList.toggle("uppercase"); }
            
    }
    }
    // Backspace 
    if (event.key == 'Backspace') {
        windowsOutput.innerText=windowsOutput.innerText.slice(0, -1); 
    }
    // Shift нажатие
    if (event.key == 'Shift') {   
        for(let i = 0; i < letters.length; i++) {
            if ('shift' in optionsLetter[i]) {
                letters[i].innerText = letters[i].dataset.shift
            }
        } 
    }
})
// Shift отпуск
document.addEventListener('keyup', function(event) {
    if (event.key == 'Shift') {  
        for(let i = 0; i < letters.length; i++) {
            if ('shift' in optionsLetter[i]) {
                letters[i].innerText= optionsLetter[i][langue];
            } 
        }
    }
})

// работа с виртуальной клавиатурой
let n=0;
keyBoard.addEventListener('click', function(event) {
    let virtualKey = event.target;
   if (virtualKey.classList.contains('letter')) {
    if (!virtualKey.dataset.fun) {
        windowsOutput.innerText+= virtualKey.innerText;
        }  
    }
    // переключение CapsLock
    if (event.target.innerText == 'CapsLock') {
        letter.classList.toggle("uppercase");
        for(let i = 0; i < letters.length; i++) {
            if (!('fun' in optionsLetter[i])) { letters[i].classList.toggle("uppercase");}
    }}
    // Backspace 
    if (event.target.innerText == 'Backspace') {
        windowsOutput.innerText=windowsOutput.innerText.slice(0, -1); 
    }   
    // Shift
    if (event.target.innerText == 'Shift') {  
        n++
        for(let i = 0; i < letters.length; i++) {
            if(n%2==1){
                if ('shift' in optionsLetter[i]) {
                    letters[i].innerText = letters[i].dataset.shift
                }
            }
            else {
            letters[i].innerText= optionsLetter[i][langue];
            }
       }
    }
 })

 // clear
 clearBox.addEventListener('click', function(event) {
    windowsOutput.innerText='';
 })

 