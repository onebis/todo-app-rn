# Todo App Complete Implementation Specification

**Version:** 1.0.0
**Document Type:** Language-agnostic Implementation Guide
**Last Updated:** 2025-11-21

---

## Table of Contents

1. [Overview](#1-overview)
2. [Data Model](#2-data-model)
3. [Functional Requirements](#3-functional-requirements)
4. [UI/UX Specification](#4-uiux-specification)
5. [System Architecture](#5-system-architecture)
6. [API & Integration Specification](#6-api--integration-specification)
7. [Implementation Checklist](#7-implementation-checklist)
8. [Additional Notes](#8-additional-notes)

---

## 1. Overview

### 1.1 Purpose of the App

A tab-based task management application that allows users to organize tasks into customizable categories (tabs). Users can create, edit, complete, and delete tasks within each tab, with support for drag-and-drop operations to move tasks between tabs.

### 1.2 Main Features

1. **Task Management**
   - Create, read, update, and delete tasks
   - Mark tasks as complete/incomplete
   - Edit task descriptions inline
   - Soft delete with undo functionality
   - Permanent deletion from trash

2. **Tab Management**
   - Create custom tabs with unique names, colors, and icons
   - Reorder tabs via drag-and-drop
   - Edit tab properties (name, color, icon)
   - Delete tabs (with cascade deletion of contained tasks)
   - Protected "Delete" tab that cannot be removed

3. **Drag & Drop**
   - Move tasks between tabs by dragging
   - Reorder tabs in the tab list

4. **Offline Functionality**
   - All data stored locally on device
   - No internet connection required
   - Instant data persistence

### 1.3 Technology Stack (Language-agnostic)

**Core Technologies:**
- **UI Framework:** Any modern cross-platform framework (e.g., Flutter, React Native, .NET MAUI)
- **State Management:** Reactive state management solution (e.g., MobX, Redux, Riverpod, Signals)
- **Database:** Embedded NoSQL database (e.g., Isar, Realm, SQLite, IndexedDB)
- **Code Generation:** Optional - for immutable data classes and database schemas

**Architecture Pattern:**
- **MVVM (Model-View-ViewModel)** with clear separation of concerns
- **Repository Pattern** for data access abstraction
- **Dependency Injection** for loose coupling

**Key Principles:**
- Immutable state models
- Unidirectional data flow
- Reactive UI updates
- ACID-compliant local database transactions

### 1.4 Target Platforms

- **Primary:** Mobile (iOS, Android)
- **Orientation:** Portrait only
- **Future:** Web, Desktop (requires layout adaptations)

---

## 2. Data Model

### 2.1 Entities

#### 2.1.1 Task Entity

Represents a single task item in the application.

| Field Name | Data Type | Required | Default Value | Constraints | Description |
|------------|-----------|----------|---------------|-------------|-------------|
| `id` | Integer | Yes | Auto-generated | Primary key, unique | Unique task identifier |
| `subject` | String | Yes | "" (empty) | None | Task content/description |
| `done` | Boolean | Yes | false | None | Completion status |
| `tabId` | Integer | Yes | 0 | Foreign key to Tab.id | Associated tab identifier |
| `order` | Integer | Yes | 0 | >= 0 | Display order within tab |
| `created` | Timestamp | Yes | Current time | None | Creation timestamp |

**Relationships:**
- Many-to-One with Tab (via `tabId`)
- Cascade behavior: When tab is deleted, all tasks in that tab are also deleted

**Indexes:**
- Primary: `id`
- Foreign key index: `tabId` (for efficient filtering)

---

#### 2.1.2 Tab Entity

Represents a category/tab for organizing tasks.

| Field Name | Data Type | Required | Default Value | Constraints | Description |
|------------|-----------|----------|---------------|-------------|-------------|
| `id` | Integer | Yes | Auto-generated | Primary key, unique | Unique tab identifier |
| `title` | String | Yes | "title" | Max 8 characters | Tab display name |
| `color` | String | Yes | "red" | From COLOR_LIST | Color identifier for UI |
| `icon` | String | Yes | "circle" | From ICON_LIST | Icon identifier for UI |
| `order` | Integer | Yes | 0 | >= 0 | Display order in tab list |
| `created` | Timestamp | Yes | Current time | None | Creation timestamp |

**Relationships:**
- One-to-Many with Task (one tab contains many tasks)

**Special Tabs:**
- **DELETE_TAB_ID = 1**: Reserved tab for soft-deleted tasks. This tab cannot be deleted by users.

**Indexes:**
- Primary: `id`
- Sort index: `order` (for efficient sorting)

---

### 2.2 State Models (UI Layer)

#### 2.2.1 TaskState

Immutable state representation of a task for UI rendering.

```text
TaskState {
  id: Integer
  subject: String
  done: Boolean
  tabId: Integer
  created: String (ISO 8601 format)
}
```

**Conversion:** Task Entity → TaskState (via ViewModel layer)

---

#### 2.2.2 TabState

Immutable state representation of a tab for UI rendering.

```text
TabState {
  id: Integer
  title: String
  color: String
  icon: String
  order: Integer
}
```

**Conversion:** Tab Entity → TabState (via ViewModel layer)

---

#### 2.2.3 TaskListState

Container for managing the list of tasks in the active tab.

```text
TaskListState {
  taskList: List<TaskState>
  isLoading: Boolean (optional)
  error: String? (optional)
}
```

---

#### 2.2.4 TabListState

Container for managing the list of all tabs.

```text
TabListState {
  tabList: List<TabState>
  isLoading: Boolean
  error: String? (optional)
}
```

---

#### 2.2.5 AppState

Global application state.

```text
AppState {
  activeTabId: Integer  // Currently selected tab
  activeEditId: Integer // Task currently being edited (0 = none)
}
```

---

#### 2.2.6 EditTabState

Temporary state for tab creation/editing screens.

```text
EditTabState {
  editTabId: Integer? // null for new tab, id for editing
  editTabTitle: String
  editTabColor: String
  editTabIcon: String
}
```

---

### 2.3 Data Relationship Diagram

```text
┌─────────────────────┐
│       Tab           │
│ ─────────────────── │
│ + id: Integer (PK)  │
│ + title: String     │
│ + color: String     │
│ + icon: String      │
│ + order: Integer    │
│ + created: Timestamp│
└──────────┬──────────┘
           │ 1
           │
           │ has
           │
           │ N
┌──────────▼──────────┐
│       Task          │
│ ─────────────────── │
│ + id: Integer (PK)  │
│ + subject: String   │
│ + done: Boolean     │
│ + tabId: Integer(FK)│
│ + order: Integer    │
│ + created: Timestamp│
└─────────────────────┘

Special Constraint:
  tabId = 1 (DELETE_TAB_ID) → Soft-deleted tasks
```

---

### 2.4 Sequence Diagrams

#### 2.4.1 Create New Task Flow

```text
User          UI          ViewModel       Repository      Database
  │            │              │               │              │
  │─Click Add─>│              │               │              │
  │            │─addTask()───>│               │              │
  │            │              │─createTask()─>│              │
  │            │              │               │─INSERT────> │
  │            │              │               │<─newId───── │
  │            │              │<─newId─────── │              │
  │            │<─setEditId── │               │              │
  │            │─fetchTasks()─>               │              │
  │            │              │─getTasks()───>│              │
  │            │              │               │─SELECT────> │
  │            │              │               │<─tasks───── │
  │            │              │<─tasks─────── │              │
  │            │<─updateState─│               │              │
  │<─UI Render─│              │               │              │
```

---

#### 2.4.2 Move Task to Different Tab (Drag & Drop)

```text
User          UI          ViewModel       Repository      Database
  │            │              │               │              │
  │─Long Press>│              │               │              │
  │─Drag──────>│              │               │              │
  │─Drop on Tab│              │               │              │
  │            │─moveTask()──>│               │              │
  │            │              │─updateTabId()>│              │
  │            │              │               │─UPDATE────> │
  │            │              │               │<─success─── │
  │            │              │<─success───── │              │
  │            │─refreshList─>│               │              │
  │            │              │─getTasks()───>│              │
  │            │              │               │─SELECT────> │
  │            │              │               │<─tasks───── │
  │            │              │<─tasks─────── │              │
  │            │<─updateState─│               │              │
  │<─UI Update─│              │               │              │
```

---

#### 2.4.3 Application Initialization Flow

```text
App          ViewModel       Repository      Database
 │              │               │              │
 │─Start──────> │               │              │
 │              │─initialize()─>│              │
 │              │               │─checkTabs()─>│
 │              │               │<─count=0──── │
 │              │               │              │
 │              │               │─createDefaults()
 │              │               │  │           │
 │              │               │  │─INSERT──>│  (Tab: "todo")
 │              │               │  │<─id=2─── │
 │              │               │  │           │
 │              │               │  │─INSERT──>│  (Tab: "削除")
 │              │               │  │<─id=1─── │
 │              │               │<─success─── │
 │              │               │              │
 │              │               │─getAllTabs()>│
 │              │               │<─tabs─────── │
 │              │<─tabs─────── │              │
 │              │─setActiveTab(firstTab.id)   │
 │<─Ready───── │               │              │
```

---

### 2.5 State Transition Diagrams

#### 2.5.1 Task State Lifecycle

```text
                    [Created]
                       │
                       ▼
         ┌────────[Not Done]─────────┐
         │            │              │
    Toggle Done   Edit Subject   Delete
         │            │              │
         ▼            ▼              ▼
      [Done]    [Not Done]    [Soft Deleted]
         │                           │
    Toggle Done                  Undo │ Permanent
         │                           │   Delete
         ▼                           ▼      │
    [Not Done]              [Restored]      ▼
                                        [Deleted]
                                      (Permanently)
```

---

#### 2.5.2 Tab Management States

```text
           [No Tabs]
              │
         Create Initial
              │
              ▼
          [Has Tabs]
              │
         ┌────┴────┐
         │         │
    Create New  Edit/Delete
         │         │
         ▼         ▼
    [Tab Added] [Tab Updated/Removed]
         │         │
         └────┬────┘
              │
              ▼
        [Reorder Tabs]
              │
              ▼
      [Order Normalized]
```

---

## 3. Functional Requirements

### 3.1 Application Initialization

#### FR-INIT-001: First Launch Initialization

**Description:** When the application launches for the first time, initialize the database with default tabs.

**Preconditions:**
- Database is empty (no tabs exist)

**Processing Steps:**
1. Check if any tabs exist in the database
2. If count == 0:
   - Create Tab with id=2, title="todo", icon="check", color="blue", order=1
   - Create Tab with id=1, title="削除" (Delete), icon="delete_outline", color="redAccent", order=2
3. Fetch all tabs sorted by order
4. Set activeTabId to the first tab's ID

**Postconditions:**
- Database contains 2 tabs
- Active tab is set to "todo" (id=2)
- UI displays both tabs

**Error Handling:**
- If database initialization fails, default activeTabId to 1

---

#### FR-INIT-002: Subsequent Launch

**Description:** On subsequent launches, restore the previous state.

**Preconditions:**
- Database contains at least one tab

**Processing Steps:**
1. Fetch all tabs from database, sorted by order
2. Set activeTabId to the first tab's ID
3. Fetch all tasks for the active tab

**Postconditions:**
- Tab list is loaded
- Active tab is set
- Task list for active tab is displayed

---

### 3.2 Tab Management

#### FR-TAB-001: Create New Tab

**Description:** User creates a new tab with custom title, color, and icon.

**Input:**
- `title`: String (1-8 characters)
- `color`: String (from COLOR_LIST)
- `icon`: String (from ICON_LIST)

**Processing Steps:**
1. Set loading state to true
2. Create new tab in database with order=0
3. Fetch all existing tabs
4. Insert new tab at position 0
5. Normalize all tab orders (set order = index for all tabs)
6. Update UI state with new tab list
7. Set loading state to false

**Validation Rules:**
- Title must be 1-8 characters
- Color must be from predefined COLOR_LIST
- Icon must be from predefined ICON_LIST

**Postconditions:**
- New tab appears at top of tab list
- All other tabs shifted down
- Tab orders are sequential (0, 1, 2, ...)

---

#### FR-TAB-002: Edit Tab Properties

**Description:** Modify an existing tab's title, color, or icon.

**Input:**
- `tabId`: Integer
- `title`: String (1-8 characters)
- `color`: String (from COLOR_LIST)
- `icon`: String (from ICON_LIST)

**Processing Steps:**
1. Fetch tab from database by ID
2. Update tab's title, color, and icon
3. Save to database
4. Refresh tab list in UI

**Validation Rules:**
- Same as FR-TAB-001

**Constraints:**
- Cannot edit DELETE_TAB_ID (id=1) via normal edit flow

**Postconditions:**
- Tab properties updated in database
- UI reflects changes immediately

---

#### FR-TAB-003: Delete Tab

**Description:** Permanently delete a tab and all its tasks.

**Input:**
- `tabId`: Integer

**Processing Steps:**
1. Show confirmation dialog
2. If confirmed:
   - Delete all tasks where tabId = specified ID
   - Delete the tab from database
   - Re-initialize app state (set active tab to first available)
   - Refresh task list and tab list

**Validation Rules:**
- Cannot delete DELETE_TAB_ID (id=1)

**Postconditions:**
- Tab is permanently removed
- All tasks in tab are permanently deleted
- If deleted tab was active, switch to first available tab

**Error Handling:**
- User can cancel via confirmation dialog

---

#### FR-TAB-004: Reorder Tabs

**Description:** Change display order of tabs via drag-and-drop.

**Input:**
- `oldIndex`: Integer (original position)
- `newIndex`: Integer (target position)

**Processing Steps:**
1. If oldIndex < newIndex, adjust newIndex = newIndex - 1
2. Swap order values between tabs at oldIndex and newIndex
3. Fetch all tabs from database
4. Normalize orders: for each tab, set order = its index
5. Save all updated tabs
6. Refresh tab list

**Postconditions:**
- Tabs displayed in new order
- Order values are sequential (0, 1, 2, ...)

---

#### FR-TAB-005: Switch Active Tab

**Description:** User selects a different tab to view its tasks.

**Input:**
- `tabId`: Integer

**Processing Steps:**
1. Update activeTabId in app state
2. Reset activeEditId to 0 (exit edit mode)
3. Fetch tasks where tabId = specified ID
4. Update task list state

**Postconditions:**
- Active tab highlighted in UI
- Task list shows only tasks from selected tab
- Any task being edited is deselected

---

### 3.3 Task Management

#### FR-TASK-001: Create New Task

**Description:** Add a new empty task to the current active tab.

**Input:**
- `tabId`: Integer (current active tab)

**Processing Steps:**
1. Create new task in database:
   - tabId = active tab ID
   - subject = "" (empty)
   - done = false
   - order = 0
   - created = current timestamp
2. Return new task ID
3. Set activeEditId = new task ID
4. Fetch all tasks for active tab
5. Update UI state

**Postconditions:**
- New task appears in task list
- Task is immediately in edit mode
- Input field is focused

---

#### FR-TASK-002: Update Task Subject

**Description:** User edits the text content of a task.

**Input:**
- `taskId`: Integer
- `subject`: String

**Processing Steps:**
1. Fetch task from database by ID
2. Update task.subject = new value
3. Save to database
4. (UI updates in real-time, no state refresh needed)

**Validation Rules:**
- None (free text, no length limit)

**Behavior:**
- Updates occur on every keystroke (optimistic UI)

---

#### FR-TASK-003: Toggle Task Completion

**Description:** Mark a task as done or not done.

**Input:**
- `taskId`: Integer

**Processing Steps:**
1. Fetch task from database by ID
2. Toggle: task.done = !task.done
3. Save to database
4. Fetch all tasks for active tab
5. Update UI state

**Visual Indication:**
- done = true: Gray text with strikethrough, filled check icon
- done = false: Black text, empty circle icon

---

#### FR-TASK-004: Soft Delete Task (Move to Trash)

**Description:** User swipes to delete a task, moving it to DELETE tab.

**Input:**
- `taskId`: Integer
- `originalTabId`: Integer (current tab)

**Processing Steps:**
1. Store originalTabId in memory
2. Update task.tabId = DELETE_TAB_ID (1)
3. Save to database
4. Show snackbar: "削除しました" (Deleted) with "Undo" action (3 seconds)
5. Refresh task list

**Undo Operation:**
- Within 3 seconds, user can tap "Undo"
- Revert task.tabId = originalTabId
- Task reappears in original tab

**Postconditions:**
- Task disappears from current tab
- Task appears in DELETE tab
- Can be restored within 3 seconds

---

#### FR-TASK-005: Permanently Delete Task

**Description:** Remove a task from database permanently.

**Input:**
- `taskId`: Integer

**Processing Steps:**
1. Delete task from database by ID
2. Refresh task list

**Constraints:**
- Only available when viewing DELETE tab
- Triggered by swiping task in DELETE tab
- No undo option

**Postconditions:**
- Task is permanently removed (irreversible)

---

#### FR-TASK-006: Delete All Tasks in Trash

**Description:** Permanently delete all tasks in DELETE tab.

**Input:** None

**Processing Steps:**
1. Delete all tasks where tabId = DELETE_TAB_ID (1)
2. Refresh task list

**Constraints:**
- Only available when DELETE tab is active
- Triggered by floating action button with trash icon
- No confirmation dialog

**Postconditions:**
- All tasks in DELETE tab are permanently removed

---

#### FR-TASK-007: Move Task to Different Tab

**Description:** User drags and drops task onto a different tab.

**Input:**
- `taskId`: Integer
- `targetTabId`: Integer

**Processing Steps:**
1. Update task.tabId = targetTabId
2. Save to database
3. Refresh task list for current active tab

**Constraints:**
- Cannot drag tasks currently being edited
- Visual feedback: target tab highlights when task hovers over it

**Postconditions:**
- Task disappears from source tab
- Task appears in destination tab

---

#### FR-TASK-008: Enter Task Edit Mode

**Description:** User taps a task to edit its subject.

**Input:**
- `taskId`: Integer

**Processing Steps:**
1. Update activeEditId = taskId
2. UI switches from Text to TextField
3. TextField is auto-focused

**Postconditions:**
- Task switches to edit mode
- Keyboard appears
- Text cursor positioned in subject field

**Constraints:**
- Only one task can be in edit mode at a time

---

#### FR-TASK-009: Exit Task Edit Mode

**Description:** User submits changes by pressing Enter or tapping elsewhere.

**Input:** None (triggered by onSubmit or tab change)

**Processing Steps:**
1. Reset activeEditId = 0
2. Refresh task list for active tab

**Postconditions:**
- Task switches to display mode
- TextField replaced with Text
- Keyboard dismissed

**Note:**
- Changes are saved during typing (FR-TASK-002), not on exit

---

### 3.4 Use Case Diagrams

```text
┌──────────────────────────────────────────────┐
│                   User                       │
└────────┬─────────────────────────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
[Task Mgmt] [Tab Mgmt]
    │         │
    │         ├──> Create Tab
    │         ├──> Edit Tab
    │         ├──> Delete Tab
    │         ├──> Reorder Tabs
    │         └──> Switch Tab
    │
    ├──> Create Task
    ├──> Edit Task Subject
    ├──> Toggle Task Completion
    ├──> Move Task (Drag & Drop)
    ├──> Soft Delete Task
    ├──> Undo Delete
    ├──> Permanent Delete
    └──> Empty Trash
```

---

## 4. UI/UX Specification

### 4.1 Screen List

#### 4.1.1 Main Screen

**Purpose:** Primary interface for viewing and managing tasks.

**Layout:**

```text
┌─────────────────────────────────────┐
│  Header (Edit Button)        [⚙]  │ 40dp
├──────────────────┬──────────────────┤
│                  │                  │
│   Task List      │    Tab List      │
│     (80%)        │      (20%)       │
│                  │                  │
│  ☐ Task 1        │  ┌────────────┐  │
│  ☑ Task 2        │  │ [Tab 1]    │  │ 70dp each
│  ☐ Task 3        │  ├────────────┤  │
│  ...             │  │ [Tab 2]    │  │
│                  │  ├────────────┤  │
│                  │  │ [DELETE]   │  │
│                  │  └────────────┘  │
├──────────────────┴──────────────────┤
│              [+] FAB                 │
└─────────────────────────────────────┘
```

**Components:**

| Component | Type | Properties | Actions |
|-----------|------|------------|---------|
| Header | Button | label: "タブの編集", aligned right | Navigate to Edit Tab List Screen |
| Task List | Scrollable List | border radius: 10dp, padding: (20, 10) | Display tasks |
| Task Item | Dismissible Row | swipe left to delete | Edit, complete, delete, drag |
| Tab List | Scrollable Column | width: 20% | Display tabs |
| Tab Item | Drag Target | height: 70dp, rounded right corners | Select tab, drop task |
| FAB | Floating Button | Bottom center | Add task (or delete all if in DELETE tab) |

**States:**
- **Normal:** Display tasks and tabs
- **Edit Mode:** TextField for active task
- **Empty:** No tasks (show empty list)
- **Active Tab:** Highlighted background
- **Drag Hover:** Tab shows shadow when task dragged over it

---

#### 4.1.2 Edit Tab List Screen

**Purpose:** Manage all tabs - view, reorder, edit, delete.

**Layout:**

```text
┌─────────────────────────────────────┐
│  [✕] Tab List                       │
├─────────────────────────────────────┤
│                                     │
│  Reorderable Tab List               │
│  ┌─────────────────────────────┐   │
│  │ [✕] Title 🔴 🏠 [✎]  ≡     │   │
│  ├─────────────────────────────┤   │
│  │ [✕] Title 🔵 ⭐ [✎]  ≡     │   │
│  ├─────────────────────────────┤   │
│  │     Title 🟢 📋 [✎]  ≡     │   │ (DELETE tab: no [✕])
│  └─────────────────────────────┘   │
│                                     │
│              [+] FAB                 │
└─────────────────────────────────────┘
```

**Components:**

| Component | Type | Properties | Actions |
|-----------|------|------------|---------|
| Header | Close Button | Left aligned | Navigate back |
| Tab Item | Reorderable Row | Contains delete, title, color, icon, edit, handle | Reorder, edit, delete |
| Delete Button | Icon Button | icon: ✕, size: 30dp | Delete tab (with confirmation) |
| Edit Button | Icon Button | icon: ✎ | Navigate to Edit Tab Screen |
| Drag Handle | Icon | icon: ≡ | Drag to reorder |
| FAB | Floating Button | icon: + | Navigate to Create Tab Screen |

**States:**
- **Normal:** List of tabs
- **Loading:** Overlay with progress indicator
- **Reordering:** Visual feedback during drag
- **Delete Confirmation:** Dialog before deletion

---

#### 4.1.3 Create Tab Screen

**Purpose:** Create a new tab with custom properties.

**Layout:**

```text
┌─────────────────────────────────────┐
│  [✕] Create Tab                     │
├─────────────────────────────────────┤
│                                     │
│   ┌─────────────────────────────┐  │
│   │ タブ名   │ [____________] │  │
│   ├─────────────────────────────┤  │
│   │ カラー   │     [🔴]       │  │
│   ├─────────────────────────────┤  │
│   │ アイコン │     [🏠]       │  │
│   ├─────────────────────────────┤  │
│   │      [新規作成]             │  │
│   └─────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

**Components:**

| Component | Type | Properties | Actions |
|-----------|------|------------|---------|
| Header | Close Button | Left aligned | Navigate back |
| Title Field | Text Input | max: 8 chars, centered, autofocus | Edit tab name |
| Color Button | Button | Shows current color | Open color picker modal |
| Icon Button | Button | Shows current icon | Open icon picker modal |
| Create Button | Primary Button | label: "新規作成", full width | Create tab and navigate back |

**Input Fields:**
- **Tab Name:** 1-8 characters, required
- **Color:** Select from 13 predefined colors
- **Icon:** Select from 23 predefined icons

---

#### 4.1.4 Edit Tab Screen

**Purpose:** Edit properties of an existing tab.

**Layout:** Same as Create Tab Screen, but:
- Pre-filled with existing tab data
- Button label: "確定" (Confirm) instead of "新規作成"

**Components:** Same as Create Tab Screen

---

#### 4.1.5 Color/Icon Selection Modal

**Purpose:** Allow users to select from predefined options.

**Layout:**

```text
┌─────────────────────────────────────┐
│              [✕]                    │ Header (1/8 height)
├─────────────────────────────────────┤
│  ┌───┬───┬───┬───┬───┬───┐         │
│  │ ● │ ● │ ● │ ● │ ● │ ● │         │ Grid (7/8 height)
│  ├───┼───┼───┼───┼───┼───┤         │ 6 columns
│  │ ● │ ● │ ● │ ● │ ● │ ● │         │
│  ├───┼───┼───┼───┼───┼───┤         │
│  │ ● │ ● │                         │
│  └───┴───┴───────────────┘         │
└─────────────────────────────────────┘
```

**Components:**

| Component | Type | Properties | Actions |
|-----------|------|------------|---------|
| Close Button | Icon Button | Top center | Close modal |
| Grid | Grid View | 6 columns, scrollable | Display options |
| Option Item | Icon Button | Large size (50dp) | Select and close modal |

**Interactions:**
- Tap option: Select and close modal
- Swipe down: Close modal
- Tap close: Close modal

---

### 4.2 Design System

#### 4.2.1 Color Palette

**Primary Colors:**

| Name | Hex Code | Usage |
|------|----------|-------|
| backgroundColor | #E0E0E0 | App background |
| mainListBackgroundColor | #F2F2F2 | Card/container background |
| activeTabColor | #F2F2F2 | Selected tab highlight |
| inactiveTabColor | #BDBDBD | Unselected tabs |

**Accent Colors:**

| Name | Hex Code | Usage |
|------|----------|-------|
| borderBottomColor | #E0E0E0 | Dividers |
| willAcceptColor | #C2F2F2F2 | Drag hover state (semi-transparent) |
| closeButtonColor | #616161 | Close/cancel buttons |

**System Colors:**

| Name | Usage |
|------|-------|
| red | Delete background, DELETE tab |
| blue | Checkbox icon, confirm buttons |
| purple | Loading indicator |
| black | Normal text |
| grey | Completed task text |

**Tab Color Options (13 available):**

black54, grey, white10, redAccent, orangeAccent, yellow, green, lightGreen, blue, blueAccent, lightBlueAccent, deepPurpleAccent, purpleAccent

---

#### 4.2.2 Typography

**Font Family:** System default

**Text Styles:**

| Style | Size | Weight | Usage |
|-------|------|--------|-------|
| Body Large | 16sp | Normal | Task text |
| Body Medium | 14sp | Normal | Tab titles |
| Button | 14sp | Medium | Button labels |

**Text Colors:**
- Normal text: Black (#000000)
- Completed task: Grey (#757575)
- Disabled: Light grey (#BDBDBD)

**Text Decoration:**
- Completed task: Line-through

---

#### 4.2.3 Spacing System

**Spacing Scale:**

| Token | Value | Usage |
|-------|-------|-------|
| xs | 5dp | Small gaps |
| sm | 10dp | Standard item spacing |
| md | 20dp | Section spacing |
| lg | 30dp | Container margins |
| xl | 40dp | Form padding |

**Container Margins:**
- Main container: 30dp horizontal, 20-30dp vertical
- List item: 0dp top, 10dp bottom

**Container Padding:**
- Main list: 20dp vertical, 10dp horizontal
- Edit form: 40dp all sides
- List item: 10dp vertical, 0dp horizontal

---

#### 4.2.4 Border Radius

**Container Borders:**

| Element | Radius | Notes |
|---------|--------|-------|
| Main container | 24dp | Large rounded corners |
| Task list | 10dp | Medium rounded corners |
| Tab item | 5dp | Right side only |
| Modal | 20dp | Top corners only |

---

#### 4.2.5 Shadows & Elevation

**Standard Shadow:**
- Offset: (0, 5)
- Blur: 5dp
- Color: Grey
- Applied to: Main containers, task list

**Drag Hover Shadow:**
- Offset: (5, 5)
- Blur: 10dp
- Color: Grey
- Applied to: Tabs when accepting drag

---

#### 4.2.6 Icon System

**Available Icons (23 total):**

search, home, account_circle, check, visibility, shopping_cart, favorite, description, schedule, language, man, woman, event, paid, assignment, star_rate, work, code, laptop, pets, circle, delete_outline, list

**Icon Sizes:**
- Small: 24dp (checkboxes, buttons)
- Medium: 30dp (tab indicators)
- Large: 50dp (modal selectors)

---

### 4.3 Interaction Design

#### 4.3.1 Animations

**Page Transitions:**

| Transition | Type | Duration | Details |
|------------|------|----------|---------|
| Main screen entry | Fade | 300ms | Opacity fade-in |
| Modal screens entry | Slide up + Fade | 300ms | Slides from bottom |
| Screen exit | Slide down + Fade | 300ms | Reverse of entry |

**Drag & Drop:**

| Event | Animation | Duration | Details |
|-------|-----------|----------|---------|
| Long press start | Elevation | 200ms delay | Wait before drag starts |
| Drag feedback | Semi-transparent | Immediate | Shows dragged item |
| Hover over tab | Color + Shadow | Immediate | Highlight target tab |
| Drop | Position snap | 150ms | Snaps into place |

**Swipe to Delete:**

| Event | Animation | Duration | Details |
|-------|-----------|----------|---------|
| Swipe gesture | Slide + Background reveal | 300ms | Red background slides in |
| Completion | Slide out | 300ms | Task slides off screen |
| Snackbar | Slide up | 200ms | Appears from bottom |

**State Changes:**

| Event | Animation | Duration | Details |
|-------|-----------|----------|---------|
| Task completion | Icon change | Immediate | No animation |
| Edit mode entry | Widget swap | Immediate | Text → TextField |
| Tab selection | Color change | Immediate | Background color |
| Loading overlay | Fade in/out | 150ms | Semi-transparent overlay |

---

#### 4.3.2 Touch Targets

**Minimum Sizes:**

| Element | Size | Notes |
|---------|------|-------|
| Standard touch target | 48dp × 48dp | Minimum recommended |
| FAB | 56dp diameter | Exceeds minimum |
| Tab item | Full width × 70dp | Exceeds minimum |
| Checkbox | 30dp × 30dp | Below minimum (potential issue) |

**Spacing:**
- Minimum 8dp between adjacent touch targets
- Actual: 10dp margin between list items

---

#### 4.3.3 Gestures

**Supported Gestures:**

| Gesture | Action | Element |
|---------|--------|---------|
| Tap | Select/Edit | Tasks, tabs, buttons |
| Long press | Start drag | Tasks (200ms delay) |
| Drag | Move | Tasks, tabs |
| Swipe left | Delete | Tasks |
| Swipe down | Close | Modals |

---

### 4.4 Accessibility

#### 4.4.1 Contrast Ratios

**Text Contrast:**

| Text Type | Contrast Ratio | Standard |
|-----------|---------------|----------|
| Black on #F2F2F2 | ~19:1 | WCAG AAA (7:1) ✓ |
| Grey on #F2F2F2 (completed) | ~4.5:1 | WCAG AA (4.5:1) ✓ |
| Blue icons on #F2F2F2 | ~8:1 | WCAG AA (4.5:1) ✓ |

#### 4.4.2 Screen Reader Support

**Recommended Implementations:**

- Add semantic labels for all icon-only buttons
- Announce state changes (task completed, tab switched)
- Provide alternative text for visual elements
- Support focus navigation with keyboard

#### 4.4.3 Keyboard Navigation

**Focus Order:**
- Logical top-to-bottom, left-to-right
- Tab key moves between elements
- Enter key activates buttons
- Escape key closes modals

---

## 5. System Architecture

### 5.1 Layered Architecture

```text
┌────────────────────────────────────────────────────────┐
│                 Presentation Layer                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Screens    │  │  Components  │  │  ViewModels  │ │
│  │ (UI Pages)   │  │ (Reusable UI)│  │ (Bus. Logic) │ │
│  └──────────────┘  └──────────────┘  └──────┬───────┘ │
└───────────────────────────────────────────────┼────────┘
                                                │
                                                ▼
┌────────────────────────────────────────────────────────┐
│                   State Layer                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │  State Models (Immutable)                        │  │
│  │  - TaskState, TabState, AppState, etc.           │  │
│  └──────────────────────────────────────────────────┘  │
└───────────────────────────────────────────────────────┘
                                                │
                                                ▼
┌────────────────────────────────────────────────────────┐
│                  Repository Layer                       │
│  ┌──────────────────┐    ┌──────────────────────┐     │
│  │ TaskRepository   │    │  TabRepository       │     │
│  │ (Data Access)    │    │  (Data Access)       │     │
│  └────────┬─────────┘    └──────────┬───────────┘     │
└───────────┼──────────────────────────┼─────────────────┘
            │                          │
            └────────────┬─────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────┐
│               Persistence Layer (Database)              │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Embedded NoSQL Database (e.g., Isar, Realm)    │  │
│  │  ┌────────────────┐     ┌──────────────────┐    │  │
│  │  │ Task Collection│─────│ Tab Collection   │    │  │
│  │  │ (Tasks table)  │ FK  │ (Tabs table)     │    │  │
│  │  └────────────────┘     └──────────────────┘    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  Storage: App-private directory                        │
│  - Android: /data/data/[package]/files/                │
│  - iOS: ~/Library/Application Support/                 │
└────────────────────────────────────────────────────────┘
```

---

### 5.2 MVVM Pattern

**Architecture Components:**

1. **View (UI Layer)**
   - Displays data
   - Handles user input
   - Observes ViewModel state
   - No business logic

2. **ViewModel (Logic Layer)**
   - Manages UI state
   - Processes user actions
   - Calls Repository methods
   - Transforms entities to state models

3. **Model (Data Layer)**
   - Database entities (Task, Tab)
   - State models (TaskState, TabState)
   - Repository interfaces

**Data Flow:**

```text
User Input → View → ViewModel → Repository → Database
                ↓                              │
           State Update ←──── Entity ←─────────┘
                ↓
           View Rebuild
```

---

### 5.3 State Management Flow

```text
┌─────────────────────────────────────────────────┐
│              User Action (UI Event)             │
└────────────────────┬────────────────────────────┘
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
    [Read Operation]      [Write Operation]
          │                     │
          ▼                     ▼
   ViewModel.fetch()     ViewModel.update()
          │                     │
          ▼                     ▼
   Repository.get()     Repository.save()
          │                     │
          ▼                     ▼
    Database Query       Database Transaction
          │                     │
          ▼                     │
   Entity → State              │
          │                     │
          ▼                     ▼
   State Update ←──────── Refresh State
          │
          ▼
   Observer Notified
          │
          ▼
     UI Rebuilds
```

---

### 5.4 Database Schema

#### 5.4.1 Tables

**Tasks Table:**

```sql
CREATE TABLE tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subject TEXT NOT NULL DEFAULT '',
  done BOOLEAN NOT NULL DEFAULT 0,
  tabId INTEGER NOT NULL DEFAULT 0,
  order INTEGER NOT NULL DEFAULT 0,
  created TEXT NOT NULL,
  FOREIGN KEY (tabId) REFERENCES tabs(id)
);

CREATE INDEX idx_tasks_tabId ON tasks(tabId);
```

**Tabs Table:**

```sql
CREATE TABLE tabs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL DEFAULT 'title',
  color TEXT NOT NULL DEFAULT 'red',
  icon TEXT NOT NULL DEFAULT 'circle',
  order INTEGER NOT NULL DEFAULT 0,
  created TEXT NOT NULL
);

CREATE INDEX idx_tabs_order ON tabs(order);
```

#### 5.4.2 Database Operations

**Transaction Pattern:**

```text
beginTransaction()
try {
  // Perform operations
  insert/update/delete(...)

  commitTransaction()
} catch (error) {
  rollbackTransaction()
  throw error
}
```

**ACID Properties:**
- **Atomicity:** All operations in transaction succeed or fail together
- **Consistency:** Database constraints are enforced
- **Isolation:** Concurrent operations don't interfere
- **Durability:** Changes persist after commit

---

### 5.5 Dependency Injection

**Provider Pattern:**

```text
┌──────────────────────────────────────┐
│       Dependency Container           │
│  ┌────────────────────────────────┐  │
│  │ DatabaseProvider               │  │
│  │   └─ Database Instance         │  │
│  └────────────┬───────────────────┘  │
│               │                      │
│  ┌────────────▼───────────────────┐  │
│  │ RepositoryProvider             │  │
│  │   ├─ TaskRepository            │  │
│  │   └─ TabRepository             │  │
│  └────────────┬───────────────────┘  │
│               │                      │
│  ┌────────────▼───────────────────┐  │
│  │ ViewModelProvider              │  │
│  │   ├─ TaskListViewModel         │  │
│  │   ├─ TabListViewModel          │  │
│  │   ├─ AppStateViewModel         │  │
│  │   └─ EditTabStateViewModel     │  │
│  └────────────────────────────────┘  │
└──────────────────────────────────────┘
```

**Benefits:**
- Loose coupling
- Testability (mock dependencies)
- Single source of truth
- Easy to swap implementations

---

### 5.6 Key Design Patterns

#### 5.6.1 Repository Pattern

**Purpose:** Abstract data access logic

**Benefits:**
- Separates business logic from data access
- Swappable database implementations
- Testable with mocks

**Example:**

```text
interface TaskRepository {
  getTasks(tabId): List<Task>
  createTask(tabId): TaskId
  updateTask(taskId, subject): void
  deleteTask(taskId): void
}
```

#### 5.6.2 Immutability Pattern

**Purpose:** Prevent accidental state mutations

**Implementation:**
- All state models are immutable
- Updates create new instances
- Efficient change detection

**Example:**

```text
class TaskState {
  final id: Integer
  final subject: String
  final done: Boolean

  // Copy with modifications
  copyWith(subject: String?): TaskState {
    return TaskState(
      id: this.id,
      subject: subject ?? this.subject,
      done: this.done
    )
  }
}
```

#### 5.6.3 Observer Pattern

**Purpose:** Reactive UI updates

**Implementation:**
- ViewModels are observable
- UI observes ViewModel state
- Automatic UI rebuilds on state change

---

## 6. API & Integration Specification

### 6.1 External Integrations

**Status:** None

This application is a **fully offline application** with **no external API integrations**.

**Key Characteristics:**
- No HTTP/REST API calls
- No WebSocket connections
- No cloud synchronization
- No authentication services
- No analytics or tracking
- No push notifications

---

### 6.2 Local Storage Specification

#### 6.2.1 Database Technology

**Recommended:** Embedded NoSQL database

**Examples:**
- **Mobile:** Isar, Realm, SQLite
- **Web:** IndexedDB, LocalStorage (with limits)
- **Desktop:** SQLite, LiteDB

**Requirements:**
- ACID transactions
- Indexes for efficient queries
- Auto-increment primary keys
- Foreign key support (or manual enforcement)

---

#### 6.2.2 Storage Location

**Mobile Platforms:**

| Platform | Directory | Path |
|----------|-----------|------|
| Android | App-private files | `/data/data/[package]/files/` |
| iOS | Application Support | `~/Library/Application Support/` |

**Web Platform:**
- Browser storage (IndexedDB)
- Limited to browser quota

**Desktop:**
- User data directory
- OS-specific locations

---

#### 6.2.3 Database Operations

**Read Operations:**

| Operation | Query | Returns |
|-----------|-------|---------|
| Get all tasks | `SELECT * FROM tasks` | List<Task> |
| Get tasks by tab | `SELECT * FROM tasks WHERE tabId = ?` | List<Task> |
| Get all tabs | `SELECT * FROM tabs ORDER BY order` | List<Tab> |
| Get tab by ID | `SELECT * FROM tabs WHERE id = ?` | Tab or null |
| Check tabs exist | `SELECT COUNT(*) FROM tabs` | Integer |

**Write Operations:**

| Operation | Query | Returns |
|-----------|-------|---------|
| Create task | `INSERT INTO tasks (...) VALUES (...)` | Task ID |
| Update task subject | `UPDATE tasks SET subject = ? WHERE id = ?` | void |
| Toggle task done | `UPDATE tasks SET done = NOT done WHERE id = ?` | void |
| Move task to tab | `UPDATE tasks SET tabId = ? WHERE id = ?` | void |
| Delete task | `DELETE FROM tasks WHERE id = ?` | void |
| Create tab | `INSERT INTO tabs (...) VALUES (...)` | Tab ID |
| Update tab | `UPDATE tabs SET title = ?, color = ?, icon = ? WHERE id = ?` | void |
| Update tab order | `UPDATE tabs SET order = ? WHERE id = ?` | void |
| Delete tab | `DELETE FROM tabs WHERE id = ?` | void |

---

#### 6.2.4 Performance Characteristics

**Expected Latency:**

| Operation | Latency |
|-----------|---------|
| Read (indexed) | 1-5ms |
| Read (full scan) | 10-50ms |
| Write (single) | 5-20ms |
| Write (transaction) | 20-100ms |

**Scalability:**

| Data Size | Performance |
|-----------|-------------|
| < 1,000 tasks | Excellent |
| 1,000 - 10,000 tasks | Good |
| > 10,000 tasks | Consider pagination |

---

### 6.3 Error Handling Strategy

#### 6.3.1 Error Types

| Error Type | Cause | Handling Strategy |
|------------|-------|-------------------|
| Database initialization failure | Corrupted DB, permission denied | Try in-memory fallback, notify user |
| Write transaction failure | Disk full, constraint violation | Retry 3x, rollback, notify user |
| Read failure | Corrupted data | Return empty list, log error |
| Null reference | Deleted entity | Safe null checks, default values |
| Constraint violation | Invalid foreign key | Validate before write |

#### 6.3.2 Error Notification

**User-Facing Errors:**

| Error | Notification Method | Message Example |
|-------|---------------------|-----------------|
| Database failure | Modal dialog | "Unable to save data. Please restart the app." |
| Validation error | Toast/Snackbar | "Tab name must be 1-8 characters" |
| Network (future) | Toast/Snackbar | "No internet connection" |

**Developer-Facing Errors:**
- Log to console/file
- Crash reporting (optional, with user consent)

---

### 6.4 Backup & Data Export

**Current Status:** Not implemented

**Recommended Future Implementation:**

| Feature | Method | Format |
|---------|--------|--------|
| Export | Serialize database to JSON | `.json` file |
| Backup | Save to cloud storage | Encrypted `.zip` |
| Import | Parse JSON, restore DB | `.json` file |

**Example Export Format:**

```json
{
  "version": "1.0.0",
  "exportDate": "2025-11-21T10:00:00Z",
  "tabs": [
    {
      "id": 1,
      "title": "削除",
      "color": "redAccent",
      "icon": "delete_outline",
      "order": 2,
      "created": "2025-01-01T00:00:00Z"
    }
  ],
  "tasks": [
    {
      "id": 1,
      "subject": "Sample task",
      "done": false,
      "tabId": 2,
      "order": 0,
      "created": "2025-01-01T00:00:00Z"
    }
  ]
}
```

---

### 6.5 Future Integration Opportunities

**Potential Enhancements (Not Currently Implemented):**

1. **Cloud Synchronization**
   - Sync local changes to cloud storage
   - Conflict resolution for multi-device usage
   - Suggested service: Firebase, AWS AppSync, custom backend

2. **Task Sharing**
   - Share tasks with other users
   - Collaborative editing
   - Real-time updates

3. **Analytics & Crash Reporting**
   - Track app usage patterns
   - Monitor crashes and errors
   - Suggested service: Firebase Analytics, Sentry

4. **Push Notifications**
   - Task reminders
   - Deadline alerts

---

## 7. Implementation Checklist

### 7.1 Required Implementation Items

#### 7.1.1 Data Layer

- [ ] **Database Setup**
  - [ ] Initialize embedded database (Isar, Realm, SQLite, etc.)
  - [ ] Define Task schema/model
  - [ ] Define Tab schema/model
  - [ ] Set up auto-increment IDs
  - [ ] Create indexes (tabId, order)
  - [ ] Implement foreign key constraints

- [ ] **Repository Layer**
  - [ ] TaskRepository interface
    - [ ] `initialize()`: Load all tasks
    - [ ] `getTasksByTabId(tabId)`: Filter by tab
    - [ ] `addTask(tabId)`: Create new task
    - [ ] `updateSubject(taskId, subject)`: Edit text
    - [ ] `toggleDone(taskId)`: Toggle completion
    - [ ] `updateTabId(taskId, newTabId)`: Move task
    - [ ] `moveTaskToDelete(taskId)`: Soft delete
    - [ ] `deleteTask(taskId)`: Permanent delete
    - [ ] `deleteAllTaskByTabId(tabId)`: Cascade delete
    - [ ] `deleteAllTask()`: Empty trash
  - [ ] TabRepository interface
    - [ ] `isExistTab()`: Check if tabs exist
    - [ ] `createInitTabs()`: First launch setup
    - [ ] `fetchAllTab()`: Get all tabs sorted
    - [ ] `fetchTabById(id)`: Get single tab
    - [ ] `createTab(title, color, icon)`: Create new
    - [ ] `updateTab(id, title, color, icon)`: Edit
    - [ ] `updateTabOrder(id, order)`: Reorder
    - [ ] `deleteTab(id)`: Remove tab
    - [ ] `getInitialTabId()`: Get first tab

- [ ] **State Models**
  - [ ] TaskState (immutable)
  - [ ] TabState (immutable)
  - [ ] TaskListState (immutable)
  - [ ] TabListState (immutable)
  - [ ] AppState (immutable)
  - [ ] EditTabState (immutable)

---

#### 7.1.2 Business Logic Layer

- [ ] **ViewModels**
  - [ ] AppStateViewModel
    - [ ] `initialize()`: Set initial active tab
    - [ ] `updateActiveTabId(tabId)`: Switch tab
    - [ ] `updateActiveEditId(taskId)`: Enter edit mode
    - [ ] `resetActiveEditId()`: Exit edit mode
  - [ ] TaskListViewModel
    - [ ] `fetchActiveTabTask(tabId)`: Load tasks
    - [ ] `addTask(tabId)`: Create task
    - [ ] `updateSubject(taskId, subject)`: Edit
    - [ ] `toggleDone(taskId)`: Toggle completion
    - [ ] `moveTaskToDelete(taskId)`: Soft delete
    - [ ] `updateTabId(taskId, newTabId)`: Move
    - [ ] `deleteTask(taskId)`: Permanent delete
    - [ ] `deleteAllTaskByTabId(tabId)`: Delete all
    - [ ] `deleteAllTask()`: Empty trash
  - [ ] TabListViewModel
    - [ ] `initialize()`: Create default tabs if needed
    - [ ] `fetchTab()`: Load all tabs
    - [ ] `createTab(title, color, icon)`: Create
    - [ ] `updateTab(id, title, color, icon)`: Edit
    - [ ] `updateTabOrder(tabList, oldIndex, newIndex)`: Reorder
    - [ ] `deleteTab(id)`: Delete
  - [ ] EditTabStateViewModel
    - [ ] `getTabById(id)`: Load for editing
    - [ ] `updateEditTabTitle(title)`: Update temp state
    - [ ] `updateEditTabColor(color)`: Update temp state
    - [ ] `updateEditTabIcon(icon)`: Update temp state
    - [ ] `resetEditTab()`: Clear temp state

---

#### 7.1.3 Presentation Layer

- [ ] **Screens**
  - [ ] MainScreen
    - [ ] Header with edit button
    - [ ] Task list (80% width)
    - [ ] Tab list (20% width)
    - [ ] Floating action button (add/delete all)
  - [ ] EditTabListScreen
    - [ ] Reorderable tab list
    - [ ] Edit/delete buttons per tab
    - [ ] Floating action button (create tab)
    - [ ] Loading overlay
  - [ ] CreateTabScreen
    - [ ] Title input field (max 8 chars)
    - [ ] Color selection button
    - [ ] Icon selection button
    - [ ] Create button
  - [ ] EditTabScreen
    - [ ] Same as CreateTabScreen
    - [ ] Pre-filled with existing data
    - [ ] Confirm button

- [ ] **Components**
  - [ ] MainTaskList
    - [ ] Displays tasks for active tab
    - [ ] Handles empty state
  - [ ] MainTaskItem
    - [ ] Display mode: Text with checkbox
    - [ ] Edit mode: TextField with checkbox
    - [ ] Swipe-to-delete with background
    - [ ] Drag-and-drop support
  - [ ] MainTabList
    - [ ] Vertical list of tabs
    - [ ] Scroll support
  - [ ] MainTabItem
    - [ ] Highlight when active
    - [ ] Drag target for tasks
    - [ ] Tap to switch tab
  - [ ] EditTabListItem
    - [ ] Delete button (except DELETE_TAB_ID)
    - [ ] Title, color, icon display
    - [ ] Edit button
    - [ ] Drag handle
  - [ ] ColorSelectionModal
    - [ ] Grid of 13 colors (6 columns)
    - [ ] Close button
    - [ ] Tap to select
  - [ ] IconSelectionModal
    - [ ] Grid of 23 icons (6 columns)
    - [ ] Close button
    - [ ] Tap to select
  - [ ] LoadingOverlay
    - [ ] Semi-transparent background
    - [ ] Centered spinner
  - [ ] Header
    - [ ] Edit button (right-aligned)
  - [ ] TabListHeader
    - [ ] Close button (left-aligned)

---

#### 7.1.4 State Management

- [ ] **Setup**
  - [ ] Install state management library (Riverpod, MobX, Redux, etc.)
  - [ ] Configure dependency injection
  - [ ] Define all providers

- [ ] **Providers**
  - [ ] DatabaseProvider (singleton)
  - [ ] TaskRepositoryProvider
  - [ ] TabRepositoryProvider
  - [ ] AppStateProvider (auto-dispose)
  - [ ] TaskListProvider (auto-dispose)
  - [ ] TabListProvider
  - [ ] EditTabStateProvider (family provider)

---

#### 7.1.5 UI/UX Implementation

- [ ] **Styling**
  - [ ] Define color palette constants
  - [ ] Define spacing system
  - [ ] Define typography system
  - [ ] Define border radius values
  - [ ] Define shadow/elevation values

- [ ] **Animations**
  - [ ] Page transitions (fade, slide up)
  - [ ] Drag feedback
  - [ ] Swipe-to-delete animation
  - [ ] Loading overlay fade
  - [ ] Modal slide up/down

- [ ] **Interactions**
  - [ ] Tap handlers (tasks, tabs, buttons)
  - [ ] Long press for drag (200ms delay)
  - [ ] Swipe gesture for delete
  - [ ] Drag-and-drop (tasks to tabs)
  - [ ] Reorder drag (tabs)

- [ ] **Accessibility**
  - [ ] Minimum touch targets (48dp)
  - [ ] Sufficient contrast ratios
  - [ ] Semantic labels for screen readers
  - [ ] Keyboard navigation support
  - [ ] Focus management

---

#### 7.1.6 Constants & Configuration

- [ ] **Define Constants**
  - [ ] DELETE_TAB_ID = 1
  - [ ] COLOR_LIST (13 colors)
  - [ ] ICON_LIST (23 icons)
  - [ ] Default values (tab color, icon)
  - [ ] UI measurements (header height, tab height, etc.)

- [ ] **Configuration**
  - [ ] App orientation (portrait only)
  - [ ] Splash screen
  - [ ] App icon
  - [ ] App name & metadata

---

### 7.2 Implementation Order

**Phase 1: Foundation (Week 1)**
1. Set up project structure
2. Install dependencies (database, state management)
3. Define data models (Task, Tab entities)
4. Initialize database
5. Implement basic Repository layer

**Phase 2: Core Features (Week 2-3)**
6. Implement TaskRepository methods
7. Implement TabRepository methods
8. Create ViewModels (AppState, TaskList, TabList)
9. Implement MainScreen UI
10. Implement task CRUD operations
11. Implement tab switching

**Phase 3: Tab Management (Week 4)**
12. Implement EditTabListScreen
13. Implement CreateTabScreen
14. Implement EditTabScreen
15. Implement tab CRUD operations
16. Implement tab reordering

**Phase 4: Advanced Features (Week 5)**
17. Implement drag-and-drop (tasks to tabs)
18. Implement swipe-to-delete with undo
19. Implement soft delete and trash functionality
20. Add color/icon selection modals

**Phase 5: Polish & Testing (Week 6)**
21. Add animations and transitions
22. Improve accessibility
23. Error handling and validation
24. Unit tests for ViewModels
25. Integration tests for Repositories
26. UI/widget tests

**Phase 6: Deployment (Week 7)**
27. Performance optimization
28. Final testing on real devices
29. Build and package app
30. Deployment to app stores

---

### 7.3 Test Items

#### 7.3.1 Unit Tests

**Repository Layer:**
- [ ] TaskRepository.addTask() creates task with correct tabId
- [ ] TaskRepository.updateSubject() updates text
- [ ] TaskRepository.toggleDone() inverts boolean
- [ ] TaskRepository.moveTaskToDelete() sets tabId=1
- [ ] TabRepository.createInitTabs() creates 2 default tabs
- [ ] TabRepository.updateTabOrder() sets correct order values
- [ ] TabRepository.deleteTab() removes tab from database

**ViewModel Layer:**
- [ ] AppStateViewModel.initialize() sets correct initial tab
- [ ] TaskListViewModel.fetchActiveTabTask() filters by tabId
- [ ] TaskListViewModel.addTask() creates task and sets edit mode
- [ ] TabListViewModel.createTab() inserts at position 0
- [ ] TabListViewModel.updateTabOrder() normalizes all orders
- [ ] EditTabStateViewModel.resetEditTab() clears state

---

#### 7.3.2 Integration Tests

**Database Operations:**
- [ ] Create task → Read task → Verify data
- [ ] Update task → Read task → Verify change
- [ ] Delete task → Read tasks → Verify absence
- [ ] Create tab → Read tabs → Verify presence
- [ ] Reorder tabs → Read tabs → Verify new order
- [ ] Delete tab → Read tasks → Verify cascade delete

**State Management:**
- [ ] Update ViewModel state → UI reflects change
- [ ] Multiple subscribers receive same state
- [ ] Auto-dispose cleans up unused providers

---

#### 7.3.3 UI/Widget Tests

**Main Screen:**
- [ ] Displays tasks from active tab only
- [ ] Switching tabs updates task list
- [ ] Clicking FAB creates new task
- [ ] Tapping task enters edit mode
- [ ] Editing task updates subject in real-time
- [ ] Toggling checkbox changes done status
- [ ] Swiping task shows delete background
- [ ] Swiping task displays undo snackbar

**Edit Tab List Screen:**
- [ ] Displays all tabs
- [ ] Dragging tabs reorders list
- [ ] Tapping edit navigates to EditTabScreen
- [ ] Tapping delete shows confirmation
- [ ] Confirming delete removes tab

**Create/Edit Tab Screen:**
- [ ] Title input enforces 8 char limit
- [ ] Tapping color button opens modal
- [ ] Selecting color updates display
- [ ] Tapping icon button opens modal
- [ ] Selecting icon updates display
- [ ] Tapping create/confirm saves and navigates back

---

#### 7.3.4 End-to-End Tests

- [ ] **First Launch Flow**
  1. Launch app (empty database)
  2. Verify 2 default tabs created
  3. Verify "todo" tab is active
  4. Verify task list is empty

- [ ] **Task Lifecycle**
  1. Create task
  2. Edit task subject
  3. Mark as complete
  4. Unmark as complete
  5. Soft delete (move to trash)
  6. Undo delete
  7. Soft delete again
  8. Switch to DELETE tab
  9. Permanently delete

- [ ] **Tab Management**
  1. Create new tab
  2. Verify tab at top of list
  3. Edit tab properties
  4. Reorder tabs
  5. Delete tab
  6. Verify tasks deleted with tab

- [ ] **Drag & Drop**
  1. Create task in Tab A
  2. Long press task
  3. Drag to Tab B
  4. Release
  5. Switch to Tab B
  6. Verify task appears

---

## 8. Additional Notes

### 8.1 Known Limitations

1. **No Cloud Synchronization**
   - Data only stored locally on device
   - No multi-device support
   - Data lost if app uninstalled (without backup)

2. **No Offline Backup**
   - No automatic cloud backup
   - Users must manually export data (if feature added)

3. **Limited Error Handling**
   - Minimal error recovery in current design
   - Recommend adding comprehensive try-catch blocks
   - No user-facing error messages in most cases

4. **No Pagination**
   - All tasks for a tab loaded at once
   - May cause performance issues with >1000 tasks

5. **No Search/Filter**
   - No ability to search tasks by keyword
   - No filter by completion status

6. **No Task Reordering**
   - Tasks cannot be reordered within a tab
   - Order field exists but not utilized

7. **Portrait Only**
   - App locked to portrait orientation
   - No landscape support

---

### 8.2 Performance Requirements

**Minimum Requirements:**

| Metric | Target |
|--------|--------|
| App startup time | < 2 seconds |
| Tab switch latency | < 100ms |
| Task creation latency | < 200ms |
| Scroll performance | 60 FPS |
| Database query time (< 100 tasks) | < 50ms |
| Database write time | < 100ms |

**Memory Usage:**

| State | Memory |
|-------|--------|
| Idle (no tasks) | < 50MB |
| With 100 tasks | < 70MB |
| With 1000 tasks | < 150MB |

**Storage:**

| Data Size | Disk Space |
|-----------|------------|
| App binary | ~20-50MB |
| Database (100 tasks) | < 1MB |
| Database (1000 tasks) | < 10MB |

---

### 8.3 Security Requirements

**Data Protection:**

1. **Local Data Security**
   - Data stored in app-private directory
   - Not accessible to other apps
   - Encrypted device storage recommended (OS-level)

2. **Input Validation**
   - Sanitize all user input to prevent injection
   - Validate tab names (1-8 characters)
   - Validate color/icon names (from predefined lists)
   - Enforce foreign key constraints

3. **Database Security**
   - Use parameterized queries (prevent SQL injection)
   - Implement database encryption (optional, for sensitive data)

**Privacy:**

1. **No Data Collection**
   - No analytics or tracking
   - No personal information collected
   - No data sent to external servers

2. **Permissions**
   - No special permissions required
   - No network access
   - No location access
   - No camera/microphone access

---

### 8.4 Platform-Specific Notes

#### Android
- Minimum SDK: 21 (Android 5.0)
- Target SDK: Latest
- Permissions: None required
- App size: ~20-30MB

#### iOS
- Minimum version: iOS 12.0
- Permissions: None required
- App size: ~25-40MB

#### Web (Future)
- Browser support: Modern browsers (Chrome, Firefox, Safari, Edge)
- Storage: IndexedDB
- Offline: Service Workers for offline support

#### Desktop (Future)
- Windows: Windows 10+
- macOS: macOS 10.14+
- Linux: Ubuntu 20.04+

---

### 8.5 Maintenance & Updates

**Regular Maintenance:**

1. **Database Cleanup**
   - Periodically vacuum database (reduce file size)
   - Remove orphaned records (if any)

2. **Performance Monitoring**
   - Track app startup time
   - Monitor database query performance
   - Optimize slow queries

3. **Bug Fixes**
   - Address user-reported issues
   - Fix crashes and errors

**Future Enhancements:**

1. **Features**
   - Task due dates and reminders
   - Task priorities
   - Task notes/descriptions
   - Task categories (beyond tabs)
   - Recurring tasks
   - Task sharing
   - Subtasks

2. **UI/UX**
   - Dark mode support
   - Custom themes
   - Task reordering within tabs
   - Search and filter
   - Bulk operations

3. **Integrations**
   - Calendar integration
   - Cloud sync (Google Drive, iCloud, Dropbox)
   - Export to PDF/CSV
   - Import from other todo apps

---

### 8.6 Implementation Tips

1. **Start Simple**
   - Implement core CRUD operations first
   - Add advanced features later
   - Focus on stability before features

2. **Use Code Generation**
   - Generate immutable state classes
   - Generate database schemas
   - Reduces boilerplate and errors

3. **Write Tests Early**
   - Test Repository layer first
   - Test ViewModel logic
   - Add UI tests last

4. **Follow SOLID Principles**
   - Single Responsibility (one class, one purpose)
   - Open/Closed (extend, don't modify)
   - Dependency Inversion (depend on abstractions)

5. **Keep State Immutable**
   - Never mutate state directly
   - Always create new instances
   - Use `copyWith()` pattern

6. **Handle Errors Gracefully**
   - Wrap database calls in try-catch
   - Show user-friendly error messages
   - Log errors for debugging

---

### 8.7 Glossary

| Term | Definition |
|------|------------|
| **Tab** | A category/folder for organizing tasks |
| **Task** | A single todo item with a subject and completion status |
| **Active Tab** | The currently selected tab whose tasks are displayed |
| **Active Edit** | The task currently being edited by the user |
| **Soft Delete** | Moving a task to the DELETE tab (recoverable) |
| **Permanent Delete** | Removing a task from the database (irreversible) |
| **DELETE_TAB_ID** | Reserved tab ID (1) for soft-deleted tasks |
| **ViewModel** | Business logic layer that manages UI state |
| **Repository** | Data access layer that abstracts database operations |
| **State Model** | Immutable data structure for UI rendering |
| **Entity** | Database model (Task, Tab) |
| **Provider** | Dependency injection mechanism |
| **MVVM** | Model-View-ViewModel architecture pattern |
| **ACID** | Atomicity, Consistency, Isolation, Durability (database properties) |

---

## Quality Assurance Checklist

Before considering this specification complete, verify:

- ✅ **Language-Agnostic:** No Dart/Flutter-specific terminology (except examples)
- ✅ **Implementation Guide:** Can be implemented in any programming language
- ✅ **Clear Requirements:** All functional requirements clearly defined
- ✅ **Exception Handling:** Edge cases and error scenarios considered
- ✅ **Complete Data Model:** All entities, relationships, and constraints defined
- ✅ **Comprehensive UI Spec:** All screens, components, and interactions documented
- ✅ **Architecture Clarity:** System design clearly explained
- ✅ **Implementation Roadmap:** Step-by-step checklist provided
- ✅ **Testability:** Test scenarios and acceptance criteria included
- ✅ **Maintainability:** Performance, security, and maintenance notes included

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-11-21 | System | Initial language-agnostic specification |

---

**End of Document**
