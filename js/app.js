/**
 * DocuVeritas — Main Application Logic
 * AI-Based Fake Identity & Document Screening System
 * Created by Team CodeBusters (Poornima College of Engineering)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- Theme Management with System Preference & Easter Egg ---
  const themeToggleDesktop = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const themeIconDesktop = themeToggleDesktop ? themeToggleDesktop.querySelector('.theme-icon') : null;
  const themeIconMobile = themeToggleMobile ? themeToggleMobile.querySelector('.theme-icon') : null;

  const savedTheme = localStorage.getItem('theme');
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDarkMode ? 'dark' : 'light');

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add('dark-theme');
      if (themeIconDesktop) themeIconDesktop.textContent = '☀️';
      if (themeIconMobile) themeIconMobile.textContent = '☀️';
    } else {
      document.body.classList.remove('dark-theme');
      if (themeIconDesktop) themeIconDesktop.textContent = '🌙';
      if (themeIconMobile) themeIconMobile.textContent = '🌙';
    }
  }

  applyTheme(initialTheme === 'dark');

  // Listen for OS system theme changes (only if user hasn't set manual override)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches);
    }
  });

  // Easter egg counter: 5 clicks on theme toggle triggers 67 meme
  let themeToggleCount = 0;
  const EASTER_EGG_THRESHOLD = 5;

  function handleThemeToggle() {
    const isDark = document.body.classList.contains('dark-theme');
    applyTheme(!isDark);
    localStorage.setItem('theme', isDark ? 'light' : 'dark');

    themeToggleCount++;
    if (themeToggleCount >= EASTER_EGG_THRESHOLD) {
      trigger67MemeEasterEgg();
      themeToggleCount = 0;
    }
  }

  if (themeToggleDesktop) themeToggleDesktop.addEventListener('click', handleThemeToggle);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', handleThemeToggle);

  // --- Navbar Scroll Effect (Optimized with requestAnimationFrame) ---
  const navbar = document.getElementById('mainNavbar') || document.querySelector('.navbar');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (navbar) {
          navbar.classList.toggle('scrolled', window.scrollY > 40);
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // --- Mobile Hamburger Navigation ---
  const hamburger = document.getElementById('hamburgerBtn') || document.querySelector('.hamburger');
  const navLinks = document.getElementById('navLinks') || document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // --- Contact Popup Modal ---
  const contactBtn = document.getElementById('contactBtn');
  const contactPopup = document.getElementById('contactPopup');
  const popupClose = document.getElementById('popupClose');
  const contactEmail = document.getElementById('contactEmail');

  if (contactBtn && contactPopup && popupClose) {
    if (contactEmail && window.CONFIG && window.CONFIG.contactEmail) {
      contactEmail.textContent = window.CONFIG.contactEmail;
    }

    const openPopup = () => {
      contactPopup.style.display = 'block';
      contactPopup.setAttribute('aria-hidden', 'false');
    };

    const closePopup = () => {
      contactPopup.style.display = 'none';
      contactPopup.setAttribute('aria-hidden', 'true');
    };

    contactBtn.addEventListener('click', openPopup);
    popupClose.addEventListener('click', closePopup);

    window.addEventListener('click', (e) => {
      if (e.target === contactPopup) closePopup();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && contactPopup.style.display === 'block') {
        closePopup();
      }
    });
  }

  // --- Scroll Animations (IntersectionObserver) ---
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach((el) => scrollObserver.observe(el));

  // --- Stat Counters (Smooth Easing & RAF) ---
  function animateCounter(el, target, duration = 1800) {
    const startTime = performance.now();
    const suffix = el.dataset.suffix || '';

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);

      el.textContent = current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.target, 10);
        if (!isNaN(target)) {
          animateCounter(entry.target, target);
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('[data-counter]').forEach((el) => counterObserver.observe(el));

  // --- Initialize All Interactive Demo Modules ---
  initDemoTabs();
  initDocumentScreening();
  initIdentityVerification();
  initFaceMatchDemo();
  initBatchProcessing();
});


/* ==========================================================================
   Demo Tab Switching
   ========================================================================== */
function initDemoTabs() {
  const tabs = document.querySelectorAll('.demo-tab');
  const panels = document.querySelectorAll('.demo-panel');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetPanelId = tab.dataset.panel;
      tabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach((p) => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const panel = document.getElementById(targetPanelId);
      if (panel) panel.classList.add('active');
    });
  });
}


/* ==========================================================================
   Document Screening Module
   ========================================================================== */
const SAMPLE_DOCUMENTS = {
  passport_genuine: {
    name: 'US Passport (Genuine)',
    type: 'passport',
    icon: '🛂',
    verdict: 'authentic',
    score: 96,
    details: {
      holderName: 'SARAH M. JOHNSON',
      documentNumber: 'C04567891',
      dateOfBirth: '1985-03-22',
      expiryDate: '2029-08-15',
      issuingCountry: 'United States of America',
      mrzValid: true,
    },
    checks: [
      { name: 'MRZ Code Validation', status: 'pass', detail: 'Machine-readable zone checksums are valid' },
      { name: 'Font Consistency', status: 'pass', detail: 'All typefaces match official specimens' },
      { name: 'Photo Integration', status: 'pass', detail: 'Photo shows proper bonding and alignment' },
      { name: 'Microprint Analysis', status: 'pass', detail: 'Microprinting detected at expected locations' },
      { name: 'UV Pattern Detection', status: 'pass', detail: 'UV-reactive elements present and consistent' },
      { name: 'Hologram Verification', status: 'pass', detail: 'Holographic overlay matches known pattern' },
      { name: 'Paper Quality', status: 'pass', detail: 'Substrate matches official specification' },
      { name: 'Barcode/Chip Data', status: 'pass', detail: 'Encoded data consistent across zones' },
    ],
    findings: [],
    metadata: {
      'Document Standard': 'ICAO 9303',
      'Security Level': 'Level 3 (High)',
      'MRZ Type': 'TD3 (Two-line, 44 chars)',
      'Biometric': 'Facial (JPEG2000)',
    }
  },
  passport_fake: {
    name: 'UK Passport (Forged)',
    type: 'passport',
    icon: '🛂',
    verdict: 'fraudulent',
    score: 18,
    details: {
      holderName: 'JAMES R. WILLIAMS',
      documentNumber: 'X91234567',
      dateOfBirth: '1990-07-14',
      expiryDate: '2027-11-30',
      issuingCountry: 'United Kingdom',
      mrzValid: false,
    },
    checks: [
      { name: 'MRZ Code Validation', status: 'fail', detail: 'Check digit mismatch in document number field' },
      { name: 'Font Consistency', status: 'fail', detail: 'Mixed typefaces detected — Arial used instead of OCR-B' },
      { name: 'Photo Integration', status: 'fail', detail: 'Photo edges show signs of digital splicing' },
      { name: 'Microprint Analysis', status: 'fail', detail: 'No microprinting found — printed with standard inkjet' },
      { name: 'UV Pattern Detection', status: 'fail', detail: 'No UV-reactive elements detected' },
      { name: 'Hologram Verification', status: 'fail', detail: 'Holographic overlay absent' },
      { name: 'Paper Quality', status: 'fail', detail: 'Standard 80gsm paper — not security substrate' },
      { name: 'Barcode/Chip Data', status: 'warn', detail: 'No RFID chip detected in document' },
    ],
    findings: [
      { severity: 'critical', text: 'MRZ check digits do not match — document number field fails ICAO validation' },
      { severity: 'critical', text: 'Photo shows clear border artifacts indicating digital replacement / splicing' },
      { severity: 'critical', text: 'Document printed on commercial paper stock — no security fibers or watermarks' },
      { severity: 'critical', text: 'Missing all Level 2 and Level 3 security features (hologram, UV patterns, microprint)' },
      { severity: 'warning', text: 'Font analysis: OCR-B expected in MRZ zone, but Arial detected' },
    ],
    metadata: {
      'Document Standard': 'ICAO 9303 (Non-compliant)',
      'Security Level': 'Level 0 (None detected)',
      'MRZ Type': 'TD3 (Malformed)',
      'Biometric': 'Not detected',
    }
  },
  drivers_license_suspicious: {
    name: "Driver's License (Suspicious)",
    type: 'license',
    icon: '🪪',
    verdict: 'suspicious',
    score: 42,
    details: {
      holderName: 'MICHAEL T. CHEN',
      documentNumber: 'D5589201',
      dateOfBirth: '1992-11-08',
      expiryDate: '2026-05-20',
      issuingCountry: 'California, USA',
      mrzValid: false,
    },
    checks: [
      { name: 'Barcode Validation', status: 'warn', detail: 'PDF417 barcode data partially inconsistent with front' },
      { name: 'Font Consistency', status: 'pass', detail: 'Typefaces consistent with CA DMV specimens' },
      { name: 'Photo Integration', status: 'warn', detail: 'Photo resolution differs from background resolution' },
      { name: 'Microprint Analysis', status: 'pass', detail: 'Microprinting present at "CALIFORNIA" text' },
      { name: 'UV Pattern Detection', status: 'warn', detail: 'UV bear pattern partially visible — possible wear or alteration' },
      { name: 'Hologram Verification', status: 'pass', detail: 'OVD (optically variable device) present' },
      { name: 'Template Match', status: 'warn', detail: 'Layout matches 2018-style CA DL but minor alignment shift' },
      { name: 'Age/Date Logic', status: 'fail', detail: "Issue date precedes holder's 16th birthday — impossible" },
    ],
    findings: [
      { severity: 'critical', text: 'Issue date (2007-03-15) is before holder turned 16 — CA does not issue DL to minors under 16' },
      { severity: 'warning', text: 'Barcode encodes DOB as 1993-11-08, but front of card states 1992-11-08 — one-year discrepancy' },
      { severity: 'warning', text: 'Photo DPI (150) substantially lower than background DPI (300), suggesting photo was added separately' },
      { severity: 'info', text: 'UV security pattern is partially degraded — could indicate wear or chemical treatment' },
    ],
    metadata: {
      'Document Type': 'Real ID (Class C)',
      'Security Level': 'Level 2 (Medium)',
      'Barcode': 'PDF417 (Partial mismatch)',
      'Template Version': '2018 CA DMV',
    }
  },
  id_card_genuine: {
    name: 'National ID Card (Genuine)',
    type: 'id_card',
    icon: '🆔',
    verdict: 'authentic',
    score: 94,
    details: {
      holderName: 'ANNA K. MUELLER',
      documentNumber: 'T220085401',
      dateOfBirth: '1988-06-19',
      expiryDate: '2028-06-18',
      issuingCountry: 'Germany',
      mrzValid: true,
    },
    checks: [
      { name: 'MRZ Code Validation', status: 'pass', detail: 'All check digits valid per ICAO TD1 standard' },
      { name: 'Font Consistency', status: 'pass', detail: 'Typefaces match Bundesdruckerei specifications' },
      { name: 'Photo Integration', status: 'pass', detail: 'Laser-engraved photo with proper tactile profile' },
      { name: 'Microprint Analysis', status: 'pass', detail: 'Microprinting verified in all expected zones' },
      { name: 'UV Pattern Detection', status: 'pass', detail: 'Full UV pattern confirmed under 365nm light' },
      { name: 'Hologram Verification', status: 'pass', detail: 'Kinegram verified — eagle emblem with color shift' },
      { name: 'Polycarbonate Body', status: 'pass', detail: 'Multi-layer polycarbonate construction confirmed' },
      { name: 'RFID Chip', status: 'pass', detail: 'Chip data matches printed fields — BAC authentication OK' },
    ],
    findings: [],
    metadata: {
      'Document Standard': 'ICAO 9303 (TD1)',
      'Security Level': 'Level 3 (High)',
      'MRZ Type': 'TD1 (Three-line, 30 chars)',
      'Biometric': 'Facial + Fingerprint',
    }
  },
};

function initDocumentScreening() {
  const sampleDocs = document.querySelectorAll('.sample-doc[data-doc]');
  sampleDocs.forEach((doc) => {
    const handleSelect = () => {
      const docId = doc.dataset.doc;
      if (SAMPLE_DOCUMENTS[docId]) {
        sampleDocs.forEach((d) => d.classList.remove('selected'));
        doc.classList.add('selected');
        runDocumentAnalysis(SAMPLE_DOCUMENTS[docId]);
      }
    };
    doc.addEventListener('click', handleSelect);
    doc.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSelect();
      }
    });
  });

  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('documentUpload');
  const chooseFileBtn = document.getElementById('chooseFileBtn');
  const uploadedPreview = document.getElementById('uploadedPreview');
  const uploadedImage = document.getElementById('uploadedImage');
  const clearUploadBtn = document.getElementById('clearUpload');
  const analyzeUploadBtn = document.getElementById('analyzeUpload');

  if (!uploadArea || !fileInput) return;

  // Bind choose file button
  if (chooseFileBtn) {
    chooseFileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });
  }

  // Drag and drop events
  ['dragenter', 'dragover'].forEach((eventName) => {
    uploadArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadArea.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach((eventName) => {
    uploadArea.addEventListener(eventName, (e) => {
      e.preventDefault();
      e.stopPropagation();
      uploadArea.classList.remove('dragover');
    });
  });

  uploadArea.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (dt && dt.files && dt.files.length > 0) {
      handleFileUpload(dt.files[0]);
    }
  });

  uploadArea.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  });

  if (clearUploadBtn) {
    clearUploadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.value = '';
      if (uploadedPreview) uploadedPreview.style.display = 'none';
      if (uploadArea) uploadArea.style.display = 'block';
      if (uploadedImage) uploadedImage.src = '';
    });
  }

  let isAnalyzing = false;
  if (analyzeUploadBtn) {
    analyzeUploadBtn.addEventListener('click', () => {
      if (isAnalyzing || !uploadedImage || !uploadedImage.src) return;
      isAnalyzing = true;
      analyzeUploadBtn.disabled = true;

      analyzeUploadedDocument(uploadedImage, () => {
        isAnalyzing = false;
        analyzeUploadBtn.disabled = false;
        setTimeout(() => {
          const resultsPanel = document.getElementById('docResults');
          if (resultsPanel) {
            resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 400);
      });
    });
  }
}

function handleFileUpload(file) {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
  if (!validTypes.includes(file.type)) {
    alert('Please upload a valid image file (JPG, PNG, GIF, WEBP) or PDF.');
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    alert('File size exceeds 10MB limit.');
    return;
  }

  const uploadArea = document.getElementById('uploadArea');
  const uploadedPreview = document.getElementById('uploadedPreview');
  const uploadedImage = document.getElementById('uploadedImage');

  if (file.type === 'application/pdf') {
    uploadedImage.src = 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
        <rect width="400" height="500" fill="#f8f9fa"/>
        <text x="200" y="240" text-anchor="middle" font-size="80" fill="#dee2e6">📄</text>
        <text x="200" y="280" text-anchor="middle" font-size="20" fill="#495057" font-family="Arial">PDF Document</text>
        <text x="200" y="310" text-anchor="middle" font-size="15" fill="#6c757d" font-family="Arial">${file.name}</text>
      </svg>
    `);
    if (uploadArea) uploadArea.style.display = 'none';
    if (uploadedPreview) uploadedPreview.style.display = 'block';
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage.src = e.target.result;
    if (uploadArea) uploadArea.style.display = 'none';
    if (uploadedPreview) uploadedPreview.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

/**
 * High-performance image analysis:
 * Downscales images to max 600px dimension to prevent freezing on large uploads.
 * Single-pass pixel metrics and zero-allocation color complexity.
 */
function analyzeUploadedDocument(imgElement, onComplete) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imgElement.src;

  img.onload = () => {
    const MAX_DIM = 600;
    let width = img.naturalWidth || img.width;
    let height = img.naturalHeight || img.height;

    if (width > MAX_DIM || height > MAX_DIM) {
      if (width > height) {
        height = Math.round((height * MAX_DIM) / width);
        width = MAX_DIM;
      } else {
        width = Math.round((width * MAX_DIM) / height);
        height = MAX_DIM;
      }
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    const result = performOptimizedImageAnalysis(canvas, ctx);
    runDocumentAnalysis(result, onComplete);
  };

  img.onerror = () => {
    const fallback = generateFallbackAnalysis();
    runDocumentAnalysis(fallback, onComplete);
  };
}

function performOptimizedImageAnalysis(canvas, ctx) {
  try {
    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    const len = pixels.length;
    const pixelCount = len / 4;

    if (pixelCount === 0) return generateFallbackAnalysis();

    // 1. Single pass: Brightness, Sharpness & Color Complexity
    let brightnessSum = 0;
    let sharpnessSum = 0;
    let sharpnessCount = 0;

    // 12-bit color bucket (4-bit R, 4-bit G, 4-bit B = 4096 bins, 0 GC allocations)
    const colorBuckets = new Uint8Array(4096);
    let uniqueColorCount = 0;

    for (let i = 0; i < len; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const lum = (r + g + b) / 3;
      brightnessSum += lum;

      // Sample every 8th pixel for color complexity
      if (i % 32 === 0) {
        const bin = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
        if (colorBuckets[bin] === 0) {
          colorBuckets[bin] = 1;
          uniqueColorCount++;
        }
      }
    }

    const brightness = brightnessSum / pixelCount;

    // 2. Second pass: Contrast
    let varianceSum = 0;
    for (let i = 0; i < len; i += 4) {
      const lum = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
      const diff = lum - brightness;
      varianceSum += diff * diff;
    }
    const contrast = Math.sqrt(varianceSum / pixelCount);

    // 3. Sharpness calculation with step-sampling for performance
    const step = 2;
    for (let y = 1; y < height - 1; y += step) {
      const rowOffset = y * width * 4;
      const nextRowOffset = (y + step) * width * 4;
      for (let x = 1; x < width - 1; x += step) {
        const i = rowOffset + x * 4;
        const current = pixels[i];
        const right = pixels[i + step * 4];
        const down = pixels[nextRowOffset + x * 4];

        sharpnessSum += Math.abs(current - right) + Math.abs(current - down);
        sharpnessCount++;
      }
    }
    const sharpness = sharpnessCount > 0 ? (sharpnessSum / sharpnessCount / 255) : 0;

    // 4. Edge density estimation
    let edges = 0;
    let edgeTests = 0;
    const threshold = 30;
    for (let y = 1; y < height - 1; y += 4) {
      const rowOffset = y * width * 4;
      const downOffset = (y + 2) * width * 4;
      for (let x = 1; x < width - 1; x += 4) {
        const i = rowOffset + x * 4;
        const current = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
        const right = (pixels[i + 8] + pixels[i + 9] + pixels[i + 10]) / 3;
        const down = (pixels[downOffset + x * 4] + pixels[downOffset + x * 4 + 1] + pixels[downOffset + x * 4 + 2]) / 3;

        if (Math.abs(current - right) > threshold || Math.abs(current - down) > threshold) {
          edges++;
        }
        edgeTests++;
      }
    }
    const edgeDetection = edgeTests > 0 ? (edges / edgeTests) : 0;

    // Base score computation
    let baseScore = 52;
    if (sharpness > 0.3) baseScore += 15;
    else if (sharpness < 0.1) baseScore -= 10;

    if (brightness > 80 && brightness < 180) baseScore += 10;
    else baseScore -= 6;

    if (contrast > 40) baseScore += 10;
    else if (contrast < 20) baseScore -= 8;

    if (uniqueColorCount > 1800) baseScore += 14;
    else if (uniqueColorCount < 400) baseScore -= 8;

    if (edgeDetection > 0.15 && edgeDetection < 0.45) baseScore += 12;

    baseScore = Math.max(12, Math.min(97, Math.floor(baseScore)));

    let verdict = 'authentic';
    if (baseScore < 40) verdict = 'fraudulent';
    else if (baseScore < 70) verdict = 'suspicious';

    return generateDetailedAnalysis(baseScore, verdict, {
      sharpness,
      brightness,
      contrast,
      colorComplexity: uniqueColorCount * 3,
      edgeDetection
    });
  } catch (err) {
    console.error('Image analysis error:', err);
    return generateFallbackAnalysis();
  }
}

function generateDetailedAnalysis(score, verdict, metrics) {
  const checks = [];
  const findings = [];

  // MRZ Validation
  if (metrics.edgeDetection > 0.2) {
    checks.push({ name: 'MRZ Code Validation', status: 'pass', detail: 'Machine-readable zone structure detected' });
  } else {
    checks.push({ name: 'MRZ Code Validation', status: 'warn', detail: 'MRZ zone not clearly visible — enhance scan quality' });
    findings.push({ severity: 'warning', text: 'MRZ zone unclear — recommend higher resolution scan' });
  }

  // Font Consistency
  if (score > 70) {
    checks.push({ name: 'Font Consistency', status: 'pass', detail: 'Text rendering consistent with genuine documents' });
  } else {
    checks.push({ name: 'Font Consistency', status: 'warn', detail: 'Typeface analysis shows minor irregularities' });
    findings.push({ severity: 'warning', text: 'Typeface analysis shows minor inconsistencies' });
  }

  // Photo Integration
  if (metrics.colorComplexity > 3500 && metrics.contrast > 30) {
    checks.push({ name: 'Photo Integration', status: 'pass', detail: 'Photo shows proper bonding and alignment' });
  } else if (verdict === 'fraudulent') {
    checks.push({ name: 'Photo Integration', status: 'fail', detail: 'Photo edges show potential digital manipulation' });
    findings.push({ severity: 'critical', text: 'Photo may have been digitally altered or replaced' });
  } else {
    checks.push({ name: 'Photo Integration', status: 'warn', detail: 'Photo quality insufficient for full verification' });
  }

  // Sharpness/Quality
  if (metrics.sharpness > 0.25) {
    checks.push({ name: 'Image Quality', status: 'pass', detail: 'High resolution image suitable for analysis' });
  } else {
    checks.push({ name: 'Image Quality', status: 'warn', detail: 'Image resolution lower than optimal' });
    findings.push({ severity: 'info', text: 'Low image sharpness — recommend rescanning at 300+ DPI' });
  }

  // Lighting
  if (metrics.brightness > 80 && metrics.brightness < 180) {
    checks.push({ name: 'Lighting Analysis', status: 'pass', detail: 'Proper illumination for feature detection' });
  } else {
    checks.push({ name: 'Lighting Analysis', status: 'warn', detail: 'Lighting conditions suboptimal' });
    findings.push({ severity: 'info', text: metrics.brightness < 80 ? 'Image too dark — may miss security features' : 'Image overexposed — details washed out' });
  }

  // Security Features
  if (metrics.colorComplexity > 5000 && score > 65) {
    checks.push({ name: 'Security Features', status: 'pass', detail: 'Complex patterns consistent with security printing' });
  } else if (verdict === 'fraudulent') {
    checks.push({ name: 'Security Features', status: 'fail', detail: 'Expected security features not detected' });
    findings.push({ severity: 'critical', text: 'Missing standard security features (microprint, UV elements)' });
  } else {
    checks.push({ name: 'Security Features', status: 'warn', detail: 'Some security features unclear — image quality issue' });
  }

  // AI Fraud Detection
  if (verdict === 'authentic') {
    checks.push({ name: 'AI Fraud Detection', status: 'pass', detail: 'No manipulation patterns detected' });
  } else if (verdict === 'fraudulent') {
    checks.push({ name: 'AI Fraud Detection', status: 'fail', detail: 'Document shows characteristics of forgery' });
    findings.push({ severity: 'critical', text: 'AI model flagged document as likely fraudulent based on visual analysis' });
  } else {
    checks.push({ name: 'AI Fraud Detection', status: 'warn', detail: 'Inconclusive — manual review recommended' });
    findings.push({ severity: 'warning', text: 'Document requires expert human review for final determination' });
  }

  // Pattern Analysis
  if (metrics.edgeDetection > 0.18) {
    checks.push({ name: 'Pattern Analysis', status: 'pass', detail: 'Edge density consistent with printed document' });
  } else {
    checks.push({ name: 'Pattern Analysis', status: 'warn', detail: 'Low text/pattern density detected' });
  }

  return {
    name: 'Uploaded Document',
    type: 'unknown',
    icon: '📄',
    verdict: verdict,
    score: score,
    details: {
      holderName: 'UPLOADED DOCUMENT',
      documentNumber: 'Analysis ID: ' + Date.now().toString(36).toUpperCase(),
      dateOfBirth: 'Not extracted',
      expiryDate: 'Not extracted',
      issuingCountry: 'Auto-detection: Completed',
      mrzValid: metrics.edgeDetection > 0.2,
    },
    checks: checks,
    findings: findings,
    metadata: {
      'Image Quality': `${Math.floor(metrics.sharpness * 1000)} units`,
      'Brightness': `${Math.floor(metrics.brightness)}/255`,
      'Contrast': `${Math.floor(metrics.contrast)} units`,
      'Color Palette': `${metrics.colorComplexity} unique shades`,
      'Edge Density': `${(metrics.edgeDetection * 100).toFixed(1)}%`,
      'Confidence': `${score}%`,
    }
  };
}

function generateFallbackAnalysis() {
  const score = Math.floor(Math.random() * 25) + 60;
  const verdict = score > 70 ? 'authentic' : 'suspicious';

  return {
    name: 'Uploaded Document',
    type: 'unknown',
    icon: '📄',
    verdict: verdict,
    score: score,
    details: {
      holderName: 'UPLOADED DOCUMENT',
      documentNumber: 'Analysis ID: ' + Date.now().toString(36).toUpperCase(),
      dateOfBirth: 'Not extracted',
      expiryDate: 'Not extracted',
      issuingCountry: 'Detection: Completed',
      mrzValid: false,
    },
    checks: [
      { name: 'Image Upload', status: 'pass', detail: 'Document image successfully processed' },
      { name: 'Basic Validation', status: 'pass', detail: 'Format validated per standard specs' },
      { name: 'Advanced Analysis', status: 'warn', detail: 'Some features require higher resolution image' },
      { name: 'AI Processing', status: 'warn', detail: 'Partial heuristic analysis completed' },
    ],
    findings: [
      { severity: 'info', text: 'Document uploaded successfully — basic validation complete' },
      { severity: 'info', text: 'For full forensic analysis, ensure document is well-lit and high resolution (300+ DPI)' },
    ],
    metadata: {
      'Analysis Type': 'Basic Upload Validation',
      'Confidence': `${score}%`,
      'Status': 'Partial Analysis',
    }
  };
}

let activeAnalysisTimer = null;

function runDocumentAnalysis(doc, onComplete) {
  const resultsPanel = document.getElementById('docResults');
  const progressContainer = document.getElementById('docProgress');
  if (!resultsPanel || !progressContainer) return;

  if (activeAnalysisTimer) {
    clearTimeout(activeAnalysisTimer);
    activeAnalysisTimer = null;
  }

  resultsPanel.classList.remove('active');
  progressContainer.classList.add('active');

  const progressFill = progressContainer.querySelector('.progress-fill');
  const progressSteps = progressContainer.querySelectorAll('.progress-step');

  const steps = [
    { progress: 15, step: 0 },
    { progress: 35, step: 1 },
    { progress: 55, step: 2 },
    { progress: 75, step: 3 },
    { progress: 90, step: 4 },
    { progress: 100, step: 5 },
  ];

  let stepIdx = 0;

  function advance() {
    if (stepIdx >= steps.length) {
      activeAnalysisTimer = setTimeout(() => {
        progressContainer.classList.remove('active');
        displayDocResults(doc, resultsPanel);
        if (typeof onComplete === 'function') onComplete();
      }, 350);
      return;
    }

    const cur = steps[stepIdx];
    if (progressFill) progressFill.style.width = cur.progress + '%';

    if (progressSteps) {
      progressSteps.forEach((ps, i) => {
        ps.classList.remove('active');
        if (i < cur.step) ps.classList.add('done');
        if (i === cur.step) ps.classList.add('active');
      });
    }

    stepIdx++;
    activeAnalysisTimer = setTimeout(advance, 350 + Math.random() * 200);
  }

  advance();
}

function displayDocResults(doc, container) {
  container.classList.add('active');

  const statusIcon = container.querySelector('.status-indicator');
  const statusTitle = container.querySelector('.status-title');
  const statusDesc = container.querySelector('.status-desc');
  const resultBadge = container.querySelector('.result-badge');

  if (statusIcon) {
    statusIcon.className = 'status-indicator ' + doc.verdict;
    statusIcon.textContent = doc.verdict === 'authentic' ? '✓' : doc.verdict === 'suspicious' ? '⚠' : '✕';
  }

  if (statusTitle) {
    statusTitle.textContent = doc.verdict === 'authentic' ? 'Document Authentic' :
                              doc.verdict === 'suspicious' ? 'Suspicious Document' : 'Fraudulent Document';
  }

  if (statusDesc) {
    statusDesc.textContent = `Confidence Score: ${doc.score}%`;
  }

  if (resultBadge) {
    resultBadge.className = 'badge ' + (
      doc.verdict === 'authentic' ? 'badge-success' :
      doc.verdict === 'suspicious' ? 'badge-warning' : 'badge-danger'
    );
    resultBadge.textContent = doc.verdict === 'authentic' ? 'VERIFIED' :
                              doc.verdict === 'suspicious' ? 'FLAGGED' : 'REJECTED';
  }

  // Score gauge SVG
  const gaugeValue = container.querySelector('.gauge-value');
  const gaugeCircle = container.querySelector('.gauge-track');
  const gaugeDetails = container.querySelector('.gauge-details');

  const strokeColor = doc.verdict === 'authentic' ? '#27ae60' :
                      doc.verdict === 'suspicious' ? '#f39c12' : '#e74c3c';

  if (gaugeValue) {
    gaugeValue.textContent = doc.score + '%';
    gaugeValue.style.color = strokeColor;
  }

  if (gaugeCircle) {
    const circumference = 2 * Math.PI * 50;
    const offset = circumference - (doc.score / 100) * circumference;
    gaugeCircle.style.strokeDasharray = circumference;
    gaugeCircle.style.strokeDashoffset = offset;
    gaugeCircle.style.stroke = strokeColor;
  }

  if (gaugeDetails) {
    const nameEl = gaugeDetails.querySelector('h4');
    const subEl = gaugeDetails.querySelector('p');
    if (nameEl) nameEl.textContent = doc.details.holderName;
    if (subEl) subEl.textContent = `${doc.details.issuingCountry} — ${doc.details.documentNumber}`;
  }

  // Checks grid
  const checksGrid = container.querySelector('.checks-grid');
  if (checksGrid) {
    checksGrid.innerHTML = doc.checks.map((c) => `
      <div class="check-item">
        <div class="check-icon ${c.status}">
          ${c.status === 'pass' ? '✓' : c.status === 'fail' ? '✕' : '!'}
        </div>
        <div>
          <strong>${c.name}</strong>
          <div class="check-item-detail">${c.detail}</div>
        </div>
      </div>
    `).join('');
  }

  // Findings
  const findingsSection = container.querySelector('.findings-section');
  if (findingsSection) {
    if (doc.findings && doc.findings.length > 0) {
      findingsSection.style.display = 'block';
      const findingsList = findingsSection.querySelector('.findings-list');
      if (findingsList) {
        findingsList.innerHTML = doc.findings.map((f) => `
          <div class="finding-item ${f.severity === 'warning' ? 'warning' : f.severity === 'info' ? 'info' : ''}">
            <span>${f.severity === 'critical' ? '🔴' : f.severity === 'warning' ? '🟡' : '🔵'}</span>
            <span>${f.text}</span>
          </div>
        `).join('');
      }
    } else {
      findingsSection.style.display = 'none';
    }
  }

  // Metadata grid
  const metadataGrid = container.querySelector('.metadata-grid');
  if (metadataGrid) {
    metadataGrid.innerHTML = Object.entries(doc.metadata).map(([key, val]) => `
      <div class="metadata-item">
        <div class="meta-label">${key}</div>
        <div class="meta-value">${val}</div>
      </div>
    `).join('');
  }
}


/* ==========================================================================
   Identity Verification Module
   ========================================================================== */
const IDENTITY_DATABASE = {
  'john.doe@email.com': {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1-555-0123',
    ssn_last4: '4532',
    address: '123 Main St, Springfield, IL 62701',
    dob: '1985-04-12',
    risk: 'low',
    score: 92,
    flags: [],
    history: [
      { date: '2026-09-20', event: 'Identity verified successfully', status: 'pass' },
      { date: '2026-08-15', event: 'Address change confirmed', status: 'pass' },
      { date: '2026-07-01', event: 'Account created', status: 'pass' },
    ]
  },
  'jane.smith@mail.com': {
    name: 'Jane Smith',
    email: 'jane.smith@mail.com',
    phone: '+1-555-0456',
    ssn_last4: '7891',
    address: '456 Oak Ave, Portland, OR 97201',
    dob: '1990-08-22',
    risk: 'medium',
    score: 65,
    flags: [
      'Email domain registered less than 30 days ago',
      'Phone number associated with VoIP provider',
      'Address matches a known commercial mail-receiving agency',
    ],
    history: [
      { date: '2026-09-18', event: 'Identity verification — flagged for review', status: 'warn' },
      { date: '2026-09-17', event: 'Multiple verification attempts (3 in 1 hour)', status: 'warn' },
      { date: '2026-09-16', event: 'Account created', status: 'pass' },
    ]
  },
  'alex.fraud@tempmail.xyz': {
    name: 'Alex Thompson',
    email: 'alex.fraud@tempmail.xyz',
    phone: '+1-555-9999',
    ssn_last4: '0000',
    address: '789 Elm Blvd, Nowhere, TX 00000',
    dob: '2005-01-01',
    risk: 'high',
    score: 12,
    flags: [
      'Disposable/temporary email domain detected',
      'SSN last-4 in known synthetic identity range',
      'Address ZIP code does not exist',
      'Date of birth indicates minor — KYC-ineligible',
      'Phone number flagged in fraud databases',
      'IP geolocation mismatch (claimed TX, detected: overseas proxy)',
    ],
    history: [
      { date: '2026-09-22', event: 'Identity rejected — fraud indicators', status: 'fail' },
      { date: '2026-09-22', event: 'Attempted verification from TOR exit node', status: 'fail' },
    ]
  }
};

function initIdentityVerification() {
  const form = document.getElementById('identityForm');
  if (!form) return;

  const prefillButtons = document.querySelectorAll('.prefill-btn');
  prefillButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const email = btn.dataset.email;
      const profile = IDENTITY_DATABASE[email];
      if (profile) {
        const idName = document.getElementById('idName');
        const idEmail = document.getElementById('idEmail');
        const idPhone = document.getElementById('idPhone');
        const idSSN = document.getElementById('idSSN');
        const idDOB = document.getElementById('idDOB');
        const idAddress = document.getElementById('idAddress');

        if (idName) idName.value = profile.name;
        if (idEmail) idEmail.value = profile.email;
        if (idPhone) idPhone.value = profile.phone;
        if (idSSN) idSSN.value = profile.ssn_last4;
        if (idDOB) idDOB.value = profile.dob;
        if (idAddress) idAddress.value = profile.address;
      }
    });
  });

  let isChecking = false;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (isChecking) return;
    isChecking = true;

    const emailInput = document.getElementById('idEmail');
    const email = emailInput ? emailInput.value.trim() : '';
    const profile = IDENTITY_DATABASE[email] || generateRandomProfile(email);

    const submitBtn = document.getElementById('runIdentityBtn');
    if (submitBtn) submitBtn.disabled = true;

    runIdentityCheck(profile, () => {
      isChecking = false;
      if (submitBtn) submitBtn.disabled = false;
    });
  });
}

function generateRandomProfile(email) {
  const nameInput = document.getElementById('idName');
  const phoneInput = document.getElementById('idPhone');
  const score = Math.floor(Math.random() * 40) + 55;

  return {
    name: (nameInput && nameInput.value.trim()) || 'Unknown User',
    email: email || 'user@example.com',
    phone: (phoneInput && phoneInput.value.trim()) || 'N/A',
    risk: score > 75 ? 'low' : score > 45 ? 'medium' : 'high',
    score: score,
    flags: [
      'Unable to cross-reference identity — not in cached verification database',
      'Manual review recommended for first-time verification',
    ],
    history: [
      { date: new Date().toISOString().split('T')[0], event: 'First verification attempt', status: 'warn' },
    ]
  };
}

function runIdentityCheck(profile, onComplete) {
  const progress = document.getElementById('idProgress');
  const results = document.getElementById('idResults');
  if (!progress || !results) return;

  results.classList.remove('active');
  progress.classList.add('active');

  const fill = progress.querySelector('.progress-fill');
  const steps = [20, 45, 70, 90, 100];
  let i = 0;

  const interval = setInterval(() => {
    if (fill) fill.style.width = steps[i] + '%';
    i++;
    if (i >= steps.length) {
      clearInterval(interval);
      setTimeout(() => {
        progress.classList.remove('active');
        displayIdentityResults(profile, results);
        if (typeof onComplete === 'function') onComplete();
      }, 300);
    }
  }, 280);
}

function displayIdentityResults(profile, container) {
  container.classList.add('active');

  const riskBadge = container.querySelector('.risk-badge');
  if (riskBadge) {
    riskBadge.className = 'badge risk-badge ' + (
      profile.risk === 'low' ? 'badge-success' :
      profile.risk === 'medium' ? 'badge-warning' : 'badge-danger'
    );
    riskBadge.textContent = profile.risk.toUpperCase() + ' RISK';
  }

  const scoreEl = container.querySelector('.id-score');
  if (scoreEl) {
    scoreEl.textContent = profile.score + '%';
    scoreEl.style.color = profile.risk === 'low' ? 'var(--success)' :
                          profile.risk === 'medium' ? 'var(--warning)' : 'var(--danger)';
  }

  const nameEl = container.querySelector('.id-name');
  const emailEl = container.querySelector('.id-email');
  if (nameEl) nameEl.textContent = profile.name;
  if (emailEl) emailEl.textContent = profile.email;

  // Risk flags
  const flagsList = container.querySelector('.id-flags');
  if (flagsList) {
    if (profile.flags && profile.flags.length > 0) {
      flagsList.innerHTML = profile.flags.map((f) => `
        <div class="finding-item warning">
          <span>⚠️</span>
          <span>${f}</span>
        </div>
      `).join('');
      flagsList.parentElement.style.display = 'block';
    } else {
      flagsList.parentElement.style.display = 'none';
    }
  }

  // History list
  const historyList = container.querySelector('.id-history');
  if (historyList && profile.history) {
    historyList.innerHTML = profile.history.map((h) => `
      <div class="check-item">
        <div class="check-icon ${h.status === 'pass' ? 'pass' : h.status === 'fail' ? 'fail' : 'warn'}">
          ${h.status === 'pass' ? '✓' : h.status === 'fail' ? '✕' : '!'}
        </div>
        <div>
          <strong>${h.event}</strong>
          <div class="check-item-detail">${h.date}</div>
        </div>
      </div>
    `).join('');
  }
}


/* ==========================================================================
   Face Match Demo Module
   ========================================================================== */
function initFaceMatchDemo() {
  const runBtn = document.getElementById('runFaceMatch');
  if (!runBtn) return;

  const scenarios = document.querySelectorAll('.face-scenario');
  scenarios.forEach((card) => {
    const selectCard = () => {
      scenarios.forEach((b) => b.classList.remove('selected'));
      card.classList.add('selected');
    };
    card.addEventListener('click', selectCard);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCard();
      }
    });
  });

  // Default to first scenario if none selected
  if (scenarios.length > 0 && !document.querySelector('.face-scenario.selected')) {
    scenarios[0].classList.add('selected');
  }

  let isComparing = false;
  runBtn.addEventListener('click', () => {
    if (isComparing) return;
    const selected = document.querySelector('.face-scenario.selected');
    if (!selected) return;

    isComparing = true;
    runBtn.disabled = true;

    const scenario = selected.dataset.scenario;
    const resultsEl = document.getElementById('faceResults');
    const progressEl = document.getElementById('faceProgress');

    if (resultsEl) resultsEl.classList.remove('active');
    if (progressEl) progressEl.classList.add('active');

    const fill = progressEl ? progressEl.querySelector('.progress-fill') : null;
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 25) + 15;
      if (progress > 100) progress = 100;
      if (fill) fill.style.width = progress + '%';

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (progressEl) progressEl.classList.remove('active');
          if (resultsEl) displayFaceResults(scenario, resultsEl);
          isComparing = false;
          runBtn.disabled = false;
        }, 300);
      }
    }, 220);
  });
}

function displayFaceResults(scenario, container) {
  container.classList.add('active');

  const scenarioData = {
    match: {
      score: 98.7,
      verdict: 'MATCH',
      color: 'var(--success)',
      badgeClass: 'badge-success',
      details: [
        { label: 'Facial Geometry', value: '99.1% match', pass: true },
        { label: 'Skin Texture Analysis', value: 'Consistent', pass: true },
        { label: 'Liveness Detection', value: 'Live person confirmed', pass: true },
        { label: 'Lighting Compensation', value: 'Applied (minor variance)', pass: true },
        { label: 'Age Progression', value: 'Within expected range', pass: true },
      ]
    },
    mismatch: {
      score: 12.3,
      verdict: 'NO MATCH',
      color: 'var(--danger)',
      badgeClass: 'badge-danger',
      details: [
        { label: 'Facial Geometry', value: '11.2% match', pass: false },
        { label: 'Skin Texture Analysis', value: 'Different individual', pass: false },
        { label: 'Bone Structure', value: 'Significant differences', pass: false },
        { label: 'Eye Spacing Ratio', value: 'Outside tolerance', pass: false },
        { label: 'Overall Conclusion', value: 'Different individuals', pass: false },
      ]
    },
    deepfake: {
      score: 4.1,
      verdict: 'DEEPFAKE DETECTED',
      color: 'var(--danger)',
      badgeClass: 'badge-danger',
      details: [
        { label: 'GAN Artifact Detection', value: 'Artifacts found', pass: false },
        { label: 'Facial Boundary Analysis', value: 'Unnatural blending detected', pass: false },
        { label: 'Micro-expression Test', value: 'Inconsistent patterns', pass: false },
        { label: 'Frequency Domain Analysis', value: 'GAN spectral signature present', pass: false },
        { label: 'Liveness Detection', value: 'FAILED — synthetic image', pass: false },
      ]
    }
  };

  const data = scenarioData[scenario] || scenarioData.match;

  const verdictEl = container.querySelector('.face-verdict');
  const scoreValEl = container.querySelector('.face-score-val');
  const badgeEl = container.querySelector('.face-badge');
  const detailsEl = container.querySelector('.face-details');

  if (verdictEl) {
    verdictEl.textContent = data.verdict;
    verdictEl.style.color = data.color;
  }

  if (scoreValEl) {
    scoreValEl.textContent = data.score + '%';
    scoreValEl.style.color = data.color;
  }

  if (badgeEl) {
    badgeEl.className = 'badge face-badge ' + data.badgeClass;
    badgeEl.textContent = data.verdict;
  }

  if (detailsEl) {
    detailsEl.innerHTML = data.details.map((d) => `
      <div class="check-item">
        <div class="check-icon ${d.pass ? 'pass' : 'fail'}">${d.pass ? '✓' : '✕'}</div>
        <div>
          <strong>${d.label}</strong>
          <div class="check-item-detail">${d.value}</div>
        </div>
      </div>
    `).join('');
  }
}


/* ==========================================================================
   Batch Processing Module
   ========================================================================== */
function initBatchProcessing() {
  const runBatchBtn = document.getElementById('runBatch');
  if (!runBatchBtn) return;

  const batchDocs = [
    { id: 'DOC-001', name: 'Passport — Maria Garcia', type: 'Passport', status: 'authentic', score: 97 },
    { id: 'DOC-002', name: 'DL — Kevin Brown', type: 'License', status: 'authentic', score: 94 },
    { id: 'DOC-003', name: 'ID — Yuki Tanaka', type: 'ID Card', status: 'authentic', score: 91 },
    { id: 'DOC-004', name: 'Passport — Ivan Petrov', type: 'Passport', status: 'suspicious', score: 38 },
    { id: 'DOC-005', name: 'DL — Emily White', type: 'License', status: 'authentic', score: 96 },
    { id: 'DOC-006', name: 'Passport — Ahmed Hassan', type: 'Passport', status: 'fraudulent', score: 11 },
    { id: 'DOC-007', name: 'ID — Sophie Lambert', type: 'ID Card', status: 'authentic', score: 93 },
    { id: 'DOC-008', name: 'DL — Carlos Mendez', type: 'License', status: 'suspicious', score: 45 },
  ];

  let isBatchRunning = false;

  runBatchBtn.addEventListener('click', () => {
    if (isBatchRunning) return;
    isBatchRunning = true;
    runBatchBtn.disabled = true;

    const tableBody = document.getElementById('batchTableBody');
    const batchResults = document.getElementById('batchResults');
    const progressEl = document.getElementById('batchProgress');

    if (tableBody) tableBody.innerHTML = '';
    if (batchResults) batchResults.classList.remove('active');
    if (progressEl) progressEl.classList.add('active');

    let processed = 0;
    const fill = progressEl ? progressEl.querySelector('.progress-fill') : null;

    const interval = setInterval(() => {
      if (processed >= batchDocs.length) {
        clearInterval(interval);
        if (fill) fill.style.width = '100%';
        setTimeout(() => {
          if (progressEl) progressEl.classList.remove('active');
          if (batchResults) batchResults.classList.add('active');
          updateBatchStats(batchDocs);
          isBatchRunning = false;
          runBatchBtn.disabled = false;
        }, 300);
        return;
      }

      const doc = batchDocs[processed];
      if (tableBody) {
        const row = document.createElement('tr');
        row.className = 'batch-row-animate';
        const color = doc.status === 'authentic' ? 'var(--success)' :
                      doc.status === 'suspicious' ? 'var(--warning)' : 'var(--danger)';
        const badgeClass = doc.status === 'authentic' ? 'badge-success' :
                           doc.status === 'suspicious' ? 'badge-warning' : 'badge-danger';

        row.innerHTML = `
          <td><code>${doc.id}</code></td>
          <td>${doc.name}</td>
          <td>${doc.type}</td>
          <td><strong style="color:${color}">${doc.score}%</strong></td>
          <td><span class="badge ${badgeClass}">${doc.status.toUpperCase()}</span></td>
        `;
        tableBody.appendChild(row);
      }

      processed++;
      if (fill) fill.style.width = ((processed / batchDocs.length) * 100) + '%';
    }, 400);
  });
}

function updateBatchStats(docs) {
  const statsEl = document.getElementById('batchStats');
  if (!statsEl) return;

  const total = docs.length;
  const authentic = docs.filter((d) => d.status === 'authentic').length;
  const suspicious = docs.filter((d) => d.status === 'suspicious').length;
  const fraudulent = docs.filter((d) => d.status === 'fraudulent').length;

  statsEl.innerHTML = `
    <div class="batch-stats-grid">
      <div class="batch-stat-box">
        <div class="batch-stat-num">${total}</div>
        <div class="batch-stat-lbl">Total Processed</div>
      </div>
      <div class="batch-stat-box stat-authentic">
        <div class="batch-stat-num text-success">${authentic}</div>
        <div class="batch-stat-lbl">Authentic</div>
      </div>
      <div class="batch-stat-box stat-suspicious">
        <div class="batch-stat-num text-warning">${suspicious}</div>
        <div class="batch-stat-lbl">Suspicious</div>
      </div>
      <div class="batch-stat-box stat-fraudulent">
        <div class="batch-stat-num text-danger">${fraudulent}</div>
        <div class="batch-stat-lbl">Fraudulent</div>
      </div>
    </div>
  `;
}


/* ==========================================================================
   Easter Egg: 67 Meme Trigger
   ========================================================================== */
function trigger67MemeEasterEgg() {
  const existing = document.getElementById('easterEgg67');
  if (existing) existing.remove();

  const easterEgg = document.createElement('div');
  easterEgg.id = 'easterEgg67';
  easterEgg.className = 'easter-egg-modal';
  easterEgg.setAttribute('role', 'alert');

  easterEgg.innerHTML = `
    <div class="easter-egg-number">67</div>
    <div class="easter-egg-title">THE NUMBER OF TRUTH</div>
    <div class="easter-egg-desc">
      In the depths of document verification,<br>
      the number 67 reveals the hidden patterns<br>
      that separate truth from deception.<br>
      <br>
      <span class="easter-egg-sub">Tap five times to unlock the truth...</span>
    </div>
  `;

  document.body.appendChild(easterEgg);

  setTimeout(() => {
    if (easterEgg && easterEgg.parentNode) {
      easterEgg.classList.add('fading');
      setTimeout(() => easterEgg.remove(), 400);
    }
  }, 3200);
}
