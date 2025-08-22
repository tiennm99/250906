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
        invitationEmailSent: false
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

    // Email form elements
    const emailForm = document.getElementById('email-form');
    const userEmailInput = document.getElementById('user-email');
    const sendEmailBtn = document.getElementById('send-email-btn');
    const emailError = document.getElementById('email-error');
    const emailSuccess = document.getElementById('email-success');

    // Note card elements
    const noteCard = document.getElementById('note-card');
    const noteTextarea = document.getElementById('note-textarea');
    const noteWordCounter = noteCard ? noteCard.querySelector('.word-counter') : null;
    const saveNoteBtn = document.getElementById('save-note-btn');

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
        "Really?", "Are you sure?", "Think again!", "Last chance...", "Pretty, please?",
        "I guess you are getting the wrong button", "You're breaking my heart!", "Come on...",
        "Don't be shy!", "That's not nice!", "You mean yes?", "Try again?", "I'm still waiting...",
        "Please reconsider!", "You missed the yes button!", "Maybe you misclicked?", "One more chance?",
        "How about now?", "Changed your mind yet?", "Cutie, I know you would say yes!", "Say yes already!"
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
                    celebrateSuccess();
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
                const type = this.hasAttribute('data-location') ? 'location' : 
                             this.hasAttribute('data-food') ? 'food' : 'drink';
                const value = this.getAttribute(`data-${type}`);
                
                this.classList.toggle('selected');
                
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
                        createButtonHeartEffect(confirmLocationBtn);
                    } else {
                        selectedLocationMessage.classList.remove('show');
                        selectedLocationMessage.classList.add('hidden');
                        confirmLocationBtn.style.display = 'none';
                    }
                } else if (type === 'food') {
                    if (this.classList.contains('selected')) {
                        selectedFoods.push(value);
                        createHeartBurst(this, 15);
                    } else {
                        selectedFoods = selectedFoods.filter(item => item !== value);
                    }
                    updateFoodSelectionStatus();
                    
                    if (selectedFoods.length > 0) {
                        selectedFoodMessage.classList.remove('hidden');
                        selectedFoodMessage.classList.add('show');
                        confirmFoodBtn.style.display = 'inline-block';
                    } else {
                        confirmFoodBtn.style.display = 'none';
                        selectedFoodMessage.classList.remove('show');
                        selectedFoodMessage.classList.add('hidden');
                    }
                } else if (type === 'drink') {
                    if (this.classList.contains('selected')) {
                        selectedDrinks.push(value);
                        createHeartBurst(this, 15);
                    } else {
                        selectedDrinks = selectedDrinks.filter(item => item !== value);
                    }
                    updateDrinkSelectionStatus();
                    
                    if (selectedDrinks.length > 0) {
                        confirmDrinkBtn.style.display = 'inline-block';
                        selectedDrinkMessage.classList.remove('hidden');
                        selectedDrinkMessage.classList.add('show');
                    } else {
                        confirmDrinkBtn.style.display = 'none';
                        selectedDrinkMessage.classList.remove('show');
                        selectedDrinkMessage.classList.add('hidden');
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
                    } else if (buttonType === 'food') {
                        selectedFoodMessage.classList.remove('hidden');
                        selectedFoodMessage.classList.add('show');
                        confirmFoodBtn.style.display = 'inline-block';
                    } else if (buttonType === 'drink') {
                        selectedDrinkMessage.classList.remove('hidden');
                        selectedDrinkMessage.classList.add('show');
                        confirmDrinkBtn.style.display = 'inline-block';
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
                    initializeDatetimeRow(datetimeRowTemplate);
                    datetimeCard.style.display = 'block';
                    setTimeout(() => {
                        datetimeCard.classList.remove('hidden');
                        datetimeCard.style.opacity = '1';
                        datetimeCard.style.transform = 'scale(1)';
                        for (let i = 0; i < 15; i++) {
                            setTimeout(() => {
                                createHeart(document.getElementById('datetime-celebration'));
                            }, i * 100);
                        }
                    }, 50);
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

    function initializeDatetimeRow(row) {
        try {
            const datePicker = row.querySelector('.date-picker');
            if (datePicker) {
                flatpickr(datePicker, {
                    dateFormat: "M d, Y", minDate: "today", disableMobile: true,
                    theme: "date-theme", animate: true, position: "auto center",
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
            const removeBtn = row.querySelector('.remove-datetime');
            if (removeBtn) {
                removeBtn.addEventListener('click', function() {
                    if (datetimeContainer.children.length > 1) {
                        row.style.opacity = '0';
                        row.style.height = '0';
                        row.style.marginBottom = '0';
                        row.style.overflow = 'hidden';
                        setTimeout(() => {
                            row.remove();
                        }, 300);
                    }
                });
            }
        } catch (error) {
            console.error("Error initializing datetime row:", error);
        }
    }

    addDatetimeBtn.addEventListener('click', function() {
        const newRow = datetimeRowTemplate.cloneNode(true);
        newRow.id = '';
        datetimeContainer.appendChild(newRow);
        initializeDatetimeRow(newRow);
        newRow.style.opacity = '0';
        setTimeout(() => {
            newRow.style.opacity = '1';
        }, 10);
    });

    confirmDatetimeBtn.addEventListener('click', function() {
        let isValid = true;
        const dateOptions = [];
        datetimeContainer.querySelectorAll('.datetime-row').forEach(row => {
            const date = row.querySelector('.date-picker').value;
            const time = row.querySelector('.time-picker').value;
            if (!date || !time) {
                isValid = false;
                if (!date) {
                    row.querySelector('.date-picker').style.borderColor = '#ff3366';
                    setTimeout(() => {
                        row.querySelector('.date-picker').style.borderColor = '';
                    }, 1000);
                }
                if (!time) {
                    row.querySelector('.time-picker').style.borderColor = '#ff3366';
                    setTimeout(() => {
                        row.querySelector('.time-picker').style.borderColor = '';
                    }, 1000);
                }
            } else {
                dateOptions.push({ date, time });
            }
        });
        if (isValid && dateOptions.length > 0) {
            appState.dateOptions = [...dateOptions];
            confirmDatetimeBtn.style.display = 'none';
            selectedDatetimeMessage.classList.remove('hidden');
            selectedDatetimeMessage.classList.add('show');
            if (foodNextBtn) {
                foodNextBtn.style.display = 'inline-block';
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
            addDatetimeBtn.disabled = true;
            datetimeContainer.querySelectorAll('.remove-datetime').forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = 0.5;
            });
            datetimeContainer.querySelectorAll('input').forEach(input => {
                input.disabled = true;
                input.style.opacity = 0.7;
            });
        }
    });

    if (foodNextBtn) {
        foodNextBtn.addEventListener('click', function() {
            datetimeCard.style.transform = 'scale(0.8)';
            datetimeCard.style.opacity = '0';
            setTimeout(() => {
                datetimeCard.style.display = 'none';
                foodCard.style.display = 'block';
                setTimeout(() => {
                    foodCard.classList.remove('hidden');
                    foodCard.style.opacity = '1';
                    foodCard.style.transform = 'scale(1)';
                    for (let i = 0; i < 15; i++) {
                        setTimeout(() => {
                            createHeart(document.getElementById('food-celebration'));
                        }, i * 100);
                    }
                }, 50);
            }, 500);
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
            confirmFoodBtn.style.display = 'none';
            finalMessage.classList.remove('hidden');
            setTimeout(() => {
                finalMessage.classList.add('show');
            }, 50);
            for (let i = 0; i < 30; i++) {
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
                    foodCelebration.appendChild(heart);
                    setTimeout(() => {
                        heart.remove();
                    }, duration * 1000);
                }, i * 40);
            }
            const foodButtonsAll = document.querySelectorAll('.tile-btn[data-food], .custom-btn[data-food]');
            foodButtonsAll.forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = '0.7';
                btn.style.cursor = 'default';
            });
            if (customFoodInput) {
                customFoodInput.disabled = true;
                addCustomFoodBtn.disabled = true;
                customFoodInput.style.opacity = '0.7';
                addCustomFoodBtn.style.opacity = '0.7';
            }
        }
    });

    if (drinksNextBtn) {
        drinksNextBtn.addEventListener('click', function() {
            foodCard.style.transform = 'scale(0.8)';
            foodCard.style.opacity = '0';
            setTimeout(() => {
                foodCard.style.display = 'none';
                drinksCard.style.display = 'block';
                setTimeout(() => {
                    drinksCard.classList.remove('hidden');
                    drinksCard.style.opacity = '1';
                    drinksCard.style.transform = 'scale(1)';
                    for (let i = 0; i < 15; i++) {
                        setTimeout(() => {
                            createHeart(document.getElementById('drinks-celebration'));
                        }, i * 100);
                    }
                }, 50);
            }, 500);
        });
    }

    confirmDrinkBtn.addEventListener('click', function() {
        if (selectedDrinks.length > 0) {
            appState.selectedDrinks = [...selectedDrinks];
            confirmDrinkBtn.style.display = 'none';
            finalDrinkMessage.classList.remove('hidden');
            setTimeout(() => {
                finalDrinkMessage.classList.add('show');
            }, 50);
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.classList.add('heart');
                    heart.style.left = Math.random() * 100 + '%';
                    heart.style.top = Math.random() * 100 + '%';
                    heart.style.transform = `scale(${Math.random() * 0.5 + 0.5})`;
                    heart.style.opacity = Math.random() * 0.5 + 0.5;
                    drinksCelebration.appendChild(heart);
                    setTimeout(() => {
                        heart.remove();
                    }, 1000);
                }, i * 100);
            }
            const drinkButtonsAll = document.querySelectorAll('.tile-btn[data-drink], .custom-btn[data-drink]');
            drinkButtonsAll.forEach(btn => {
                btn.disabled = true;
                btn.style.opacity = '0.7';
                btn.style.cursor = 'default';
            });
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
                drinksCard.style.transform = 'scale(0.8)';
                drinksCard.style.opacity = '0';
                setTimeout(() => {
                    drinksCard.style.display = 'none';
                    noteCard.style.display = 'block';
                    setTimeout(() => {
                        noteCard.classList.remove('hidden');
                        noteCard.style.opacity = '1';
                        noteCard.style.transform = 'scale(1)';
                        for (let i = 0; i < 15; i++) {
                            setTimeout(() => {
                                createHeart(document.getElementById('note-celebration'));
                            }, i * 100);
                        }
                    }, 50);
                }, 500);
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
    
    // Email validation and sending
    if (emailForm) {
        emailForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = userEmailInput.value.trim();
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            if (!emailPattern.test(email)) {
                emailError.style.display = 'block';
                userEmailInput.focus();
                return;
            }
            
            emailError.style.display = 'none';
            sendEmailBtn.textContent = "Sending...";
            sendEmailBtn.disabled = true;
            
            // Use in-memory state for data
            const templateParams = {
                to_email: email,
                date_options: appState.dateOptions.map(opt => `${opt.date} at ${opt.time}`).join(', '),
                locations: appState.selectedLocations.join(', '),
                food_preferences: appState.selectedFoods.join(', '),
                drink_preferences: appState.selectedDrinks.join(', '),
                user_note: appState.userNote
            };
            
            // Send email using EmailJS
            emailjs.send('will-you-date-me', 'will-you-date-me-form', templateParams)
                .then(function(response) {
                    console.log('Email sent successfully!', response.status, response.text);
                    sendEmailBtn.textContent = "Send Invitation";
                    sendEmailBtn.disabled = false;
                    emailForm.classList.add('disabled');
                    emailSuccess.style.display = 'block';
                    
                    appState.invitationEmailSent = true;
                    
                    for (let i = 0; i < 20; i++) {
                        setTimeout(() => {
                            createHeart(document.getElementById('completion-hearts'));
                        }, i * 100);
                    }
                    
                    userEmailInput.disabled = true;
                    sendEmailBtn.disabled = true;
                })
                .catch(function(error) {
                    console.error('Email sending failed:', error);
                    sendEmailBtn.textContent = "Try Again";
                    sendEmailBtn.disabled = false;
                    
                    emailError.textContent = "Failed to send invitation. Please try again.";
                    emailError.style.display = 'block';
                });
        });
        
        // Real-time email validation
        userEmailInput.addEventListener('input', function() {
            const email = this.value.trim();
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            if (email && !emailPattern.test(email)) {
                emailError.style.display = 'block';
            } else {
                emailError.style.display = 'none';
            }
        });
        
        // Check if email was already sent
        if (appState.invitationEmailSent) {
            emailForm.classList.add('disabled');
            emailSuccess.style.display = 'block';
            userEmailInput.disabled = true;
            sendEmailBtn.disabled = true;
        }
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
                
                // Check if email was already sent
                if (appState.invitationEmailSent) {
                    const emailForm = document.getElementById('email-form');
                    const emailSuccess = document.getElementById('email-success');
                    if (emailForm && emailSuccess) {
                        emailForm.classList.add('disabled');
                        emailSuccess.style.display = 'block';
                        document.getElementById('user-email').disabled = true;
                        document.getElementById('send-email-btn').disabled = true;
                    }
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
