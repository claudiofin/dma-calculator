# DMA Calculator 2026 🇪🇺 📱

A professional React Native application built with **Expo** to simulate the financial impact of the **Digital Markets Act (DMA)** on mobile apps distributed in the European Union.

This tool helps developers and businesses decide whether to stick with the standard **In-App Purchase (IAP)** model or switch to **External Offers / Link Entitlements**, by calculating net revenue, commissions, and potential savings in real-time.

## 🎯 Key Features

*   **Dual Platform Support**: Simulates both **Apple** (Core Technology Commission) and **Google** (External Offers Program) models.
*   **Granular User Split**: Define the exact percentage of users on iOS vs. Android (e.g., 60/40) to strictly avoid double-counting.
*   **Official DMA Formulas (2026)**:
    *   **Apple**: Implements the 5% Core Technology Commission + Store Services (Tier 1/2).
    *   **Google**: Implements the corrected Tier 2 rate (20%) + Tier 1 (10%).
*   **Interactive Simulation**:
    *   Adjust Monthly Users, Price, Retention (User Age).
    *   Simulate **Conversion Drop** due to warning screens.
    *   Toggle **Small Business Program** (<$1M revenue).
*   **Verified Sources**: Includes links to official Apple/Google documentation and compliance blogs.

## 🛠 Tech Stack

*   **Framework**: [Expo](https://expo.dev) (SDK 52+) / React Native 0.76
*   **Language**: TypeScript
*   **Styling**: NativeWind (Tailwind CSS) & StyleSheet
*   **Animations**: Moti (powered by Reanimated)
*   **Testing**: Vitest + React Testing Library (100% Logic Coverage)
*   **Routing**: Expo Router

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or yarn
*   Xcode (for iOS Simulator) or Android Studio

### Installation

```bash
# Clone the repository
git clone https://github.com/claudiofin/dma-calculator.git

# Enter directory
cd dma-calculator

# Install dependencies
npm install
```

### Running the App

```bash
# Run on iOS Simulator (Recommended)
npx expo run:ios

# Run on Android Emulator
npx expo run:android

# Run with Expo Go
npx expo start
```

### Running Tests

We maintain a strict test suite to ensure financial accuracy.

```bash
npm test
```

## 📚 Logic Verification

The calculator logic is audited against the official DMA terms for January 2026:
*   **Apple External**: CTC (5%) + Service (10% SB / 20% Standard) + IAF.
*   **Google External**: Tier 1 (10%) + Tier 2 (10%) + Fees.

📐 **[View Full Formula Documentation](./FORMULAS.md)** — Complete breakdown of all calculations, rates, and methodology with examples.

## ⚠️ Disclaimer

This application provides estimates based on publicly available policy documents. It does not constitute legal or financial advice. Commission rates and terms are subject to change by platform holders.
