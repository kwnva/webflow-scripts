document.addEventListener("DOMContentLoaded", function() {
    // Στόχευση του στοιχείου
    const element = document.querySelector('[data-element="counter"]');
    if (!element) return;

    // 1. Διάβασμα Increment (π.χ. "4-6")
    let minInc = 2, maxInc = 3;
    const incAttr = element.getAttribute('data-increment');
    if (incAttr && incAttr.includes('-')) {
        const parts = incAttr.split('-');
        minInc = parseInt(parts[0]);
        maxInc = parseInt(parts[1]);
    }

    // 2. Διάβασμα Speed (σε δευτερόλεπτα)
    const speedAttr = element.getAttribute('data-speed');
    const speedMs = (parseFloat(speedAttr) || 1) * 1000; // Default 1s αν λείπει το attribute

    // 3. Διάβασμα αρχικού αριθμού από το Webflow
    const rawValue = element.innerText.replace(/\D/g, "");
    const startNumber = parseInt(rawValue) || 0;

    let currentNumber = startNumber;

    // LocalStorage Logic
    const storedCount = localStorage.getItem('appCounter');
    if (storedCount) {
        let parsedCount = parseInt(storedCount, 10);
        if (parsedCount > startNumber) {
            currentNumber = parsedCount;
        }
    }

    function updateDisplay(num) {
        element.innerText = num.toLocaleString('el-GR') + '+';
    }

    // Αρχική εμφάνιση
    updateDisplay(currentNumber);

    // Το Loop με τη δυναμική ταχύτητα
    setInterval(function() {
        const increment = Math.floor(Math.random() * (maxInc - minInc + 1) + minInc);
        currentNumber += increment;
        updateDisplay(currentNumber);
        localStorage.setItem('appCounter', currentNumber);
    }, speedMs);
});
