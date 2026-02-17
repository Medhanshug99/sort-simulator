# Algorithm Sorting Visualizer 🎨

A modern, interactive sorting algorithm visualizer built with React, Vite, and Tailwind CSS. Watch algorithms come to life with smooth animations and learn how different sorting algorithms work!

## 🚀 Features

- **Multiple Sorting Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort
- **Visual Animation**: See how algorithms work step by step
- **Interactive Controls**: Start, Pause, Reset, Step through animations
- **Adjustable Speed**: Control animation speed to your preference
- **Algorithm Information**: View time complexity and algorithm descriptions
- **Modern UI**: Dark theme with smooth transitions and responsive design

## 🛠️ Tech Stack

- **React 19** - UI Framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons

## 📦 Installation

```bash
# Install dependencies
npm install
```

## 🏃‍♂️ Running Locally

```bash
# Development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🔨 Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist` folder.

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Vite and deploy!

### Deploy to Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)

Or use Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json` scripts:
   ```json
   "deploy": "vite build && gh-pages -d dist"
   ```
3. Update `vite.config.js` with your repo name:
   ```js
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```
4. Run: `npm run deploy`

## 📁 Project Structure

```
src/
├── algorithms/     # Sorting algorithm implementations
├── components/     # React components
├── engine/         # Animation engine
├── utils/          # Utility functions
├── App.tsx         # Main application component
└── main.jsx        # Application entry point
```

## 🎯 How to Use

1. **Input Array**: Enter comma-separated numbers or generate random array
2. **Select Algorithm**: Choose from available sorting algorithms
3. **Adjust Speed**: Set animation speed using the slider
4. **Start**: Click play to watch the algorithm visualize
5. **Step Through**: Use step control for frame-by-frame view
6. **Pause/Reset**: Control the animation anytime

## 📝 License

MIT License - Feel free to use this project for learning and development!

---

Built with ❤️ using React + Vite + Tailwind CSS
