# Future Take Home Test

A fitness exercise explorer with video demonstrations and detailed exercise information.

[Live Demo](https://future.dexhonsa.me)



## Features

### Core Functionality
- Browse exercises with video and text demonstrations
- Search across exercise names, descriptions, equipment, and movement patterns
- Group exercises by muscle groups or equipment for easy filtering.
- View exercise details including muscle groups, equipment requirements, movement patterns, audio pronounciation and which side.
- Responsive design optimized for mobile and desktop

### User Experience
- Progressive data loading for performance
- Skeleton loading states during data fetches
- Search result highlighting with context snippets
- URL persistence for shareable exercise links
- Keyboard navigation support

## Tech Stack

- **Next.js 15.5** with App Router and Turbopack
- **React 19.1** with Server Components
- **TypeScript** with strict mode
- **Redux Toolkit** for state management
- **Tailwind CSS v4** for styling
- **Framer Motion** for animations
- **Axios** for API calls

## Architecture

### API-First Design
The application uses a progressive loading strategy to provide scalability:
1. Initial load fetches only group metadata (~20 items)
2. Groups expand on demand to fetch exercises
3. Exercise details load when selected
4. Results are cached server-side for 5 minutes

### Key Design Decisions

**Strategic Sever and Client Components**  
Pages and layouts use React Server Components and fetch the data. Client components are used only for interactivity and state management.

**Progressive Enhancement**  
The app starts with minimal data and loads more as users interact, reducing initial bundle size and improving performance.

**URL State Synchronization**  
Selected exercises persist as query params for shareability and browser navigation support. (Chose this over dynamic routes for this use case and for that buttery SPA feel)

**Type Safety**  
Full TypeScript coverage with no `any` types and strict null checking.

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Linting
```bash
npm run lint
```

## API Endpoints

All endpoints cache responses for 5 minutes server-side.

| Endpoint | Description |
|----------|-------------|
| `GET /api/exercises` | Returns all exercises |
| `GET /api/exercises/[id]` | Returns single exercise by ID |
| `GET /api/exercises/slug/[slug]` | Returns exercise ID for slug |
| `GET /api/exercises/groups` | Returns groups with counts |
| `GET /api/exercises/group/[name]` | Returns exercises in group |
| `GET /api/exercises/search` | Search exercises |

## Project Structure

```
src/
  app/              # Next.js routes and API handlers
  components/       # Reusable UI components
  features/         # Feature-specific modules
    exercises/      # Exercise explorer feature
      components/   # Feature components
      hooks/        # Custom hooks
      store/        # Redux slice and selectors
  lib/              # Utilities and helpers
  store/            # Redux store configuration
```

## AI Usage

### ChatGPT
For brainstorming and the rough outline of the folder structure and basic minimal requirements of the project.

### Claude Code
Created rule based restrictions and prompted to write minimal boilerplate and scafolding along with some housekeeping, organization and some autocomplete.  All architecture decisions were mine.

## Overall thoughts
I thoroughly enjoyed this project and took a real-life approach to what I would want to see in a workout application such as this.  I would want to of course go through per muscle group to build a workout plan (possible next steps?) and filter exercises based off of at-home equipment I had.  Making the video large and front and center was a choice because most people (including myself) are very visual learners.  The application had to be mobile friendly and very snappy to keep users engaged with enticing staggered animations and beautiful cohesive design.  Even though the dataset provided was small, I took the approach to build a scalable design to ensure we could handle up to thousands without sacrificing UX. I could probably have gone deeper into this but given the turnaround of this project, I figured this was more than enough.  I had a blast building this and look forward to your feedback! 




# Thanks for your consideration!
