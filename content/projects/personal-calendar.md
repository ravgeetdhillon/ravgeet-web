---
title: Unified Calendar Dashboard

category: [Web]

tech_stack: [Next.js, Google Apps Script, Notion API, ClickUp API]

promo: A unified calendar dashboard that aggregates events from multiple sources into a single, clean interface.

image: personal-calendar.png

show: true

emoji: 📆
---

In today's fast-paced world, managing tasks and events across multiple platforms can be overwhelming. Between Google Calendar meetings, Notion project deadlines, and ClickUp task assignments, it's easy to lose track of what's due when. That's why I built a **unified calendar dashboard**!

## Project Overview

The calendar dashboard is a Next.js application that fetches data from three major productivity platforms:

- **Google Calendar** - for meetings and appointments
- **Notion** - for personal tasks
- **ClickUp** - for work-related tasks and assignments

All events are displayed in a chronologically organized dashboard with intelligent categorization based on due dates.

## Key Features

### 🔐 Secure Authentication

The application uses a simple password-based authentication system with HTTP-only cookies for security. The login system protects both the main dashboard and all API endpoints, ensuring only authorized users can access the calendar data.

### 📊 Smart Event Categorization

Events are automatically organized into four categories:

- **⚠️ Overdue** - Past due items that need immediate attention
- **📌 Due Today** - Items due on the current date
- **📌 Due Tomorrow** - Items due the next day
- **📅 Upcoming** - All future events beyond tomorrow

### 🔄 Real-time Updates

The dashboard includes:

- Manual refresh functionality to fetch the latest data
- Automatic relative time updates (e.g., "5 minutes ago" becomes "6 minutes ago")
- Last updated timestamp to show data freshness

### 🎨 Modern UI Design

Built with React Bootstrap, the interface features:

- Responsive design that works on all devices
- Color-coded status indicators for different task types
- Clean, organized layout with sticky section headers
- Direct links to original items in their respective platforms

## Technical Architecture

### Backend API Design

The application uses Next.js API routes with a modular architecture:

```typescript
// Core function that aggregates all events
export async function getAllEvents() {
  try {
    const [clickup, notion, calendar] = await Promise.all([
      fetchClickupTasks().catch(() => []),
      fetchNotionTasks().catch(() => []),
      fetchCalendarEvents().catch(() => []),
    ])
    return { clickup, notion, calendar }
  } catch (e) {
    console.error('getAllEvents() failed:', e)
    return { clickup: [], notion: [], calendar: [] }
  }
}
```

Each data source has its own dedicated module, making the system easily extensible for additional integrations.

### Frontend State Management

The React frontend uses several clever techniques:

- **Automatic Time Updates**: A `useEffect` hook with `setInterval` ensures relative timestamps update every minute without user interaction.

- **Intelligent Date Sorting**: Custom sorting logic handles the "YYYY-MM-DD" date format efficiently:

  ```typescript
  const sortDateKeys = (dateKeys: string[]) => {
    return dateKeys.sort() // YYYY-MM-DD format sorts naturally
  }
  ```

- **Error Handling**: Comprehensive error handling for network requests with user-friendly messages.

## Data Integration Challenges

### Date Format Standardization

One of the biggest challenges was handling different date formats from various APIs:

- Google Calendar uses ISO 8601 timestamps
- Notion returns date strings
- ClickUp uses Unix timestamps

The solution was to normalize all dates to "YYYY-MM-DD" format for consistent sorting and display.

### API Rate Limiting

Each service has different rate limits and authentication requirements. The application handles this by:

- Implementing proper error catching for each API call
- Using Promise.all() for concurrent requests while maintaining fallbacks
- Gracefully degrading when individual services are unavailable

## Security Considerations

### API Protection

All sensitive endpoints are protected with authentication middleware:

```typescript
export async function GET(request: NextRequest) {
  // Check for auth cookie
  const auth = request.cookies.get('auth')?.value
  if (auth !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  // ... rest of the API logic
}
```

### Environment Variables

Sensitive configuration like API keys and passwords are stored in environment variables, never committed to the repository.

## Future Enhancements

The modular architecture makes it easy to add new features:

- **Additional Integrations**: Slack reminders, GitHub issues
- **Filtering and Search**: Filter by source, priority, or keywords
- **Notifications**: Browser notifications for upcoming deadlines

## Lessons Learned

1. **Start with a solid data model**: Standardizing the event structure early made integration much smoother
2. **Handle failures gracefully**: Each integration should fail independently without breaking the entire system
3. **User experience matters**: Features like automatic time updates and visual categorization significantly improve usability
4. **Security from the start**: Implementing authentication early prevents having to retrofit security later

## Conclusion

This calendar dashboard project demonstrates how modern web technologies can solve real productivity problems. By combining Next.js's full-stack capabilities with thoughtful UX design, we created a tool that genuinely improves daily workflow management.

The key to success was focusing on the user experience while maintaining clean, maintainable code. The result is a dashboard that not only aggregates data from multiple sources but presents it in a way that actually helps users stay organized and productive.
