/*
  assets/button-scale.js
  Adds a robust button scale animation using the Web Animations API.
  - Graceful fallback for prefers-reduced-motion
  - Cancels previous animations to avoid stacking
  - Supports mouse, touch, and keyboard (focus)
  - Includes MutationObserver cleanup
  Usage: include this script on pages where #myButton exists, or change the selector.
*/
(function () {
  // 1. Επιλέγουμε το κουμπί (adjust selector if needed)
  const button = document.getElementById('myButton');
  if (!button) {
    // Δεν βρέθηκε το κουμπί — δεν κάνουμε τίποτα.
    console.warn('button-scale: #myButton not found');
    return;
  }

  // 2. Επιλογή περιεχομένων (κείμενο + svg)
  const contents = Array.from(button.querySelectorAll('.text-block, .svg'));

  // 3. Παράμετροι κλίμακας
  const scaleFactor = 1.08; // 1.08 => ~8% μεγαλύτερο
  const inverseScale = 1 / scaleFactor; // ~0.9259

  // 4. Ρυθμίσεις animation
  const timing = {
    duration: 400,
    fill: 'forwards',
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
  };

  // Θα κρατάμε τα ενεργά animations για ακύρωση
  let activeButtonAnim = null;
  const activeContentAnims = new WeakMap();

  // Έλεγχος prefers-reduced-motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateButton(fromScale, toScale) {
    if (reduceMotion) {
      button.style.transform = `scale(${toScale})`;
      return;
    }
    if (activeButtonAnim) activeButtonAnim.cancel();
    activeButtonAnim = button.animate([
      { transform: `scale(${fromScale})` },
      { transform: `scale(${toScale})` }
    ], timing);
  }

  function animateContent(el, fromScale, toScale) {
    if (reduceMotion) {
      el.style.transform = `scale(${toScale})`;
      return;
    }
    const prev = activeContentAnims.get(el);
    if (prev) prev.cancel();
    const anim = el.animate([
      { transform: `scale(${fromScale})` },
      { transform: `scale(${toScale})` }
    ], timing);
    activeContentAnims.set(el, anim);
  }

  // Συνήθεις ενέργειες για είσοδο/έξοδο
  function onEnter() {
    animateButton(1, scaleFactor);
    contents.forEach(el => animateContent(el, 1, inverseScale));
  }

  function onLeave() {
    animateButton(scaleFactor, 1);
    contents.forEach(el => animateContent(el, inverseScale, 1));
  }

  // Event listeners: mouse, touch, keyboard focus
  button.addEventListener('mouseenter', onEnter);
  button.addEventListener('mouseleave', onLeave);

  // Touch (touchstart / touchend) — για κινητά
  button.addEventListener('touchstart', (e) => {
    // αποτρέπουμε σύντομο tap να πυροδοτήσει και mouse events δύο φορές
    e.preventDefault();
    onEnter();
  }, { passive: false });
  button.addEventListener('touchend', onLeave);

  // Keyboard accessibility — focus/blur
  button.addEventListener('focus', onEnter);
  button.addEventListener('blur', onLeave);

  // Προαιρετικά: ακύρωση animations αν το στοιχείο αφαιρεθεί από DOM
  const obs = new MutationObserver(() => {
    if (!document.contains(button)) {
      if (activeButtonAnim) activeButtonAnim.cancel();
      contents.forEach(el => {
        const a = activeContentAnims.get(el);
        if (a) a.cancel();
      });
      obs.disconnect();
    }
  });
  obs.observe(document, { childList: true, subtree: true });
})();
