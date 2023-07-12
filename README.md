**This repo is made on top of**:

- [create-universal-app] (https://github.com/albbus-stack/create-t3-universal-app): expo, next, trpc, prisma, nextauth - no UI code share & no mobile auth.
- [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo): expo, next, trpc, prisma, nextauth - no UI code share & no mobile auth.
- [t3-turbo-and-clerk](https://github.com/clerkinc/t3-turbo-and-clerk): t3 turbo with auth for mobile + web - still no  UI code share.
- [tamagui + solito starter](https://github.com/tamagui/tamagui/tree/master/starters/next-expo-solito): expo + next code share - no tRPC & no built-in auth.

## 🌟 How it works

### Folder Structure

- **apps**
  - next
  - expo
- **packages**
  - ui (your reusable components with tamagui)
  - db (db schema & prisma stuff)
  - app
    - features (⭐️ all of your native frontend code will go here ⭐️)
    - navigation (unifying web + mobile navigation)
    - provider (unifying providers)
    - utils (your utils like auth & tRPC)
  - api (all of your tRPC & backend code)

### In a bit more detail

Your **frontend** code will be in React Native, meaning that you're going to write Views instead of divs. Since we are using Tamagui in particular, we're gonna write Stacks instead Views.

- `apps/expo` and `apps/next` are practically empty folders that are simply *referencing* your `packages/app` folder.
- If you're familiar with React Native, it's going to feel as if you're writing a React Native app, that just happens to also run really well on the web (with SSR and all of those goodies).
- Your code will get rendered as HTML/CSS on the NextJS side and normal React Native on the native side.

Your **backend** code is gonna be in `packages/api`. NextJS is going to run this code in a serverless environment, if you're a little confused about how that works [here](https://www.youtube.com/watch?v=2cB5Fh46Vi4&t=1017s)'s a good video by Theo that talks about NextJS as a backend framework.

- Your backend and frontend will communicate with tRPC.
- Your backend and your DB will communicate with Prisma (ORM).
- Mobile auth is done with Clerk Expo, and web auth is done with Clerk React and Clerk Next.

*Note: you don't need to understand how everything works in detail before you can start using this template. As someone that wants to know how every bolt and nut works, I often get "blocked" by my own perfectionism, so I'm just throwing this out there in case you're feeling the same about something.*


### Which DB?

I recommend you either spin up a Postgres instance on Railway or use Supabase, you can bring your own as it doesn't matter too much.

## 🔨 How to use this?

### 1. Set up project

- `yarn install` to install packages and build the project.
- Set up your environment variables properly by duplicating the `.env.example` file, removing `.example`, and entering your environment variables.
  - **CLERK_SECRET_KEY** & **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**: sign up on [clerk](https://clerk.dev/) to get your API keys
  - **DATABASE_URL** (**optional**): spin up a Postgres instance with Railway or Supabase (we're using SQLlite by default now, so you don't have to do this unless you're ready for production!)
- You need to manually enter your clerk frontend API key into `/packages/app/provider/auth/index.tsx`.
- `yarn db-push` to push our Prisma schema to our DB.

### 2. Start up your project

- `yarn web` to start a web dev server.
- `yarn native` to run on iOS or Android. **PS**: for this to work, you'll need your web app running on localhost:3000, remember that your NextJS app is also your backend!
- `yarn studio` to start up your Prisma Studio. **PS**: the tRPC query will show nothing unless you manually open up Prisma and add a "post", or query an user info in the DB!

### 3. Adding a new screen

To automate the process explained below you can use the VSCode extension [t3-cua-tools](https://github.com/albbus-stack/t3-cua-tools), also available on the [marketplace](https://marketplace.visualstudio.com/items?itemName=albbus-stack.t3-cua-tools). It will create the files and add the necessary imports and navigation code for you.

- Create your screens in `packages/app/features`.
- For smaller components, feel free to put them in `/packages/ui`.
- For new routes, add them in `/packages/api/src/router`, and make sure you merge them in `index.ts`.
- When you add a new page or screen, you'll need to add the page into both Expo and NextJS:
  - **Expo**
    - Go to `packages/app/navigation/native/index.tsx` and add the page following the example.
    - Go to `packages/app/provider/navigation/index.tsx` and add the page following the example.
  - **Next**
    - Go to `apps/next/pages`, create the folder with the name being your route, and an `index.tsx` that's importing your element from `/app/feature/home`.

## Deploying to Vercel

After you have created a new project on Vercel and linked it with your Github repo you'll have to enter your environment variables:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `DATABASE_URL`

<img width="704" alt="Screenshot 2023-01-14 at 12 06 17 AM" src="https://user-images.githubusercontent.com/36214945/212462681-f6cc448b-d24b-4541-a350-290a6985ad85.png">
(ignore the install command one now)

## FAQ

1. **Where should I install the packages?**
If it contains native code you must install it into the `/expo` folder.

2. **How do I know if it contains native code?**
In general if it involves some interactions with the phone OS like the APIs to interact with storage, camera, gyro, notification, etc. it involves native code!
