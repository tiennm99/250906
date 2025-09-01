document.addEventListener('DOMContentLoaded', function() {
    // Main UI elements
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const mainCard = document.getElementById('main-card');
    const successCard = document.getElementById('success-card');
    const heartsContainer = document.getElementById('hearts-container');
    const celebration = document.getElementById('celebration');
    const cherryBlossoms = document.getElementById('cherry-blossoms');
    const nervousCat = document.querySelector('.nervous-cat');
    const floatingHeartsContainer = document.getElementById('floating-hearts-container');
    const darkmodeToggle = document.getElementById('darkmode-toggle');

    // Missing variable declarations - adding these fixes the continue buttons
    let selectedLocations = [];
    let selectedFoods = [];
    let selectedDrinks = [];

    // In-memory state variables
    const appState = {
        darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
        selectedLocations: [],
        dateOptions: [],
        selectedFoods: [],
        selectedDrinks: [],
        userNote: '',
        mapCoordinates: null, // Store selected map coordinates
        detailQueue: [],
        currentDetailIndex: 0
    };

    // Arrow pointers
    const yesArrow = document.getElementById('yes-arrow');
    const successArrow = document.getElementById('success-arrow');

    // Location selection elements
    const chooseLocationBtn = document.getElementById('choose-location-btn');
    const locationCard = document.getElementById('location-card');
    const locationButtons = document.querySelectorAll('.location-btn');
    const selectedLocationMessage = document.getElementById('selected-location-message');
    const locationCelebration = document.getElementById('location-celebration');
    const confirmLocationBtn = document.getElementById('confirm-location-btn');

    // Date & time selection elements
    const datetimeCard = document.getElementById('datetime-card');
    const confirmDatetimeBtn = document.getElementById('confirm-datetime');
    const addDatetimeBtn = document.getElementById('add-datetime');
    const datetimeRowTemplate = document.getElementById('datetime-row-template');
    const datetimeContainer = document.querySelector('.datetime-container');
    const selectedDatetimeMessage = document.getElementById('selected-datetime-message');

    // Food selection elements
    const foodNextBtn = document.getElementById('food-next-btn');
    const foodCard = document.getElementById('food-card');
    const foodButtons = document.querySelectorAll('.food-btn');
    const selectedFoodMessage = document.getElementById('selected-food-message');
    const foodCelebration = document.getElementById('food-celebration');
    const confirmFoodBtn = document.getElementById('confirm-food-btn');
    const customFoodContainer = document.getElementById('custom-food-container');
    const customFoodInput = document.getElementById('custom-food-input');
    const addCustomFoodBtn = document.getElementById('add-custom-food');
    const finalMessage = document.getElementById('final-message');
    const finalMessageElement = document.getElementById('final-message');
    const drinksNextBtn = document.getElementById('drinks-next-btn');

    // Drinks selection elements
    const drinksCard = document.getElementById('drinks-card');
    const drinkButtons = document.querySelectorAll('.drink-btn');
    const selectedDrinkMessage = document.getElementById('selected-drink-message');
    const drinksCelebration = document.getElementById('drinks-celebration');
    const confirmDrinkBtn = document.getElementById('confirm-drink-btn');
    const finalDrinkMessage = document.getElementById('final-drink-message');

    // Completion page elements
    const completionCard = document.getElementById('completion-card');
    const completionNextBtn = document.getElementById('completion-next-btn');
    const completionHearts = document.getElementById('completion-hearts');


    // Note card elements
    const noteCard = document.getElementById('note-card');
    const noteTextarea = document.getElementById('note-textarea');
    const noteWordCounter = noteCard ? noteCard.querySelector('.word-counter') : null;
    const saveNoteBtn = document.getElementById('save-note-btn');

    // Map elements
    const mapContainer = document.getElementById('map-container');
    const areaButtons = document.getElementById('area-buttons');
    const mapSelectedInfo = document.getElementById('map-selected-info');
    const selectedCoordsSpan = document.getElementById('selected-coords');
    let locationMap = null;
    let mapMarker = null;
    let selectedCoordinates = null;

    // Dark mode toggle
    if (darkmodeToggle) {
        // Initialize based on system preference
        if (appState.darkMode) {
            document.body.classList.add('dark-mode');
            darkmodeToggle.checked = true;
        }

        darkmodeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode', this.checked);
            appState.darkMode = this.checked;
        });

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            const systemPrefersDark = e.matches;
            document.body.classList.toggle('dark-mode', systemPrefersDark);
            darkmodeToggle.checked = systemPrefersDark;
            appState.darkMode = systemPrefersDark;
        });
    } else {
        console.warn('Dark mode toggle element not found');
    }

    // Create cherry blossoms
    function createCherryBlossoms() {
        const totalBlossoms = 50;
        for (let i = 0; i < totalBlossoms; i++) {
            setTimeout(() => {
                const blossom = document.createElement('div');
                blossom.classList.add('blossom');
                const size = Math.floor(Math.random() * 15) + 15;
                blossom.style.width = `${size}px`;
                blossom.style.height = `${size}px`;
                const startPos = Math.random() * 100;
                blossom.style.left = `${startPos}vw`;
                const randomX = Math.random() * 10 - 5;
                const randomR = Math.random() * 2 - 1;
                blossom.style.setProperty('--random-x', randomX);
                blossom.style.setProperty('--random-r', randomR);
                const duration = Math.random() * 4 + 8;
                blossom.style.animation = `fall ${duration}s linear forwards`;
                cherryBlossoms.appendChild(blossom);
                setTimeout(() => {
                    blossom.remove();
                }, duration * 1000);
            }, i * 200);
        }
    }

    createCherryBlossoms();
    setInterval(createCherryBlossoms, 7000);

    // Create random hearts
    function createRandomHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = Math.random() * 2 + 5 + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.transform = `scale(${Math.random() * 0.6 + 0.4})`;
        heartsContainer.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 7000);
    }

    setInterval(createRandomHeart, 500);

    // Handle NO button clicks
    let noBtnClickCount = 0;
    const noBtnResponses = [
        "Aww, 🌙! 🥺", "🌙, you shine so bright! ✨", "Oh my moon 🌙, why so distant? 😊", "🌙, you're my moonlight! 🌟",
        "Don't make me feel blue, 🌙! 😳", "If the moon isn't full, is 🌙's heart full? 💖", "🌙, don't leave me mooning over you! 🥰",
        "I just want to admire my moon 🌙! 😘", "🌙 glows like moonbeams! 💫", "My heart skips beats for 🌙! 💓",
        "🌙, you're over the moon beautiful! 🌺", "Waiting for 🌙 like waiting for a full moon! 💕", "Just one tiny yes, 🌙! 🌷",
        "Crossing my fingers for you, moonbeam! 🤞", "🌙 makes me smile like a crescent moon! 😌", "I want to make 🌙 happy! 🌈",
        "Sweet dreams are made of 🌙! 💭", "🌙, you're absolutely moon-derful! 🥰"
    ];

    noBtn.addEventListener('mouseover', function() {
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;
        let randomX, randomY;
        const cardRect = document.querySelector('.card').getBoundingClientRect();
        do {
            randomX = Math.floor(Math.random() * maxX);
            randomY = Math.floor(Math.random() * maxY);
        } while (
            randomX > cardRect.left - noBtn.offsetWidth &&
            randomX < cardRect.right &&
            randomY > cardRect.top - noBtn.offsetHeight &&
            randomY < cardRect.bottom
        );
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        if (noBtnClickCount < noBtnResponses.length) {
            noBtn.innerHTML = `<b>${noBtnResponses[noBtnClickCount]}</b>`;
            noBtnClickCount++;
        } else {
            const randomIndex = Math.floor(Math.random() * noBtnResponses.length);
            noBtn.innerHTML = `<b>${noBtnResponses[randomIndex]}</b>`;
        }
        if (nervousCat) {
            nervousCat.style.animation = 'nervousShake 0.1s infinite';
        }
    });

    yesBtn.addEventListener('click', function() {
        if (yesArrow) {
            yesArrow.style.opacity = '0';
            yesArrow.style.transform = 'translateY(-50px)';
            yesArrow.style.transition = 'all 0.5s ease-out';
        }

        const bgMusic = document.getElementById('bg-music');
        bgMusic.volume = 0.7;
        bgMusic.play().catch(error => {
            console.log('Auto-play was prevented. Please interact with the document first.', error);
        });

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.left = '50%';
                heart.style.top = '50%';
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 100 + 50;
                const duration = Math.random() * 1 + 1;
                heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
                heart.style.opacity = Math.random() * 0.5 + 0.5;
                heart.animate([
                    { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 1 },
                    { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`, opacity: 0 }
                ], {
                    duration: duration * 1000,
                    easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
                });
                heartsContainer.appendChild(heart);
                setTimeout(() => {
                    heart.remove();
                }, duration * 1000);
            }, i * 50);
        }
        mainCard.style.transform = 'scale(1.05)';
        setTimeout(() => {
            mainCard.style.transform = 'scale(0.8)';
            mainCard.style.opacity = '0';
            setTimeout(() => {
                mainCard.style.display = 'none';
                successCard.style.display = 'block';
                setTimeout(() => {
                    successCard.classList.remove('hidden');
                    successCard.style.opacity = '1';
                    successCard.style.transform = 'scale(1)';
                    if (successArrow) {
                        successArrow.classList.remove('hidden');
                        successArrow.style.opacity = '1';
                    }
                    // Create celebration hearts
                    for (let i = 0; i < 15; i++) {
                        setTimeout(() => {
                            createHeart(document.getElementById('celebration'));
                        }, i * 100);
                    }
                }, 50);
            }, 500);
        }, 300);
        if (nervousCat) {
            nervousCat.style.opacity = '0';
            nervousCat.style.transition = 'opacity 0.5s ease-out';
        }
    });

    if (chooseLocationBtn) {
        chooseLocationBtn.addEventListener('click', function() {
            successCard.style.transform = 'scale(0.8)';
            successCard.style.opacity = '0';
            setTimeout(() => {
                successCard.style.display = 'none';
                locationCard.style.display = 'block';
                setTimeout(() => {
                    locationCard.classList.remove('hidden');
                    locationCard.style.opacity = '1';
                    locationCard.style.transform = 'scale(1)';
                    for (let i = 0; i < 15; i++) {
                        setTimeout(() => {
                            const heart = document.createElement('div');
                            heart.classList.add('heart');
                            heart.style.left = Math.random() * 100 + '%';
                            heart.style.top = Math.random() * 100 + '%';
                            heart.style.animationDuration = Math.random() * 2 + 2 + 's';
                            heart.style.opacity = Math.random() * 0.7 + 0.3;
                            heart.style.transform = `scale(${Math.random() * 0.8 + 0.5})`;
                            locationCelebration.appendChild(heart);
                            setTimeout(() => {
                                heart.remove();
                            }, 4000);
                        }, i * 100);
                    }
                }, 50);
            }, 500);
        });
    }

    locationButtons.forEach(button => {
        button.classList.remove('selected');
        button.addEventListener('click', function() {
            this.classList.toggle('selected');
            if (this.classList.contains('selected')) {
                selectedLocations.push(this.dataset.location);
                createHeartBurst(this, 15);
            } else {
                selectedLocations = selectedLocations.filter(location => location !== this.dataset.location);
            }
            if (selectedLocations.length > 0) {
                selectedLocationMessage.classList.remove('hidden');
                selectedLocationMessage.classList.add('show');
                confirmLocationBtn.style.display = 'inline-block';
                createButtonHeartEffect(confirmLocationBtn);
            } else {
                selectedLocationMessage.classList.remove('show');
                selectedLocationMessage.classList.add('hidden');
                confirmLocationBtn.style.display = 'none';
            }
        });
    });

    function createHeartBurst(element, count) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.position = 'fixed';
                heart.style.left = centerX + 'px';
                heart.style.top = centerY + 'px';
                heart.style.zIndex = '1000';
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 40 + 15;
                const duration = Math.random() * 0.4 + 0.4;
                heart.style.transform = 'translate(-50%, -50%) scale(0.5)';
                heart.style.opacity = '0.8';
                heart.animate([
                    { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0.8 },
                    { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`, opacity: 0 }
                ], {
                    duration: duration * 1000,
                    easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
                });
                document.body.appendChild(heart);
                setTimeout(() => {
                    heart.remove();
                }, duration * 1000);
            }, i * 1000);
        }
    }

    function createButtonHeartEffect(button) {
        if (button.style.display !== 'none') {
            const rect = button.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const buttonWidth = rect.width;
            const buttonHeight = rect.height;
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('heart', 'button-heart');
                    const angle = (i / 8) * Math.PI * 2;
                    const offsetX = Math.cos(angle) * (buttonWidth / 1.5);
                    const offsetY = Math.sin(angle) * (buttonHeight / 1.2);
                    heart.style.position = 'fixed';
                    heart.style.left = (centerX + offsetX) + 'px';
                    heart.style.top = (centerY + offsetY) + 'px';
                    heart.style.zIndex = '999';
                    heart.style.transform = 'translate(-50%, -50%) scale(0)';
                    heart.style.opacity = '0';
                    document.body.appendChild(heart);
                    heart.animate([
                        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 },
                        { transform: 'translate(-50%, -50%) scale(0.7)', opacity: 0.9, offset: 0.4 },
                        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 0.7, offset: 0.8 },
                        { transform: 'translate(-50%, -50%) scale(0)', opacity: 0 }
                    ], {
                        duration: 1200,
                        easing: 'ease-in-out'
                    });
                    setTimeout(() => {
                        heart.remove();
                    }, 1200);
                }, i * 100);
            }
        }
    }

    // Tile buttons event listeners
    const allTileButtons = document.querySelectorAll('.tile-btn');
    if (allTileButtons && allTileButtons.length > 0) {
        allTileButtons.forEach(button => {
            button.addEventListener('click', function() {
                let type, value;
                if (this.hasAttribute('data-location')) {
                    type = 'location';
                    value = this.getAttribute('data-location');
                } else if (this.hasAttribute('data-food')) {
                    type = 'food';
                    value = this.getAttribute('data-food');
                } else if (this.hasAttribute('data-drink')) {
                    type = 'drink';
                    value = this.getAttribute('data-drink');
                } else if (this.hasAttribute('data-movie')) {
                    type = 'movie';
                    value = this.getAttribute('data-movie');
                } else if (this.hasAttribute('data-activity')) {
                    type = 'activity';
                    value = this.getAttribute('data-activity');
                } else if (this.hasAttribute('data-mall')) {
                    type = 'mall';
                    value = this.getAttribute('data-mall');
                } else if (this.hasAttribute('data-area')) {
                    type = 'area';
                    value = this.getAttribute('data-area');
                }

                // Only toggle for multi-choice selections (location only now)
                if (type === 'location') {
                    this.classList.toggle('selected');
                }
                // Single choice types (movie, activity, mall, food, drink) are handled in their specific sections

                // Update the appropriate selection array
                if (type === 'location') {
                    if (this.classList.contains('selected')) {
                        selectedLocations.push(value);
                        createHeartBurst(this, 15);
                    } else {
                        selectedLocations = selectedLocations.filter(item => item !== value);
                    }

                    // Update UI based on selection
                    if (selectedLocations.length > 0) {
                        selectedLocationMessage.classList.remove('hidden');
                        selectedLocationMessage.classList.add('show');
                        confirmLocationBtn.style.display = 'inline-block';
                        updateContinueButtonText('confirm-location-btn', 'location');
                        createButtonHeartEffect(confirmLocationBtn);
                    } else {
                        selectedLocationMessage.classList.remove('show');
                        selectedLocationMessage.classList.add('hidden');
                        confirmLocationBtn.style.display = 'none';
                    }
                } else if (type === 'food') {
                    // Single choice - remove previous selection and select this one
                    document.querySelectorAll('[data-food]').forEach(btn => btn.classList.remove('selected'));
                    // Also clear custom food selections
                    document.querySelectorAll('.custom-btn[data-food="custom"]').forEach(btn => btn.classList.remove('selected'));
                    this.classList.add('selected');
                    
                    // Clear previous selections and add current one
                    selectedFoods = [value];
                    createHeartBurst(this, 15);
                    
                    selectedFoodMessage.classList.remove('hidden');
                    selectedFoodMessage.classList.add('show');
                    confirmFoodBtn.style.display = 'inline-block';
                    updateContinueButtonText('confirm-food-btn', 'food');
                    updateFoodSelectionStatus();
                } else if (type === 'drink') {
                    // Single choice - remove previous selection and select this one
                    document.querySelectorAll('[data-drink]').forEach(btn => btn.classList.remove('selected'));
                    // Also clear custom drink selections
                    document.querySelectorAll('.custom-btn[data-drink="custom"]').forEach(btn => btn.classList.remove('selected'));
                    this.classList.add('selected');
                    
                    // Clear previous selections and add current one
                    selectedDrinks = [value];
                    createHeartBurst(this, 15);
                    
                    confirmDrinkBtn.style.display = 'inline-block';
                    selectedDrinkMessage.classList.remove('hidden');
                    selectedDrinkMessage.classList.add('show');
                    updateContinueButtonText('confirm-drink-btn', 'drinks');
                    updateDrinkSelectionStatus();
                } else if (type === 'movie') {
                    // Single choice - remove previous selection and select this one
                    document.querySelectorAll('[data-movie]').forEach(btn => btn.classList.remove('selected'));
                    this.classList.add('selected');
                    
                    createHeartBurst(this, 15);
                    const movieMessage = document.getElementById('selected-movie-message');
                    const confirmMovieBtn = document.getElementById('confirm-movie-btn');
                    if (movieMessage && confirmMovieBtn) {
                        movieMessage.classList.remove('hidden');
                        movieMessage.classList.add('show');
                        confirmMovieBtn.style.display = 'inline-block';
                        updateContinueButtonText('confirm-movie-btn', 'cinema');
                    }
                } else if (type === 'activity') {
                    // Single choice - remove previous selection and select this one
                    document.querySelectorAll('[data-activity]').forEach(btn => btn.classList.remove('selected'));
                    this.classList.add('selected');
                    
                    createHeartBurst(this, 15);
                    const activityMessage = document.getElementById('selected-activity-message');
                    const confirmActivityBtn = document.getElementById('confirm-activity-btn');
                    if (activityMessage && confirmActivityBtn) {
                        activityMessage.classList.remove('hidden');
                        activityMessage.classList.add('show');
                        confirmActivityBtn.style.display = 'inline-block';
                        updateContinueButtonText('confirm-activity-btn', 'cinema');
                    }
                } else if (type === 'mall') {
                    // Single choice - remove previous selection and select this one
                    document.querySelectorAll('[data-mall]').forEach(btn => btn.classList.remove('selected'));
                    this.classList.add('selected');
                    
                    createHeartBurst(this, 15);
                    const mallMessage = document.getElementById('selected-mall-message');
                    const confirmMallBtn = document.getElementById('confirm-mall-btn');
                    if (mallMessage && confirmMallBtn) {
                        mallMessage.classList.remove('hidden');
                        mallMessage.classList.add('show');
                        confirmMallBtn.style.display = 'inline-block';
                        updateContinueButtonText('confirm-mall-btn', 'mall');
                    }
                }
            });
        });
    }

    // Custom buttons event listeners
    const customButtons = document.querySelectorAll('.custom-btn');
    if (customButtons && customButtons.length > 0) {
        customButtons.forEach(button => {
            button.addEventListener('click', function() {
                const buttonType = this.hasAttribute('data-location') ? 'location' :
                                  this.hasAttribute('data-food') ? 'food' : 'drink';

                this.classList.toggle('selected');
                let inputContainer = document.getElementById(`${buttonType}-custom-input`);
                if (!inputContainer) {
                    const parentCard = this.closest('.card');
                    inputContainer = document.createElement('div');
                    inputContainer.id = `${buttonType}-custom-input`;
                    inputContainer.className = 'custom-input-container';
                    inputContainer.innerHTML = `
                        <input type="text" class="custom-text-input" placeholder="Enter your custom ${buttonType} (max 10 words)" maxlength="70">
                        <div class="word-counter">0/10 words</div>
                    `;

                    const confirmBtn = parentCard.querySelector(`#confirm-${buttonType}-btn`);
                    if (confirmBtn) {
                        confirmBtn.parentNode.insertBefore(inputContainer, confirmBtn);
                    } else {
                        const message = parentCard.querySelector(`.selected-location-message`);
                        if (message) {
                            message.parentNode.insertBefore(inputContainer, message);
                        }
                    }

                    const input = inputContainer.querySelector('input');
                    const counter = inputContainer.querySelector('.word-counter');

                    input.addEventListener('input', function() {
                        const words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
                        const wordCount = words.length;
                        counter.textContent = `${wordCount}/10 words`;

                        if (wordCount > 10) {
                            this.value = words.slice(0, 10).join(' ');
                            counter.textContent = "10/10 words";
                        }

                        if (buttonType === 'location') {
                            selectedLocations = selectedLocations.filter(loc => loc !== 'custom');
                            if (this.value.trim()) {
                                selectedLocations.push('custom: ' + this.value.trim());
                            }
                        } else if (buttonType === 'food') {
                            selectedFoods = selectedFoods.filter(food => !food.startsWith('custom:'));
                            if (this.value.trim()) {
                                selectedFoods.push('custom: ' + this.value.trim());
                            }
                        } else if (buttonType === 'drink') {
                            selectedDrinks = selectedDrinks.filter(drink => !drink.startsWith('custom:'));
                            if (this.value.trim()) {
                                selectedDrinks.push('custom: ' + this.value.trim());
                            }
                        }
                    });
                }

                if (this.classList.contains('selected')) {
                    inputContainer.style.display = 'block';
                    inputContainer.style.opacity = '0';
                    setTimeout(() => {
                        inputContainer.style.opacity = '1';
                        inputContainer.style.transform = 'translateY(0)';
                    }, 10);

                    if (buttonType === 'location') {
                        selectedLocationMessage.classList.remove('hidden');
                        selectedLocationMessage.classList.add('show');
                        confirmLocationBtn.style.display = 'inline-block';
                        updateContinueButtonText('confirm-location-btn', 'location');
                    } else if (buttonType === 'food') {
                        // Single choice - clear other food selections when custom is selected
                        document.querySelectorAll('[data-food]').forEach(btn => btn.classList.remove('selected'));
                        selectedFoods = [];
                        
                        selectedFoodMessage.classList.remove('hidden');
                        selectedFoodMessage.classList.add('show');
                        confirmFoodBtn.style.display = 'inline-block';
                        updateContinueButtonText('confirm-food-btn', 'food');
                        updateFoodSelectionStatus();
                    } else if (buttonType === 'drink') {
                        // Single choice - clear other drink selections when custom is selected
                        document.querySelectorAll('[data-drink]').forEach(btn => btn.classList.remove('selected'));
                        selectedDrinks = [];
                        
                        selectedDrinkMessage.classList.remove('hidden');
                        selectedDrinkMessage.classList.add('show');
                        confirmDrinkBtn.style.display = 'inline-block';
                        updateContinueButtonText('confirm-drink-btn', 'drinks');
                        updateDrinkSelectionStatus();
                    }
                } else {
                    inputContainer.style.opacity = '0';
                    inputContainer.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        inputContainer.style.display = 'none';
                    }, 300);

                    if (buttonType === 'location') {
                        selectedLocations = selectedLocations.filter(loc => !loc.startsWith('custom:'));
                        if (selectedLocations.length === 0) {
                            selectedLocationMessage.classList.remove('show');
                            selectedLocationMessage.classList.add('hidden');
                            confirmLocationBtn.style.display = 'none';
                        }
                    } else if (buttonType === 'food') {
                        selectedFoods = selectedFoods.filter(food => !food.startsWith('custom:'));
                        updateFoodSelectionStatus();
                        if (selectedFoods.length === 0) {
                            selectedFoodMessage.classList.remove('show');
                            selectedFoodMessage.classList.add('hidden');
                            confirmFoodBtn.style.display = 'none';
                        }
                    } else if (buttonType === 'drink') {
                        selectedDrinks = selectedDrinks.filter(drink => !drink.startsWith('custom:'));
                        updateDrinkSelectionStatus();
                        if (selectedDrinks.length === 0) {
                            selectedDrinkMessage.classList.remove('show');
                            selectedDrinkMessage.classList.add('hidden');
                            confirmDrinkBtn.style.display = 'none';
                        }
                    }
                }
            });
        });
    }

    confirmLocationBtn.addEventListener('click', function() {
        if (selectedLocations.length > 0) {
            appState.selectedLocations = [...selectedLocations];
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('heart');
                    heart.style.left = '50%';
                    heart.style.top = '50%';
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 100 + 50;
                    const duration = Math.random() * 0.7 + 0.7;
                    heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
                    heart.style.opacity = Math.random() * 0.5 + 0.5;
                    heart.animate([
                        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 1 },
                        { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`, opacity: 0 }
                    ], {
                        duration: duration * 1000,
                        easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
                    });
                    locationCelebration.appendChild(heart);
                    setTimeout(() => {
                        heart.remove();
                    }, duration * 1000);
                }, i * 30);
            }
            setTimeout(() => {
                locationCard.style.transform = 'scale(0.8)';
                locationCard.style.opacity = '0';
                setTimeout(() => {
                    locationCard.style.display = 'none';
                    showNextCardBasedOnLocation();
                }, 500);
            }, 1200);
        }
    });

    function createHeart(container) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.animationDuration = Math.random() * 2 + 2 + 's';
        heart.style.opacity = Math.random() * 0.7 + 0.3;
        heart.style.transform = `scale(${Math.random() * 0.8 + 0.5})`;
        container.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }

    // Function to determine next card based on selected locations
    function showNextCardBasedOnLocation() {
        // Always go to time selection first, regardless of location
        initializeDatetimeRow(datetimeRowTemplate);
        showCard('datetime-card', 'datetime-celebration');
    }

    // Function to show plan/details after time selection
    function showPlanDetailsBasedOnLocation() {
        // Build queue based on the correct order: cafe → restaurant → cinema → park → mall → around city
        const detailQueue = [];

        // Add pages in the correct priority order from the original page
        if (selectedLocations.includes('cafe')) {
            detailQueue.push('drinks-card'); // Cafe shows drinks selection
        }
        if (selectedLocations.includes('restaurant')) {
            detailQueue.push('food-card'); // Restaurant shows food selection
        }
        if (selectedLocations.includes('cinema')) {
            detailQueue.push('cinema-card');
        }
        if (selectedLocations.includes('park')) {
            detailQueue.push('park-card');
        }
        if (selectedLocations.includes('mall')) {
            detailQueue.push('mall-card');
        }
        if (selectedLocations.includes('around-city')) {
            detailQueue.push('area-card');
        }
        if (selectedLocations.includes('somewhere-else') || selectedLocations.some(loc => loc.startsWith('custom:'))) {
            detailQueue.push('custom-plan-card');
        }

        // Store the queue for later use
        appState.detailQueue = detailQueue;
        appState.currentDetailIndex = 0;

        if (detailQueue.length > 0) {
            // Show first detail page
            const firstDetailCard = detailQueue[0];
            const celebrationId = firstDetailCard.replace('-card', '-celebration');
            hideCardAndShowNext('datetime-card', firstDetailCard, celebrationId);
        } else {
            // No detail pages, go to note
            hideCardAndShowNext('datetime-card', 'note-card', 'note-celebration');
        }
    }

    // Function to show next detail page or move to note
    function showNextDetailOrContinue(currentCard) {
        if (appState.detailQueue && appState.currentDetailIndex < appState.detailQueue.length - 1) {
            // Show next detail page
            appState.currentDetailIndex++;
            const nextDetailCard = appState.detailQueue[appState.currentDetailIndex];
            const celebrationId = nextDetailCard.replace('-card', '-celebration');
            hideCardAndShowNext(currentCard, nextDetailCard, celebrationId);
        } else {
            // No more detail pages, go to note
            hideCardAndShowNext(currentCard, 'note-card', 'note-celebration');
        }
    }

    // Function to show food/drinks after plan/details
    function showFoodDrinksBasedOnLocation(currentCard = 'datetime-card') {
        const hasRestaurant = selectedLocations.includes('restaurant');
        const hasCafe = selectedLocations.includes('cafe');

        if (hasRestaurant) {
            hideCardAndShowNext(currentCard, 'food-card', 'food-celebration');
        } else if (hasCafe) {
            hideCardAndShowNext(currentCard, 'drinks-card', 'drinks-celebration');
        } else {
            // For other locations, skip to note
            hideCardAndShowNext(currentCard, 'note-card', 'note-celebration');
        }
    }

    // Generic function to show a card with animation
    function showCard(cardId, celebrationId) {
        const card = document.getElementById(cardId);
        const celebration = document.getElementById(celebrationId);

        card.style.display = 'block';
        setTimeout(() => {
            card.classList.remove('hidden');
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            if (celebration) {
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        createHeart(celebration);
                    }, i * 100);
                }
            }

            // Auto-initialize map when area card is shown
            if (cardId === 'area-card' && mapContainer) {
                mapContainer.classList.remove('hidden');
                setTimeout(() => {
                    initializeLocationMap();
                }, 200);
            }
            
            // Set initial button text for cards
            if (cardId === 'note-card') {
                updateContinueButtonText('save-note-btn', 'note');
            } else if (cardId === 'food-card') {
                // Set initial text for food selection
                const confirmFoodBtn = document.getElementById('confirm-food-btn');
                if (confirmFoodBtn) {
                    confirmFoodBtn.textContent = "Pick a food first ♥";
                }
            } else if (cardId === 'drinks-card') {
                // Set initial text for drinks selection
                const confirmDrinkBtn = document.getElementById('confirm-drink-btn');
                if (confirmDrinkBtn) {
                    confirmDrinkBtn.textContent = "Pick a drink first ♥";
                }
            }
        }, 50);
    }

    // Generic function to hide a card and show the next one
    function hideCardAndShowNext(currentCardId, nextCardId, nextCelebrationId) {
        const currentCard = document.getElementById(currentCardId);

        currentCard.style.transform = 'scale(0.8)';
        currentCard.style.opacity = '0';
        setTimeout(() => {
            currentCard.style.display = 'none';
            if (nextCardId === 'datetime-card') {
                initializeDatetimeRow(datetimeRowTemplate);
            }
            showCard(nextCardId, nextCelebrationId);
        }, 500);
    }

    function initializeDatetimeRow(row) {
        try {
            // Date is now fixed, no need for date picker
            const timePicker = row.querySelector('.time-picker');
            if (timePicker) {
                flatpickr(timePicker, {
                    enableTime: true, noCalendar: true, dateFormat: "h:i K",
                    minuteIncrement: 15, disableMobile: true, theme: "time-theme",
                    animate: true, position: "auto center",
                    onOpen: function() {
                        const calendar = document.querySelector('.flatpickr-calendar');
                        if (calendar) {
                            calendar.style.animation = 'none';
                            setTimeout(() => {
                                calendar.style.animation = 'calendar-pop 0.3s ease-out';
                            }, 10);
                        }
                    }
                });
            }
            // Remove button functionality removed - single time input only
            // const removeBtn = row.querySelector('.remove-datetime');
            // if (removeBtn) {
            //     removeBtn.addEventListener('click', function() {
            //         if (datetimeContainer.children.length > 1) {
            //             row.style.opacity = '0';
            //             row.style.height = '0';
            //             row.style.marginBottom = '0';
            //             row.style.overflow = 'hidden';
            //             setTimeout(() => {
            //                 row.remove();
            //             }, 300);
            //         }
            //     });
            // }
        } catch (error) {
            console.error("Error initializing datetime row:", error);
        }
    }

    // addDatetimeBtn removed - no longer needed
    // addDatetimeBtn.addEventListener('click', function() {
    //     const newRow = datetimeRowTemplate.cloneNode(true);
    //     newRow.id = '';
    //     datetimeContainer.appendChild(newRow);
    //     initializeDatetimeRow(newRow);
    //     newRow.style.opacity = '0';
    //     setTimeout(() => {
    //         newRow.style.opacity = '1';
    //     }, 10);
    // });

    confirmDatetimeBtn.addEventListener('click', function() {
        let isValid = true;
        const dateOptions = [];
        const fixedDate = "06/09/2025"; // Fixed date
        datetimeContainer.querySelectorAll('.datetime-row').forEach(row => {
            const time = row.querySelector('.time-picker').value;
            if (!time) {
                isValid = false;
                row.querySelector('.time-picker').style.borderColor = '#ff3366';
                setTimeout(() => {
                    row.querySelector('.time-picker').style.borderColor = '';
                }, 1000);
            } else {
                dateOptions.push({ date: fixedDate, time });
            }
        });
        if (isValid && dateOptions.length > 0) {
            appState.dateOptions = [...dateOptions];
            confirmDatetimeBtn.style.display = 'none';
            selectedDatetimeMessage.classList.remove('hidden');
            selectedDatetimeMessage.classList.add('show');
            if (foodNextBtn) {
                foodNextBtn.style.display = 'inline-block';
                updateContinueButtonText('food-next-btn', 'datetime');
            }
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('heart');
                    heart.style.left = '50%';
                    heart.style.top = '50%';
                    const angle = Math.random() * Math.PI * 2;
                    const distance = Math.random() * 150 + 50;
                    const duration = Math.random() * 1 + 1;
                    heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
                    heart.style.opacity = Math.random() * 0.5 + 0.5;
                    heart.animate([
                        { transform: 'translate(-50%, -50%) scale(0.5)', opacity: 1 },
                        { transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px)) scale(0)`, opacity: 0 }
                    ], {
                        duration: duration * 1000,
                        easing: 'cubic-bezier(0.1, 0.8, 0.9, 1)'
                    });
                    document.getElementById('datetime-celebration').appendChild(heart);
                    setTimeout(() => {
                        heart.remove();
                    }, duration * 1000);
                }, i * 40);
            }
            // addDatetimeBtn.disabled = true; // Button removed
            // Remove buttons no longer exist
            // datetimeContainer.querySelectorAll('.remove-datetime').forEach(btn => {
            //     btn.disabled = true;
            //     btn.style.opacity = 0.5;
            // });
            datetimeContainer.querySelectorAll('input').forEach(input => {
                input.disabled = true;
                input.style.opacity = 0.7;
            });
        }
    });

    // Event listeners for new confirm buttons
    const confirmMovieBtn = document.getElementById('confirm-movie-btn');
    const confirmActivityBtn = document.getElementById('confirm-activity-btn');
    const confirmMallBtn = document.getElementById('confirm-mall-btn');
    const confirmAreaBtn = document.getElementById('confirm-area-btn');
    const savePlanBtn = document.getElementById('save-plan-btn');

    if (confirmMovieBtn) {
        confirmMovieBtn.addEventListener('click', function() {
            // After movie selection, show next detail page or go to food/drinks
            showNextDetailOrContinue('cinema-card');
        });
    }

    if (confirmActivityBtn) {
        confirmActivityBtn.addEventListener('click', function() {
            // After activity selection, show next detail page or go to food/drinks
            showNextDetailOrContinue('park-card');
        });
    }

    if (confirmMallBtn) {
        confirmMallBtn.addEventListener('click', function() {
            // After mall selection, show next detail page or go to food/drinks
            showNextDetailOrContinue('mall-card');
        });
    }

    if (confirmAreaBtn) {
        confirmAreaBtn.addEventListener('click', function() {
            // After area selection, show next detail page or go to food/drinks
            showNextDetailOrContinue('area-card');
        });
    }

    if (savePlanBtn) {
        const customPlanTextarea = document.getElementById('custom-plan-textarea');
        const customPlanWordCounter = document.querySelector('#custom-plan-card .word-counter');

        if (customPlanTextarea && customPlanWordCounter) {
            customPlanTextarea.addEventListener('input', function() {
                const words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
                const wordCount = words.length;
                customPlanWordCounter.textContent = `${wordCount}/200 words`;

                if (wordCount > 200) {
                    this.value = words.slice(0, 200).join(' ');
                    customPlanWordCounter.textContent = "200/200 words";
                }

                // Show button with dynamic text when user types
                const customMessage = document.getElementById('selected-custom-message');
                if (this.value.trim().length > 0) {
                    savePlanBtn.style.display = 'inline-block';
                    updateContinueButtonText('save-plan-btn', 'custom');
                    if (customMessage) {
                        customMessage.classList.remove('hidden');
                        customMessage.classList.add('show');
                    }
                } else {
                    savePlanBtn.style.display = 'none';
                    if (customMessage) {
                        customMessage.classList.remove('show');
                        customMessage.classList.add('hidden');
                    }
                }
            });
        }

        savePlanBtn.addEventListener('click', function() {
            if (customPlanTextarea) {
                appState.customPlan = customPlanTextarea.value.trim();
            }
            // After custom plan, show next detail page or go to food/drinks
            showNextDetailOrContinue('custom-plan-card');
        });
    }

    if (foodNextBtn) {
        foodNextBtn.addEventListener('click', function() {
            // After time selection, go to plan/details based on location
            showPlanDetailsBasedOnLocation();
        });
    } else {
        console.error("Food next button not found in the DOM");
    }

    function updateFoodSelectionStatus() {
        const statusContainer = document.getElementById('food-selection-status');
        if (!statusContainer) return;
        if (selectedFoods.length === 0) {
            statusContainer.classList.remove('active');
            statusContainer.innerHTML = '<p>Select your food preferences</p>';
        } else {
            statusContainer.classList.add('active');
            statusContainer.innerHTML = `<p>${selectedFoods.length} option${selectedFoods.length > 1 ? 's' : ''} selected</p>`;
        }
    }

    function updateDrinkSelectionStatus() {
        const statusContainer = document.getElementById('drink-selection-status');
        if (!statusContainer) return;
        if (selectedDrinks.length === 0) {
            statusContainer.classList.remove('active');
            statusContainer.innerHTML = '<p>Select your drink preferences</p>';
        } else {
            statusContainer.classList.add('active');
            statusContainer.innerHTML = `<p>${selectedDrinks.length} option${selectedDrinks.length > 1 ? 's' : ''} selected</p>`;
        }
    }

    confirmFoodBtn.addEventListener('click', function() {
        if (selectedFoods.length > 0) {
            appState.selectedFoods = [...selectedFoods];
            // Advance to next detail card
            showNextDetailOrContinue('food-card');
        }
    });

    if (drinksNextBtn) {
        drinksNextBtn.addEventListener('click', function() {
            // After food selection, show next detail page or go to note
            showNextDetailOrContinue('food-card');
        });
    }

    confirmDrinkBtn.addEventListener('click', function() {
        if (selectedDrinks.length > 0) {
            appState.selectedDrinks = [...selectedDrinks];
            // Advance to next detail card
            showNextDetailOrContinue('drinks-card');
        }
    });

    // Note textarea functionality
    if (noteTextarea && noteWordCounter) {
        noteTextarea.addEventListener('input', function() {
            const words = this.value.trim().split(/\s+/).filter(word => word.length > 0);
            const wordCount = words.length;
            noteWordCounter.textContent = `${wordCount}/150 words`;

            if (wordCount > 150) {
                this.value = words.slice(0, 150).join(' ');
                noteWordCounter.textContent = "150/150 words";
            }

            // Update button text dynamically  
            updateContinueButtonText('save-note-btn', 'note');
        });
    }

    if (finalDrinkMessage) {
        const oldCompletionNextBtn = document.getElementById('completion-next-btn');

        if (oldCompletionNextBtn) {
            const noteNextBtn = document.createElement('button');
            noteNextBtn.id = 'note-next-btn';
            noteNextBtn.className = 'btn yes-btn';
            noteNextBtn.style.marginTop = '15px';
            noteNextBtn.style.display = 'inline-block';
            noteNextBtn.textContent = 'Continue ♥';

            if (oldCompletionNextBtn.parentNode) {
                oldCompletionNextBtn.parentNode.replaceChild(noteNextBtn, oldCompletionNextBtn);
            }

            noteNextBtn.addEventListener('click', function() {
                // After drinks selection, show next detail page or go to note
                showNextDetailOrContinue('drinks-card');
            });
        }
    }

    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', function() {
            const noteText = noteTextarea.value.trim();
            if (noteText) {
                appState.userNote = noteText;
            }

            showCompletionCard();
        });
    }

    // Function to get next stage button text
    function getNextStageButtonText(currentStage) {
        // Build the same queue logic as showPlanDetailsBasedOnLocation to determine flow
        const detailQueue = [];
        
        // Priority order: cafe → restaurant → cinema → park → mall → around-city → custom
        if (selectedLocations.includes('cafe')) {
            detailQueue.push('drinks-card');
        }
        if (selectedLocations.includes('restaurant')) {
            detailQueue.push('food-card');
        }
        if (selectedLocations.includes('cinema')) {
            detailQueue.push('cinema-card');
        }
        if (selectedLocations.includes('park')) {
            detailQueue.push('park-card');
        }
        if (selectedLocations.includes('mall')) {
            detailQueue.push('mall-card');
        }
        if (selectedLocations.includes('around-city')) {
            detailQueue.push('area-card');
        }
        if (selectedLocations.includes('somewhere-else') || selectedLocations.some(loc => loc.startsWith('custom:'))) {
            detailQueue.push('custom-plan-card');
        }
        
        if (currentStage === 'location') {
            return "Let's pick a date ♥";
        }
        
        if (currentStage === 'datetime') {
            if (detailQueue.length > 0) {
                const nextCard = detailQueue[0];
                if (nextCard === 'drinks-card') return "Choose some drinks ♥";
                if (nextCard === 'food-card') return "Let's pick food ♥";
                if (nextCard === 'cinema-card') return "Pick a movie ♥";
                if (nextCard === 'park-card') return "Pick activities ♥";
                if (nextCard === 'mall-card') return "Choose a mall ♥";
                if (nextCard === 'area-card') return "Mark location ♥";
                if (nextCard === 'custom-plan-card') return "Tell me your plan ♥";
            } else {
                return "Add a note ♥";
            }
        }
        
        // After detail cards, find what comes next
        if (currentStage === 'cinema' || currentStage === 'mall' || currentStage === 'area' || currentStage === 'custom') {
            // Find current card in queue and return next
            const currentCardMap = {
                'cinema': 'cinema-card',
                'mall': 'mall-card', 
                'area': 'area-card',
                'custom': 'custom-plan-card'
            };
            const currentCardId = currentCardMap[currentStage];
            const currentIndex = detailQueue.indexOf(currentCardId);
            
            if (currentIndex !== -1 && currentIndex < detailQueue.length - 1) {
                const nextCard = detailQueue[currentIndex + 1];
                if (nextCard === 'drinks-card') return "Choose some drinks ♥";
                if (nextCard === 'food-card') return "Let's pick food ♥";
                if (nextCard === 'cinema-card') return "Pick a movie ♥";
                if (nextCard === 'park-card') return "Pick activities ♥";
                if (nextCard === 'mall-card') return "Choose a mall ♥";
                if (nextCard === 'area-card') return "Mark location ♥";
                if (nextCard === 'custom-plan-card') return "Tell me your plan ♥";
            }
            return "Add a note ♥";
        }
        
        if (currentStage === 'food') {
            // After food, find what comes next in queue
            const foodIndex = detailQueue.indexOf('food-card');
            if (foodIndex !== -1 && foodIndex < detailQueue.length - 1) {
                const nextCard = detailQueue[foodIndex + 1];
                if (nextCard === 'drinks-card') return "Choose some drinks ♥";
                if (nextCard === 'cinema-card') return "Pick a movie ♥";
                if (nextCard === 'park-card') return "Pick activities ♥";
                if (nextCard === 'mall-card') return "Choose a mall ♥";
                if (nextCard === 'area-card') return "Mark location ♥";
                if (nextCard === 'custom-plan-card') return "Tell me your plan ♥";
            }
            return "Add a note ♥";
        }
        
        if (currentStage === 'drinks') {
            // After drinks, find what comes next in queue
            const drinksIndex = detailQueue.indexOf('drinks-card');
            if (drinksIndex !== -1 && drinksIndex < detailQueue.length - 1) {
                const nextCard = detailQueue[drinksIndex + 1];
                if (nextCard === 'food-card') return "Let's pick food ♥";
                if (nextCard === 'cinema-card') return "Pick a movie ♥";
                if (nextCard === 'park-card') return "Pick activities ♥";
                if (nextCard === 'mall-card') return "Choose a mall ♥";
                if (nextCard === 'area-card') return "Mark location ♥";
                if (nextCard === 'custom-plan-card') return "Tell me your plan ♥";
            }
            return "Add a note ♥";
        }
        
        if (currentStage === 'note') {
            return "Complete our date ♥";
        }
        
        // Default fallback
        return "Continue ♥";
    }

    // Function to update button text dynamically
    function updateContinueButtonText(buttonId, currentStage) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.textContent = getNextStageButtonText(currentStage);
        }
    }

    // Map initialization and functionality
    function initializeLocationMap() {
        if (locationMap) {
            locationMap.remove();
        }

        // Initialize map centered on Ho Chi Minh City, Vietnam
        locationMap = L.map('location-map').setView([10.8231, 106.6297], 12);

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(locationMap);

        // Add click event to place marker
        locationMap.on('click', function(e) {
            const lat = e.latlng.lat;
            const lng = e.latlng.lng;

            // Remove existing marker
            if (mapMarker) {
                locationMap.removeLayer(mapMarker);
            }

            // Add new marker
            mapMarker = L.marker([lat, lng]).addTo(locationMap);

            // Store coordinates
            selectedCoordinates = { lat: lat, lng: lng };
            appState.mapCoordinates = { lat: lat, lng: lng };

            // Update UI
            if (selectedCoordsSpan && mapSelectedInfo) {
                selectedCoordsSpan.textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                mapSelectedInfo.classList.remove('hidden');
            }

            // Show continue button
            const areaMessage = document.getElementById('selected-area-message');
            const confirmAreaBtn = document.getElementById('confirm-area-btn');
            if (areaMessage && confirmAreaBtn) {
                areaMessage.querySelector('.message').textContent = 'Perfect location! 📍';
                areaMessage.classList.remove('hidden');
                areaMessage.classList.add('show');
                confirmAreaBtn.style.display = 'inline-block';
                updateContinueButtonText('confirm-area-btn', 'area');
            }

            // Store map coordinates in appState
            appState.selectedLocations = appState.selectedLocations.filter(loc => !loc.startsWith('map:'));
            appState.selectedLocations.push(`map:${lat.toFixed(6)},${lng.toFixed(6)}`);

            // Create heart animation
            createFloatingHeart();
        });

        // Resize map after a brief delay to ensure proper rendering
        setTimeout(() => {
            locationMap.invalidateSize();
        }, 100);
    }

    function showCompletionCard() {
        noteCard.style.transform = 'scale(0.8)';
        noteCard.style.opacity = '0';
        setTimeout(() => {
            noteCard.style.display = 'none';
            completionCard.style.display = 'block';
            setTimeout(() => {
                completionCard.classList.add('show');
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                for (let i = 0; i < 30; i++) {
                    setTimeout(() => {
                        createHeart(document.getElementById('completion-hearts'));
                    }, i * 100);
                }

            }, 50);
        }, 500);
    }

    // Heart trail effect on mouse movement
    const heartTrailContainer = document.createElement('div');
    heartTrailContainer.className = 'heart-trail-container';
    document.body.appendChild(heartTrailContainer);
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (Math.random() > 0.7) {
            createHeartAtCursor();
        }
    });

    function createHeartAtCursor() {
        const heart = document.createElement('div');
        heart.className = 'cursor-heart';
        heart.style.left = mouseX + 'px';
        heart.style.top = mouseY + 'px';
        const size = Math.random() * 15 + 8;
        const opacity = Math.random() * 0.5 + 0.5;
        const randomX = (Math.random() * 2 - 1);
        heart.style.setProperty('--random-x', randomX);
        heart.style.width = size + 'px';
        heart.style.height = size + 'px';
        heart.style.opacity = opacity;
        heartTrailContainer.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
});
