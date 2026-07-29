# Nura Design Guide

Version: 1.0

---

# 1. Vision

Nura is not a dashboard.

Nura is a calm Quran companion.

Every design decision must help users return to the Quran quickly with minimal distraction.

The experience should feel:

- Calm
- Premium
- Modern
- Spiritual
- Native
- Intentional

---

# 2. Product Principles

## Mobile First

Design every screen for mobile first.

Tablet and desktop layouts are enhancements, not the primary target.

---

## Content First

Content is always more important than decoration.

The Quran is the hero.

UI should support the content, never compete with it.

---

## One Primary Action

Every screen should have one clear primary purpose.

Examples:

Home
→ Continue Reading

Reader
→ Read Quran

Surah List
→ Find a Surah

Settings
→ Change Preferences

---

## Reduce Visual Noise

Avoid unnecessary:

- cards
- borders
- shadows
- gradients
- icons

Use whitespace instead.

---

## Native Experience

Users should feel like they are using a premium mobile app.

Not a responsive website.

---

# 3. Design Language

The overall experience should feel similar to:

- Apple Health
- Kindle
- Headspace

Not:

- Admin dashboard
- Analytics dashboard
- Enterprise web application

---

# 4. Visual Hierarchy

Every screen should follow:

Primary

↓

Secondary

↓

Supporting

↓

Optional

Never give every section the same visual weight.

---

# 5. Cards

Cards are reserved for important content.

Examples:

✓ Continue Reading

✓ Hero content

✓ Important actions

Do not wrap every section inside a card.

Too many cards create dashboard fatigue.

---

# 6. Spacing

Use the 8pt spacing system consistently.

Avoid arbitrary spacing values.

Whitespace is intentional.

---

# 7. Border Radius

Use consistent radius throughout the app.

Default:

24px

Do not mix multiple radius styles without purpose.

---

# 8. Shadows

Use subtle elevation only.

Maximum elevation levels:

Background

↓

Surface

↓

Hero

Avoid heavy Material Design shadows.

---

# 9. Typography

Typography should create hierarchy before color.

UI typography and Quran typography must remain separate systems.

Arabic text should always have:

- comfortable line height
- generous spacing
- excellent readability

---

# 10. Color

Primary

Deep Emerald

Background

Warm Ivory (Light)

Deep Navy / Charcoal (Dark)

Gold should only be used as a small accent.

Avoid colorful interfaces.

---

# 11. Motion

Animation should be almost invisible.

Suggested durations:

Press

100ms

Fade

180ms

Transition

220ms

Respect prefers-reduced-motion.

---

# 12. Accessibility

Minimum touch target:

44px

Maintain proper contrast.

Support screen readers.

Use semantic HTML.

Avoid icon-only actions without labels.

---

# 13. Responsive Rules

Design mobile first.

Target devices:

320px

360px

390px

430px

Tablet and desktop layouts are progressive enhancements.

Never allow horizontal scrolling.

---

# 14. Home Philosophy

Home is not a dashboard.

The goal is:

Continue your Quran journey.

Priority:

1. Continue Reading

2. Next Prayer

3. Daily Verse

4. Quick Actions

5. Recent Surahs

6. Khatam Progress

---

# 15. Quran Reader Philosophy

Reader is the heart of Nura.

Everything else supports the reading experience.

Reader should feel:

- peaceful
- immersive
- distraction free

Never overload the Reader with unnecessary UI.

---

# 16. Architecture

Prefer:

Feature-based structure

Reusable components

Standalone components

OnPush

Strict typing

Design tokens

Avoid duplicated components.

Prefer extending existing components over creating new ones.

---

# 17. Ionic Principles

Use Ionic for platform capabilities:

- Navigation
- Tabs
- Content scrolling
- Modal
- Toast
- Alert
- Loading
- Action Sheet

Use custom components only when they add branding or improve the user experience.

Do not recreate functionality that Ionic already provides well.

---

# 18. Code Quality

Every implementation should:

- build successfully
- pass lint
- avoid duplicated CSS
- avoid any
- avoid inline styles
- use semantic HTML
- remain maintainable

---

# 19. Before Merging

Every feature should be reviewed for:

- UX
- Mobile responsiveness
- Accessibility
- Performance
- Visual consistency
- Dark mode
- Code quality

Only after passing these checks should the feature be considered complete.
