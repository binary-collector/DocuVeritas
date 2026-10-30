# 🛡️ DocuVeritas

**AI-Based Fake Identity & Document Screening System**  
*Created by Team CodeBusters (Poornima College of Engineering) for Smart India Hackathon (SIH) 2026*

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=github)](https://binary-collector.github.io/DocuVeritas/)
[![Status](https://img.shields.io/badge/Status-Active-blue?style=for-the-badge)](https://binary-collector.github.io/DocuVeritas/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

An intelligent client-side document verification and identity risk assessment suite that detects forged documents, synthetic identities, and digital tampering in real time using multi-layer forensic heuristics, computer vision, and biometric matching.

---

## 🚀 Live Demo

Experience the live application deployed on GitHub Pages:  
👉 **[https://binary-collector.github.io/DocuVeritas/](https://binary-collector.github.io/DocuVeritas/)**

---

## 🎯 Key Capabilities

- **🔬 Forensic Document Analysis** — Examines font consistency, microprinting boundaries, UV-reactive patterns, holographic overlays, and paper substrate integrity.
- **🧬 MRZ & Barcode Validation** — Validates Machine-Readable Zones (ICAO 9303 standard: TD1 & TD3), PDF417 barcodes, and cryptographic check digits.
- **🤖 AI Fraud Detection** — Multi-layer anomaly detection and heuristic computer vision models to flag digital splicing, font mismatch, and tampering in real time.
- **👤 Facial Biometric Matching** — Compares identity document portrait photos to user selfies with liveness detection and GAN/deepfake artifact detection.
- **📋 KYC / AML Identity Screening** — Evaluates risk scores, disposable email domains, synthetic SSN patterns, and address consistency.
- **📦 High-Speed Batch Processing** — Demonstrates multi-document pipeline processing with real-time throughput metrics.
- **📊 Real-Time Screening Dashboard** — Interactive distribution metrics, threat categorizations, and top fraud indicator trends.

---

## 📁 Clean Repository Structure

```
DocuVeritas/
├── .github/
│   └── workflows/
│       └── deploy.yml    # Automated GitHub Pages CI/CD pipeline
├── css/
│   └── style.css         # Modern, responsive design system & theme tokens
├── js/
│   └── app.js            # Fast, memory-efficient screening logic & demos
├── .gitattributes        # Git repository attributes
├── .gitignore            # Clean environment & artifact rules
├── .nojekyll             # GitHub Pages Jekyll bypass flag
├── index.html            # Landing page & interactive screening suite
└── README.md             # Project documentation
```

---

## 🔬 How It Works

1. **Upload & Pre-Processing** — Captures or ingests documents (JPEG, PNG, WebP, PDF) and normalizes dimensions, brightness, and contrast.
2. **Feature Extraction** — Evaluates edge densities, color complexity metrics, and typefaces across designated security zones.
3. **Multi-Layer Screening** — Runs 30+ forensic verification heuristics across physical, digital, and data-consistency layers.
4. **Confidence Scoring & Audit Trail** — Outputs a granular confidence score with explainable pass/warn/fail indicators and anomalies.

---

## 🛠️ Technology Stack

- **Core**: Vanilla HTML5, Modern CSS3 (Custom Properties & Responsive Grid/Flexbox), ES6+ JavaScript
- **Vision & Image Engine**: HTML5 Canvas API, spatial pixel heuristics, zero-allocation color hashing
- **Hosting & CI/CD**: GitHub Pages, GitHub Actions (`deploy.yml`)

---

## 👥 Built by Team CodeBusters

Poornima College of Engineering (Batch: 2026–30) — Smart India Hackathon (SIH) 2026 Prototype

| Member | Role | Responsibility |
| :--- | :--- | :--- |
| **Deepak Rathore** | Team Leader | Project Management & Full-Stack Development |
| **Yatin Thenua** | Tech Lead | AI/ML Architecture & Computer Vision |
| **Nagesh Yadav** | Tech Backup | Backend Development & Database Management |
| **Vishal Makhija** | Frontend Developer | UI/UX Design & Responsive Implementation |
| **Nandhini Saini** | QA & Testing | Quality Assurance, Validation & Testing |
| **Mahi Agarwal** | Documentation & Research | Technical Documentation & SIH Coordination |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
