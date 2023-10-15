# ThriveAutistic
Live at [ThriveAutistic](https://thriveautistic.vercel.app/strategies)

I wish the autistic community had a way to coalesce around solutions, accommodations, and ways of existing that work best for us, and a way to share those with each other and back them up with resources and data. This is an attempt to fulfill this wish.

## Getting Started - Frontend
The default build tooling uses docker for maximum portability across systems.

### Install dependencies
There are only two dependencies: `docker` and `make`. We assume that both of them have been installed and are accessible from the command line.

### Run the development server
```
make start
```

### Build the production site
```
make build
```

### Run the production server
```
make start-prod
```

### Deployment
The frontend is deployed with [Vercel](https://vercel.com/edmundsj/thriveautistic) and built with `next`

## Technical Summary
This site uses a next.js frontend and supabase backend.

## Backlog
- [] Add ability for users to remove tags from existing strategies
- [] Add ability for users to create entirely new tags when creating a strategy
- [] Implement most / least helpful sort
- [] Add ability for non-authors to suggest changes to strategies
- [] Acquire custom domain name, setup DNS
- [] Navigate to login / signup when you try to vote and aren't logged in
- [] Add landing page describing the site
- [] Add google-based authentication
- [] Add custom SMTP email authentication flow to avoid rate limits
- [] Add site policies to signup flow

## Completed
- [x] Add "tags" input and display to strategies
- [x] Add ability to add tags to new strategies
- [x] Add ability to add tags to existing strategies
- [x] Add ability to edit existing strategies
- [x] Add ability to edit existing stories
- [x] Add search bar to filter by tags
- [x] Add search bar to filter by newest / most popular
- [x] Fix bug where strategies don't initially load
- [x] Add search bar to search by title
- [x] Wire up voting frontend + backend, including changing your vote
- [x] Wire up "Add a strategy" frontend form + backend
- [x] Wire up "Add a story" frontend form + backend
- [x] Publish to Vercel
- [x] Add individual stories to strategy accordion
- [x] Render all strategies on main "ideas" page
- [x] Add logout flow
- [x] Add email-based authentication
- [x] Add signup flow
- [x] Add login flow
- [x] Add "Add a Strategy" button

## Longer-term ideas
- [] "Autistic profiles" including specific challenges each individual faces, to allow for more relevant strategies
- [] Efficiently fetch vote counts for each strategy
- [] Only fetch a limited number of strategies
- [] Add challenges to match up to the strategies
- [] Rich text input for stories
