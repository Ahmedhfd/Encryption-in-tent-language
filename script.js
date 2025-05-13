// قائمة الحروف العربية الأساسية
const letters = ['ا','ب','ت','ث','ج','ح','خ','د','ذ','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م','ن','ه','و','ي'];

// بناء خريطة الحرف إلى لون والعكس
const letterToColor = {};
const colorToLetter = {};
letters.forEach((letter, i) => {
    const hue = Math.floor(i * (360 / letters.length));
    const color = `hsl(${hue}, 70%, 50%)`;
    letterToColor[letter] = color;
    colorToLetter[color] = letter;
});

function encrypt() {
    const text = document.getElementById('inputText').value.trim();
    const codes = [];
    const display = document.getElementById('colorDisplay');
    display.innerHTML = '';
    for (let char of text) {
        if (letterToColor[char]) {
            const color = letterToColor[char];
            codes.push(color);
            const block = document.createElement('div');
            block.className = 'block';
            block.style.backgroundColor = color;
            display.appendChild(block);
        }
    }
    document.getElementById('outputCodes').value = codes.join(',');
}

function decrypt() {
    const codes = document.getElementById('outputCodes').value.split(',').map(c => c.trim());
    let text = '';
    for (let code of codes) {
        if (colorToLetter[code]) {
            text += colorToLetter[code];
        }
    }
    document.getElementById('inputText').value = text;
    encrypt(); // لإعادة عرض الألوان
}