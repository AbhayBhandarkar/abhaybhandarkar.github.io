/* Portfolio interactions: theme, tabs, scroll reveal, mobile nav, active links */
(function () {
  "use strict";

  /* ------------------------------ Theme ------------------------------- */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem("theme"); } catch (e) {}
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", theme);

  function setTheme(next) {
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  }

  document.addEventListener("click", function (e) {
    var toggle = e.target.closest("[data-theme-toggle]");
    if (toggle) {
      setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
    }
  });

  /* --------------------------- Publication tabs ----------------------- */
  var tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-tab");
      tabButtons.forEach(function (b) {
        b.setAttribute("aria-selected", b === btn ? "true" : "false");
      });
      document.querySelectorAll(".tab-panel").forEach(function (panel) {
        panel.classList.toggle("active", panel.id === target);
      });
    });
  });

  /* ---------------------------- Mobile nav ---------------------------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") navLinks.classList.remove("open");
    });
  }

  /* --------------------- Sticky nav border on scroll ------------------ */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------------------------- Scroll reveal ------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------------- Active section in nav (scrollspy) ----------------- */
  var sections = document.querySelectorAll("section[id]");
  var linkMap = {};
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    var id = a.getAttribute("href");
    if (id && id.charAt(0) === "#") linkMap[id.slice(1)] = a;
  });
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          Object.keys(linkMap).forEach(function (id) {
            linkMap[id].classList.toggle("active", id === entry.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ------------------------ Footer year (auto) ------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------- Pagination ---------------------------- */
  function setupPagination(container) {
    var size = parseInt(container.getAttribute("data-page-size"), 10) || 6;
    var items = Array.prototype.filter.call(container.children, function (el) {
      return el.nodeType === 1;
    });
    var pager = container.nextElementSibling;
    if (!pager || !pager.classList.contains("pager")) {
      pager = document.createElement("div");
      pager.className = "pager";
      container.parentNode.insertBefore(pager, container.nextSibling);
    }
    var pages = Math.ceil(items.length / size);
    if (pages <= 1) return;
    var current = 1;

    function render() {
      items.forEach(function (el, i) {
        var onPage = i >= (current - 1) * size && i < current * size;
        el.style.display = onPage ? "" : "none";
        if (onPage) el.classList.add("in");
      });
      pager.innerHTML = "";
      var prev = mkBtn("‹", current === 1, function () { go(current - 1); });
      pager.appendChild(prev);
      for (var p = 1; p <= pages; p++) {
        (function (p) {
          var b = mkBtn(String(p), false, function () { go(p); });
          if (p === current) b.setAttribute("aria-current", "true");
          pager.appendChild(b);
        })(p);
      }
      pager.appendChild(mkBtn("›", current === pages, function () { go(current + 1); }));
    }
    function go(n) {
      current = Math.min(Math.max(1, n), pages);
      render();
      var top = container.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: top, behavior: "smooth" });
    }
    function mkBtn(label, disabled, onClick) {
      var b = document.createElement("button");
      b.textContent = label;
      b.disabled = !!disabled;
      if (!disabled) b.addEventListener("click", onClick);
      return b;
    }
    render();
  }
  document.querySelectorAll(".paginate").forEach(setupPagination);
})();
