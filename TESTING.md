# Testing Documentation

## US-002: View Task List - Cross-Browser Testing

**Date:** 2nd February, 2026
**Tester:** Eugene Anokye

### Test Environment
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Database: PostgreSQL 15

### Results

| Browser | Version | Empty State | Styling | Console Errors | Status |
|---------|---------|-------------|---------|----------------|--------|
| Chrome | [version] | Pass | Pass | None | ✓ |
| Firefox | [version] | Pass | Pass | None | ✓ |
| Safari | [version] | Pass | Pass | None | ✓ |
| Edge | [version] | Pass | Pass | None | ✓ |

### Notes
- All browsers display empty state correctly
- API call successful in all browsers
- No console errors detected

---

## US-001: Add New Task - Testing

**Date:** 2nd February, 2026
**Tester:** Eugene Anokye

### Test Results

| Test Case | Status |
|-----------|--------|
| Add task with valid title | ✓ |
| Task appears in list immediately | ✓ |
| Input field clears after submission | ✓ |
| Empty title validation | ✓ |
| Whitespace-only title validation | ✓ |
| Success message displays | ✓ |
| Keyboard submission (Enter key) | ✓ |

---

## US-003: Mark Task as Complete - Persistence Testing

**Date:** 2nd February, 2026
**Tester:** Eugene Anokye

### Test Environment
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Database: PostgreSQL 15

### Test Results

| Test Case | Status |
|-----------|--------|
| Complete task persists after page refresh | ✓ |
| Incomplete task persists after page refresh | ✓ |
| Multiple tasks with different statuses persist | ✓ |
| Toggle from complete to incomplete persists | ✓ |
| Toggle from incomplete to complete persists | ✓ |
| Checkbox state matches completion status | ✓ |
| Strikethrough styling persists | ✓ |

### Notes
- All completion statuses persist correctly across page refreshes
- Database correctly stores and retrieves completion status
- Visual feedback (strikethrough) matches stored status

---

## US-004: Delete Task - Deletion Testing

**Date:** 3rd February, 2026
**Tester:** Eugene Anokye

### Test Environment
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Database: PostgreSQL 15

### Test Results

| Test Case | Status |
|-----------|--------|
| Delete incomplete task | ✓ |
| Delete completed task | ✓ |
| Delete last task shows empty state | ✓ |
| Deletion maintains order of remaining tasks | ✓ |
| Multiple deletions work correctly | ✓ |
| Delete button visible on all tasks | ✓ |
| Task removed immediately upon deletion | ✓ |
| Deletion is permanent (no recovery) | ✓ |

### Notes
- All deletion scenarios work as expected
- Task list updates immediately after deletion
- Empty state displays correctly when last task deleted
- Remaining tasks maintain correct order after deletion

---

## US-006: Filter Tasks by Status - Testing

**Date:** 3rd February, 2026
**Tester:** Eugene Anokye

### Test Environment
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Database: PostgreSQL 15

### Test Results

| Test Case | Status |
|-----------|--------|
| Three filter buttons display | ✓ |
| Task counts display correctly | ✓ |
| Active filter shows only incomplete tasks | ✓ |
| Completed filter shows only complete tasks | ✓ |
| All filter shows all tasks | ✓ |
| Filter preference persists after page reload | ✓ |
| Switching filters does not modify task data | ✓ |
| Empty message displays when filter has no results | ✓ |
| Filter buttons remain accessible | ✓ |

### Notes
- All filter combinations work correctly
- Task counts update dynamically
- Session storage preserves filter preference
- Filter does not affect underlying task data


---

## US-005: Edit Task Title - Testing

**Date:** 3rd Februaury, 2026
**Tester:** Eugene Anokye

### Test Environment
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Database: PostgreSQL 15

### Test Results

| Test Case | Status |
|-----------|--------|
| Double-click enters edit mode | ✓ |
| Edit input displays with current title | ✓ |
| Save button saves changes | ✓ |
| Cancel button cancels editing | ✓ |
| Enter key saves changes | ✓ |
| Escape key cancels editing | ✓ |
| Empty title validation | ✓ |
| Whitespace-only title validation | ✓ |
| Completion status preserved during edit | ✓ |
| Edited title persists after page reload | ✓ |
| Only one task editable at a time | ✓ |

### Notes
- All edit scenarios work correctly
- Keyboard shortcuts (Enter/Escape) function as expected
- Validation prevents empty titles
- Completion status preserved during editing
- Only one task can be in edit mode at a time
