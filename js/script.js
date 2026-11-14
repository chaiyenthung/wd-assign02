/* -------------- 1. restaurant.html Photo Slideshows ------------------ */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.restaurant-slideshow').forEach(function (slideshow) {
        const images = Array.from(slideshow.querySelectorAll('.slide-image'));
        const previous = slideshow.querySelector('.slide-prev');
        const next = slideshow.querySelector('.slide-next');
        const counter = slideshow.querySelector('.slide-counter');

        let activeIndex = 0;
        let available = images.slice();

        // Function to display the active slide image based on index
        function show(index) {
            if (!available.length) {
                counter.textContent = 'No photos';
                previous.disabled = true;
                next.disabled = true;
                return;
            }

            // Ensure index wraps around seamlessly
            activeIndex = ((index % available.length) + available.length) % available.length;

            // Hide all images 
            images.forEach(function (image) {
                image.classList.remove('is-active');
                image.hidden = true;
            });

            // Display the current active image
            available[activeIndex].classList.add('is-active');
            available[activeIndex].hidden = false;

            counter.textContent = (activeIndex + 1) + ' / ' + available.length;

            previous.disabled = available.length <= 1;
            next.disabled = available.length <= 1;
        }

        // Error handling: Automatically filter out broken or missing image files
        images.forEach(function (image) {
            image.addEventListener('error', function () {
                const index = available.indexOf(image);

                if (index !== -1) {
                    available.splice(index, 1);
                    show(Math.min(activeIndex, available.length - 1));
                }
            });

            // Check if image failed to load before script execution completed
            if (image.complete && image.naturalWidth === 0) {
                const index = available.indexOf(image);

                if (index !== -1) {
                    available.splice(index, 1);
                }
            }
        });

         // Event listener for clicking the 'Previous' arrow button
        previous.addEventListener('click', function () {
            show(activeIndex - 1);
        });

         // Event listener for clicking the 'Next' arrow button
        next.addEventListener('click', function () {
            show(activeIndex + 1);
        });

        // Keyboard accessibility
        slideshow.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                show(activeIndex - 1);
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                show(activeIndex + 1);
            }
        });

        show(0);
    });
});


/* -------------------- 2. Recommendation.html -------------------*/
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("recommendation-form");
    if (!form) return;

    // Restaurant dataset with categories
    const restaurants = [
        {
            name: "Alva KL Sky Dining & Grill",
            category: "fine-dining",
            minPrice: 80,
            maxPrice: 160,
            deposit: 30,
            dietary: ["none"],
            purposes: ["date", "business"],
            description: "Enjoy modern fusion dishes with beautiful views of the Kuala Lumpur skyline. A great choice for romantic dates, business dinners, and special occasions."
        },
        {
            name: "Kooky Plate",
            category: "cafe",
            minPrice: 20,
            maxPrice: 50,
            deposit: 10,
            dietary: ["none"],
            purposes: ["casual", "family"],
            description: "A cozy cafe in Chow Kit offering delicious desserts, creative dishes, and comforting meals. Perfect for relaxed gatherings with friends and family."
        },
        {
            name: "The Siam Ampang",
            category: "thai",
            minPrice: 50,
            maxPrice: 100,
            deposit: 10,
            dietary: ["none"],
            purposes: ["family", "business"],
            description: "Discover traditional Thai flavours, including Hanglay Mutton Curry and Crab Omelette. A lovely place for family meals and group gatherings."
        },
        {
            name: "Limone",
            category: "european",
            minPrice: 20,
            maxPrice: 50,
            deposit: 10,
            dietary: ["none"],
            purposes: ["date", "casual"],
            description: "Enjoy a relaxing European-inspired cafe surrounded by greenery and colourful decorations. Ideal for casual dates, brunch, and afternoon coffee."
        },
        {
            name: "The Hungry Tapir",
            category: "vegan",
            minPrice: 30,
            maxPrice: 60,
            deposit: 10,
            dietary: ["vegan", "none"],
            purposes: ["date", "casual", "family"],
            description: "A fully vegan restaurant in Kuala Lumpur's Chinatown serving creative plant-based dishes. Perfect for vegan diners, casual dates, and gatherings with friends."
        },
        {
            name: "BETAWI Indonesian Cuisine",
            category: "indonesian",
            minPrice: 30,
            maxPrice: 70,
            deposit: 10,
            dietary: ["halal", "none"],
            purposes: ["family", "casual", "business"],
            description: "Enjoy traditional Indonesian dishes such as Iga Bakar Nasi Bakul in a comfortable dining environment. A halal-friendly option for family meals and casual gatherings."
        }
    ];

    // Define numerical bounds for budget 
    const budgets = {
        low: { min: 20, max: 40 },
        medium: { min: 41, max: 70 },
        high: { min: 71, max: Infinity }
    };

    // Handle form submission and recommendation calculation logic
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const selectedCategory = document.getElementById("category").value;
        const dietary = document.getElementById("dietary").value;
        const budget = document.getElementById("budget").value;
        const purpose = document.getElementById("purpose").value;

        const selectedBudget = budgets[budget];
        if (!selectedCategory || !selectedBudget || !dietary || !purpose) return;

        // Filter restaurants by category and dietary preference
        const filteredRestaurants = restaurants.filter(function (restaurant) {
            const matchesCategory = (selectedCategory === "all" || restaurant.category === selectedCategory);
            const matchesDietary = restaurant.dietary.includes(dietary);
            return matchesCategory && matchesDietary;
        });

        // Calculate matching scores
        const rankedRestaurants = filteredRestaurants.map(function (restaurant) {
            let score = 0;

            if (restaurant.purposes.includes(purpose)) score += 5;

            const overlapsBudget =
                restaurant.minPrice <= selectedBudget.max &&
                restaurant.maxPrice >= selectedBudget.min;

            if (overlapsBudget) score += 3;

            const averagePrice = (restaurant.minPrice + restaurant.maxPrice) / 2;
            if (averagePrice >= selectedBudget.min && averagePrice <= selectedBudget.max) {
                score += 2;
            }

            return {
                ...restaurant,
                score: score,
                overlapsBudget: overlapsBudget
            };
        });

        rankedRestaurants.sort((a, b) => b.score - a.score);

        const resultContainer = document.getElementById("result-container");
        const resultTitle = document.getElementById("res-title");
        const resultDesc = document.getElementById("res-desc");
        const resultDeposit = document.getElementById("res-deposit");
        const resultLink = document.getElementById("res-link");
        const budgetNote = document.getElementById("res-budget-note");

        // Handle case where no restaurants meet the filter criteria
        if (rankedRestaurants.length === 0) {
            resultTitle.textContent = "No Matching Restaurant Found";
            resultDesc.textContent = "Sorry, we couldn't find a restaurant matching your selected category and dietary preference combination. Try expanding your filters!";
            resultDeposit.textContent = "-";
            budgetNote.textContent = "";
            resultLink.hidden = true;
            resultContainer.style.display = "block";
            return;
        }

        // Extract the top-ranked match
        const bestMatch = rankedRestaurants[0];

        // Render recommendation details onto the page
        resultTitle.textContent = "Recommended: " + bestMatch.name;
        resultDesc.textContent = bestMatch.description;
        resultDeposit.textContent = bestMatch.deposit.toFixed(2);

        // Add custom notes for recommendation
        if (!bestMatch.overlapsBudget) {
            budgetNote.textContent = "Note: This restaurant may exceed your selected budget range, but it matches your chosen category and purpose!";
        } else {
            budgetNote.textContent = "Estimated spending: RM" + bestMatch.minPrice + " - RM" + bestMatch.maxPrice + " per person.";
        }

        if (dietary === "halal") {
            budgetNote.textContent += " Please verify local halal certification status if needed.";
        }

        // Construct booking query URL to pass selected restaurant data to reservation page
        const bookingUrl = "reservation.html?restaurant=" + encodeURIComponent(bestMatch.name) + "&deposit=" + bestMatch.deposit;
        resultLink.href = bookingUrl;
        resultLink.hidden = false;

        resultContainer.style.display = "block";
    });
});


/* ------------------- 3. REGISTRATION, BILL CALCULATOR, & RESERVATION MODULES -------------------------*/
document.addEventListener('DOMContentLoaded', function () {

    // Shared error helper
    function setError(inputId, errorId, message) {
        const input = document.getElementById(inputId);
        const output = document.getElementById(errorId);
        if (output) output.textContent = message;
        if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
        return !message;
    }

    function validEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }


    // A. Registration Form Validation
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();
            let valid = true;

            function check(id, errorId, error) {
                if (!setError(id, errorId, error)) valid = false;
            }

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const password = document.getElementById('password').value;
            const confirm = document.getElementById('confirmPassword').value;
            const gender = registrationForm.querySelector('input[name="gender"]:checked');
            const dietary = document.getElementById('dietaryPreferences').value;
            const country = document.getElementById('country').value;

            // Validate fields against specific criteria
            check('username', 'usernameError', /^[A-Za-z0-9_]{5,}$/.test(username) ? '' : 'Use at least 5 letters, numbers or underscores.');
            check('email', 'emailError', validEmail(email) ? '' : 'Enter a valid email address.');
            check('phone', 'phoneError', /^\d{8,15}$/.test(phone) ? '' : 'Enter 8–15 digits with no spaces or symbols.');
            check('password', 'passwordError', (password.length >= 10 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) ? '' : 'Password needs at least 10 characters, uppercase, lowercase, number and special character.');
            check('confirmPassword', 'confirmPasswordError', (confirm && confirm === password) ? '' : 'Passwords do not match.');

            setError(null, 'genderError', gender ? '' : 'Please select a gender.');
            if (!gender) valid = false;

            check('dietaryPreferences', 'dietaryError', dietary ? '' : 'Please select a preference.');
            check('country', 'countryError', country ? '' : 'Please select a country or region.');

            // submission feedback message
            const message = document.getElementById('registrationMessage');
            if (message) {
                message.textContent = valid ? 'Your EatEat Account Created Successfully!' : 'Please correct the highlighted fields and try again.';
                message.classList.toggle('is-success', valid);
            }
        });
    }


    // B. Estimated Bill Calculator 
     const calculatorForm = document.getElementById('billCalculatorForm');
    if (calculatorForm) {
        const restaurant = document.getElementById('calcRestaurant');
        const people = document.getElementById('calcPeople');
        const drinks = document.getElementById('beveragePackage');
        const drinkPeople = document.getElementById('calcDrinkPeople');
        
        // Output spans
        const foodSubtotalElem = document.getElementById('foodSubtotal');
        const drinkSubtotalElem = document.getElementById('drinkSubtotal');
        const combinedSubtotalElem = document.getElementById('combinedSubtotal');
        const serviceFeeElem = document.getElementById('serviceFee');
        const sstFeeElem = document.getElementById('sstFee');
        const totalElem = document.getElementById('estimatedTotal');
        const summaryPeopleElem = document.getElementById('summaryPeopleCount');
        const summaryDrinkElem = document.getElementById('summaryDrinkCount');
        const peopleError = document.getElementById('calcPeopleError');
        const drinkPeopleError = document.getElementById('calcDrinkPeopleError');

        // Automatically sync drink people count to total people count if user hasn't customized it yet
        people.addEventListener('input', function() {
            if (drinkPeople) {
                drinkPeople.value = people.value;
            }
            calculateBill();
        });

        // Core calculation function
        function calculateBill() {
            const count = Number(people.value);
            let drinkCount = Number(drinkPeople ? drinkPeople.value : 0);

            // Validation for total diners
            if (!Number.isInteger(count) || count < 1 || count > 100) {
                if (peopleError) peopleError.textContent = 'Enter a whole number from 1 to 100.';
                if (totalElem) totalElem.textContent = '0.00';
                return;
            }
            if (peopleError) peopleError.textContent = '';

            // Validation for drink diners (cannot exceed total diners, cannot be negative)
            if (isNaN(drinkCount) || drinkCount < 0) {
                drinkCount = 0;
            }
            if (drinkCount > count) {
                if (drinkPeopleError) drinkPeopleError.textContent = 'Cannot exceed total diners.';
                drinkCount = count; // cap it to max diners
            } else {
                if (drinkPeopleError) drinkPeopleError.textContent = '';
            }

            const basePricePerPerson = Number(restaurant.value) || 0;
            const drinkPricePerPerson = Number(drinks.value) || 0;

            const foodTotal = basePricePerPerson * count;
            const drinkTotal = drinkPricePerPerson * drinkCount; // calculated flexibly based on how many actually want drinks
            const subtotal = foodTotal + drinkTotal;
            
            // Taxes & Charges
            const serviceCharge = subtotal * 0.10; // 10% service charge
            const sstTax = subtotal * 0.06;         // 6% Malaysian SST
            const finalTotal = subtotal + serviceCharge + sstTax;

            // Update summary labels
            if (summaryPeopleElem) summaryPeopleElem.textContent = count;
            if (summaryDrinkElem) summaryDrinkElem.textContent = drinkCount;

            // Update DOM output spans
            if (foodSubtotalElem) foodSubtotalElem.textContent = foodTotal.toFixed(2);
            if (drinkSubtotalElem) drinkSubtotalElem.textContent = drinkTotal.toFixed(2);
            if (combinedSubtotalElem) combinedSubtotalElem.textContent = subtotal.toFixed(2);
            if (serviceFeeElem) serviceFeeElem.textContent = serviceCharge.toFixed(2);
            if (sstFeeElem) sstFeeElem.textContent = sstTax.toFixed(2);
            if (totalElem) totalElem.textContent = finalTotal.toFixed(2);
        }

        // Event listeners for real-time calculation updates
        [restaurant, people, drinks, drinkPeople].forEach(function (field) {
            if (field) {
                field.addEventListener('input', calculateBill);
                field.addEventListener('change', calculateBill);
            }
        });

        calculatorForm.addEventListener('submit', function (event) {
            event.preventDefault();
        });

        // Run immediately on load
        calculateBill();
    }


    // C. Reservation Form Handling & Validation
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        const restaurant = document.getElementById('restaurantSelect');
        const deposit = document.getElementById('depositAmount');
        const numPeopleInput = document.getElementById('numPeople');
        const dateTime = document.getElementById('resDateTime');
        const email = document.getElementById('resEmail');
        const billingEmail = document.getElementById('billingEmail');
        const sameEmail = document.getElementById('sameEmailCheck');
        const voucherSection = document.getElementById('voucherSection');
        const creditSection = document.getElementById('creditCardSection');
        const voucherCode = document.getElementById('voucherCode');
        const cardType = document.getElementById('cardType');
        const creditCard = document.getElementById('creditCard');

        // Calculate reservation deposit
        function updateDeposit() {
            const selectedOption = restaurant.options[restaurant.selectedIndex];
            const baseDeposit = selectedOption ? parseFloat(selectedOption.dataset.deposit || 0) : 0;
            
            let peopleCount = parseInt(numPeopleInput.value);
            if (isNaN(peopleCount) || peopleCount < 1) {
                peopleCount = 1;
            }

            const totalDeposit = baseDeposit * peopleCount;
            if (deposit) {
                deposit.value = totalDeposit.toFixed(2);
            }
        }

         // Toggle conditional payment sections
        function togglePaymentFields() {
            const chosen = reservationForm.querySelector('input[name="paymentMethod"]:checked');
            const useVoucher = chosen && chosen.value === 'Voucher';
            const useOnline = chosen && chosen.value === 'Online';

            if (voucherSection) voucherSection.hidden = !useVoucher;
            if (creditSection) creditSection.hidden = !useOnline;

            if (voucherCode) voucherCode.disabled = !useVoucher;
            if (cardType) cardType.disabled = !useOnline;
            if (creditCard) creditCard.disabled = !useOnline;

            setError(null, 'voucherError', '');
            setError('creditCard', 'creditCardError', '');
        }

        // Quick-fill email option checkbox handler
        function updateBillingEmail() {
            if (sameEmail && sameEmail.checked && billingEmail && email) {
                billingEmail.value = email.value;
                billingEmail.readOnly = true;
            } else if (billingEmail) {
                billingEmail.readOnly = false;
            }
        }

        function localDateTimeString(date) {
            const pad = num => String(num).padStart(2, '0');
            return date.getFullYear() + '-' +
                pad(date.getMonth() + 1) + '-' +
                pad(date.getDate()) + 'T' +
                pad(date.getHours()) + ':' +
                pad(date.getMinutes());
        }

        function updateMinimumDate() {
            if (dateTime) {
                dateTime.min = localDateTimeString(new Date());
            }
        }

        // Preselect restaurant from URL parameters if passed
        const urlParams = new URLSearchParams(window.location.search);
        const requestedRestaurant = urlParams.get('restaurant');

        if (requestedRestaurant && restaurant) {
            for (let i = 0; i < restaurant.options.length; i++) {
                if (restaurant.options[i].value === requestedRestaurant) {
                    restaurant.selectedIndex = i;
                    break;
                }
            }
        }

        updateDeposit();
        updateMinimumDate();

        if (restaurant) restaurant.addEventListener('change', updateDeposit);
        if (numPeopleInput) {
            numPeopleInput.addEventListener('input', updateDeposit);
            numPeopleInput.addEventListener('change', updateDeposit);
        }

        reservationForm.querySelectorAll('input[name="paymentMethod"]').forEach(function (radio) {
            radio.addEventListener('change', togglePaymentFields);
        });

        if (sameEmail) sameEmail.addEventListener('change', updateBillingEmail);
        if (email) email.addEventListener('input', updateBillingEmail);
        if (dateTime) dateTime.addEventListener('focus', updateMinimumDate);

        togglePaymentFields();

        // Final submission validation routine for reservation form
        reservationForm.addEventListener('submit', function (event) {
            let valid = true;

            function check(id, errorId, error) {
                if (!setError(id, errorId, error)) valid = false;
            }

            const fullName = document.getElementById('fullName').value.trim();
            const resEmail = email.value.trim();
            const phone = document.getElementById('resPhone').value.trim();
            const people = Number(numPeopleInput.value);
            const paymentMethod = reservationForm.querySelector('input[name="paymentMethod"]:checked');

            check('fullName', 'fullNameError', fullName ? '' : 'Please enter your full name.');
            check('resEmail', 'resEmailError', validEmail(resEmail) ? '' : 'Enter a valid email address.');
            check('resPhone', 'resPhoneError', /^\d{10,}$/.test(phone) ? '' : 'Enter at least 10 digits with no spaces or symbols.');
            check('restaurantSelect', 'restaurantError', restaurant.value ? '' : 'Choose a restaurant.');
            check('resDateTime', 'resDateTimeError', (dateTime.value && new Date(dateTime.value).getTime() > Date.now()) ? '' : 'Choose a future reservation date and time.');
            check('numPeople', 'numPeopleError', (Number.isInteger(people) && people > 0) ? '' : 'Enter a whole number greater than zero.');

            setError(null, 'paymentMethodError', paymentMethod ? '' : 'Choose a deposit method.');
            if (!paymentMethod) valid = false;

             // Conditional validation for online credit card inputs
            if (paymentMethod && paymentMethod.value === 'Online') {
                const selectedBrand = cardType.value;
                let expectedLength = (selectedBrand === 'Amex') ? 15 : 16;
                const cleanCardNumber = creditCard.value.trim();
                const isDigitsOnly = /^\d+$/.test(cleanCardNumber);

                let cardError = '';
                if (!selectedBrand) {
                    cardError = 'Please select a card type.';
                } else if (cleanCardNumber === '') {
                    cardError = 'Credit card number is required.';
                } else if (!isDigitsOnly) {
                    cardError = 'Credit card must contain digits only.';
                } else if (cleanCardNumber.length !== expectedLength) {
                    cardError = selectedBrand + ' requires exactly ' + expectedLength + ' digits.';
                }
                check('creditCard', 'creditCardError', cardError);
            } else {
                check('creditCard', 'creditCardError', '');
            }

            check('billingEmail', 'billingEmailError', validEmail(billingEmail.value.trim()) ? '' : 'Enter a valid billing email address.');

            // Block submission if any validation checks fail
            if (!valid) {
                event.preventDefault();
            }
        });
    }
});
