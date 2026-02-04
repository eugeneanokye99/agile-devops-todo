import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TaskFilter from './TaskFilter'

describe('TaskFilter', () => {
  const mockTaskCounts = {
    all: 5,
    active: 3,
    completed: 2
  };

  it('renders all three filter buttons', () => {
    render(
      <TaskFilter 
        currentFilter="all" 
        onFilterChange={() => {}} 
        taskCounts={mockTaskCounts}
      />
    );
    
    expect(screen.getByText(/All/)).toBeInTheDocument();
    expect(screen.getByText(/Active/)).toBeInTheDocument();
    expect(screen.getByText(/Completed/)).toBeInTheDocument();
  });

  it('displays task counts for each filter', () => {
    render(
      <TaskFilter 
        currentFilter="all" 
        onFilterChange={() => {}} 
        taskCounts={mockTaskCounts}
      />
    );
    
    expect(screen.getByText('All (5)')).toBeInTheDocument();
    expect(screen.getByText('Active (3)')).toBeInTheDocument();
    expect(screen.getByText('Completed (2)')).toBeInTheDocument();
  });

  it('applies active class to current filter', () => {
    render(
      <TaskFilter 
        currentFilter="active" 
        onFilterChange={() => {}} 
        taskCounts={mockTaskCounts}
      />
    );
    
    const activeButton = screen.getByText('Active (3)');
    expect(activeButton).toHaveClass('active');
  });

  it('does not apply active class to other filters', () => {
    render(
      <TaskFilter 
        currentFilter="active" 
        onFilterChange={() => {}} 
        taskCounts={mockTaskCounts}
      />
    );
    
    const allButton = screen.getByText('All (5)');
    const completedButton = screen.getByText('Completed (2)');
    
    expect(allButton).not.toHaveClass('active');
    expect(completedButton).not.toHaveClass('active');
  });

  it('calls onFilterChange when filter button clicked', () => {
    const mockOnFilterChange = vi.fn();
    
    render(
      <TaskFilter 
        currentFilter="all" 
        onFilterChange={mockOnFilterChange} 
        taskCounts={mockTaskCounts}
      />
    );
    
    const activeButton = screen.getByText('Active (3)');
    fireEvent.click(activeButton);
    
    expect(mockOnFilterChange).toHaveBeenCalledWith('active');
  });

  it('calls onFilterChange with correct filter id for each button', () => {
    const mockOnFilterChange = vi.fn();
    
    render(
      <TaskFilter 
        currentFilter="all" 
        onFilterChange={mockOnFilterChange} 
        taskCounts={mockTaskCounts}
      />
    );
    
    fireEvent.click(screen.getByText('All (5)'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('all');
    
    fireEvent.click(screen.getByText('Active (3)'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('active');
    
    fireEvent.click(screen.getByText('Completed (2)'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
  });

  it('displays zero counts correctly', () => {
    const zeroCounts = {
      all: 0,
      active: 0,
      completed: 0
    };
    
    render(
      <TaskFilter 
        currentFilter="all" 
        onFilterChange={() => {}} 
        taskCounts={zeroCounts}
      />
    );
    
    expect(screen.getByText('All (0)')).toBeInTheDocument();
    expect(screen.getByText('Active (0)')).toBeInTheDocument();
    expect(screen.getByText('Completed (0)')).toBeInTheDocument();
  });
});
