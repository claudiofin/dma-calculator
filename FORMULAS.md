# 📐 DMA Calculator - Formulas & Calculation Methodology

This document describes in detail all the formulas used in the **DMA Calculator** to calculate commissions and costs across various app distribution scenarios in the European Union under the Digital Markets Act (DMA) 2026.

---

## 📊 Distribution Models Overview

The calculator supports 3 distribution models for each store:

| Model Code | Name | Description |
|------------|------|-------------|
| `iap-standard` | In-App Purchase Standard | Purchases through native store payment system |
| `external-tier1` | External Tier 1 | External link with reduced fees (link only) |
| `external-tier2` | External Tier 2 | Complete external checkout with processing |

---

## 🧮 Input Variables

| Variable | Type | Description |
|----------|------|-------------|
| `monthlyUsers` | Number | Monthly paying users |
| `monthlyPrice` | Number (€) | Monthly subscription/product price |
| `conversionImpact` | Percentage (0-50%) | Estimated conversion drop for external models |
| `userAgeMonths` | Number | Months since user installation |
| `isSmallBusiness` | Boolean | Annual revenue < €1M |
| `isSubscriptionAfterYear` | Boolean | Subscription after the first year |

---

## 📈 Core Formulas

### Monthly Gross Revenue
```
Gross Revenue = monthlyUsers × monthlyPrice
```

### Adjusted Revenue (for external models)
```
Adjusted Revenue = Gross Revenue × (1 - conversionImpact / 100)
```

### Commission Cost
```
Cost = Revenue × (commissionRate / 100)
```

### Net Revenue
```
Net = Revenue - Cost
```

### 💡 Understanding "Annual Savings"

The **Annual Savings** displayed in the calculator represents:

```
Annual Savings = (External Model Net - IAP Standard Net) × 12
```

**What are we comparing?**
- **Baseline**: IAP Standard (native in-app purchase) at 30% or 15% (Small Business / Year 2+ subscribers)
- **Alternative**: Your selected External model (Tier 1 or Tier 2)

**Interpretation:**
- ✅ **Positive value**: External model saves you money vs IAP Standard
- ❌ **Negative value**: External model costs more than staying with IAP Standard (usually due to conversion drop)

---

## 🍎 Apple - DMA 2026 Commission Table

### IAP Standard (In-App Purchase)

| Condition | Commission Rate | Cost Formula |
|-----------|-----------------|--------------|
| Small Business (< €1M/year) | **15%** | `Revenue × 0.15` |
| Subscription after 1st year | **15%** | `Revenue × 0.15` |
| Standard | **30%** | `Revenue × 0.30` |

### External Tier 1 (External Link)

| Component | Rate | Notes |
|-----------|------|-------|
| Core Technology Commission (CTC) | **5%** | Always applied |
| Store Services (Tier 1) | **5%** | Basic external link |
| Initial Acquisition Fee (IAF) | **2%** | Only if `userAgeMonths < 6` AND not Small Business |
| Payment Processor (Stripe, etc.) | **~2.9%** | External cost |

**Tier 1 Total Formula:**
```
Rate = 5% (CTC) + 5% (Services) + [2% IAF if applicable] + 2.9% (Payment)
Cost = Adjusted Revenue × Rate
```

| Scenario | Total Rate |
|----------|------------|
| New user (< 6 months), not Small Business | **14.9%** |
| New user, Small Business | **12.9%** |
| Existing user (≥ 6 months) | **12.9%** |

### External Tier 2 (Complete External Checkout)

| Component | Rate | Notes |
|-----------|------|-------|
| Core Technology Commission (CTC) | **5%** | Always applied |
| Store Services (Tier 2) - Standard | **13%** | Standard Business |
| Store Services (Tier 2) - Small | **10%** | Small Business (< €1M) |
| Initial Acquisition Fee (IAF) | **2%** | Only if `userAgeMonths < 6` AND not Small Business |
| Payment Processor (Stripe, etc.) | **~2.9%** | External cost |

**Tier 2 Total Formula:**
```
Rate = 5% (CTC) + [13% or 10% Services] + [2% IAF if applicable] + 2.9% (Payment)
Cost = Adjusted Revenue × Rate
```

| Scenario | Total Rate |
|----------|------------|
| Standard, new user | **22.9%** |
| Standard, existing user | **20.9%** |
| Small Business, new user | **17.9%** |
| Small Business, existing user | **17.9%** |

---

## 🤖 Google - DMA 2026 Commission Table

### IAP Standard (Play Billing)

| Condition | Commission Rate | Cost Formula |
|-----------|-----------------|--------------|
| Small Business (< €1M/year) | **15%** | `Revenue × 0.15` |
| Subscription after 1st year | **15%** | `Revenue × 0.15` |
| Standard | **30%** | `Revenue × 0.30` |

### External Tier 1 (External Offers - Base)

| Component | Rate | Notes |
|-----------|------|-------|
| Ongoing Services Fee (Tier 1) | **10%** | Basic external services |
| Initial Acquisition Fee (IAF) | **3%** | For 6 months from installation |
| Payment Processor (Stripe, etc.) | **~2.9%** | External cost |

**Tier 1 Total Formula:**
```
Rate = 10% (Services) + [3% IAF if userAgeMonths < 6] + 2.9% (Payment)
Cost = Adjusted Revenue × Rate
```

| Scenario | Total Rate |
|----------|------------|
| New user (< 6 months) | **15.9%** |
| Existing user (≥ 6 months) | **12.9%** |

### External Tier 2 (External Offers - Complete)

| Component | Rate | Notes |
|-----------|------|-------|
| Ongoing Services Fee (Tier 1 + Tier 2) | **20%** | 10% base + 10% additional |
| Initial Acquisition Fee (IAF) | **3%** | For 6 months from installation |
| Payment Processor (Stripe, etc.) | **~2.9%** | External cost |

**Tier 2 Total Formula:**
```
Rate = 20% (Services) + [3% IAF if userAgeMonths < 6] + 2.9% (Payment)
Cost = Adjusted Revenue × Rate
```

| Scenario | Total Rate |
|----------|------------|
| New user (< 6 months) | **25.9%** |
| Existing user (≥ 6 months) | **22.9%** |

---

## 🔄 Quick Comparison

### Apple - All Models Compared

| Model | Min Rate | Max Rate | Notes |
|-------|----------|----------|-------|
| IAP Standard | 15% | 30% | Small Business or Year 2+ vs Standard |
| External Tier 1 | 12.9% | 14.9% | + conversion drop |
| External Tier 2 | 17.9% | 22.9% | + conversion drop |

### Google - All Models Compared

| Model | Min Rate | Max Rate | Notes |
|-------|----------|----------|-------|
| IAP Standard | 15% | 30% | Small Business or Year 2+ vs Standard |
| External Tier 1 | 12.9% | 15.9% | + conversion drop |
| External Tier 2 | 22.9% | 25.9% | + conversion drop |

---

## ⚠️ Conversion Impact Factor

The **Conversion Impact** is a negative multiplier that simulates conversion drop when users are redirected outside the store.

```
Effective Revenue = Gross Revenue × (1 - conversionImpact%)
```

**Examples:**
| Conversion Impact | Revenue €10,000 | Effective Revenue |
|-------------------|-----------------|-------------------|
| 0% | €10,000 | €10,000 |
| 10% | €10,000 | €9,000 |
| 20% | €10,000 | €8,000 |
| 30% | €10,000 | €7,000 |

---

## 📚 Official Sources

Formulas are based on official policies updated for 2026:

- **Apple**: [Alternative Business Terms EU](https://developer.apple.com/support/alternative-business-terms-for-apps-in-the-eu/)
- **Google**: [External Offers Program EU](https://support.google.com/googleplay/android-developer/answer/15555432)

---

## 🔢 Practical Example

**Input:**
- Monthly users: 1,000
- Price: €9.99
- Conversion Impact: 15%
- User Age: 3 months
- Small Business: No

**Apple IAP Standard Calculation:**
```
Revenue = 1,000 × €9.99 = €9,990
Commission = 30%
Cost = €9,990 × 0.30 = €2,997
Net = €9,990 - €2,997 = €6,993
```

**Apple External Tier 1 Calculation:**
```
Adjusted Revenue = €9,990 × (1 - 0.15) = €8,491.50
Rate = 5% (CTC) + 5% (Services) + 2% (IAF new user) + 2.9% (Payment) = 14.9%
Cost = €8,491.50 × 0.149 = €1,265.23
Net = €8,491.50 - €1,265.23 = €7,226.27
```

**Annual Savings Calculation:**
```
Monthly Savings = €7,226.27 - €6,993 = €233.27
Annual Savings = €233.27 × 12 = €2,799.24
```
✅ In this case, External Tier 1 saves ~€2,800/year vs IAP Standard despite the 15% conversion drop.

---

> **Note**: This calculator is an educational tool. Always consult official sources and a tax advisor for business decisions.
