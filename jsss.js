// Pickup lines and sweet messages
const pickupLines = [
  "If kisses were stars, I’d give you the sky. ✨",
  "Are you made of copper and tellurium? Because you’re Cu-Te.",
  "You’re the CSS to my HTML—making everything beautiful.",
  "If I could rearrange the alphabet, I’d put U and I together.",
  "You must be a magician, because whenever I look at you, everyone else disappears.",
  "You’re the reason my heart has a source code.",
  "Do you have a map? I just got lost in your eyes.",
  "Are you a campfire? Because you bring warmth to my heart.",
  "If loving you was a bug, I’d never fix it.",
  "You’re the ping to my server—always making my heart respond."
];

const heartFacts = [
  "The first heart emoji was created in 1995.",
  "The human heart beats about 100,000 times a day.",
  "A woman's heart typically beats faster than a man's.",
  "Some animals, like octopuses, have more than one heart.",
  "The heart is the first organ to form in an embryo.",
  "Your heart creates enough energy daily to drive a truck 20 miles.",
  "The heart can continue to beat even when separated from the body, if it has oxygen.",
  "In ancient times, the heart was considered the seat of the soul and emotions.",
  "Your left lung is smaller than your right to make room for your heart.",
  "Laughing is good for your heart—it reduces stress and boosts immunity."
];

// Typewriter for pickup lines
let pickupIdx = 0, pickupChar = 0, pickupDeleting = false;
function typePickup() {
  const el = document.getElementById('pickupTypewriter');
  if (!el) return;
  let line = pickupLines[pickupIdx];
  if (!pickupDeleting && pickupChar <= line.length) {
    el.textContent = line.substring(0, pickupChar++);
  } else if (pickupDeleting && pickupChar >= 0) {
    el.textContent = line.substring(0, pickupChar--);
  }
  if (pickupChar === line.length && !pickupDeleting) {
    pickupDeleting = true;
    setTimeout(typePickup, 1800);
    return;
  } else if (pickupChar === 0 && pickupDeleting) {
    pickupDeleting = false;
    pickupIdx = (pickupIdx + 1) % pickupLines.length;
    setTimeout(typePickup, 600);
    return;
  }
  setTimeout(typePickup, pickupDeleting ? 30 : 60);
}
setTimeout(typePickup, 1200);

// Heart Fact: only change on button click, with typewriter effect
let factIdx = 0;
function showNextFact() {
  factIdx = (factIdx + 1) % heartFacts.length;
  typeFact(heartFacts[factIdx]);
}

// Typewriter for heart fact (single fact)
function typeFact(fact) {
  const el = document.getElementById('factTypewriter');
  if (!el) return;
  let i = 0;
  el.textContent = "";
  function type() {
    if (i <= fact.length) {
      el.textContent = fact.substring(0, i++);
      setTimeout(type, 32);
    }
  }
  type();
}

// Show the first fact on load
document.addEventListener("DOMContentLoaded", function() {
  typeFact(heartFacts[factIdx]);
});

// Save proposal answer to Firebase
window.submitProposalAnswer = async function(answer) {
  await addDoc(collection(db, "proposalAnswers"), {
    answer: answer,
    time: new Date()
  });
  alert("Your answer has been recorded: " + answer);
};
