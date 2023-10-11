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



## TODO for MVP
- [] Wire up voting frontend + backend, including changing your vote
- [] Wire up "Add a strategy" frontend form + backend
- [x] Wire up "Add a story" frontend form + backend
- [x] Publish to Vercel
- [x] Add individual stories to strategy accordion
- [x] Render all strategies on main "ideas" page
- [x] Add logout flow
- [x] Add email-based authentication
- [x] Add signup flow
- [x] Add login flow
- [x] Add "Add a Strategy" button

## Non-MVP but important
- [] Acquire custom domain name
- [] Setup DNS to point to domain name
- [] Add landing page describing the site
- [] Add google-based authentication
- [] Add custom SMTP email authentication flow to avoid rate limits
- [] Add ability to edit existing stories
- [] Add ability to edit existing strategies
- [] Add challenges to match up to the strategies

## Future ideas
- [] "Autistic profiles" including specific challenges each individual faces, to allow for more relevant strategies
- [] Efficiently fetch vote counts for each strategy
- [] Only fetch a limited number of strategies
