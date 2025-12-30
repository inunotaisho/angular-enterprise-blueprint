## Phase 5: Feature Implementation – Building the "Smart" Layers

In previous phases, I laid the foundation: a robust CI/CD pipeline, a layered architecture with strict boundaries, and a comprehensive design system. Now, in Phase 5, I finally start building the actual application content. This is where the users live, and where "Smart" components take over.

This phase is about moving from meaningful abstractions to concrete deliverables. I'm implementing the feature modules that map to my application's routing: Authentication, Dashboard, Module Catalog, Architecture Documentation, Profile, and Contact.

### The Philosophy: Features as Domain Slices

One of the strict rules in this project's architecture is that **Features are lazy-loaded domain slices**. They contain the **business logic** and **state management** specific to a domain.

- **Shared (`src/app/shared`)** is for dumb UI components (`eb-button`, `eb-card`) that know _how_ to look but not _what_ to do.
- **Features (`src/app/features`)** are the smart orchestrators. They call APIs, interact with the Store, and decide _when_ to show that button.

By enforcing this separation, I ensure that my business logic isn't coupled to my visual design, and vice versa.

### 1. The Module Catalog: A Portfolio within a Portfolio

The core features of this application is the "Modules" catalog. It's designed to showcase other projects (or "modules").

- **Data Layer:** It uses `@ngrx/signals` via a `ModulesStore` to manage state. The data comes from a local JSON file for now, simulating an API response.
- **Search & Filter:** I implemented a real-time filtered search. Using RxJS `debounceTime` ensures I don't thrash the "backend" with every keystroke.
- **Detail View:** A clean, accessible detail page shows tech stacks, key features, and links to demos and source code.

This demonstrates a common enterprise pattern: List → Detail navigation with state preservation.

### 2. Architecture Documentation: Eating my Own Dog Food

An "Enterprise Blueprint" needs to document itself. Instead of relying solely on a Wiki or external readme, I built an **Architecture Decision Record (ADR) Viewer** right into the app.

- **Markdown Rendering:** It fetches raw markdown files from the `assets` folder and renders them cleanly.
- **Routing:** `/architecture/ADR-001` deep-links directly to specific decisions.

This turns the application into a self-documenting system, a critical trait for long-lived enterprise software.

### 3. The "Architect" Profile: Real Data via GraphQL

For the "About Me" page (The Profile), I didn't want just static text. I wanted to prove I can handle complex third-party integrations.

- **GitHub GraphQL API:** I integrated with GitHub's GraphQL API to fetch real-time stats: total commits, pull requests, issues closed, and more.
- **Authentication:** This required handling strict Content Security Policies and managing Personal Access Tokens (PATs) securely via environment variables—never committed to the repo.
- **Rate Limiting:** I implemented caching strategies in the `ProfileStore` to avoid hitting GitHub's API rate limits.

### 4. Contact: Real-World Form Handling

Enterprise forms are complex. They need validation, error handling, accessible feedback, and security.

- **Strict Validation:** I used Angular's `NonNullableFormBuilder` to ensure type safety across the form model.
- **Formspree Integration:** Instead of a backend, I integrated Formspree to handle email delivery.
- **Rate Limiting:** A client-side "cool-down" mechanism prevents spam by disabling the form for 30 seconds after submission.
- **UX Details:** I added a "Connection" card with social links and a "Status" card indicating current availability.

### 5. Identifying Gaps: The Tooltip Component

During the development of these features, I realized my Design System (Phase 3) wasn't quite finished. I needed tooltips for icon-only buttons in the Module catalog and Profile actions.

Instead of hacking a one-off solution, I paused and implemented a proper **Shared Tooltip Component**.

- **Directive-Driven:** usage is as simple as `ebTooltip="Edit Item"`.
- **Dynamic Positioning:** It calculates available screen space and positions itself (top, bottom, left, right) automatically.
- **Accessible:** It manages `aria-describedby` and `role="tooltip"` automatically, ensuring screen readers announce it correctly.

This is Feature Development Done Right: when you find a missing primitive, you don't build it _inside_ the feature; you push it down to the Shared layer where everyone can benefit.

### Final Thoughts on Phase 5

Phase 5 transformed my empty shell into a functional application. I proved that my "Core" services and "Shared" components provided the right abstractions, allowing me to build complex features quickly.

The application now feels alive. It fetches data, handles user input, manages state, and navigates smoothly.

**Next Up:** Phase 6 – Ops & Optimization. I'll look at how I deploy this to production, optimize bundles with "budgets", and automate releases.

---

_Check out the [live demo](https://moodyjw.github.io/angular-enterprise-blueprint/) or browse the [source code](https://github.com/MoodyJW/angular-enterprise-blueprint)._
