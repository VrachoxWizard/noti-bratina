---
name: mobile-design
description: "Mobile-first design and engineering doctrine for iOS and Android apps. Covers touch interaction, performance, platform conventions, offline behavior, and mobile-specific decision-making."
risk: unknown
source: community
date_added: "2026-02-27"
---

# Mobile Design System

**(Mobile-First · Touch-First · Platform-Respectful)**

> **Philosophy:** Touch-first. Battery-conscious. Platform-respectful. Offline-capable.
> **Core Law:** Mobile is NOT a small desktop.
> **Operating Rule:** Think constraints first, aesthetics second.

---

## 1. Mobile Feasibility & Risk Index (MFRI)

Before designing or implementing any mobile feature, assess feasibility.

### MFRI Dimensions (1-5)

- **Platform Clarity** — Is the target platform (iOS / Android / both) defined?
- **Interaction Complexity** — How complex are gestures, flows, or navigation?
- **Performance Risk** — Lists, animations, heavy state, or media?
- **Offline Dependence** — Does the feature break without network?
- **Accessibility Risk** — Motor, visual, or cognitive accessibility impact?

### Score Formula

```
MFRI = (Platform Clarity + Accessibility Readiness)
       - (Interaction Complexity + Performance Risk + Offline Dependence)
```

**Range:** -10 to +10

- **6-10**: Safe — Proceed normally
- **3-5**: Moderate — Add performance + UX validation
- **0-2**: Risky — Simplify interactions or architecture
- **< 0**: Dangerous — Redesign before implementation

---

## 2. Ask Before Assuming (Required)

If any of the following are not stated, you MUST ask:

- **Platform** — iOS, Android, or both?
- **Framework** — React Native, Flutter, or native?
- **Navigation** — Tabs, stack, drawer?
- **Offline** — Must it work offline?
- **Devices** — Phone only or tablet too?
- **Audience** — Consumer, enterprise, accessibility needs?

---

## 3. Performance Anti-Patterns (Hard Bans)

### Never:
- ScrollView for long lists → Use FlatList / FlashList
- Inline renderItem → useCallback + memo
- Index as key → Stable ID
- JS-thread animations → Native driver / GPU
- console.log in prod → Strip logs

### Touch & UX — Never:
- Touch target <44-48px → Min touch target
- Gesture-only action → Button fallback
- No loading state → Explicit feedback
- No error recovery → Retry + message
- Ignore platform norms → iOS ≠ Android

### Security — Never:
- Tokens in AsyncStorage → SecureStore / Keychain
- Hardcoded secrets → Env + secure storage
- No SSL pinning → Cert pinning

---

## 4. Platform Defaults

| Element | iOS | Android |
|---------|-----|---------|
| Font | SF Pro | Roboto |
| Min touch | 44pt | 48dp |
| Back | Edge swipe | System back |
| Sheets | Bottom sheet | Dialog / sheet |
| Icons | SF Symbols | Material Icons |

---

## 5. Unify vs Diverge

**Unify:** Business logic, data models, API contracts, validation, error semantics
**Diverge:** Navigation behavior, gestures, icons, typography, pickers/dialogs

---

## 6. Framework Decision Tree

```
Need OTA + web team → React Native + Expo
High-perf UI → Flutter
iOS only → SwiftUI
Android only → Compose
```

---

## 7. Release Readiness Checklist

- Touch targets >= 44-48px
- Offline handled
- Secure storage used
- Lists optimized
- Logs stripped
- Tested on low-end devices
- Accessibility labels present
- MFRI >= 3

---

## Related Skills

- `frontend-design` — Visual systems & components
- `frontend-dev-guidelines` — RN/TS architecture
- `backend-dev-guidelines` — Mobile-safe APIs

> **Final Law:** Mobile users are distracted, interrupted, and impatient—often using one hand on a bad network with low battery. Design for that reality.
