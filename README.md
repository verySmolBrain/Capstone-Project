# Goomba Market

An open source collectables trading platform built with Next.js 13 and Fastify.

## About this project

Our Collectable Trading Platform is a cutting-edge marketplace where collectors can buy, sell, and trade rare and valuable collectibles. Whether you're into vintage comics, rare stamps, sports memorabilia, or limited edition toys, our platform provides a seamless and secure environment to connect with fellow enthusiasts.

## Features

Listing and Discovery: Easily list your collectibles with detailed descriptions, images, and set your asking price. Discover unique items from other collectors around the world.

Secure Transactions: Our platform ensures secure transactions with built-in payment processing and escrow services, providing peace of mind for both buyers and sellers.

Real-Time Chat: Communicate with other collectors in real-time through our integrated chat system. Negotiate deals, ask questions, and connect with a global community.

Collections and Profiles: Showcase your collection with customizable profiles. Connect with other collectors who share your interests and track the value of your collectibles over time.

Auction System: Engage in exciting auctions to acquire highly sought-after items. Set reserve prices, participate in bidding wars, and experience the thrill of winning rare collectibles.

## Running Locally

There are two options for setting up the project. If you have Docker installed, you can use the provided Docker Compose configuration to run the project. Otherwise, you can run the project locally. For both, you'll have to ensure you have `.env` variables setup correctly.

### Env Variables

In the backend, you should have a `.env` file with the following variables:

```sh
PROJECT_REF=

SUPABASE_URL=
SUPABASE_SECRET_KEY=
SUPABASE_SERVICE_KEY=
DATABASE_URL=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_SECRET=
CLOUDINARY_URL=
```

In the frontend folder, you should have a `.env.local` file with the following variables:

```sh
PROJECT_REF=

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

NEXT_PUBLIC_BACKEND_HOSTNAME=http://localhost:3001
NEXT_PUBLIC_FRONTEND_HOSTNAME=http://localhost:3000
```

There is a `.example.env.local` in the frontend folder and `.example.env` in the backend folder. Simply fill those
in and remove the `.example` from the file name.

As an explanation for the variables:

- `PROJECT_REF` is the name of the project in Supabase.
- `SUPABASE_URL` is the URL of the Supabase project.
- `SUPABASE_SECRET_KEY` is the secret key of the Supabase project.
- `SUPABASE_SERVICE_KEY` is the service key of the Supabase project.
- `DATABASE_URL` is the URL of the Postgres database in Supabase.
- `CLOUDINARY_CLOUD_NAME` is the name of the Cloudinary cloud.
- `CLOUDINARY_API_SECRET` is the API secret of the Cloudinary cloud.
- `CLOUDINARY_URL` is the URL of the Cloudinary cloud.

&nbsp;

- `NEXT_PUBLIC_SUPABASE_URL` is the URL of the Supabase project.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` is the anonymous key of the Supabase project.
- `NEXT_PUBLIC_BACKEND_HOSTNAME` is the hostname of the backend server.
- `NEXT_PUBLIC_FRONTEND_HOSTNAME` is the hostname of the frontend server.

(**You can setup your own Supabase and Cloudinary account. Alternatively, we have included our secrets in our Report.**)

### Local Production

Install dependencies using install script in `package.json` in root folder:

```sh
npm run install
```

Run production builds of both the frontend and backend:

```sh
npm run start:backend && npm run start:frontend
```

### Docker Compose

Run the following command to start the project:

```sh
docker compose up
```

You can also rebuild the image when you make changes to the code:

```sh
docker compose up --build
```

Volume mounting isn't supported yet, so for major development changes, it's preferable to run the project locally.

## Development

To run the project locally, install dependencies using install script in `package.json` in root folder:

```sh
npm run install
```

Run development build for the backend:

```sh
npm run dev:backend
```

Run development build for the frontend:

```sh
npm run dev:frontend
```

Alternatively, you can also open up separate workspaces for the backend and frontend. This is the
preferred method for development due to proper linting and formatting support.

Note this project was built with VSCode support in mind. If you're using VSCode, you can open up
the project as a workspace and it should automatically detect the workspace settings.

Supported extensions:

- ESLint
- Prettier
- Jest

## License

Licensed under the [MIT license](https://github.com/unsw-cse-comp3900-9900-23T3/capstone-project-3900m16amanymen/blob/master/LICENSE.md).
