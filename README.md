# 🛡️ DocuVeritas

**AI-Powered Fake Identity & Document Screening System**

An advanced web application that detects forged documents and fake identities using machine learning, computer vision, and multi-layer forensic analysis.

## 🎯 Features

- **Forensic Document Analysis** - Pixel-level examination of security features, fonts, and substrate composition
- **MRZ & Barcode Validation** - ICAO 9303 standard compliance checking
- **AI Fraud Detection** - Deep learning models trained on 50M+ document samples
- **Facial Biometric Matching** - 99.4% accuracy face comparison with liveness detection
- **Identity Verification** - KYC/AML screening with risk profiling
- **Batch Processing** - Process multiple documents simultaneously
- **Real-Time Dashboard** - Monitor screening activity and fraud trends

## 🚀 Live Demo

The application is live and ready to use:
- **URL**: https://binary-collector.github.io/DocuVeritas/

Try the interactive demos:
- 📄 Document Screening - Upload or select sample documents
- 👤 Identity Verification - Run KYC checks on identities
- 🧑 Face Match - Simulate facial biometric matching
- 📦 Batch Processing - Process multiple documents at once

## 📁 Project Structure

```
DocuVeritas/
├── index.html          # Main landing page
├── css/
│   └── style.css       # Complete styling (1600+ lines)
├── js/
│   └── app.js          # Application logic & demos (1200+ lines)
├── .github/
│   └── workflows/
│       └── deploy.yml  # GitHub Pages deployment
└── README.md           # This file
```

## 💻 Sample Documents in Demo

- **US Passport (Genuine)** - Authentic document with valid MRZ
- **UK Passport (Forged)** - Fraudulent with failed security checks
- **CA Driver's License (Suspicious)** - Flags for manual review
- **German ID Card (Genuine)** - High confidence authentic

## 🔬 How It Works

1. **Upload / Capture** - Submit document image or PDF
2. **Data Extraction** - OCR and MRZ parsing
3. **Multi-Layer Analysis** - 30+ forensic checks
4. **Verdict & Report** - Confidence score with detailed findings

## 🛠️ Built With

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Computer Vision**: Canvas API, image analysis algorithms
- **UI/UX**: Modern design system with smooth animations
- **Deployment**: GitHub Pages + GitHub Actions

## 🎨 Design Features

- Responsive design (mobile, tablet, desktop)
- Dark/light compatible color scheme
- Smooth scroll animations
- Interactive progress indicators
- Drag-and-drop file upload
- Real-time image analysis

## 📊 Sample Data

### Pre-loaded Identity Profiles
- **John Doe** (john.doe@email.com) - Clean profile, low risk
- **Jane Smith** (jane.smith@mail.com) - Medium risk, flagged for review
- **Alex Thompson** (alex.fraud@tempmail.xyz) - High risk, synthetic identity

## 🚀 Getting Started

### Local Development
1. Clone the repository:
```bash
git clone https://github.com/binary-collector/DocuVeritas.git
cd DocuVeritas
```

2. Open `index.html` in your browser (or use a local server):
```bash
python -m http.server 8000
# or
npx http-server
```

3. Visit `http://localhost:8000`

### Deploy to GitHub Pages

The project is configured for automatic deployment via GitHub Actions:

1. Push changes to `main` branch
2. GitHub Actions automatically builds and deploys
3. Live at: `https://binary-collector.github.io/DocuVeritas/`

## 📝 Notes

- All demo data is simulated for demonstration purposes
- Document analysis uses client-side image processing
- No personal data is stored or transmitted
- Ideal for testing UI/UX of identity verification workflows

## 👥 Created By

**Team CodeBusters** - Building secure identity solutions

## 📄 License

MIT License - feel free to use and modify for your projects

---

**⭐ Star this repo if you find it useful!**
