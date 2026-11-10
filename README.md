# Focus & Tarot

A small front-end-only focus site. Four sections: Pomodoro timer, daily tarot draw, todo list, and stats. Everything is stored in the browser. No server required.

## Features

- Pomodoro timer with focus, short break, and long break modes. Custom durations in seconds, minimum 1 second. Plays a chime when time is up. Can be linked to a todo, which counts up its tomatoes.
- Daily tarot draw: one card per day, flip animation, card image with name, keywords, and a short reading.
- Todo list: add, complete, delete. Completion rate bar. Linkable to the Pomodoro timer.
- Stats: focus time today (auto switches between seconds, minutes, and hours), pomodoros today, todo completion rate, 7-day bar chart, completion donut.
- Home overview: four summary cards plus current streak, weekly focus time, and weekly pomodoros.
- Chinese / English switch for the whole site, including tarot readings.
- PWA support: fullscreen when added to the home screen, with a custom icon.
- Splash screen on first open per session.

## File structure

```
focus-tarot/
├── index.html          page structure
├── manifest.json       PWA config (name, icon, theme color)
├── css/
│   └── style.css       all styles
├── js/
│   └── app.js          all logic
├── audio/
│   ├── focus-end.mp3   focus end chime
│   └── break-end.mp3   break end chime
└── images/
    ├── icon-800.png    site icon
    ├── og-cover.jpg    share cover
    └── tarot/          14 tarot card faces
```

## Data and privacy

All data lives in the browser's `localStorage`. Nothing is uploaded anywhere.

## Author

2025CS1LiXiaoran
