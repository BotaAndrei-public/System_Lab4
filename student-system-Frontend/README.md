# 🎓 Sistem Înregistrare Studenți

Aplicație modernă React + Vite pentru gestionarea studenților și cursurilor.

## 📋 Caracteristici

- ✅ Vizualizare listă studenți și cursuri
- ✅ Căutare studenți înregistrați la un curs
- ✅ Căutare cursuri la care este înregistrat un student
- ✅ Vizualizare cursuri absolvite
- ✅ Înregistrare nouă student la curs
- ✅ Design minimalist (alb/negru/albastru)
- ✅ Client ID customizabil pentru logging

## 🚀 Instalare

### Prerequisite

- Node.js (versiunea 18 sau mai mare)
- npm sau yarn
- Backend Spring Boot rulând pe `http://localhost:8082`

### Pași instalare

1. **Clonează sau descarcă proiectul**

2. **Instalează dependențele:**
```bash
npm install
```

3. **Pornește serverul de development:**
```bash
npm run dev
```

Aplicația va porni pe `http://localhost:5173`

## 📁 Structura Proiectului

```
student-system/
├── src/
│   ├── components/
│   │   ├── views/
│   │   │   ├── AllStudents.jsx
│   │   │   ├── AllCourses.jsx
│   │   │   ├── RegisteredStudents.jsx
│   │   │   ├── RegisteredCourses.jsx
│   │   │   ├── CompletedCourses.jsx
│   │   │   └── RegisterStudent.jsx
│   │   ├── Header.jsx
│   │   ├── Menu.jsx
│   │   └── Content.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Configurare API

Dacă backend-ul tău rulează pe un alt port sau host, modifică URL-ul în fișierul `src/services/api.js`:

```javascript
const API_URL = 'http://localhost:8082/api';  // Modifică aici
```

## 📦 Comenzi Disponibile

- `npm run dev` - Pornește serverul de development
- `npm run build` - Creează build pentru producție
- `npm run preview` - Preview build-ul de producție
- `npm run lint` - Verifică codul cu ESLint

## 🎨 Design

Aplicația folosește un design minimalist cu:
- **Culori principale:** Alb, Negru, Albastru (#2563eb)
- **Font:** System fonts (San Francisco, Segoe UI, Roboto)
- **Fără:** Gradiente complexe, animații excesive
- **Focus:** Lizibilitate și UX simplu

## 📱 Responsive

Aplicația este complet responsive și funcționează pe:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

## 🔗 Endpoints API Folosite

- `GET /api/students` - Lista tuturor studenților
- `GET /api/courses` - Lista tuturor cursurilor
- `GET /api/courses/{id}/registered-students` - Studenți la un curs
- `GET /api/students/{id}/registered-courses` - Cursuri student
- `GET /api/students/{id}/completed-courses` - Cursuri absolvite
- `POST /api/register` - Înregistrare nouă

## 🐛 Troubleshooting

### CORS Errors
Dacă întâmpini erori CORS, asigură-te că backend-ul permite requesturi de la `http://localhost:5173`.

### API nu răspunde
Verifică că backend-ul Spring Boot rulează pe portul corect (8082).

## 📄 Licență

MIT
