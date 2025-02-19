export const themes = {
  light: {
    name: 'Light',
    colors: {
      background: '0 0% 100%',
      foreground: '240 10% 3.9%',
      card: '0 0% 100%',
      primary: '142.1 76.2% 36.3%',
      secondary: '240 4.8% 95.9%',
      accent: '240 4.8% 95.9%',
      muted: '240 4.8% 95.9%',
      border: '240 5.9% 90%',
    },
    gamification: {
      level0: 'from-zinc-500 to-zinc-400',
      level1: 'from-emerald-600 to-emerald-500',
      level2: 'from-blue-600 to-blue-500',
      level3: 'from-purple-600 to-purple-500',
      level4: 'from-amber-500 to-yellow-400',
      level5: 'from-rose-600 to-pink-500',
    }
  },
  dark: {
    name: 'Dark',
    colors: {
      background: '240 10% 8%',
      foreground: '0 0% 98%',
      card: '240 10% 12%',
      primary: '142.1 70.6% 45.3%',
      secondary: '240 3.7% 15.9%',
      accent: '240 3.7% 15.9%',
      muted: '240 3.7% 15.9%',
      border: '240 3.7% 15.9%',
    },
    gamification: {
      level0: 'from-zinc-600 to-zinc-500',
      level1: 'from-emerald-600 to-emerald-500',
      level2: 'from-blue-600 to-blue-500',
      level3: 'from-purple-600 to-purple-500',
      level4: 'from-amber-500 to-yellow-400',
      level5: 'from-rose-600 to-pink-500',
    }
  },
  forest: {
    name: 'Forest',
    colors: {
      background: '150 15% 10%',
      foreground: '150 10% 98%',
      card: '150 15% 15%',
      primary: '142.1 70.6% 45.3%',
      secondary: '150 15% 20%',
      accent: '150 15% 25%',
      muted: '150 15% 20%',
      border: '150 15% 25%',
    },
    gamification: {
      level0: 'from-emerald-800 to-emerald-700',
      level1: 'from-green-700 to-emerald-600',
      level2: 'from-teal-700 to-teal-600',
      level3: 'from-cyan-700 to-cyan-600',
      level4: 'from-blue-700 to-blue-600',
      level5: 'from-indigo-700 to-indigo-600',
    }
  },
  sunset: {
    name: 'Sunset',
    colors: {
      background: '20 15% 10%',
      foreground: '20 10% 98%',
      card: '20 15% 15%',
      primary: '20 90% 60%',
      secondary: '20 15% 20%',
      accent: '20 15% 25%',
      muted: '20 15% 20%',
      border: '20 15% 25%',
    },
    gamification: {
      level0: 'from-orange-800 to-orange-700',
      level1: 'from-amber-700 to-orange-600',
      level2: 'from-yellow-700 to-amber-600',
      level3: 'from-red-700 to-orange-600',
      level4: 'from-rose-700 to-red-600',
      level5: 'from-pink-700 to-rose-600',
    }
  },
  ocean: {
    name: 'Ocean',
    colors: {
      background: '200 15% 10%',
      foreground: '200 10% 98%',
      card: '200 15% 15%',
      primary: '200 90% 60%',
      secondary: '200 15% 20%',
      accent: '200 15% 25%',
      muted: '200 15% 20%',
      border: '200 15% 25%',
    },
    gamification: {
      level0: 'from-blue-800 to-blue-700',
      level1: 'from-cyan-700 to-blue-600',
      level2: 'from-teal-700 to-cyan-600',
      level3: 'from-sky-700 to-blue-600',
      level4: 'from-indigo-700 to-blue-600',
      level5: 'from-violet-700 to-indigo-600',
    }
  }
} as const;

export type ThemeName = keyof typeof themes; 