# OctoFit Tracker - Bootstrap Styling Guide

## 🎨 Styling Overview

All components have been updated to use consistent Bootstrap 5 styling with custom enhancements. The design follows a modern, professional theme with gradient accents and smooth animations.

## Color Scheme

- **Primary Accent**: `#00d4ff` (Cyan/Electric Blue)
- **Dark Background**: `#1a1a2e` (Deep Navy)
- **Secondary**: `#16213e` (Navy)
- **Success**: `#28a745` (Green)
- **Warning**: `#ffc107` (Amber)
- **Danger**: `#dc3545` (Red)

## Components & Styling

### 1. Navigation Bar
- **File**: [src/App.js](src/App.js)
- **Features**:
  - Gradient background (dark navy to deep navy)
  - Cyan accent color for brand
  - Responsive toggle button for mobile
  - Active link highlighting
  - Smooth hover transitions

### 2. Tables
- **Used in**: Users, Activities, Workouts, Leaderboard
- **Features**:
  - Dark headers with white text
  - Striped rows for better readability
  - Hover effects with cyan accent border
  - Badge IDs in secondary gray
  - Action buttons at the end of each row
  - Responsive table wrapper

### 3. Cards
- **Used in**: Home page, Teams
- **Features**:
  - Subtle shadows and borders
  - Hover animation (lift effect)
  - Rounded corners (8px)
  - Icon/emoji headers
  - Consistent spacing

### 4. Buttons
- **Styles Used**:
  - `btn-primary`: Cyan gradient, arrow-like
  - `btn-outline-primary`: Primary outline style
  - `btn-sm`: Small buttons for table actions
  - Hover effects with shadow and lift

```html
<!-- Primary Button -->
<button className="btn btn-primary">Action</button>

<!-- Outline Button -->
<button className="btn btn-outline-primary">Secondary</button>

<!-- Small Button -->
<button className="btn btn-sm btn-outline-primary">Edit</button>
```

### 5. Badges
- **Used for**: Counts, IDs, Status
- **Styles**:
  - `badge-primary`: Cyan accent
  - `badge-secondary`: Gray ID badges
  - `badge-success`: Green for calories
  - `badge-info`: Light blue for durations

```html
<span className="badge bg-primary">Item Count</span>
<span className="badge bg-success">100 cal</span>
<span className="badge bg-info text-dark">30 min</span>
```

### 6. Headings
- **H1**: 2.5rem with cyan underline
- **H2**: 2rem with cyan underline
- **Hierarchy**: Consistent font weights (600)

```html
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
```

### 7. Alerts
- **Info**: Blue background with left border
- **Warning**: Yellow background with left border
- **Danger**: Red background with left border
- **Success**: Green background with left border

```html
<div className="alert alert-info" role="alert">
  Loading...
</div>
```

### 8. Spinners
- **Loading States**:
  - Cyan color spinner
  - Used with alert for loading messages

```html
<div className="alert alert-info" role="alert">
  <div className="spinner-border spinner-border-sm me-2" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  Loading data...
</div>
```

## File Structure

```
src/
├── App.css           # Main stylesheet with all custom styles
├── App.js            # Navigation and routing with Bootstrap nav
├── index.css         # Base styles
└── components/
    ├── Users.js      # Bootstrap table + badges
    ├── Activities.js # Bootstrap table + badges
    ├── Workouts.js   # Bootstrap table + badges + dates
    ├── Teams.js      # Bootstrap cards + buttons
    └── Leaderboard.js # Bootstrap cards + table + medals
```

## Key Styling Features

### Consistent Table Layout
All data tables follow the same pattern:
1. Dark header with uppercase labels
2. Striped rows for readability
3. Hover effect with cyan accent
4. Badges for IDs and metrics
5. Action buttons (Edit, View, Delete)

### Responsive Design
- Mobile-first approach
- Adjusts font sizes and padding on small screens
- Bootstrap grid system (`col-md-4`, `col-lg-4`, etc.)
- Responsive tables with horizontal scroll

### Animations
- Card hover: Lift up 5px
- Button hover: Lift 2px with shadow
- Link hover: Color transition with background tint
- All transitions: 0.3s ease

### Spacing
- Container margin: `mt-4` for main content
- Card gaps: `g-4` between columns
- Padding: Consistent 1rem for cells
- Margins: 1.5rem between sections

## Usage Examples

### Data Table
```jsx
<div className="table-responsive">
  <table className="table table-striped table-hover">
    <thead className="table-dark">
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><span className="badge bg-secondary">1</span></td>
        <td>John</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Card Grid
```jsx
<div className="row g-4">
  <div className="col-md-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Title</h5>
        <p className="card-text">Description</p>
        <button className="btn btn-primary">Action</button>
      </div>
    </div>
  </div>
</div>
```

### Loading State
```jsx
if (loading) {
  return (
    <div className="alert alert-info" role="alert">
      <div className="spinner-border spinner-border-sm me-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      Loading data...
    </div>
  );
}
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility
- Semantic HTML (`<button>`, `<table>`, etc.)
- ARIA labels where needed
- Proper color contrast
- Keyboard navigation support
- Focus states on interactive elements

## Custom CSS Variables (Optional Enhancement)

To use custom CSS variables, update `App.css`:

```css
:root {
  --primary-accent: #00d4ff;
  --dark-bg: #1a1a2e;
  --secondary-bg: #16213e;
  --light-bg: #f8f9fa;
}

.btn-primary {
  background-color: var(--primary-accent);
}
```

## Future Enhancements

- [ ] Dark mode toggle
- [ ] Theme customization
- [ ] Advanced animations
- [ ] Custom form validation styles
- [ ] Tooltip support
- [ ] Popover support
