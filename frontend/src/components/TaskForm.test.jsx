import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TaskForm from './TaskForm'

describe('TaskForm', () => {
  it('renders input field and button', () => {
    render(<TaskForm onTaskAdded={() => {}} />)
    
    expect(screen.getByPlaceholderText('Enter a new task...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument()
  })

  it('calls onTaskAdded with trimmed title on submit', () => {
    const mockOnTaskAdded = vi.fn()
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    const button = screen.getByRole('button', { name: 'Add Task' })
    
    fireEvent.change(input, { target: { value: '  New Task  ' } })
    fireEvent.click(button)
    
    expect(mockOnTaskAdded).toHaveBeenCalledWith('New Task')
  })

  it('clears input after successful submission', () => {
    render(<TaskForm onTaskAdded={() => {}} />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    const button = screen.getByRole('button', { name: 'Add Task' })
    
    fireEvent.change(input, { target: { value: 'New Task' } })
    fireEvent.click(button)
    
    expect(input.value).toBe('')
  })

  it('does not call onTaskAdded with empty title', () => {
    const mockOnTaskAdded = vi.fn()
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />)
    
    const button = screen.getByRole('button', { name: 'Add Task' })
    fireEvent.click(button)
    
    expect(mockOnTaskAdded).not.toHaveBeenCalled()
  })

  it('does not call onTaskAdded with whitespace only title', () => {
    const mockOnTaskAdded = vi.fn()
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    const button = screen.getByRole('button', { name: 'Add Task' })
    
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(button)
    
    expect(mockOnTaskAdded).not.toHaveBeenCalled()
  })

  it('submits form on Enter key press', () => {
    const mockOnTaskAdded = vi.fn()
    render(<TaskForm onTaskAdded={mockOnTaskAdded} />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    
    fireEvent.change(input, { target: { value: 'New Task' } })
    fireEvent.submit(input.closest('form'))
    
    expect(mockOnTaskAdded).toHaveBeenCalledWith('New Task')
  })

  it('shows error message when submitting empty title', () => {
    render(<TaskForm onTaskAdded={() => {}} />)
    
    const button = screen.getByRole('button', { name: 'Add Task' })
    fireEvent.click(button)
    
    expect(screen.getByText('Task title cannot be empty')).toBeInTheDocument()
  })

  it('shows error message when submitting whitespace only title', () => {
    render(<TaskForm onTaskAdded={() => {}} />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    const button = screen.getByRole('button', { name: 'Add Task' })
    
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(button)
    
    expect(screen.getByText('Task title cannot be empty')).toBeInTheDocument()
  })

  it('clears error message when user starts typing', () => {
    render(<TaskForm onTaskAdded={() => {}} />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    const button = screen.getByRole('button', { name: 'Add Task' })
    
    fireEvent.click(button)
    expect(screen.getByText('Task title cannot be empty')).toBeInTheDocument()
    
    fireEvent.change(input, { target: { value: 'N' } })
    expect(screen.queryByText('Task title cannot be empty')).not.toBeInTheDocument()
  })

  it('applies error styling to input when validation fails', () => {
    render(<TaskForm onTaskAdded={() => {}} />)
    
    const input = screen.getByPlaceholderText('Enter a new task...')
    const button = screen.getByRole('button', { name: 'Add Task' })
    
    fireEvent.click(button)
    
    expect(input).toHaveClass('input-error')
  })
})
