# ThriveAutistic
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

## Technical Summary
This site uses a next.js frontend and supabase backend.


## TODO for MVP
- [] Add "Add a Strategy" button
- [] Wire up voting frontend + backend, including changing your vote
- [] Wire up "Add a strategy" frontend form + backend
- [] Wire up "Add a story" frontend form + backend
- [] Publish to Vercel
- [] Acquire domain name
- [] Setup DNS to point to domain name
- [] Add email-based authentication
- [] Add google-based authentication
- [] Add signup flow
- [] Add login flow
- [] Add logout flow
- [] Render all strategies on main "ideas" page
- [] Add ability to edit existing stories
- [] Add ability to edit existing strategies
- [] Add individual stories to strategy accordion
- [] Add landing page describing the site

## Future ideas
- [] "Autistic profiles" including specific challenges each individual faces, to allow for more relevant strategies
