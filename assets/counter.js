document.addEventListener("DOMContentLoaded", function() {
    // --- Βασικές Ρυθμίσεις ---
    const elementID = 'counter-element'; // Το ID του στοιχείου
    const startNumber = 632930;          // Αρχικό νούμερο (αν δεν υπάρχει στο storage)
    const speed = 1000;                  // Κάθε πότε αλλάζει (1000ms = 1 δευτερόλεπτο)
    
    // --- Defaults (αν ξεχάσεις το attribute) ---
    let minIncrement = 2; 
    let maxIncrement = 3; 

    const element = document.getElementById(elementID);

    if (!element) return; // Αν δεν βρεθεί το στοιχείο, σταματάμε

    // --- Διάβασμα του Attribute (π.χ. "4-6") ---
    const attrValue = element.getAttribute('data-increment');
    if (attrValue) {
        // Σπάμε το string στην παύλα
        const parts = attrValue.split('-');
        if (parts.length === 2) {
            minIncrement = parseInt(parts[0]);
            maxIncrement = parseInt(parts[1]);
        }
    }

    // --- Logic για LocalStorage (μνήμη browser) ---
    let currentNumber = startNumber;
    const storedCount = localStorage.getItem('fakeAppCounter');
    
    if (storedCount) {
        let parsedCount = parseInt(storedCount, 10);
        if (parsedCount > startNumber) {
            currentNumber = parsedCount;
        }
    }

    // Συνάρτηση εμφάνισης (με τελείες και το +)
    function updateDisplay(num) {
        element.innerText = num.toLocaleString('el-GR') + '+'; 
    }

    // Αρχική τιμή
    updateDisplay(currentNumber);

    // Το Loop
    setInterval(function() {
        // Τυχαίος αριθμός βασισμένος στο attribute που έβαλες
        const increment = Math.floor(Math.random() * (maxIncrement - minIncrement + 1) + minIncrement);
        
        currentNumber += increment;
        
        updateDisplay(currentNumber);
        localStorage.setItem('fakeAppCounter', currentNumber);
        
    }, speed);
});
