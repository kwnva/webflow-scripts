// 1. Επιλογή Στοιχείων
const button = document.getElementById('myButton');
const contents = button.querySelectorAll('.text-block, .svg');

// 2. Ρυθμίσεις (Configuration)
const CONFIG = {
  scale: 1.08,             // Πόσο μεγαλώνει το κουμπί
  duration: 400,           // Διάρκεια σε ms
  easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
};

// Υπολογίζουμε το αντίστροφο scale μία φορά
const inverseScale = 1 / CONFIG.scale;

// 3. Η Συνάρτηση που κάνει τη δουλειά
const animateButton = (isHovering) => {
  // Αν isHovering = true, πάμε στο scale. Αν false, επιστρέφουμε στο 1.
  const btnTarget = isHovering ? CONFIG.scale : 1;
  const contentTarget = isHovering ? inverseScale : 1;
  
  const options = {
    duration: CONFIG.duration,
    easing: CONFIG.easing,
    fill: 'forwards' // Κρατάει την τελική κατάσταση
  };

  // Animation Κουμπιού
  button.animate([
    { transform: `scale(${btnTarget})` } 
  ], options);

  // Animation Περιεχομένων
  contents.forEach(el => {
    el.animate([
      { transform: `scale(${contentTarget})` }
    ], options);
  });
};

// 4. Events
button.addEventListener('mouseenter', () => animateButton(true));
button.addEventListener('mouseleave', () => animateButton(false));
