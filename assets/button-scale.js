document.addEventListener("DOMContentLoaded", () => {
  
  const buttons = document.querySelectorAll('[data-3d-btn]');

  buttons.forEach((btn) => {
    
    // --- ΕΠΙΛΟΓΗ ΣΤΟΙΧΕΙΩΝ ---
    const innerWrapper = btn.querySelector('.btninside'); 
    const textEl = btn.querySelector('.text-block');      

    // Αν λείπει κάτι, σταματάμε
    if (!innerWrapper || !textEl) return;

    // --- ΡΥΘΜΙΣΕΙΣ ---
    const durationAttr = btn.getAttribute('data-duration');
    const animDuration = durationAttr ? parseInt(durationAttr) : 400; 
    const scaleFactor = 1.08; 
    const inverseScale = 1 / scaleFactor; 

    // --- SPLIT TEXT LOGIC ---
    const originalText = textEl.innerText;
    const charsHtml = originalText.split('').map(char => {
      if(char === ' ') return '<span class="word-3d">&nbsp;</span>';
      return `
        <span class="word-3d">
          <span class="word-3d-face face-front">${char}</span>
          <span class="word-3d-face face-hover">${char}</span>
        </span>
      `;
    }).join('');
    
    textEl.innerHTML = charsHtml;

    // --- TIMELINE ---
    let tl = anime.timeline({
      autoplay: false,
      easing: 'cubicBezier(0.25, 1, 0.5, 1)',
      duration: animDuration
    });

    tl.add({
      targets: btn,
      scale: [1, scaleFactor],
    }, 0)
    .add({
      targets: innerWrapper,
      scale: [1, inverseScale],
    }, 0)
    .add({
      targets: textEl.querySelectorAll('.word-3d'),
      rotateX: [0, -90],
      delay: anime.stagger(30), 
    }, 0)
    .add({
      targets: textEl.querySelectorAll('.face-hover'),
      opacity: [0, 1],
      duration: animDuration / 2
    }, 0);

    // --- EVENTS (ΔΙΟΡΘΩΜΕΝΑ) ---
    
    btn.addEventListener('mouseenter', () => {
      // Αν το animation έχει γυρίσει ανάποδα (από το mouseleave), το ξαναγυρνάμε ίσια
      if (tl.reversed) {
        tl.reverse();
      }
      tl.play();
    });

    btn.addEventListener('mouseleave', () => {
      // Αν το animation είναι ίσιο, το γυρνάμε ανάποδα
      if (!tl.reversed) {
        tl.reverse();
      }
      tl.play();
    });

  });
});
