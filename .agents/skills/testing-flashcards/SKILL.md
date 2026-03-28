# Testing FlashCards App

## Local Dev Setup

```bash
npm install
npm run dev
# App runs on localhost:3000 (or next available port if 3000 is taken)
```

No backend, API keys, or secrets required. The app uses `localStorage` for persistence.

## App Structure

- **Home page** (`/`): Displays flashcards in a responsive grid (1/2/3 columns). Cards flip on click via CSS 3D transforms.
- **Create page** (`/create`): Form with Front/Back textareas and a "Save Flashcard" button. Uses HTML `required` validation.
- **Navigation**: Top bar with "FlashCards" logo, "All Cards" link, and "+ New Card" button.
- **Data**: Default 3 cards (test1/test2, test3/test4, test5/test6) seeded on first load via `localStorage`.

## Key Files

- `pages/index.js` — Home page with FlashCard component and grid layout
- `pages/create.js` — Create form with keyboard shortcut (Ctrl/Cmd+Enter)
- `components/Navigation.js` — Top nav bar
- `components/Layout.js` — Page layout wrapper with nav + footer
- `styles/globals.css` — Flashcard flip animation CSS

## QA Areas to Test

1. **Mobile responsiveness**: Card grid uses `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`. Use Chrome DevTools device toolbar to test at 375px, 768px, 1024px+.
2. **Flashcard flip animation**: Click a card to flip. Verify 3D rotation, backface-visibility hidden, independent card state.
3. **Create form UX**: Test empty submission (blocked by `required`), successful creation flow (green banner → redirect → new card visible).

## Known Issues

- **Nav text wraps at mobile widths**: At 375px, "All Cards" and "+ New Card" break to 2 lines. No mobile-responsive nav (hamburger menu, etc.).
- **Keyboard shortcut hint hardcoded to Mac**: `create.js:99` shows `⌘ + Enter` on all platforms. Code handles both `ctrlKey` and `metaKey`, but UI hint only shows Mac symbol.
- **Footer year hardcoded**: Shows "© 2024" (not dynamic).

## Testing Tips

- Clear `localStorage` (key: `flashcards`) to reset to default 3 cards.
- The success banner on card creation is very brief (~1 second) before redirect — you may need to watch carefully or add a delay to capture it.
- The flip animation takes 0.6s (CSS transition) — wait for it to complete before asserting back-face content.

## Devin Secrets Needed

None — the app is fully client-side with no authentication or API dependencies.
