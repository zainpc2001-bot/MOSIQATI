//  صوت الازرار
var btnAudio = new Audio("sounds/button_sound.mp3");

function playButtonSound() {
  btnAudio.currentTime = 0;
  btnAudio.play().catch(function () {});
}

// تشغيل الصوت عند تحميل الصفحة على جميع الازرار والروابط
document.addEventListener("DOMContentLoaded", function () {
  // ازرار btn-gold و btn-outline و btn-add
  var btns = document.querySelectorAll(
    ".btn-gold, .btn-outline, .btn-add, .hamburger",
  );
  btns.forEach(function (btn) {
    btn.addEventListener("click", playButtonSound);
  });

  // تطبيق الترجمة على الصفحة الحالية
  applyPageTranslations();
});

//فتح وإغلاق القائمة في الجوال
function toggleMenu() {
  var menu = document.getElementById("nav-menu");
  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
  } else {
    menu.classList.add("open");
  }
}

// إضافة منتج إلى السلة
function addToCart(productKey) {
  playButtonSound();
  var productName = t("product." + productKey + ".name") || productKey;
  showNotification(t("store.notif.added") + productName);
}

// إظهار الإشعار
function showNotification(message) {
  var notif = document.getElementById("notification");
  notif.textContent = message;
  notif.style.display = "block";

  setTimeout(function () {
    notif.style.display = "none";
  }, 2500);
}

// زر العودة للأعلى
window.onscroll = function () {
  var btn = document.getElementById("back-to-top");
  if (btn) {
    if (window.scrollY > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  }
};

function scrollToTop() {
  window.scrollTo(0, 0);
}

// إرسال نموذج التواصل
function sendMessage() {
  playButtonSound();
  var name = document.getElementById("name");
  var email = document.getElementById("email");
  var message = document.getElementById("message");

  var nameError = document.getElementById("name-error");
  var emailError = document.getElementById("email-error");
  var messageError = document.getElementById("message-error");
  var successMsg = document.getElementById("success-msg");

  nameError.style.display = "none";
  emailError.style.display = "none";
  messageError.style.display = "none";

  var isValid = true;

  if (name.value.trim() === "") {
    nameError.style.display = "block";
    isValid = false;
  }
  if (email.value.trim() === "" || !email.value.includes("@")) {
    emailError.style.display = "block";
    isValid = false;
  }
  if (message.value.trim() === "") {
    messageError.style.display = "block";
    isValid = false;
  }

  if (isValid) {
    var lang = getCurrentLang();
    var greeting = lang === "ar"
      ? "شكرا لك يا " + name.value.trim() + "\n\nتم استلام سؤالك بنجاح وسيقوم فريق الدعم بالرد على بريدك الالكتروني قريبا"
      : "Thank you, " + name.value.trim() + "!\n\nYour message has been received successfully. Our support team will reply to your email soon.";
    alert(greeting);
    name.value = "";
    email.value = "";
    document.getElementById("subject").value = "";
    message.value = "";
  }
}

function applyPageTranslations() {
  var els = document.querySelectorAll("[data-i18n]");
  els.forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    var attr = el.getAttribute("data-i18n-attr");
    var val = t(key);
    if (attr) {
      el.setAttribute(attr, val);
    } else {
      el.textContent = val;
    }
  });

  // تحديث عنوان الصفحة
  var pageTitleKey = document.body.getAttribute("data-page-title");
  if (pageTitleKey) {
    document.title = t(pageTitleKey);
  }

  // تحديث اتجاه حقول النموذج حسب اللغة
  var lang = getCurrentLang();
  var inputs = document.querySelectorAll("input, textarea");
  inputs.forEach(function (inp) {
    inp.style.direction = lang === "ar" ? "rtl" : "ltr";
    inp.style.textAlign = lang === "ar" ? "right" : "left";
  });
}

function changeLanguage(lang) {
  applyLang(lang);
  applyPageTranslations();
  // تحديث زر الإعدادات النشط
  updateSettingsUI();
  showNotification(t("settings.saved"));
}

function changeTheme(theme) {
  applyTheme(theme);
  updateSettingsUI();
  showNotification(t("settings.saved"));
}

function updateSettingsUI() {
  var lang = getCurrentLang();
  var theme = getCurrentTheme();

  // تحديث أزرار اللغة
  var btnAr = document.getElementById("btn-lang-ar");
  var btnEn = document.getElementById("btn-lang-en");
  if (btnAr && btnEn) {
    if (lang === "ar") {
      btnAr.classList.add("active");
      btnEn.classList.remove("active");
    } else {
      btnEn.classList.add("active");
      btnAr.classList.remove("active");
    }
  }

  // تحديث أزرار المظهر
  var btnLight = document.getElementById("btn-theme-light");
  var btnDark = document.getElementById("btn-theme-dark");
  if (btnLight && btnDark) {
    if (theme === "dark") {
      btnDark.classList.add("active");
      btnLight.classList.remove("active");
    } else {
      btnLight.classList.add("active");
      btnDark.classList.remove("active");
    }
  }
}
