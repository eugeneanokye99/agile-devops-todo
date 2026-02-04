import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TaskItem from './TaskItem'

describe('TaskItem', () => {
  const mockTask = { id: 1, title: 'Test Task', completed: false };
  const mockHandlers = {
    onToggleComplete: vi.fn(),
    onDelete: vi.fn(),
    onEdit: vi.fn(),
    onEditStart: vi.fn(),
    onEditCancel: vi.fn()
  };

  it('renders task title', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} isEditing={false} />)
    
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  it('renders checkbox unchecked for incomplete task', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} isEditing={false} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('renders checkbox checked for completed task', () => {
    const completedTask = { ...mockTask, completed: true }
    render(<TaskItem task={completedTask} {...mockHandlers} isEditing={false} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('applies completed class to completed task title', () => {
    const completedTask = { ...mockTask, completed: true }
    render(<TaskItem task={completedTask} {...mockHandlers} isEditing={false} />)
    
    const title = screen.getByText('Test Task')
    expect(title).toHaveClass('completed')
  })

  it('calls onToggleComplete when checkbox clicked', () => {
    const handlers = { ...mockHandlers, onToggleComplete: vi.fn() }
    render(<TaskItem task={mockTask} {...handlers} isEditing={false} />)
    
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    expect(handlers.onToggleComplete).toHaveBeenCalledWith(1, true)
  })

  it('calls onDelete when delete button clicked', () => {
    const handlers = { ...mockHandlers, onDelete: vi.fn() }
    render(<TaskItem task={mockTask} {...handlers} isEditing={false} />)
    
    const deleteButton = screen.getByRole('button', { name: 'Delete' })
    fireEvent.click(deleteButton)
    
    expect(handlers.onDelete).toHaveBeenCalledWith(1)
  })

  it('enters edit mode on double click', () => {
    const handlers = { ...mockHandlers, onEditStart: vi.fn() }
    render(<TaskItem task={mockTask} {...handlers} isEditing={false} />)
    
    const title = screen.getByText('Test Task')
    fireEvent.doubleClick(title)
    
    expect(handlers.onEditStart).toHaveBeenCalledWith(1)
  })

  it('shows edit input when in edit mode', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} isEditing={true} />)
    
    const input = screen.getByDisplayValue('Test Task')
    expect(input).toBeInTheDocument()
  })

  it('shows save and cancel buttons in edit mode', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} isEditing={true} />)
    
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('calls onEdit with new title when save clicked', () => {
    const handlers = { ...mockHandlers, onEdit: vi.fn() }
    render(<TaskItem task={mockTask} {...handlers} isEditing={true} />)
    
    const input = screen.getByDisplayValue('Test Task')
    fireEvent.change(input, { target: { value: 'Updated Task' } })
    
    const saveButton = screen.getByRole('button', { name: 'Save' })
    fireEvent.click(saveButton)
    
    expect(handlers.onEdit).toHaveBeenCalledWith(1, 'Updated Task')
  })

  it('calls onEditCancel when cancel clicked', () => {
    const handlers = { ...mockHandlers, onEditCancel: vi.fn() }
    render(<TaskItem task={mockTask} {...handlers} isEditing={true} />)
    
    const cancelButton = screen.getByRole('button', { name: 'Cancel' })
    fireEvent.click(cancelButton)
    
    expect(handlers.onEditCancel).toHaveBeenCalled()
  })

  it('saves on Enter key press', () => {
    const handlers = { ...mockHandlers, onEdit: vi.fn() }
    render(<TaskItem task={mockTask} {...handlers} isEditing={true} />)
    
    const input = screen.getByDisplayValue('Test Task')
    fireEvent.change(input, { target: { value: 'Updated Task' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    expect(handlers.onEdit).toHaveBeenCalledWith(1, 'Updated Task')
  })

  it('cancels on Escape key press', () => {
    const handlers = { ...mockHandlers, onEditCancel: vi.fn() }
    render(<TaskItem task={mockTask} {...handlers} isEditing={true} />)
    
    const input = screen.getByDisplayValue('Test Task')
    fireEvent.keyDown(input, { key: 'Escape' })
    
    expect(handlers.onEditCancel).toHaveBeenCalled()
  })

  it('shows error when saving empty title', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} isEditing={true} />)
    
    const input = screen.getByDisplayValue('Test Task')
    fireEvent.change(input, { target: { value: '' } })
    
    const saveButton = screen.getByRole('button', { name: 'Save' })
    fireEvent.click(saveButton)
    
    expect(screen.getByText('Title cannot be empty')).toBeInTheDocument()
  })

  it('shows error when saving whitespace only title', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} isEditing={true} />)
    
    const input = screen.getByDisplayValue('Test Task')
    fireEvent.change(input, { target: { value: '   ' } })
    
    const saveButton = screen.getByRole('button', { name: 'Save' })
    fireEvent.click(saveButton)
    
    expect(screen.getByText('Title cannot be empty')).toBeInTheDocument()
  })

  it('clears error when user starts typing', () => {
    render(<TaskItem task={mockTask} {...mockHandlers} isEditing={true} />)
    
    const input = screen.getByDisplayValue('Test Task')
    fireEvent.change(input, { target: { value: '' } })
    
    const saveButton = screen.getByRole('button', { name: 'Save' })
    fireEvent.click(saveButton)
    
    expect(screen.getByText('Title cannot be empty')).toBeInTheDocument()
    
    fireEvent.change(input, { target: { value: 'N' } })
    expect(screen.queryByText('Title cannot be empty')).not.toBeInTheDocument()
  })

  it('trims whitespace from title when saving', () => {
    const handlers = { ...mockHandlers, onEdit: vi.fn() }
    render(<TaskItem task={mockTask} {...handlers} isEditing={true} />)
    
    const input = screen.getByDisplayValue('Test Task')
    fireEvent.change(input, { target: { value: '  Trimmed Task  ' } })
    
    const saveButton = screen.getByRole('button', { name: 'Save' })
    fireEvent.click(saveButton)
    
    expect(handlers.onEdit).toHaveBeenCalledWith(1, 'Trimmed Task')
  })
})
