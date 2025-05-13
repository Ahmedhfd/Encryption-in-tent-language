const correctPassword = "000111";

function checkPassword() {
  const input = document.getElementById("password-input").value;
  if (input === correctPassword) {
    document.getElementById("password-screen").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  } else {
    document.getElementById("error-message").innerText = "كلمة المرور غير صحيحة";
  }
}

const colorMap = {
  "ا": "#FF0000", "ب": "#00FF00", "ت": "#0000FF", "ث": "#FFFF00",
  "ج": "#FF00FF", "ح": "#00FFFF", "خ": "#800000", "د": "#808000",
  "ذ": "#008000", "ر": "#800080", "ز": "#008080", "س": "#000080",
  "ش": "#FFC0CB", "ص": "#A52A2A", "ض": "#7FFF00", "ط": "#D2691E",
  "ظ": "#DC143C", "ع": "#000000", "غ": "#FFD700", "ف": "#ADFF2F",
  "ق": "#4B0082", "ك": "#E6E6FA", "ل": "#20B2AA", "م": "#90EE90",
  "ن": "#FFA07A", "ه": "#FF1493", "و": "#B22222", "ي": "#1E90FF",
  " ": "#FFFFFF"
};

const reverseColorMap = Object.fromEntries(
  Object.entries(colorMap).map(([key, value]) => [value.toLowerCase(), key])
);

function encryptText() {
  const text = document.getElementById("inputText").value;
  const output = document.getElementById("colorOutput");
  output.innerHTML = "";
  text.split("").forEach(char => {
    const color = colorMap[char] || "#CCCCCC";
    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = color;
    box.title = color;
    output.appendChild(box);
  });
}

function copyColors() {
  const output = document.getElementById("colorOutput").children;
  let codes = [];
  for (let box of output) {
    codes.push(box.style.backgroundColor);
  }
  const hexColors = Array.from(output).map(box => {
    const rgb = box.style.backgroundColor.match(/\d+/g);
    return "#" + rgb.map(x => (+x).toString(16).padStart(2, '0')).join('');
  });
  navigator.clipboard.writeText(hexColors.join(", ")).then(() => {
    alert("تم نسخ رموز الألوان!");
  });
}

function decryptColors() {
  const colorText = prompt("ألصق رموز الألوان هنا (مثال: #FF0000, #00FF00)");
  if (!colorText) return;
  const colors = colorText.split(",").map(c => c.trim().toLowerCase());
  const result = colors.map(c => reverseColorMap[c] || "?").join("");
  document.getElementById("decryptedText").value = result;
}

function downloadText() {
  const text = document.getElementById("decryptedText").value;
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "decrypted.txt";
  link.click();
}
