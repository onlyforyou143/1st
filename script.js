// Define photo content array with romantic messages
const contents = [
    {
        photo: "K5.jpg",
        text: "Your smile brightens my darkest days. The way your eyes light up when you're excited makes my heart skip a beat."
    },
    {
        photo: "K1.jpg",
        text: "Every moment with you feels like a dream. I cherish each second we spend together."
    },
    {
        photo: "K3.jpg",
        text: "The sound of your laughter is my favorite melody. I could listen to it forever."
    },
    {
        photo: "K2.jpg",
        text: "Your touch is pure magic. It makes everything in the world fade away, leaving just us."
    },
    {
        photo: "K7.jpg",
        text: "The way you understand me without words amazes me. You truly see me for who I am."
    },
    {
        photo: "K8.jpg",
        text: "Being with you feels like coming home. You're my comfort, my safe place."
    },
    {
        photo: "K10.jpg",
        text: "Your kindness and compassion inspire me to be a better person every day."
    },
    {
        photo: "K9.jpg",
        text: "Even in silence, your presence brings me peace. You calm the storms inside me."
    },
    {
        photo: "K6.jpg",
        text: "I love how we can be silly together. Your playfulness brings so much joy to my life."
    },
    {
        photo: "K4.jpg",
        text: "One month may seem short, but it's been the most beautiful chapter of my life so far. I can't wait to write countless more with you."
    }
];

let pageIndex = 0;
let isAnimating = false;

// DOM elements
const giftBox = document.getElementById('giftBox');
const photoBook = document.getElementById('photoBook');
const bookCover = document.getElementById('bookCover');
const currentPage = document.getElementById('currentPage');
const pageIndicator = document.getElementById('pageIndicator');
const finalPage = document.getElementById('finalPage');
const finalEnvelope = document.getElementById('finalEnvelope');
const finalLetter = document.getElementById('finalLetter');
const restartButton = document.getElementById('restartButton');
const floatingHearts = document.getElementById('floatingHearts');

// Function to update page content
function updatePageContent() {
    const photoElement = currentPage.querySelector('.photo');
    const textElement = currentPage.querySelector('.text-side p');
    
    // Set new content
    photoElement.src = contents[pageIndex].photo;
    textElement.textContent = contents[pageIndex].text;
    
    // Update page indicator
    pageIndicator.textContent = `Page ${pageIndex + 1} of ${contents.length}`;
}

// Function to flip to the next page
function flipToNextPage() {
    if (isAnimating) return;
    
    if (pageIndex < contents.length - 1) {
        isAnimating = true;
        currentPage.classList.add('flip');
        
        setTimeout(() => {
            pageIndex++;
            updatePageContent();
            currentPage.classList.remove('flip');
            isAnimating = false;
        }, 800);
    } else {
        // Show final envelope when on the last page
        photoBook.classList.remove('active');
        finalPage.classList.add('active');
        restartButton.classList.add('show');
    }
}

// Create floating hearts background
function createFloatingHearts() {
    // Clear existing hearts
    floatingHearts.innerHTML = '';
    
    // Create new hearts
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.className = 'float-heart';
        
        // Random properties
        const size = Math.random() * 1.5 + 0.5;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const rotate = Math.random() * 360;
        
        // Apply random styles
        heart.style.setProperty('--left', `${left}%`);
        heart.style.setProperty('--size', size);
        heart.style.setProperty('--duration', `${duration}s`);
        heart.style.animation = `floatUp ${duration}s linear ${delay}s infinite`;
        heart.style.setProperty('--rotate', `${rotate}deg`);
        
        floatingHearts.appendChild(heart);
    }
}

// Create confetti animation
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    const colors = ['#ff6b95', '#f8bbd0', '#ffc0cb', '#ffb6c1', '#ff69b4', '#ff1493'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        
        // Randomly create hearts, stars, or circles
        const shape = Math.floor(Math.random() * 3);
        
        if (shape === 0) {
            // Heart shape
            confetti.innerHTML = '❤';
            confetti.style.fontSize = `${Math.random() * 15 + 10}px`;
        } else if (shape === 1) {
            // Star shape
            confetti.innerHTML = '★';
            confetti.style.fontSize = `${Math.random() * 15 + 10}px`;
        } else {
            // Circle shape
            confetti.className = 'confetti-particle';
            const size = Math.random() * 8 + 5;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.borderRadius = '50%';
        }
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.color = color;
        confetti.style.background = shape === 2 ? color : 'transparent';
        confetti.style.position = 'absolute';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = `${Math.random() * 100}%`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = Math.random() * 0.5 + 0.5;
        
        // Animation
        const animationDuration = Math.random() * 3 + 2;
        confetti.style.animation = `fallDown ${animationDuration}s ease-out forwards`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        
        confettiContainer.appendChild(confetti);
    }
}

// Function to open gift box
function openGiftBox() {
    giftBox.classList.add('opened');
    createConfetti();
    
    // Show photo book after gift box animation
    setTimeout(() => {
        photoBook.classList.add('active');
    }, 1000);
}

// Function to open book cover
function openBookCover() {
    bookCover.classList.add('open');
    
    // Initialize first page content
    updatePageContent();
}

// Function to open final envelope
// Fix for the envelope animation issue
function openEnvelope() {
    finalEnvelope.classList.add('open');
    
    // Show letter after envelope opens - fixed timing and z-index issue
    setTimeout(() => {
        finalLetter.classList.add('active');
        // Ensure the letter is positioned correctly
        finalLetter.style.zIndex = "4"; // Higher z-index than the envelope flap
    }, 1000);
}

// Update CSS for the letter and envelope components
const styleFixForEnvelope = document.createElement('style');
styleFixForEnvelope.textContent = `
.final-letter {
    position: absolute;
    width: 90%;
    height: 90%;
    left: 5%;
    top: 5%;
    background: white;
    border-radius: 15px;
    padding: 30px;
    transform: translateY(20px);
    opacity: 0;
    transition: transform 1s 0.5s, opacity 1s 0.5s;
    overflow-y: auto;
    /* Fixed z-index to ensure letter appears above envelope parts */
    z-index: 1;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.final-letter.active {
    transform: translateY(0);
    opacity: 1;
    /* When active, ensure it has higher z-index */
    z-index: 4;
}

/* Adjust envelope flap to ensure proper animation */
.env-flap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(to bottom, #ffacc3, #ffc3d4);
    transform-origin: top;
    transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    z-index: 3;
    clip-path: polygon(0 0, 50% 30%, 100% 0, 100% 100%, 0 100%);
    border-radius: 15px 15px 0 0;
}

/* Ensure envelope opens properly */
.final-envelope.open {
    transform: translateY(-10px);
}

.final-envelope.open .env-flap {
    transform: rotateX(-180deg);
    /* Adjust z-index when open to ensure letter is visible */
    z-index: 2;
}
`;
document.head.appendChild(styleFixForEnvelope);

// Enhanced restart function to properly reset envelope and letter states
function restartExperience() {
    // Reset all states
    finalPage.classList.remove('active');
    finalEnvelope.classList.remove('open');
    finalLetter.classList.remove('active');
    // Reset letter z-index
    finalLetter.style.zIndex = "1";
    bookCover.classList.remove('open');
    photoBook.classList.remove('active');
    restartButton.classList.remove('show');
    
    // Reset page index
    pageIndex = 0;
    
    // Show gift box again
    giftBox.classList.remove('opened');
    
    // Clear confetti
    document.getElementById('confettiContainer').innerHTML = '';
    
    // Refresh floating hearts
    createFloatingHearts();
}

// Add event listeners to ensure proper functionality
document.addEventListener('DOMContentLoaded', () => {
    // Existing event listeners
    giftBox.addEventListener('click', openGiftBox);
    bookCover.addEventListener('click', openBookCover);
    currentPage.addEventListener('click', flipToNextPage);
    
    // Replace the envelope event listener
    if (finalEnvelope) {
        finalEnvelope.addEventListener('click', openEnvelope);
    }
    
    if (restartButton) {
        restartButton.addEventListener('click', restartExperience);
    }
    
    // Additional check to ensure elements are properly initialized
    if (!finalEnvelope || !finalLetter) {
        console.error("Envelope or letter elements not found. Check your HTML structure.");
    }
});

// Listen for window resize to adjust floating hearts
window.addEventListener('resize', createFloatingHearts);

// Optional: Add background music
function addBackgroundMusic() {
    const audio = new Audio('music/romantic-background.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    
    // Add music toggle button
    const musicButton = document.createElement('button');
    musicButton.className = 'music-button';
    musicButton.innerHTML = '<i class="fas fa-music"></i>';
    musicButton.setAttribute('title', 'Toggle Music');
    document.body.appendChild(musicButton);
    
    let isMusicPlaying = false;
    
    musicButton.addEventListener('click', () => {
        if (isMusicPlaying) {
            audio.pause();
            musicButton.classList.remove('active');
        } else {
            audio.play().catch(error => {
                console.log('Music autoplay prevented due to browser policy');
            });
            musicButton.classList.add('active');
        }
        
        isMusicPlaying = !isMusicPlaying;
    });
}

// Mobile responsive enhancements

// Function to detect mobile devices
function isMobileDevice() {
    return (window.innerWidth <= 768) || 
           (navigator.maxTouchPoints > 0) || 
           (navigator.msMaxTouchPoints > 0);
}

// Function to optimize for mobile devices
function optimizeForMobile() {
    const isMobile = isMobileDevice();
    
    // Adjust content for mobile
    if (isMobile) {
        // Reduce number of floating hearts on mobile for performance
        createFloatingHearts(10); // Fewer hearts
        
        // Adjust photo book layout
        adjustPhotoBookLayout();
        
        // Ensure proper touch event handling
        enableTouchFriendlyInteractions();
    } else {
        // Desktop version
        createFloatingHearts(20); // Original number of hearts
    }
}

// Modified floating hearts creation for better mobile performance
function createFloatingHearts(count = 20) {
    // Clear existing hearts
    floatingHearts.innerHTML = '';
    
    // Create new hearts - reduced number for mobile
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.className = 'float-heart';
        
        // Random properties
        const size = Math.random() * 1.5 + 0.5;
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        const rotate = Math.random() * 360;
        
        // Apply random styles
        heart.style.setProperty('--left', `${left}%`);
        heart.style.setProperty('--size', size);
        heart.style.setProperty('--duration', `${duration}s`);
        heart.style.animation = `floatUp ${duration}s linear ${delay}s infinite`;
        heart.style.setProperty('--rotate', `${rotate}deg`);
        
        floatingHearts.appendChild(heart);
    }
}

// Function to adjust photo book layout based on orientation
function adjustPhotoBookLayout() {
    const isLandscape = window.innerWidth > window.innerHeight;
    const photoSide = document.querySelector('.photo-side');
    const textSide = document.querySelector('.text-side');
    const pageContent = document.querySelector('.page-content');
    
    if (isLandscape) {
        // Landscape orientation - side by side layout
        pageContent.style.flexDirection = 'row';
        photoSide.style.width = '50%';
        photoSide.style.height = '100%';
        textSide.style.width = '50%';
        textSide.style.height = '100%';
        textSide.style.borderRadius = '0 10px 10px 0';
    } else {
        // Portrait orientation - stacked layout
        pageContent.style.flexDirection = 'column';
        photoSide.style.width = '100%';
        photoSide.style.height = '60%';
        textSide.style.width = '100%';
        textSide.style.height = '40%';
        textSide.style.borderRadius = '0 0 10px 10px';
    }
}

// Function to make interactions more touch-friendly
function enableTouchFriendlyInteractions() {
    // Add passive touch listeners for better scroll performance
    const touchElements = [
        giftBox, bookCover, currentPage, finalEnvelope, restartButton
    ];
    
    touchElements.forEach(element => {
        if (element) {
            // Remove existing listeners and add touch-optimized ones
            const clone = element.cloneNode(true);
            if (element.parentNode) {
                element.parentNode.replaceChild(clone, element);
            }
            
            // Re-assign elements if needed
            if (element === giftBox) giftBox = clone;
            if (element === bookCover) bookCover = clone;
            if (element === currentPage) currentPage = clone;
            if (element === finalEnvelope) finalEnvelope = clone;
            if (element === restartButton) restartButton = clone;
            
            // Add passive event listeners
            if (element === giftBox) clone.addEventListener('click', openGiftBox, { passive: true });
            if (element === bookCover) clone.addEventListener('click', openBookCover, { passive: true });
            if (element === currentPage) clone.addEventListener('click', flipToNextPage, { passive: true });
            if (element === finalEnvelope) clone.addEventListener('click', openEnvelope, { passive: true });
            if (element === restartButton) clone.addEventListener('click', restartExperience, { passive: true });
        }
    });
    
    // Make tap hints more visible on mobile
    const hints = document.querySelectorAll('.page-click-hint, .cover-instruction, .gift-instructions');
    hints.forEach(hint => {
        hint.style.opacity = '1';
        hint.style.fontSize = hint.classList.contains('gift-instructions') ? '14px' : '12px';
    });
}

// Fix for common mobile issues with the letter display
function fixMobileLetterDisplay() {
    if (isMobileDevice()) {
        // Ensure letter is scrollable on mobile
        if (finalLetter) {
            finalLetter.style.overflowY = 'auto';
            finalLetter.style.webkitOverflowScrolling = 'touch'; // for iOS smooth scrolling
        }
        
        // Fix for envelope opening on mobile
        if (finalEnvelope) {
            // Use timeout to ensure the styles apply after other calculations
            setTimeout(() => {
                finalEnvelope.style.transform = 'none';
                const envFlap = finalEnvelope.querySelector('.env-flap');
                if (envFlap) {
                    envFlap.style.transformOrigin = 'top center';
                }
            }, 100);
        }
    }
}

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Initialize mobile optimizations
    optimizeForMobile();
    fixMobileLetterDisplay();
    
    // Add orientation change event listener
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            adjustPhotoBookLayout();
            fixMobileLetterDisplay();
        }, 300); // Delay to ensure the orientation change is complete
    });
    
    // Also handle resize events
    window.addEventListener('resize', () => {
        adjustPhotoBookLayout();
    });
    
    // Existing event listeners (with passive option for touch devices)
    giftBox.addEventListener('click', openGiftBox, { passive: true });
    bookCover.addEventListener('click', openBookCover, { passive: true });
    currentPage.addEventListener('click', flipToNextPage, { passive: true });
    finalEnvelope.addEventListener('click', openEnvelope, { passive: true });
    restartButton.addEventListener('click', restartExperience, { passive: true });
    
    // Fix for iOS Safari 100vh issue
    const appHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', appHeight);
    appHeight();
});

// Fix for the envelope animation issue (enhanced for mobile)
function openEnvelope() {
    finalEnvelope.classList.add('open');
    
    // Mobile-specific adjustments
    if (isMobileDevice()) {
        // Enhanced timing for mobile devices
        setTimeout(() => {
            // Ensure envelope flap is properly positioned on mobile
            const envFlap = finalEnvelope.querySelector('.env-flap');
            if (envFlap) {
                envFlap.style.transform = 'rotateX(-180deg)';
                envFlap.style.zIndex = '2';
            }
            
            // Show letter with appropriate positioning
            finalLetter.classList.add('active');
            finalLetter.style.zIndex = "4";
            
            // Ensure letter is scrollable on mobile
            finalLetter.style.overflowY = 'auto';
            finalLetter.style.webkitOverflowScrolling = 'touch';
            
            // Adjust letter position for better mobile viewing
            finalLetter.style.top = '10%';
            finalLetter.style.height = '80%';
        }, 1000);
    } else {
        // Desktop version - original animation
        setTimeout(() => {
            finalLetter.classList.add('active');
            finalLetter.style.zIndex = "4";
        }, 1000);
    }
}

// Uncomment to add background music functionality
// addBackgroundMusic();