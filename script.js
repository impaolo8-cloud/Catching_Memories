/* ==========================================================================
   Catching Memories Photography — Interactive Portfolio & Booking Script
   ========================================================================== */

const PACKAGES_DATA = {
  // Wedding & Grand Event Packages
  base: {
    category: "Wedding",
    name: "Base Package (Wedding/Events)",
    price: "PHP 10,000",
    summary: "1 Photographer + 1 Assistant • Full Event Coverage (Prep to Reception) • 250+ Edited Pictures • Free USB + Unlimited High-Res Photos."
  },
  basic: {
    category: "Wedding",
    name: "Basic Package (Wedding/Events)",
    price: "PHP 20,000",
    summary: "1 Photographer + 1 Videographer + 1 Assistant • Full Event Photo & HD Video Coverage • 20-Page Leather Album + 11x14 Frame + Free USB."
  },
  standard: {
    category: "Wedding",
    name: "Standard Package (Wedding/Events)",
    price: "PHP 30,000",
    summary: "Prenup Photoshoot + Save the Date Video • 1 Photographer, 1 Videographer, 1 Assistant • Full Event Coverage • 20-Page Leather Album + 11x14 Frame + Free USB."
  },
  elite: {
    category: "Wedding",
    name: "Elite Package (Wedding/Events)",
    price: "PHP 35,000",
    summary: "Same Day Edit (SDE) + Aerial Drone Shots + Onsite Photo • 2 Photographers, 2 Videographers, 2 SDE Editors, 1 Assistant • Full HD Photo/Video + Free USB."
  },
  elite_plus: {
    category: "Wedding",
    name: "Elite Plus Package (Wedding/Events)",
    price: "PHP 50,000",
    summary: "Prenup Photoshoot + Save the Date + SDE + Drone + Onsite Photo • 2 Photographers, 2 Videographers, 2 SDE Editors, 1 Assistant • 40-Page Leather Album + 2 pcs 11x14 Frame + Free USB."
  },
  premium: {
    category: "Wedding",
    name: "Premium Package (Wedding/Events)",
    price: "PHP 65,000",
    summary: "All-In Luxury Coverage: Prenup + Save the Date + SDE + Drone + Photobooth • 2 Photographers, 3 Videographers, 2 SDE Editors • 40-Page Leather Album, 4 Frames, Guest Book & 6-Frame Stand."
  },

  // Birthday & Debut Packages
  bronze: {
    category: "Debut / 18th Birthday",
    name: "Bronze Package (Birthday/Debut)",
    price: "PHP 15,000",
    summary: "1 Photographer + 1 Assistant • Outdoor Pre-Birthday Photoshoot • Full Photo Coverage (Prep to Reception) • 1 pc 11x14 Elegant Frame • Free USB + 6 Months Google Drive Access."
  },
  silver: {
    category: "Debut / 18th Birthday",
    name: "Silver Package (Birthday/Debut)",
    price: "PHP 25,000",
    summary: "1 Photographer + 1 Videographer + 1 Assistant • Outdoor Pre-Birthday Shoot + Save the Date Video • Full Photo/Video Coverage + Full Highlights Video • 11x14 Frame + Free USB + 6 Months Google Drive."
  },
  double_silver: {
    category: "Debut / 18th Birthday",
    name: "Double Silver Package (Birthday/Debut)",
    price: "PHP 36,000",
    summary: "2 Photographers + 2 Videographers + 1 Assistant • Outdoor Pre-Birthday Shoot + Save the Date Video • Full Photo/Video Coverage + Full Highlights Video • 11x14 Frame + Free USB + 6 Months Google Drive."
  },
  gold: {
    category: "Debut / 18th Birthday",
    name: "Gold Package (Birthday/Debut)",
    price: "PHP 50,000",
    summary: "8-Person Crew (2 Photo, 2 Video, 1 Drone Pilot, 2 SDE Editors, 1 Themed Stylist, 1 Assistant) • Outdoor + Themed Studio Shoot + Save the Date + SDE Photo/Video • 10-Page Album, 1x 11x14 & 2x 8x10 Frames, USB & Google Drive."
  }
};

const ALBUM_LABELS = {
  weddings: "Album 01 • Weddings & Sacred Ceremonies",
  debut: "Album 02 • Debut & Pre-Birthday Editorial",
  prenup: "Album 03 • Prenup & Engagement Stories",
  reception: "Album 04 • Grand Reception & Stage Lighting"
};

document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar Scroll Effect & Mobile Menu Drawer
  const navbar = document.getElementById("navbar");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = mobileDrawer.classList.toggle("open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. Compiled Album Filtering (Bookshelf Cover Cards + Filter Buttons)
  const albumFilterTriggers = document.querySelectorAll("[data-album-filter]");
  const albumBlocks = document.querySelectorAll(".compiled-album-block");
  const albumCoverCards = document.querySelectorAll(".album-cover-card");
  const filterBtns = document.querySelectorAll(".filter-btn");

  function filterAlbums(albumKey, shouldScroll = false) {
    // Update Filter Pills
    filterBtns.forEach((btn) => {
      if (btn.getAttribute("data-album-filter") === albumKey) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Update Album Cover Cards
    albumCoverCards.forEach((card) => {
      if (card.getAttribute("data-album-filter") === albumKey) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });

    // Show/Hide Compiled Album Blocks
    albumBlocks.forEach((block) => {
      const blockType = block.getAttribute("data-album-block");
      if (albumKey === "all" || blockType === albumKey) {
        block.style.display = "block";
      } else {
        block.style.display = "none";
      }
    });

    if (shouldScroll) {
      const firstVisible = document.querySelector(
        albumKey === "all"
          ? ".compiled-album-block"
          : `.compiled-album-block[data-album-block="${albumKey}"]`
      );
      if (firstVisible) {
        firstVisible.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  albumFilterTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const albumKey = trigger.getAttribute("data-album-filter");
      const isCoverCard = trigger.classList.contains("album-cover-card");
      filterAlbums(albumKey, isCoverCard);
    });
  });

  // 3. Compiled Album Lightbox Slideshow (Scoped by Album Type)
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxSub = document.getElementById("lightbox-sub");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  let currentAlbumItems = [];
  let currentSlideIndex = 0;
  let currentAlbumKey = "weddings";

  function openAlbumLightbox(albumKey, startIndex = 0) {
    currentAlbumKey = albumKey;
    currentAlbumItems = Array.from(
      document.querySelectorAll(`.gallery-item[data-album="${albumKey}"]`)
    );
    if (currentAlbumItems.length === 0) return;

    currentSlideIndex = startIndex;
    renderCurrentSlide();
    lightbox.classList.add("open");
  }

  function renderCurrentSlide() {
    const item = currentAlbumItems[currentSlideIndex];
    if (!item) return;
    const img = item.querySelector("img");
    const title = item.querySelector("h4")?.textContent || "";
    const tag = item.querySelector(".gallery-meta span")?.textContent || "";
    const albumLabel = ALBUM_LABELS[currentAlbumKey] || "Portfolio Album";

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = title;
    lightboxSub.textContent = `${albumLabel} (${tag}) • Photo ${currentSlideIndex + 1} of ${currentAlbumItems.length}`;
  }

  function stepSlide(delta) {
    if (currentAlbumItems.length === 0) return;
    currentSlideIndex =
      (currentSlideIndex + delta + currentAlbumItems.length) %
      currentAlbumItems.length;
    renderCurrentSlide();
  }

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const albumKey = item.getAttribute("data-album");
      const idx = parseInt(item.getAttribute("data-index") || "0", 10);
      openAlbumLightbox(albumKey, idx);
    });
  });

  document.querySelectorAll("[data-open-slideshow]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const albumKey = btn.getAttribute("data-open-slideshow");
      openAlbumLightbox(albumKey, 0);
    });
  });

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", (e) => {
      e.stopPropagation();
      stepSlide(-1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", (e) => {
      e.stopPropagation();
      stepSlide(1);
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      lightbox.classList.remove("open");
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove("open");
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("open")) return;
    if (e.key === "Escape") {
      lightbox.classList.remove("open");
    } else if (e.key === "ArrowLeft") {
      stepSlide(-1);
    } else if (e.key === "ArrowRight") {
      stepSlide(1);
    }
  });

  // 4. Event Package Category Tabs (Weddings vs Birthdays/Debuts vs Add-Ons)
  const categoryTabBtns = document.querySelectorAll(".category-tab-btn");
  const categoryPanels = document.querySelectorAll(".package-category-panel");

  categoryTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetPanelId = btn.getAttribute("data-target-panel");
      categoryTabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      categoryPanels.forEach((panel) => {
        if (panel.id === targetPanelId) {
          panel.classList.add("active");
        } else {
          panel.classList.remove("active");
        }
      });
    });
  });

  // 5. Wedding View Toggle (Cards vs Comparison Table)
  const btnWeddingCards = document.getElementById("btn-cards-view");
  const btnWeddingCompare = document.getElementById("btn-compare-view");
  const weddingCardsContainer = document.getElementById("packages-cards-container");
  const weddingCompareContainer = document.getElementById("packages-compare-container");

  if (btnWeddingCards && btnWeddingCompare) {
    btnWeddingCards.addEventListener("click", () => {
      btnWeddingCards.classList.add("active");
      btnWeddingCompare.classList.remove("active");
      weddingCardsContainer.style.display = "block";
      weddingCompareContainer.classList.remove("active");
    });

    btnWeddingCompare.addEventListener("click", () => {
      btnWeddingCompare.classList.add("active");
      btnWeddingCards.classList.remove("active");
      weddingCardsContainer.style.display = "none";
      weddingCompareContainer.classList.add("active");
    });
  }

  // 6. Birthday/Debut View Toggle (Cards vs Comparison Table)
  const btnBdayCards = document.getElementById("btn-bday-cards-view");
  const btnBdayCompare = document.getElementById("btn-bday-compare-view");
  const bdayCardsContainer = document.getElementById("bday-cards-container");
  const bdayCompareContainer = document.getElementById("bday-compare-container");

  if (btnBdayCards && btnBdayCompare) {
    btnBdayCards.addEventListener("click", () => {
      btnBdayCards.classList.add("active");
      btnBdayCompare.classList.remove("active");
      bdayCardsContainer.style.display = "block";
      bdayCompareContainer.classList.remove("active");
    });

    btnBdayCompare.addEventListener("click", () => {
      btnBdayCompare.classList.add("active");
      btnBdayCards.classList.remove("active");
      bdayCardsContainer.style.display = "none";
      bdayCompareContainer.classList.add("active");
    });
  }

  // 7. Package Selection Sync (Cards + Pills + Sidebar Preview + Event Type)
  const pkgPills = document.querySelectorAll(".pkg-pill");
  const hiddenPkgInput = document.getElementById("selected-package-input");
  const previewName = document.getElementById("preview-pkg-name");
  const previewPrice = document.getElementById("preview-pkg-price");
  const previewDesc = document.getElementById("preview-pkg-desc");
  const eventTypeSelect = document.getElementById("event-type");

  function setSelectedPackage(pkgKey) {
    const pkg = PACKAGES_DATA[pkgKey] || PACKAGES_DATA.elite_plus;
    if (hiddenPkgInput) hiddenPkgInput.value = `${pkg.name} — ${pkg.price}`;
    if (previewName) previewName.textContent = pkg.name;
    if (previewPrice) previewPrice.textContent = pkg.price;
    if (previewDesc) previewDesc.textContent = pkg.summary;

    if (eventTypeSelect && pkg.category) {
      eventTypeSelect.value = pkg.category;
    }

    pkgPills.forEach((pill) => {
      if (pill.getAttribute("data-pkg") === pkgKey) {
        pill.classList.add("active");
      } else {
        pill.classList.remove("active");
      }
    });
  }

  pkgPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      const key = pill.getAttribute("data-pkg");
      setSelectedPackage(key);
    });
  });

  const bookPackageBtns = document.querySelectorAll("[data-select-pkg]");
  bookPackageBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const key = btn.getAttribute("data-select-pkg");
      setSelectedPackage(key);
      const bookingSection = document.getElementById("booking");
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 8. Option B — Built-In Booking Form Submission (with Add-Ons)
  const bookingForm = document.getElementById("booking-form");
  const bookingResult = document.getElementById("booking-result");
  const summaryBox = document.getElementById("booking-summary-text");
  const mailtoBtn = document.getElementById("btn-send-email");
  const copyFbBtn = document.getElementById("btn-copy-fb");
  const smsBtn = document.getElementById("btn-send-sms");

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const clientName = document.getElementById("client-name").value.trim();
      const clientPhone = document.getElementById("client-phone").value.trim();
      const clientEmail = document.getElementById("client-email").value.trim();
      const eventType = document.getElementById("event-type").value;
      const eventDate = document.getElementById("event-date").value;
      const eventLocation = document.getElementById("event-location").value.trim();
      const selectedPkg = hiddenPkgInput.value;
      const clientNotes = document.getElementById("client-notes").value.trim();

      const checkedAddons = Array.from(
        document.querySelectorAll('input[name="addon"]:checked')
      ).map((cb) => cb.value);

      const addonsLine =
        checkedAddons.length > 0
          ? `• Selected Add-Ons: ${checkedAddons.join(", ")}\n`
          : `• Selected Add-Ons: None\n`;

      const summaryText =
        `📸 BOOKING INQUIRY — CATCHING MEMORIES PHOTOGRAPHY\n` +
        `• Package: ${selectedPkg}\n` +
        addonsLine +
        `• Client Name: ${clientName}\n` +
        `• Contact Number: ${clientPhone}\n` +
        `• Email: ${clientEmail}\n` +
        `• Event Type: ${eventType}\n` +
        `• Event Date: ${eventDate}\n` +
        `• Venue / Location: ${eventLocation}\n` +
        (clientNotes ? `• Special Requests / Notes: ${clientNotes}` : `• Special Requests: None`);

      summaryBox.textContent = summaryText;
      bookingResult.classList.add("show");

      const subject = encodeURIComponent(`Booking Inquiry: ${selectedPkg} - ${clientName} (${eventDate})`);
      const body = encodeURIComponent(summaryText);
      mailtoBtn.href = `mailto:faminij1@gmail.com?subject=${subject}&body=${body}`;
      smsBtn.href = `sms:09187232094?body=${body}`;

      copyFbBtn.onclick = async () => {
        try {
          await navigator.clipboard.writeText(summaryText);
          copyFbBtn.textContent = "✓ Copied! Opening Facebook...";
          setTimeout(() => {
            window.open("https://www.facebook.com/joefamini.photography", "_blank", "noopener");
            copyFbBtn.textContent = "Copy Inquiry & Message on Facebook";
          }, 700);
        } catch {
          window.open("https://www.facebook.com/joefamini.photography", "_blank", "noopener");
        }
      };

      bookingResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
});
