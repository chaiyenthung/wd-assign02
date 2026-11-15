=========================================================
PROJECT README: EATEAT RESTAURANT PLATFORM
=========================================================
Unit Code: COS10005 - Web Development (Assignment 2)
Student Name: Chai Yen Thung
Student ID: 105025228

---------------------------------------------------------
1. WEBSITE STRUCTURE
---------------------------------------------------------
The project follows the exact required folder structure:
- index.html               : Home page introducing the platform, values, target users, and services.
- restaurants.html         : Restaurant listing page featuring 6 partner restaurants, detailed descriptions, pricing, signature dishes, and photo slideshow components.
- recommend.html           : Interactive rule-based recommendation page where users select a category, dietary preference, budget range, and dining purpose to find matching restaurants.
- register.html            : User account registration page featuring client-side form validation.
- reservation.html         : Table reservation booking page with dynamic deposit calculations, conditional payment fields (Voucher vs Online Credit Card), and POST form submission.
- bill.html                : Bonus estimated bill calculator page providing detailed itemized breakdowns (Food, Drinks, Service Charge, and SST).
- css/
  └─ style.css             : External stylesheet managing typography, layout containers, macaron color palette, and responsive design queries.
- js/
  └─ script.js             : External JavaScript file containing photo slideshow controls, recommendation scoring logic, and form validations.
- images/                  : Folder containing all optimized venue photos and logo assets.
- Readme.txt               : Project documentation file.


---------------------------------------------------------
2. GITHUB REPOSITORY LINK
---------------------------------------------------------
https://chaiyenthung.github.io/wd-assign02/index.html


---------------------------------------------------------
3. EXPLANATION OF JAVASCRIPT VALIDATION & LOGIC (PLAIN ENGLISH)
---------------------------------------------------------
1. Photo Slideshow Logic: 
- Manages interactive image navigation for each restaurant card on the listing page. 
- It tracks the active index, supports next/previous button clicks, enables left/right keyboard arrow navigation, and dynamically hides broken image links.

2. Recommendation System Logic: 
- Evaluates user inputs across multiple dropdown parameters (category, dietary preference, budget tier, and dining purpose). 
- It applies a scoring algorithm that ranks partner venues based on purpose match and budget overlap, rendering the best recommendation and passing its details directly to the booking page via URL query parameters.

3. Registration Form Validation: 
- Intercepts form submission to ensure all mandatory fields are completed. 
- It validates usernames (min 5 characters, alphanumeric/underscores only), email formatting, phone number length (8 to 15 digits), password complexity rules (minimum 10 characters with uppercase, lowercase, numbers, and special symbols), password confirmation matching, gender selection, and dropdown selections.

4. Reservation Form Validation & Dynamic Pricing: 
- Dynamically updates the required reservation deposit in real-time based on the selected restaurant's base deposit multiplied by the number of diners. 
- It features conditional UI display logic: showing a 12-digit voucher code textbox when Voucher payment is selected, or a credit card type selector and card number validator (enforcing 15 digits for Amex and 16 digits for Visa/Mastercard) when Online payment is selected. It also includes a quick-fill option to copy the primary email into the billing email address field.

5. Estimated Bill Calculator Logic:
- Computes real-time cost estimates on the bonus page by multiplying food and drink package rates by flexible diner counts, adding an illustrative 10% service charge and 6% Malaysian SST tax.


---------------------------------------------------------
4. KNOWN ISSUES OR LIMITATIONS
---------------------------------------------------------
- The website is designed as a front-end interface prototype. Account registrations and table bookings do not permanently write data to a permanent backend database, though table reservation requests successfully submit via POST to the university's Mercury test endpoint script for verification.
- All features are fully functional, responsive across desktop, tablet, and mobile devices, and validated against W3C HTML5 and CSS3 standards.

---------------------------------------------------------
5. REFERENCES (THIRD-PARTY CONTENT & SOURCES)
---------------------------------------------------------
- Betawi Indonesian Cuisine. (2025). Official Website & Menu Information. Available at: https://betawi.com.my/ [Accessed Nov 2026].
- Eat Drink KL. (2024). BETAWI Indonesian Cuisine, Taman Tun Dr Ismail. Available at: https://eatdrinkkl.blogspot.com/2024/05/betawi-taman-tun-dr-ismail.html [Accessed Nov 2026].
- Kooky Plate KL. (2025). Desserts and Sweet Treats Menu. Available at: https://kookyplatekl.com/desserts-and-sweet-treats/ [Accessed Nov 2026].
- The Siam Thai Cuisine. (2022). Official Restaurant Website & Menu. Available at: https://thesiamthaicuisine.com/ [Accessed Nov 2026].
- The Yum List. (2022). Cafe Limóne, Plaza Zurich Bukit Damansara. Available at: https://www.theyumlist.net/2022/12/cafe-limone-plaza-zurich-bukit-damansara-cafe.html [Accessed Nov 2026].
- The Yum List. (2020). The Hungry Tapir, Chinatown KL. Available at: https://www.theyumlist.net/2020/06/the-hungry-tapir-chinatown-kl.html [Accessed Nov 2026].
- The Yum List. (2026). The Siam Ampang Thai Select Restaurant M City. Available at: https://www.theyumlist.net/2026/01/the-siam-ampang-thai-select-restaurant-m-city.html [Accessed Nov 2026].
- Unsplash. (2026). Free Stock Photos & Interior Photography. Available at: https://unsplash.com [Accessed Nov 2026].
