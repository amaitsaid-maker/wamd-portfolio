(function () {
  var menuBtn = document.getElementById("menu-btn");
  var nav = document.getElementById("site-nav");

  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.textContent = open ? "Close" : "Menu";
  });

  var links = nav.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.textContent = "Menu";
    });
  });

  var buttons = document.querySelectorAll("[data-filter]");
  var cards = document.querySelectorAll("[data-group]");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");
      buttons.forEach(function (item) {
        var on = item === button;
        item.classList.toggle("is-active", on);
        item.setAttribute("aria-pressed", on ? "true" : "false");
      });
      cards.forEach(function (card) {
        var group = card.getAttribute("data-group");
        var show = filter === "all" || group === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  var sectionIds = ["home", "about", "skills", "projects", "education", "contact"];
  function onScroll() {
    var marker = window.scrollY + 120;
    var current = "home";
    sectionIds.forEach(function (id) {
      var section = document.getElementById(id);
      if (section && section.offsetTop <= marker) current = id;
    });
    links.forEach(function (link) {
      link.classList.toggle("is-current", link.getAttribute("href") === "#" + current);
    });
    document.getElementById("to-top").hidden = window.scrollY < 400;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.getElementById("to-top").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");

  function setError(id, message) {
    var field = document.getElementById(id);
    var error = document.getElementById(id + "-error");
    error.textContent = message;
    if (message) field.setAttribute("aria-invalid", "true");
    else field.removeAttribute("aria-invalid");
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = form.elements.namedItem("visitor-name").value.trim();
    var email = form.elements.namedItem("visitor-email").value.trim();
    var message = form.elements.namedItem("visitor-message").value.trim();
    var ok = true;

    if (name.length < 2) {
      setError("visitor-name", "Please write your name.");
      ok = false;
    } else setError("visitor-name", "");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("visitor-email", "That email does not look right.");
      ok = false;
    } else setError("visitor-email", "");

    if (message.length < 10) {
      setError("visitor-message", "Write a short message (at least 10 characters).");
      ok = false;
    } else setError("visitor-message", "");

    if (!ok) {
      status.textContent = "Check the fields above.";
      return;
    }

    status.textContent = "Thanks, " + name + ". Your message stays on this page — this lab site does not send email.";
    form.reset();
  });
})();
