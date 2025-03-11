# Repository Explorer Project

## 📌 Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Recommended: LTS version 22)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 📥 Installation
### 1️⃣ Clone the Repository (Optional)
If you haven’t cloned the project yet, run:
```bash
git clone https://github.com/litle-project/repository-explorer.git
cd repository-explorer
```

### 2️⃣ Install Dependencies
Using npm:
```bash
npm install
```
Or using yarn:
```bash
yarn install
```
Or using pnpm:
```bash
pnpm install
```

## 🚀 Running the Development Server
To start the Next.js development server, run:
```bash
npm run dev
```
Or with yarn:
```bash
yarn dev
```
Or with pnpm:
```bash
pnpm dev
```

Your application will be available at **http://localhost:3000**.

## 🏗 Building for Production
To create an optimized production build:
```bash
npm run build
```
Then, start the production server:
```bash
npm run start
```

## ✨ Environment Variables
Before running the project, copy `.env.example` to `.env`:
```
cp .env.example .env.local
```
Then, update the values inside ```.env``` as needed.
```
NEXT_PUBLIC_NODE_ENV=fill with your needs (local and production)
NEXT_PUBLIC_BASE_PATH=setup your basepath, default is / (for deployment purpose)
```

## 🛠 Useful Commands
| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint for code quality |
| `npm run test` | Run tests |

## 📂 Project Structure
```
/src
  ├── components    # Reusable UI components
  ├── app           # all business logic stored
  ├── styles        # Global and component styles
/ public
  ├── assets        # Static assets (images, icons, etc.)
```

## 🔗 Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

---

Now you’re ready to run your Next.js project! 🚀🎉

