# Network Error Fix - OctoFit Tracker

## Problem
Frontend zgłaszał błąd "NetworkError when attempting to fetch resource" podczas próby połączenia się z Django API.

## Rozwiązanie

### 1. Scentralizowana konfiguracja API
Utworzono nowy plik konfiguracyjny: `src/config/api.js`

Ten plik:
- Automatycznie wykrywa środowisko (GitHub Codespaces lub localhost)
- Dynamicznie ekstraktuje nazwę Codespace z hostname przeglądarki
- Dostarcza spójną konfigurację dla wszystkich komponentów
- Loguje pełną konfigurację do konsoli przeglądarki dla debugowania

### 2. Aktualizacja wszystkich komponentów
Wszystkie komponenty (Users, Activities, Leaderboard, Teams, Workouts, App) zostały zaktualizowane, aby:
- Importować `getApiBaseUrl` z `../config/api`
- Usunąć duplikację kodu konfiguracji API
- Używać wspólnej logiki wykrywania środowiska

### 3. Poprawiona obsługa błędów
Komponenty teraz:
- Logują pełne URL endpoint do konsoli
- Wyświetlają szczegółowe komunikaty błędów
- Obsługują zarówno odpowiedzi paginowane jak i proste tablice

## Jak to działa

### Automatyczne wykrywanie środowiska:
```javascript
// Sprawdza hostname przeglądarki
if (hostname.includes('app.github.dev')) {
  // Ekstraktuje nazwę Codespace
  codespaceName = match[1];
} else {
  // Używa localhost
  codespaceName = 'localhost';
}
```

### URL API:
- **Localhost**: `http://localhost:8000`
- **Codespaces**: `https://<codespace-name>-8000.app.github.dev`

## Kroki do zastosowania poprawki

### 1. Zatrzymaj frontend (jeśli działa)
```bash
# Naciśnij Ctrl+C w terminalu npm
```

### 2. Przeładuj frontend
```bash
cd /workspaces/skills-build-applications-w-copilot-agent-mode/octofit-tracker/frontend
npm start
```

### 3. Otwórz konsolę przeglądarki
Sprawdź logi konfiguracji:
```
🔧 API Configuration: {
  codespaceName: "...",
  protocol: "...",
  port: "8000",
  baseUrl: "...",
  ...
}
```

### 4. Test endpoints
Sprawdź każdy endpoint w aplikacji:
- Users
- Activities
- Leaderboard
- Teams
- Workouts

## Debugowanie

### Sprawdź logi w konsoli przeglądarki:
1. Otwórz DevTools (F12)
2. Przejdź do zakładki Console
3. Szukaj komunikatów:
   - `🚀 OctoFit Tracker initialized`
   - `📡 API Base URL: ...`
   - `🔧 API Configuration: ...`
   - `Fetching [Resource] from: ...`

### Sprawdź czy backend działa:
```bash
ps aux | grep runserver
```

### Testuj API bezpośrednio:
```bash
curl http://localhost:8000/api/users/
curl http://localhost:8000/api/activities/
curl http://localhost:8000/api/leaderboard/
curl http://localhost:8000/api/teams/
curl http://localhost:8000/api/workouts/
```

## Pliki zmodyfikowane
- ✅ `src/config/api.js` (nowy)
- ✅ `src/App.js`
- ✅ `src/components/Users.js`
- ✅ `src/components/Activities.js`
- ✅ `src/components/Leaderboard.js`
- ✅ `src/components/Teams.js`
- ✅ `src/components/Workouts.js`
- ✅ `frontend/.env`
- ✅ `frontend/setup-env.sh` (nowy)

## Backend sprawdzony
✅ Serwer Django działa na porcie 8000
✅ CORS jest poprawnie skonfigurowany
✅ Wszystkie 5 endpoints są zarejestrowane:
  - `/api/users/`
  - `/api/activities/`
  - `/api/leaderboard/`
  - `/api/teams/`
  - `/api/workouts/`
