const containerEl = document.querySelector(".container");

const careers = [
  "football markai vote din",
  "website markai vote din",
  "shobai ebar vote din"
];

let careerIndex = 0;
let characterIndex = 0;

function update() {
  characterIndex++;

  containerEl.innerHTML = `
    <h1> ${careers[careerIndex].slice(0, characterIndex)}</h1>
  `;

  if (characterIndex === careers[careerIndex].length) {
    setTimeout(() => {
      careerIndex++;
      if (careerIndex === careers.length) {
        careerIndex = 0; // loop back
      }
      characterIndex = 0;
    }, 1000);
  }

  setTimeout(update, 150); // typing speed
}

update();