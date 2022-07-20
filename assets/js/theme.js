
//// Работающая
// let theme = document.querySelector('.theme');
// let a = document.querySelector('a');
// let colorTheme = document.querySelector('.color-theme');
// let btnToggle = document.querySelector('.btn-toggle');
// btnToggle.onclick = function () {
//   theme.classList.toggle('dark-theme');
//   colorTheme.classList.toggle('dark-theme');
//   a.classList.toggle('dark-theme');
// }

// function applyTheme(theme) {
//   document.body.classList.remove("theme-auto", "theme-light", "theme-dark");
//   document.body.classList.add(`theme-${theme}`);
// }
//
// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector("#theme").addEventListener("change", function() {
//     applyTheme(this.value);
//   });
// });
//
// document.addEventListener("DOMContentLoaded", () => {
//   const savedTheme = localStorage.getItem("theme") || "auto";
//
//   applyTheme(savedTheme);
//
//   for (const optionElement of document.querySelectorAll("#theme option")) {
//     optionElement.selected = savedTheme === optionElement.value;
//   }
//
//   document.querySelector("#theme").addEventListener("change", function () {
//     localStorage.setItem("theme", this.value);
//     applyTheme(this.value);
//   });
// });

const theme = document.querySelector('body');
const btns = document.querySelectorAll('.colors');
const text = document.querySelector('.text');

setColor('color', '#fff');
setColor('text', '#000');

function setColor(atr, value) {
  if (atr === 'color') {
    if (localStorage.getItem(atr)) {
      theme.style.backgroundColor = `${localStorage.getItem(atr)}`;
    } else {
      theme.style.backgroundColor = value;
      localStorage.setItem(`${atr}`, value);
    }
  } else if (atr === 'text') {
    if (localStorage.getItem(atr)) {
      text.style.color = `${localStorage.getItem(atr)}`;
    } else {
      text.style.color = value;
      localStorage.setItem(`${atr}`, value);
    }
  }
}

function getColor(color, colorText) {
  theme.style.backgroundColor = color;
  text.style.color = colorText;
  localStorage.setItem('color', color);
  localStorage.setItem('text', colorText);
}

btns.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    const color = e.currentTarget.classList;

    if (color.contains('white')) {
      getColor('#ffffff', '#1e1e1e');
    } else if (color.contains('black')) {
      getColor('#1e1e1e', '#fff');
    }
  });
});
