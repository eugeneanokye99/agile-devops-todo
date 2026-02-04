import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TaskItem from './TaskItem'

describe('TaskItem', () => {
  it('renders task title', () => {
    const task = { id: 1, title: 'Test Task', completed: false }
    render(<TaskItem task={task} onToggleComplete={() => {}} onDelete={() => {}} />)
    
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  it('renders checkbox unchecked for incomplete task', () => {
    const task = { id: 1, title: 'Test Task', completed: false }
    render(<TaskItem task={task} onToggleComplete={() => {}} onDelete={() => {}} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('renders checkbox checked for completed task', () => {
    const task = { id: 1, title: 'Test Task', completed: true }
    render(<TaskItem task={task} onToggleComplete={() => {}} onDelete={() => {}} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  it('applies completed class to completed task title', () => {
    const task = { id: 1, title: 'Test Task', completed: true }
    render(<TaskItem task={task} onToggleComplete={() => {}} onDelete={() => {}} />)
    
    const title = screen.getByText('Test Task')
    expect(title).toHaveClass('completed')
  })

  it('does not apply completed class to incomplete task title', () => {
    const task = { id: 1, title: 'Test Task', completed: false }
    render(<TaskItem task={task} onToggleComplete={() => {}} onDelete={() => {}} />)
    
    const title = screen.getByText('Test Task')
    expect(title).not.toHaveClass('completed')
  })

  it('calls onToggleComplete with task id and true when checking', () => {
    const task = { id: 1, title: 'Test Task', completed: false }
    const mockOnToggleComplete = vi.fn()
    render(<TaskItem task={task} onToggleComplete={mockOnToggleComplete} onDelete={() => {}} />)
    
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    expect(mockOnToggleComplete).toHaveBeenCalledWith(1, true)
  })

  it('calls onToggleComplete with task id and false when unchecking', () => {
    const task = { id: 1, title: 'Test Task', completed: true }
    const mockOnToggleComplete = vi.fn()
    render(<TaskItem task={task} onToggleComplete={mockOnToggleComplete} onDelete={() => {}} />)
    
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    expect(mockOnToggleComplete).toHaveBeenCalledWith(1, false)
  })

  it('renders delete button', () => {
    const task = { id: 1, title: 'Test Task', completed: false }
    render(<TaskItem task={task} onToggleComplete={() => {}} onDelete={() => {}} />)
    
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  it('calls onDelete with task id when delete button clicked', () => {
    const task = { id: 1, title: 'Test Task', completed: false }
    const mockOnDelete = vi.fn()
    render(<TaskItem task={task} onToggleComplete={() => {}} onDelete={mockOnDelete} />)
    
    const deleteButton = screen.getByRole('button', { name: 'Delete' })
    fireEvent.click(deleteButton)
    
    expect(mockOnDelete).toHaveBeenCalledWith(1)
  })
})
