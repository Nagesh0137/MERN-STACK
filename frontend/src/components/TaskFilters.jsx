const TaskFilters = ({ filter, setFilter, sort, setSort }) => {
    const handleFilterChange = (key, value) => {
        setFilter({ [key]: value });
    };

    const handleSortChange = (field) => {
        if (sort.field === field) {
            setSort({ field, order: sort.order === 'ASC' ? 'DESC' : 'ASC' });
        } else {
            setSort({ field, order: 'DESC' });
        }
    };

    const clearFilters = () => {
        setFilter({ status: '', priority: '' });
        setSort({ field: 'created_at', order: 'DESC' });
    };

    return (
        <div className="card-body bg-light border-bottom p-2">
            <div className="row g-3 align-items-end">
                <div className="col-md-8">
                    <div className="row g-3">
                        {/* Status Filter */}
                        <div className="col-sm-6 col-md-3">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-funnel me-1"></i>
                                Status
                            </label>
                            <select
                                value={filter.status}
                                onChange={(e) => handleFilterChange('status', e.target.value)}
                                className="form-select"
                            >
                                <option value="">All Status</option>
                                <option value="pending">Pending</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        {/* Priority Filter */}
                        <div className="col-sm-6 col-md-3">
                            <label className="form-label fw-semibold">
                                <i className="bi bi-flag me-1"></i>
                                Priority
                            </label>
                            <select
                                value={filter.priority}
                                onChange={(e) => handleFilterChange('priority', e.target.value)}
                                className="form-select"
                            >
                                <option value="">All Priorities</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        {/* Clear Filters */}
                        {(filter.status || filter.priority || sort.field !== 'created_at' || sort.order !== 'DESC') && (
                            <div className="col-sm-12 col-md-3">
                                <button
                                    onClick={clearFilters}
                                    className="btn btn-outline-secondary"
                                >
                                    <i className="bi bi-x-circle me-1"></i>
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sort Options */}
                <div className="col-md-4">
                    <div className="d-flex align-items-center justify-content-md-end gap-2">
                        <span className="fw-semibold text-muted small">Sort by:</span>

                        <button
                            onClick={() => handleSortChange('created_at')}
                            className={`btn btn-sm ${sort.field === 'created_at'
                                ? 'btn-primary'
                                : 'btn-outline-secondary'
                                }`}
                        >
                            Date Created
                            {sort.field === 'created_at' && (
                                <i className={`bi ${sort.order === 'ASC' ? 'bi-arrow-up' : 'bi-arrow-down'} ms-1`}></i>
                            )}
                        </button>

                        <button
                            onClick={() => handleSortChange('due_date')}
                            className={`btn btn-sm ${sort.field === 'due_date'
                                ? 'btn-primary'
                                : 'btn-outline-secondary'
                                }`}
                        >
                            Due Date
                            {sort.field === 'due_date' && (
                                <i className={`bi ${sort.order === 'ASC' ? 'bi-arrow-up' : 'bi-arrow-down'} ms-1`}></i>
                            )}
                        </button>

                        <button
                            onClick={() => handleSortChange('title')}
                            className={`btn btn-sm ${sort.field === 'title'
                                ? 'btn-primary'
                                : 'btn-outline-secondary'
                                }`}
                        >
                            Title
                            {sort.field === 'title' && (
                                <i className={`bi ${sort.order === 'ASC' ? 'bi-arrow-up' : 'bi-arrow-down'} ms-1`}></i>
                            )}
                        </button>

                        <button
                            onClick={() => handleSortChange('priority')}
                            className={`btn btn-sm ${sort.field === 'priority'
                                ? 'btn-primary'
                                : 'btn-outline-secondary'
                                }`}
                        >
                            Priority
                            {sort.field === 'priority' && (
                                <i className={`bi ${sort.order === 'ASC' ? 'bi-arrow-up' : 'bi-arrow-down'} ms-1`}></i>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskFilters;
