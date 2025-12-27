// 1. Επιλέγουμε τα στοιχεία
const button = document.getElementById('myButton');
const contents = button.querySelectorAll('.text-block, .svg'); // Επιλέγουμε ΚΑΙ το κείμενο ΚΑΙ το εικονίδιο

// 2. Ορίζουμε πόσο θέλουμε να μεγαλώσει το κουμπί
const scaleFactor = 1.08; // Το κουμπί θα γίνει 15% μεγαλύτερο
const inverseScale = 1 / scaleFactor; // Υπολογίζουμε αυτόματα το αντίστροφο (π.χ. ~0.87)

// 3. Ρυθμίσεις (Κοινές για τέλειο συγχρονισμό)
const timing = {
  duration: 400,
  fill: 'forwards',
  easing: 'cubic-bezier(0.25, 1, 0.5, 1)' 
};

// 4. Mouse Enter
button.addEventListener('mouseenter', () => {
  
  // Το Κουμπί ΜΕΓΑΛΩΝΕΙ
  button.animate([
    { transform: 'scale(1)' },
    { transform: `scale(${scaleFactor})` }
  ], timing);

  // Τα Περιεχόμενα ΜΙΚΡΑΙΝΟΥΝ (για να φαίνονται σταθερά)
  contents.forEach(el => {
    el.animate([
      { transform: 'scale(1)' },
      { transform: `scale(${inverseScale})` } 
    ], timing);
  });
});

// 5. Mouse Leave
button.addEventListener('mouseleave', () => {
  
  // Επιστροφή Κουμπιού
  button.animate([
    { transform: `scale(${scaleFactor})` },
    { transform: 'scale(1)' }
  ], timing);

  // Επιστροφή Περιεχομένων
  contents.forEach(el => {
    el.animate([
      { transform: `scale(${inverseScale})` },
      { transform: 'scale(1)' }
    ], timing);
  });
});
