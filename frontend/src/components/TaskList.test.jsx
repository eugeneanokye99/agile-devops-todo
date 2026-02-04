import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskList from './TaskList'

describe('TaskList', () => {
  const mockHandlers = {
    onToggleComplete: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn(),
    onEditStart: vi.fn(),
    onEditCancel: vi.fn()
  };

  it('displays empty state when no tasks', () => {
    render(<TaskList tasks={[]} {...mockHandlers} editingTaskId={null} />)
    
    expect(screen.getByText('No tasks yet')).toBeInTheDocument()
  })

  it('displays tasks when tasks exist', () => {
    const tasks = [
      { id: 1, title: 'Test Task 1', completed: false },
      { id: 2, title: 'Test Task 2', completed: false }
    ]
    
    render(<TaskList tasks={tasks} {...mockHandlers} editingTaskId={null} />)
    
    expect(screen.getByText('Test Task 1')).toBeInTheDocument()
    expect(screen.getByText('Test Task 2')).toBeInTheDocument()
  })

  it('displays completed task with correct styling', () => {
    const tasks = [
      { id: 1, title: 'Completed Task', completed: true }
    ]
    
    render(<TaskList tasks={tasks} {...mockHandlers} editingTaskId={null} />)
    
    const taskText = screen.getByText('Completed Task')
    expect(taskText).toHaveClass('completed')
  })

  it('displays tasks in order', () => {
    const tasks = [
      { id: 1, title: 'First Task', completed: false },
      { id: 2, title: 'Second Task', completed: false },
      { id: 3, title: 'Third Task', completed: false }
    ]
    
    render(<TaskList tasks={tasks} {...mockHandlers} editingTaskId={null} />)
    
    const taskItems = screen.getAllByRole('listitem')
    expect(taskItems).toHaveLength(3)
    expect(taskItems[0]).toHaveTextContent('First Task')
    expect(taskItems[1]).toHaveTextContent('Second Task')
    expect(taskItems[2]).toHaveTextContent('Third Task')
  })

  it('shows only one task in edit mode', () => {
    const tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: false }
    ]
    
    render(<TaskList tasks={tasks} {...mockHandlers} editingTaskId={1} />)
    
    expect(screen.getByDisplayValue('Task 1')).toBeInTheDocument()
    expect(screen.queryByDisplayValue('Task 2')).not.toBeInTheDocument()
  })
})
