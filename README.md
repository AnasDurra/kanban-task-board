# 🚀 TaskBoard Pro

A simple and responsive Kanban-style task board built with React, TypeScript, Tailwind CSS, and DnD Kit.

---

## 🔗 Live Demo

🌐 [https://kanban-task-board-roan.vercel.app](https://kanban-task-board-roan.vercel.app)

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AnasDurra/kanban-task-board.git
cd kanban-task-board
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Then open your browser at: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
src/
├── components/        # Reusable UI elements (Button, Input, Badge, etc.)
├── features/kanban/   # Main Kanban board logic, state, and types
├── lib/               # Utility functions (e.g. localStorage helpers)
├── routes/            # App routing configuration
```

---

## ✅ Features

- Add, edit, and delete task columns and tasks
- Drag-and-drop support for tasks and columns using @dnd-kit
- Real-time UI updates with optimistic reordering
- Fully responsive design using Tailwind CSS
- State persistence using `localStorage`

---

## 📝 Notes & Assumptions

- it was assumed that no external UI library should be used, so all UI components (buttons, inputs, dropdowns, etc) were built from scratch using Tailwind CSS.
- a color selection feature was added when creating columns to improve UI clarity — this was not part of the original spec but was added as a UX enhancement.

---

## 📄 License

This project is submitted as part of the technical evaluation for the Frontend Developer position at Audit Station.
