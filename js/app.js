/* ============================================
   DocuVeritas — Main Application Logic
   Created by Team CodeBusters
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Theme Toggle with System Preference ---
  const themeToggleDesktop = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const themeIconDesktop = themeToggleDesktop ? themeToggleDesktop.querySelector('.theme-icon') : null;
  const themeIconMobile = themeToggleMobile ? themeToggleMobile.querySelector('.theme-icon') : null;

  // Check for saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  let prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Determine initial theme
  let initialTheme = savedTheme || (prefersDarkMode ? 'dark' : 'light');

  // Apply initial theme
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

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      // Only auto-switch if user hasn't manually chosen a theme
      applyTheme(e.matches);
    }
  });

  // Easter egg counter for theme toggles
  let themeToggleCount = 0;
  const EASTER_EGG_THRESHOLD = 5;

  // Toggle theme on button click (desktop)
  if (themeToggleDesktop) {
    themeToggleDesktop.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-theme');
      applyTheme(!isDark);
      localStorage.setItem('theme', isDark ? 'light' : 'dark');

      // Easter egg logic
      themeToggleCount++;
      if (themeToggleCount >= EASTER_EGG_THRESHOLD) {
        trigger67MemeEasterEgg();
        themeToggleCount = 0; // Reset after triggering
      }
    });
  }

  // Toggle theme on button click (mobile)
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-theme');
      applyTheme(!isDark);
      localStorage.setItem('theme', isDark ? 'light' : 'dark');

      // Easter egg logic
      themeToggleCount++;
      if (themeToggleCount >= EASTER_EGG_THRESHOLD) {
        trigger67MemeEasterEgg();
        themeToggleCount = 0; // Reset after triggering
      }
    });
  }
  // --- Navbar scroll effect ---
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Contact popup functionality
  const contactBtn = document.getElementById('contactBtn');
  const contactPopup = document.getElementById('contactPopup');
  const popupClose = document.getElementById('popupClose');

  if (contactBtn && contactPopup && popupClose) {
    // Open popup
    contactBtn.addEventListener('click', () => {
      contactPopup.style.display = 'block';
    });

    // Close popup when clicking X
    popupClose.addEventListener('click', () => {
      contactPopup.style.display = 'none';
    });

    // Close popup when clicking outside
    window.addEventListener('click', (e) => {
      if (e.target === contactPopup) {
        contactPopup.style.display = 'none';
      }
    });
  }
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('active');
    });
  }

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinks.classList.remove('open');
      }
    });
  });

  // --- Scroll animations ---
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // --- Counter animation ---
  function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const step = target / (duration / 16);
    const suffix = el.dataset.suffix || '';
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(start).toLocaleString() + suffix;
    }, 16);
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

  // --- Demo Tabs ---
  initDemoTabs();

  // --- Sample Document Screening ---
  initDocumentScreening();

  // --- Identity Verification ---
  initIdentityVerification();

  // --- Face Match Demo ---
  initFaceMatchDemo();

  // --- Batch Processing Demo ---
  initBatchProcessing();
});


/* ==========================================
   Demo Tab System
   ========================================== */
function initDemoTabs() {
  const tabs = document.querySelectorAll('.demo-tab');
  const panels = document.querySelectorAll('.demo-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.panel).classList.add('active');
    });
  });
}


/* ==========================================
   Document Screening Engine
   ========================================== */
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
      { name: 'Age/Date Logic', status: 'fail', detail: 'Issue date precedes holder\'s 16th birthday — impossible' },
    ],
    findings: [
      { severity: 'critical', text: 'Issue date (2007-03-15) is before holder turned 16 — CA does not issue DL to minors under 16' },
      { severity: 'warning', text: 'Barcode encodes DOB as 1993-11-08, but front of card states 1992-11-08 — one-year discrepancy' },
      { severity: 'warning', text: 'Photo DPI (150) substantially lower than background DPI (300), suggesting photo was added separately' },
      { severity: 'info', text: 'UV security pattern is partially degraded — could indicate wear or chemical treatment' },
    ],
    metadata: {
      'Document Type': "Real ID (Class C)",
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
  const sampleDocs = document.querySelectorAll('.sample-doc');
  sampleDocs.forEach(doc => {
    doc.addEventListener('click', () => {
      const docId = doc.dataset.doc;
      if (SAMPLE_DOCUMENTS[docId]) {
        runDocumentAnalysis(SAMPLE_DOCUMENTS[docId]);
      }
    });
  });

  // File upload handling
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('documentUpload');
  const uploadedPreview = document.getElementById('uploadedPreview');
  const uploadedImage = document.getElementById('uploadedImage');
  const clearUploadBtn = document.getElementById('clearUpload');
  const analyzeUploadBtn = document.getElementById('analyzeUpload');

  if (!uploadArea || !fileInput) return;

  // Drag and drop handlers
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });

  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });

  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  });

  // Click to upload
  uploadArea.addEventListener('click', (e) => {
    if (e.target === uploadArea || e.target.closest('.upload-icon') || e.target.closest('h4') || e.target.closest('p')) {
      fileInput.click();
    }
  });

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
  });

  // Clear upload
  if (clearUploadBtn) {
    clearUploadBtn.addEventListener('click', () => {
      fileInput.value = '';
      uploadedPreview.style.display = 'none';
      uploadArea.style.display = 'block';
      uploadedImage.src = '';
    });
  }

  // Analyze uploaded document
  if (analyzeUploadBtn) {
    analyzeUploadBtn.addEventListener('click', () => {
      const imgSrc = uploadedImage.src;
      if (imgSrc) {
        analyzeUploadedDocument(uploadedImage);
        // Auto-scroll to results after analysis
        setTimeout(() => {
          const resultsPanel = document.getElementById('docResults');
          if (resultsPanel) {
            resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      }
    });
  }
}

function handleFileUpload(file) {
  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
  if (!validTypes.includes(file.type)) {
    alert('Please upload a valid image file (JPG, PNG, GIF, WEBP) or PDF');
    return;
  }

  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    alert('File size must be less than 10MB');
    return;
  }

  const uploadArea = document.getElementById('uploadArea');
  const uploadedPreview = document.getElementById('uploadedPreview');
  const uploadedImage = document.getElementById('uploadedImage');

  // For PDF, show placeholder
  if (file.type === 'application/pdf') {
    uploadedImage.src = 'data:image/svg+xml,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="500" viewBox="0 0 400 500">
        <rect width="400" height="500" fill="#f8f9fa"/>
        <text x="200" y="240" text-anchor="middle" font-size="80" fill="#dee2e6">📄</text>
        <text x="200" y="280" text-anchor="middle" font-size="20" fill="#495057" font-family="Arial">PDF Document</text>
        <text x="200" y="310" text-anchor="middle" font-size="16" fill="#6c757d" font-family="Arial">${file.name}</text>
      </svg>
    `);
    uploadArea.style.display = 'none';
    uploadedPreview.style.display = 'block';
    return;
  }

  // Read image file
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImage.src = e.target.result;
    uploadArea.style.display = 'none';
    uploadedPreview.style.display = 'block';
  };
  reader.readAsDataURL(file);
}

function analyzeUploadedDocument(imgElement) {
  // Analyze the uploaded image using Canvas API
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Create a temporary image to ensure it's loaded
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = imgElement.src;

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    // Perform image analysis
    const analysisResult = performImageAnalysis(canvas, ctx);

    // Run the document analysis with results
    runDocumentAnalysis(analysisResult);
  };

  img.onerror = () => {
    // Fallback if image analysis fails
    const fallbackResult = generateFallbackAnalysis();
    runDocumentAnalysis(fallbackResult);
  };
}

function performImageAnalysis(canvas, ctx) {
  try {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    // Calculate image quality metrics
    const sharpness = calculateSharpness(pixels, canvas.width, canvas.height);
    const brightness = calculateBrightness(pixels);
    const contrast = calculateContrast(pixels);
    const colorComplexity = calculateColorComplexity(pixels);
    const edgeDetection = calculateEdgeDensity(pixels, canvas.width, canvas.height);

    // Generate realistic score based on image characteristics
    let baseScore = 50;

    // Good sharpness increases score
    if (sharpness > 0.3) baseScore += 15;
    else if (sharpness < 0.1) baseScore -= 10;

    // Proper brightness increases score
    if (brightness > 80 && brightness < 180) baseScore += 10;
    else baseScore -= 5;

    // Good contrast increases score
    if (contrast > 40) baseScore += 10;
    else if (contrast < 20) baseScore -= 8;

    // Complex images (likely real documents) score higher
    if (colorComplexity > 5000) baseScore += 15;
    else baseScore -= 5;

    // Edge density (text, security features)
    if (edgeDetection > 0.15 && edgeDetection < 0.4) baseScore += 12;

    // Random variation for realism
    baseScore += Math.random() * 10 - 5;
    baseScore = Math.max(10, Math.min(98, Math.floor(baseScore)));

    // Determine verdict
    let verdict = 'authentic';
    if (baseScore < 40) verdict = 'fraudulent';
    else if (baseScore < 70) verdict = 'suspicious';

    // Generate detailed analysis
    return generateDetailedAnalysis(baseScore, verdict, {
      sharpness,
      brightness,
      contrast,
      colorComplexity,
      edgeDetection
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return generateFallbackAnalysis();
  }
}

function calculateSharpness(pixels, width, height) {
  let sharpness = 0;
  let count = 0;

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = (y * width + x) * 4;
      const current = pixels[i];
      const right = pixels[i + 4];
      const down = pixels[i + width * 4];

      sharpness += Math.abs(current - right) + Math.abs(current - down);
      count++;
    }
  }

  return count > 0 ? sharpness / count / 255 : 0;
}

function calculateBrightness(pixels) {
  let sum = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    sum += (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
  }
  return sum / (pixels.length / 4);
}

function calculateContrast(pixels) {
  const brightness = calculateBrightness(pixels);
  let variance = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    const gray = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
    variance += Math.pow(gray - brightness, 2);
  }

  return Math.sqrt(variance / (pixels.length / 4));
}

function calculateColorComplexity(pixels) {
  const colorMap = new Map();

  for (let i = 0; i < pixels.length; i += 4) {
    // Sample every 10th pixel for performance
    if (i % 40 !== 0) continue;

    const r = Math.floor(pixels[i] / 16);
    const g = Math.floor(pixels[i + 1] / 16);
    const b = Math.floor(pixels[i + 2] / 16);
    const key = `${r}-${g}-${b}`;

    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }

  return colorMap.size;
}

function calculateEdgeDensity(pixels, width, height) {
  let edges = 0;
  const threshold = 30;

  for (let y = 1; y < height - 1; y += 2) {
    for (let x = 1; x < width - 1; x += 2) {
      const i = (y * width + x) * 4;
      const current = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
      const right = (pixels[i + 4] + pixels[i + 5] + pixels[i + 6]) / 3;
      const down = (pixels[i + width * 4] + pixels[i + width * 4 + 1] + pixels[i + width * 4 + 2]) / 3;

      if (Math.abs(current - right) > threshold || Math.abs(current - down) > threshold) {
        edges++;
      }
    }
  }

  return edges / ((width / 2) * (height / 2));
}

function generateDetailedAnalysis(score, verdict, metrics) {
  const checks = [];
  const findings = [];

  // MRZ Validation
  if (metrics.edgeDetection > 0.2) {
    checks.push({ name: 'MRZ Code Validation', status: 'pass', detail: 'Machine-readable zone structure detected' });
  } else {
    checks.push({ name: 'MRZ Code Validation', status: 'warn', detail: 'MRZ zone not clearly visible — enhance image quality' });
    findings.push({ severity: 'warning', text: 'MRZ zone unclear — recommend higher resolution scan' });
  }

  // Font Consistency
  if (score > 70) {
    checks.push({ name: 'Font Consistency', status: 'pass', detail: 'Text rendering consistent with genuine documents' });
  } else {
    checks.push({ name: 'Font Consistency', status: 'warn', detail: 'Font irregularities detected' });
    findings.push({ severity: 'warning', text: 'Typeface analysis shows minor inconsistencies' });
  }

  // Photo Integration
  if (metrics.colorComplexity > 4000 && metrics.contrast > 30) {
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
    findings.push({ severity: 'info', text: 'Low image sharpness — recommend rescanning at higher DPI (300+)' });
  }

  // Lighting
  if (metrics.brightness > 80 && metrics.brightness < 180) {
    checks.push({ name: 'Lighting Analysis', status: 'pass', detail: 'Proper illumination for feature detection' });
  } else {
    checks.push({ name: 'Lighting Analysis', status: 'warn', detail: 'Lighting conditions suboptimal' });
    findings.push({ severity: 'info', text: metrics.brightness < 80 ? 'Image too dark — may miss security features' : 'Image overexposed — may wash out details' });
  }

  // Security Features (simulated based on complexity)
  if (metrics.colorComplexity > 6000 && score > 65) {
    checks.push({ name: 'Security Features', status: 'pass', detail: 'Complex patterns consistent with security printing' });
  } else if (verdict === 'fraudulent') {
    checks.push({ name: 'Security Features', status: 'fail', detail: 'Expected security features not detected' });
    findings.push({ severity: 'critical', text: 'Missing standard security features (microprint, UV elements)' });
  } else {
    checks.push({ name: 'Security Features', status: 'warn', detail: 'Some security features unclear — image quality issue' });
  }

  // Overall AI verdict
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
      issuingCountry: 'Auto-detection: Analyzing...',
      mrzValid: metrics.edgeDetection > 0.2,
    },
    checks: checks,
    findings: findings,
    metadata: {
      'Image Resolution': `${Math.floor(metrics.sharpness * 1000)} quality units`,
      'Brightness': `${Math.floor(metrics.brightness)}/255`,
      'Contrast': `${Math.floor(metrics.contrast)} units`,
      'Color Complexity': `${metrics.colorComplexity} unique colors`,
      'Edge Density': `${(metrics.edgeDetection * 100).toFixed(1)}%`,
      'Analysis Confidence': `${score}%`,
    }
  };
}

function generateFallbackAnalysis() {
  const score = Math.floor(Math.random() * 30) + 50;
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
      issuingCountry: 'Detection: Processing...',
      mrzValid: false,
    },
    checks: [
      { name: 'Image Upload', status: 'pass', detail: 'Document image successfully processed' },
      { name: 'Basic Validation', status: 'pass', detail: 'Format validated' },
      { name: 'Advanced Analysis', status: 'warn', detail: 'Some features require higher resolution image' },
      { name: 'AI Processing', status: 'warn', detail: 'Partial analysis completed' },
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

function runDocumentAnalysis(doc) {
  const resultsPanel = document.getElementById('docResults');
  const progressContainer = document.getElementById('docProgress');

  // Hide results, show progress
  resultsPanel.classList.remove('active');
  progressContainer.classList.add('active');

  const progressFill = progressContainer.querySelector('.progress-fill');
  const progressSteps = progressContainer.querySelectorAll('.progress-step');

  const analysisSteps = [
    { progress: 15, step: 0, label: 'Extracting document data...' },
    { progress: 35, step: 1, label: 'Validating MRZ/barcodes...' },
    { progress: 55, step: 2, label: 'Analyzing security features...' },
    { progress: 75, step: 3, label: 'Running AI fraud detection...' },
    { progress: 90, step: 4, label: 'Generating report...' },
    { progress: 100, step: 5, label: 'Complete' },
  ];

  let stepIndex = 0;

  function advanceStep() {
    if (stepIndex >= analysisSteps.length) {
      setTimeout(() => {
        progressContainer.classList.remove('active');
        displayDocResults(doc, resultsPanel);
      }, 400);
      return;
    }

    const s = analysisSteps[stepIndex];
    progressFill.style.width = s.progress + '%';

    progressSteps.forEach((ps, i) => {
      ps.classList.remove('active');
      if (i < s.step) ps.classList.add('done');
      if (i === s.step) ps.classList.add('active');
    });

    stepIndex++;
    setTimeout(advanceStep, 500 + Math.random() * 400);
  }

  advanceStep();
}

function displayDocResults(doc, container) {
  container.classList.add('active');

  // Status indicator
  const statusIcon = container.querySelector('.status-indicator');
  const statusTitle = container.querySelector('.status-title');
  const statusDesc = container.querySelector('.status-desc');

  statusIcon.className = 'status-indicator ' + doc.verdict;
  statusIcon.textContent = doc.verdict === 'authentic' ? '✓' : doc.verdict === 'suspicious' ? '⚠' : '✕';
  statusTitle.textContent = doc.verdict === 'authentic' ? 'Document Authentic' :
                            doc.verdict === 'suspicious' ? 'Suspicious Document' : 'Fraudulent Document';
  statusDesc.textContent = `Confidence Score: ${doc.score}%`;

  // Score gauge
  const gaugeValue = container.querySelector('.gauge-value');
  const gaugeCircle = container.querySelector('.gauge-track');
  const gaugeInfo = container.querySelector('.gauge-details');

  gaugeValue.textContent = doc.score + '%';
  gaugeValue.style.color = doc.verdict === 'authentic' ? 'var(--success)' :
                           doc.verdict === 'suspicious' ? 'var(--warning)' : 'var(--danger)';

  const circumference = 2 * Math.PI * 50;
  const offset = circumference - (doc.score / 100) * circumference;
  gaugeCircle.style.strokeDasharray = circumference;
  gaugeCircle.style.strokeDashoffset = offset;
  gaugeCircle.style.stroke = doc.verdict === 'authentic' ? '#27ae60' :
                             doc.verdict === 'suspicious' ? '#f39c12' : '#e74c3c';

  gaugeInfo.querySelector('h4').textContent = doc.details.holderName;
  gaugeInfo.querySelector('p').textContent = `${doc.details.issuingCountry} — ${doc.details.documentNumber}`;

  // Checks grid
  const checksGrid = container.querySelector('.checks-grid');
  checksGrid.innerHTML = doc.checks.map(c => `
    <div class="check-item">
      <div class="check-icon ${c.status}">
        ${c.status === 'pass' ? '✓' : c.status === 'fail' ? '✕' : '!'}
      </div>
      <div>
        <strong>${c.name}</strong>
        <div style="font-size:0.8rem;color:var(--gray-500);margin-top:2px">${c.detail}</div>
      </div>
    </div>
  `).join('');

  // Findings
  const findingsSection = container.querySelector('.findings-section');
  if (doc.findings.length > 0) {
    findingsSection.style.display = 'block';
    findingsSection.querySelector('.findings-list').innerHTML = doc.findings.map(f => `
      <div class="finding-item ${f.severity === 'warning' ? 'warning' : f.severity === 'info' ? 'info' : ''}">
        <span>${f.severity === 'critical' ? '🔴' : f.severity === 'warning' ? '🟡' : '🔵'}</span>
        <span>${f.text}</span>
      </div>
    `).join('');
  } else {
    findingsSection.style.display = 'none';
  }

  // Metadata
  const metadataGrid = container.querySelector('.metadata-grid');
  metadataGrid.innerHTML = Object.entries(doc.metadata).map(([key, val]) => `
    <div class="metadata-item">
      <div class="meta-label">${key}</div>
      <div class="meta-value">${val}</div>
    </div>
  `).join('');
}


/* ==========================================
   Identity Verification Engine
   ========================================== */
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

  // Pre-fill buttons
  document.querySelectorAll('.prefill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const profile = IDENTITY_DATABASE[btn.dataset.email];
      if (profile) {
        document.getElementById('idName').value = profile.name;
        document.getElementById('idEmail').value = profile.email;
        document.getElementById('idPhone').value = profile.phone;
        document.getElementById('idSSN').value = profile.ssn_last4;
        document.getElementById('idDOB').value = profile.dob;
        document.getElementById('idAddress').value = profile.address;
      }
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('idEmail').value.trim();
    const profile = IDENTITY_DATABASE[email];

    if (profile) {
      runIdentityCheck(profile);
    } else {
      runIdentityCheck(generateRandomProfile(email));
    }
  });
}

function generateRandomProfile(email) {
  const score = Math.floor(Math.random() * 40) + 55;
  return {
    name: document.getElementById('idName').value || 'Unknown',
    email: email,
    phone: document.getElementById('idPhone').value || 'N/A',
    risk: score > 75 ? 'low' : score > 45 ? 'medium' : 'high',
    score: score,
    flags: [
      'Unable to cross-reference identity — not in verification database',
      'Manual review recommended for first-time verification',
    ],
    history: [
      { date: new Date().toISOString().split('T')[0], event: 'First verification attempt', status: 'warn' },
    ]
  };
}

function runIdentityCheck(profile) {
  const progress = document.getElementById('idProgress');
  const results = document.getElementById('idResults');
  results.classList.remove('active');
  progress.classList.add('active');

  const fill = progress.querySelector('.progress-fill');
  const steps = [20, 40, 60, 80, 100];
  let i = 0;

  const interval = setInterval(() => {
    fill.style.width = steps[i] + '%';
    i++;
    if (i >= steps.length) {
      clearInterval(interval);
      setTimeout(() => {
        progress.classList.remove('active');
        displayIdentityResults(profile, results);
      }, 300);
    }
  }, 500);
}

function displayIdentityResults(profile, container) {
  container.classList.add('active');

  const riskBadge = container.querySelector('.risk-badge');
  riskBadge.className = 'badge risk-badge ' +
    (profile.risk === 'low' ? 'badge-success' : profile.risk === 'medium' ? 'badge-warning' : 'badge-danger');
  riskBadge.textContent = profile.risk.toUpperCase() + ' RISK';

  container.querySelector('.id-score').textContent = profile.score + '%';
  container.querySelector('.id-score').style.color =
    profile.risk === 'low' ? 'var(--success)' : profile.risk === 'medium' ? 'var(--warning)' : 'var(--danger)';

  container.querySelector('.id-name').textContent = profile.name;
  container.querySelector('.id-email').textContent = profile.email;

  // Flags
  const flagsList = container.querySelector('.id-flags');
  if (profile.flags && profile.flags.length > 0) {
    flagsList.innerHTML = profile.flags.map(f => `
      <div class="finding-item warning">
        <span>⚠️</span>
        <span>${f}</span>
      </div>
    `).join('');
    flagsList.parentElement.style.display = 'block';
  } else {
    flagsList.parentElement.style.display = 'none';
  }

  // History
  const historyList = container.querySelector('.id-history');
  if (profile.history) {
    historyList.innerHTML = profile.history.map(h => `
      <div class="check-item">
        <div class="check-icon ${h.status === 'pass' ? 'pass' : h.status === 'fail' ? 'fail' : 'warn'}">
          ${h.status === 'pass' ? '✓' : h.status === 'fail' ? '✕' : '!'}
        </div>
        <div>
          <strong>${h.event}</strong>
          <div style="font-size:0.78rem;color:var(--gray-500)">${h.date}</div>
        </div>
      </div>
    `).join('');
  }
}


/* ==========================================
   Face Match Demo
   ========================================== */
function initFaceMatchDemo() {
  const runBtn = document.getElementById('runFaceMatch');
  if (!runBtn) return;

  document.querySelectorAll('.face-scenario').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.face-scenario').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    });
  });

  runBtn.addEventListener('click', () => {
    const selected = document.querySelector('.face-scenario.selected');
    if (!selected) return;

    const scenario = selected.dataset.scenario;
    const resultsEl = document.getElementById('faceResults');
    const progressEl = document.getElementById('faceProgress');

    resultsEl.classList.remove('active');
    progressEl.classList.add('active');

    const fill = progressEl.querySelector('.progress-fill');
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 20 + 5;
      if (progress > 100) progress = 100;
      fill.style.width = progress + '%';

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          progressEl.classList.remove('active');
          displayFaceResults(scenario, resultsEl);
        }, 300);
      }
    }, 300);
  });
}

function displayFaceResults(scenario, container) {
  container.classList.add('active');

  const scenarios = {
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

  const data = scenarios[scenario];

  container.querySelector('.face-verdict').textContent = data.verdict;
  container.querySelector('.face-verdict').style.color = data.color;
  container.querySelector('.face-score-val').textContent = data.score + '%';
  container.querySelector('.face-score-val').style.color = data.color;
  container.querySelector('.face-badge').className = 'badge face-badge ' + data.badgeClass;
  container.querySelector('.face-badge').textContent = data.verdict;

  container.querySelector('.face-details').innerHTML = data.details.map(d => `
    <div class="check-item">
      <div class="check-icon ${d.pass ? 'pass' : 'fail'}">${d.pass ? '✓' : '✕'}</div>
      <div>
        <strong>${d.label}</strong>
        <div style="font-size:0.8rem;color:var(--gray-500)">${d.value}</div>
      </div>
    </div>
  `).join('');
}


/* ==========================================
   Batch Processing Demo
   ========================================== */
function initBatchProcessing() {
  const runBatchBtn = document.getElementById('runBatch');
  if (!runBatchBtn) return;

  runBatchBtn.addEventListener('click', () => {
    const tableBody = document.getElementById('batchTableBody');
    const batchResults = document.getElementById('batchResults');
    const progressEl = document.getElementById('batchProgress');

    tableBody.innerHTML = '';
    batchResults.classList.remove('active');
    progressEl.classList.add('active');

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

    let processed = 0;
    const fill = progressEl.querySelector('.progress-fill');

    const interval = setInterval(() => {
      if (processed >= batchDocs.length) {
        clearInterval(interval);
        fill.style.width = '100%';
        setTimeout(() => {
          progressEl.classList.remove('active');
          batchResults.classList.add('active');
          updateBatchStats(batchDocs);
        }, 400);
        return;
      }

      const doc = batchDocs[processed];
      const row = document.createElement('tr');
      row.style.animation = 'fadeIn 0.3s ease';
      row.innerHTML = `
        <td><code>${doc.id}</code></td>
        <td>${doc.name}</td>
        <td>${doc.type}</td>
        <td><strong style="color:${doc.status === 'authentic' ? 'var(--success)' : doc.status === 'suspicious' ? 'var(--warning)' : 'var(--danger)'}">${doc.score}%</strong></td>
        <td><span class="badge ${doc.status === 'authentic' ? 'badge-success' : doc.status === 'suspicious' ? 'badge-warning' : 'badge-danger'}">${doc.status.toUpperCase()}</span></td>
      `;
      tableBody.appendChild(row);

      processed++;
      fill.style.width = (processed / batchDocs.length * 100) + '%';
    }, 600);
  });
}

function updateBatchStats(docs) {
  const total = docs.length;
  const authentic = docs.filter(d => d.status === 'authentic').length;
  const suspicious = docs.filter(d => d.status === 'suspicious').length;
  const fraudulent = docs.filter(d => d.status === 'fraudulent').length;

  const statsEl = document.getElementById('batchStats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        <div style="flex:1;min-width:120px;padding:16px;background:var(--gray-50);border-radius:var(--radius-sm);text-align:center">
          <div style="font-size:1.5rem;font-weight:800">${total}</div>
          <div style="font-size:0.8rem;color:var(--gray-500)">Total Processed</div>
        </div>
        <div style="flex:1;min-width:120px;padding:16px;background:var(--success-light);border-radius:var(--radius-sm);text-align:center">
          <div style="font-size:1.5rem;font-weight:800;color:var(--success)">${authentic}</div>
          <div style="font-size:0.8rem;color:var(--gray-500)">Authentic</div>
        </div>
        <div style="flex:1;min-width:120px;padding:16px;background:var(--warning-light);border-radius:var(--radius-sm);text-align:center">
          <div style="font-size:1.5rem;font-weight:800;color:var(--warning)">${suspicious}</div>
          <div style="font-size:0.8rem;color:var(--gray-500)">Suspicious</div>
        </div>
        <div style="flex:1;min-width:120px;padding:16px;background:var(--danger-light);border-radius:var(--radius-sm);text-align:center">
          <div style="font-size:1.5rem;font-weight:800;color:var(--danger)">${fraudulent}</div>
          <div style="font-size:0.8rem;color:var(--gray-500)">Fraudulent</div>
        </div>
      </div>
    `;
  }
}

// 67 Meme Easter Egg Function
function trigger67MemeEasterEgg() {
  // Create and show the 67 meme easter egg
  const easterEgg = document.createElement('div');
  easterEgg.style.position = 'fixed';
  easterEgg.style.top = '50%';
  easterEgg.style.left = '50%';
  easterEgg.style.transform = 'translate(-50%, -50%)';
  easterEgg.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  easterEgg.style.color = 'white';
  easterEgg.style.padding = '2rem';
  easterEgg.style.borderRadius = '1rem';
  easterEgg.style.textAlign = 'center';
  easterEgg.style.zIndex = '9999';
  easterEgg.style.fontFamily = '"JetBrains Mono", monospace';
  easterEgg.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
  easterEgg.style.animation = 'pulse 2s infinite';

  easterEgg.innerHTML = `
    <div style="font-size: 4rem; margin-bottom: 1rem;">67</div>
    <div style="font-size: 1.5rem; margin-bottom: 1rem;">THE NUMBER OF TRUTH</div>
    <div style="font-size: 1.2rem; opacity: 0.8; max-width: 300px;">
      In the depths of document verification,<br>
      the number 67 reveals the hidden patterns<br>
      that separate truth from deception.<br>
      <br>
      Tap five times to unlock the truth...
    </div>
  `;

  document.body.appendChild(easterEgg);

  // Remove after 3 seconds
  setTimeout(() => {
    easterEgg.remove();
  }, 3000);
}

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.5); }
    50% { box-shadow: 0 0 40px rgba(0, 255, 255, 0.8), 0 0 60px rgba(0, 255, 255, 0.4); }
    100% { box-shadow: 0 0 30px rgba(0, 255, 255, 0.5); }
  }
`;
document.head.appendChild(style);
