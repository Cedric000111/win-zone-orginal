/* =========================================================
   WIN ZONE — GLOBAL JAVASCRIPT
   ========================================================= */

/*
   This file contains reusable frontend functions.

   IMPORTANT:
   This is currently a frontend foundation.
   Authentication, wallet balances, payments, matches,
   payouts and administrator permissions will later be
   controlled by the secure backend.
*/


/* =========================================================
   WIN ZONE NAMESPACE
   ========================================================= */

window.WINZONE = window.WINZONE || {};


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

WINZONE.goTo = function (page) {
    if (!page) return;

    window.location.href = page;
};


/* =========================================================
   SAFE ELEMENT SELECTOR
   ========================================================= */

WINZONE.get = function (selector) {
    return document.querySelector(selector);
};


/* =========================================================
   SHOW ELEMENT
   ========================================================= */

WINZONE.show = function (element) {
    if (!element) return;

    element.style.display = "";
};


/* =========================================================
   HIDE ELEMENT
   ========================================================= */

WINZONE.hide = function (element) {
    if (!element) return;

    element.style.display = "none";
};


/* =========================================================
   TOGGLE ELEMENT
   ========================================================= */

WINZONE.toggle = function (element) {
    if (!element) return;

    if (element.style.display === "none") {
        element.style.display = "";
    } else {
        element.style.display = "none";
    }
};


/* =========================================================
   PASSWORD VISIBILITY
   ========================================================= */

WINZONE.togglePassword = function (input, button) {

    if (!input) return;

    if (input.type === "password") {

        input.type = "text";

        if (button) {
            button.textContent = "HIDE";
        }

    } else {

        input.type = "password";

        if (button) {
            button.textContent = "SHOW";
        }
    }
};


/* =========================================================
   SIMPLE STATUS MESSAGE
   ========================================================= */

WINZONE.status = function (element, message) {

    if (!element) return;

    element.textContent = message;
    element.style.display = "block";
};


/* =========================================================
   CLEAR STATUS MESSAGE
   ========================================================= */

WINZONE.clearStatus = function (element) {

    if (!element) return;

    element.textContent = "";
    element.style.display = "none";
};


/* =========================================================
   MONEY FORMATTER
   ========================================================= */

WINZONE.formatMoney = function (amount, currency) {

    const value = Number(amount);

    if (!Number.isFinite(value)) {
        return "0.00";
    }

    const selectedCurrency = currency || "USD";

    try {

        return new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: selectedCurrency
        }).format(value);

    } catch (error) {

        return value.toFixed(2) + " " + selectedCurrency;
    }
};


/* =========================================================
   DATE FORMATTER
   ========================================================= */

WINZONE.formatDate = function (dateValue) {

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(date);
};


/* =========================================================
   RANDOM MATCH CODE
   ========================================================= */

/*
   Generates a temporary frontend match code.

   Rules:
   - 3 to 5 characters
   - Contains letters and numbers
   - Never numbers only

   IMPORTANT:
   Production match codes MUST be generated and
   validated by the backend.
*/

WINZONE.generateMatchCode = function () {

    const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const numbers = "23456789";

    const length =
        Math.floor(Math.random() * 3) + 3;

    let code = "";

    const firstLetter =
        letters[Math.floor(Math.random() * letters.length)];

    code += firstLetter;

    const characters = letters + numbers;

    while (code.length < length) {

        code += characters[
            Math.floor(Math.random() * characters.length)
        ];
    }

    return code;
};


/* =========================================================
   COPY TEXT
   ========================================================= */

WINZONE.copyText = async function (text) {

    if (!text) return false;

    try {

        await navigator.clipboard.writeText(text);

        return true;

    } catch (error) {

        return false;
    }
};


/* =========================================================
   NOTIFICATION PERMISSION
   ========================================================= */

WINZONE.requestNotifications = async function () {

    if (!("Notification" in window)) {

        return "unsupported";
    }

    try {

        const permission =
            await Notification.requestPermission();

        return permission;

    } catch (error) {

        return "error";
    }
};


/* =========================================================
   AGE CHECK
   ========================================================= */

WINZONE.isAdult = function (dateOfBirth) {

    const birthDate = new Date(dateOfBirth);

    if (Number.isNaN(birthDate.getTime())) {
        return false;
    }

    const today = new Date();

    let age =
        today.getFullYear() -
        birthDate.getFullYear();

    const monthDifference =
        today.getMonth() -
        birthDate.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < birthDate.getDate()
        )
    ) {
        age--;
    }

    return age >= 18;
};


/* =========================================================
   FORM VALIDATION
   ========================================================= */

WINZONE.validateRequired = function (form) {

    if (!form) return false;

    const requiredFields =
        form.querySelectorAll("[required]");

    for (const field of requiredFields) {

        if (!String(field.value).trim()) {

            field.focus();

            return false;
        }
    }

    return true;
};


/* =========================================================
   LOGOUT PLACEHOLDER
   ========================================================= */

WINZONE.logout = function () {

    /*
       Production logout will later:

       1. Invalidate the secure backend session.
       2. Clear authentication cookies/tokens.
       3. Redirect the user to login.html.
    */

    window.location.href = "login.html";
};


/* =========================================================
   PAGE READY EVENT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /*
       Shared initialization can be added here later.

       We deliberately keep this lightweight so that
       existing pages are not affected.
    */

});
