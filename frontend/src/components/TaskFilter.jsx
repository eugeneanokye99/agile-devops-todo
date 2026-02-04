function TaskFilter({ currentFilter, onFilterChange, taskCounts }) {
  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div className="task-filter">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`filter-button ${currentFilter === filter.id ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label} ({taskCounts[filter.id]})
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
