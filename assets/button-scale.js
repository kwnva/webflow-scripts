document.addEventListener("DOMContentLoaded", () => {
  
  const buttons = document.querySelectorAll('[data-3d-btn]');

  buttons.forEach((btn) => {
    
    // --- ΡΥΘΜΙΣΕΙΣ ---
    const durationAttr = btn.getAttribute('data-duration');
    const animDuration = durationAttr ? parseInt(durationAttr) : 400; // Default 400ms
    const scaleFactor = 1.08; // Πόσο μεγαλώνει το κουμπί
    const inverseScale = 1 / scaleFactor; // Αυτόματη εύρεση αντίστροφου

    // 1. Προετοιμασία HTML
    // Κρατάμε το αρχικό κείμενο
    const originalText = btn.innerText;
    
    // Φτιάχνουμε το 3D HTML string
    const charsHtml = originalText.split('').map(char => {
      if(char === ' ') return '<span class="word-3d">&nbsp;</span>';
      return `
        <span class="word-3d">
          <span class="word-3d-face face-front">${char}</span>
          <span class="word-3d-face face-hover">${char}</span>
        </span>
      `;
    }).join('');

    // Βάζουμε τα γράμματα μέσα στο Wrapper για να κάνουμε εκεί το inverse scale
    // Αν έχεις και SVG εικόνα, θα πρέπει να την βάλεις μέσα στο .content-wrapper χειροκίνητα ή με πιο complex script.
    // Εδώ υποθέτουμε ότι το κουμπί έχει μόνο κείμενο.
    btn.innerHTML = `<span class="content-wrapper">${charsHtml}</span>`;

    const wrapper = btn.querySelector('.content-wrapper');
    const letters = btn.querySelectorAll('.word-3d');
    const backFaces = btn.querySelectorAll('.face-hover');

    // 2. Δημιουργία Timeline (Όλα τα animation μαζί)
    let tl = anime.timeline({
      autoplay: false,
      easing: 'cubicBezier(0.25, 1, 0.5, 1)', // Το easing που ήθελες
      duration: animDuration
    });

    // Προσθήκη: Scale UP το κουμπί
    tl.add({
      targets: btn,
      scale: [1, scaleFactor],
    }, 0) // Το '0' σημαίνει ξεκίνα στην αρχή
    
    // Προσθήκη: Scale DOWN το περιεχόμενο (Wrapper)
    .add({
      targets: wrapper,
      scale: [1, inverseScale],
    }, 0)

    // Προσθήκη: 3D Rotation στα γράμματα
    .add({
      targets: letters,
      rotateX: [0, -90],
      delay: anime.stagger(30), // Καθυστέρηση ανά γράμμα
    }, 0)

    // Προσθήκη: Εμφάνιση της πίσω πλευράς
    .add({
      targets: backFaces,
      opacity: [0, 1],
      duration: animDuration / 2
    }, 0);

    // 3. Events
    btn.addEventListener('mouseenter', () => {
      tl.play();
      if (tl.reverse) tl.reverse = false; 
    });

    btn.addEventListener('mouseleave', () => {
      tl.reverse();
      tl.play();
    });

  });
});
