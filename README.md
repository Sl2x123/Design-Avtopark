# Avtopakt Fura — Fleet Management App Prototype

Static HTML prototype for a fleet management mobile app.

## Run locally

**Requirements:** Python 3 (pre-installed on macOS/Linux)

```bash
git clone https://github.com/Sl2x123/Design-Avtopark.git
cd Design-Avtopark
python3 -m http.server 4188 --directory app
```

Then open [http://localhost:4188](http://localhost:4188) in your browser.

**Windows:**
```cmd
git clone https://github.com/Sl2x123/Design-Avtopark.git
cd Design-Avtopark
python -m http.server 4188 --directory app
```

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Home / Dashboard |
| `fleet.html` | Fleet management |
| `map.html` | Live map |
| `analytics.html` | Analytics |
| `garage-trucks.html` | Trucks list |
| `garage-drivers.html` | Drivers list |
| `profile.html` | Company profile |
| `team.html` | Team members & access |
| `subscription.html` | Subscription plans |

## Tech stack

- Tailwind CSS (CDN)
- Panda.js — custom icon/component library
- Lucide icons
- Pure HTML/CSS/JS — no build step needed
