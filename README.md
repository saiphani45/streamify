# Streamify Dashboard 🎵

A modern analytics dashboard for a fictional music streaming service built with Vite, React, TypeScript, and Tailwind CSS. This dashboard provides comprehensive insights into user activity, revenue metrics, and content performance.

## 🚀 Features

### Core Dashboard Elements

- **Key Metrics Display**
  - Total Users Counter
  - Active Users Tracking
  - Total Streams Analytics
  - Revenue Generation Insights
  - Top Artist Showcase

### Interactive Data Visualizations

- User Growth Trends (Line Chart)
- Revenue Distribution (Pie Chart)
- Top Streamed Songs (Bar Chart)
- Interactive Hover States

### Data Management

- Sortable and Filterable Data Table
- Comprehensive Stream Analytics
- Artist Performance Metrics

### Additional Features

- Dark/Light Theme Toggle
- Responsive Design
- Interactive Notifications System
- Performance Optimizations
- Loading States & Animations

## 🛠 Tech Stack

- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Charts:** Recharts
- **State Management:** React Context API
- **Performance:** React Suspense & Lazy Loading

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/streamify-dashboard.git
```

2. Install dependencies:

```bash
cd streamify-dashboard
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

4. testing

```bash
pnpm run test
```

## 🔧 Configuration

- No additional configuration is required as the project uses mock data. However, you can modify the data in the following locations: `/src/data/mockData.ts` - Main data source

/src/data/mockData.ts - Main data source

## 💡 Implementation Details

### Architecture Decisions

1. Component Structure

- Modular components for reusability
- Lazy loading for optimal performance
- Context API for state management

2. Performance Optimizations

- Implemented lazy loading for route-based code splitting
- Used memo and useCallback for expensive computations
- Optimized re-renders using proper React hooks

3. UI/UX Considerations

- Responsive design for all screen sizes
- Interactive elements for better user engagement
- Consistent theme across components
- Loading states for better user experience

👥 Author
Kotipalli Sai Phani Teja

GitHub: https://github.com/saiphani45
LinkedIn: https://www.linkedin.com/in/sai-phani/
