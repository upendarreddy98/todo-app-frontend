
<img width="1670" height="784" alt="image" src="https://github.com/user-attachments/assets/39acb1a6-5df0-4c8f-81a1-5abb000d1b29" />




<img width="1212" height="746" alt="image" src="https://github.com/user-attachments/assets/a47bb228-73a2-4c57-8f90-ceba2ba190b5" />



DB related image:<img width="1214" height="610" alt="image" src="https://github.com/user-attachments/assets/4d11a6b8-4cab-489a-b482-c6d7c2c0ad07" />



# Todo App Frontend

Modern React frontend built with Next.js, TypeScript, and Tailwind CSS for the Todo List application.

## 🚀 Features

- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **Responsive Design**: Mobile-first approach
- **State Management**: React Context + useReducer
- **API Integration**: Custom service layer with error handling
- **Modern UI**: Dark theme following Figma design
- **Color Coding**: Visual organization with color-coded tasks

## 📋 Prerequisites

- Node.js 18+
- npm
- Backend API running on port 3001

## 🛠️ Quick Start

### **Step 1: Install Dependencies**
```bash
npm install
```

### **Step 2: Start Development Server**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔧 Environment Configuration

The `.env.local` file is already configured:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🌐 Pages & Features

### **Home Page (`/`)**
- List of all tasks with color coding
- Task statistics (total and completed)
- Toggle task completion (checkboxes)
- Delete tasks with confirmation
- Create new task button

### **Create Task (`/create`)**
- Title input (required)
- Color picker (9 color options)
- Form validation

### **Edit Task (`/edit/[id]`)**
- Pre-filled form with existing data
- Update task title and color
- Save changes functionality

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/            # Reusable UI components
│   ├── contexts/              # React Context for state
│   └── lib/                   # API service layer
├── .env.local                 # Environment variables
└── package.json
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb)
- **Background**: Dark gray (#111827)
- **Cards**: Medium gray (#1f2937)
- **Task Colors**: Red, Orange, Yellow, Green, Blue, Indigo, Purple, Pink, Gray

## 🌐 API Integration

The frontend communicates with the backend API:

```typescript
// Get all tasks
const tasks = await todoApi.getTodos()

// Create task
const newTask = await todoApi.createTodo({
  title: "New Task",
  color: "blue"
})

// Update task
const updatedTask = await todoApi.updateTodo(id, {
  completed: true
})

// Delete task
await todoApi.deleteTodo(id)
```

## 🚨 Troubleshooting

### Frontend Won't Start
```bash
# Check if backend is running
curl http://localhost:3001/tasks

# Restart frontend
npm run dev
```

### API Connection Issues
- Ensure backend is running on port 3001
- Check `.env.local` configuration
- Verify CORS settings in backend

## 📝 Notes

- Requires backend API running on port 3001
- UI follows the provided Figma design
- All components are fully typed with TypeScript
- State managed globally through React Context
