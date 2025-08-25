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
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Status Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            value={filter.status}
                            onChange={(e) => handleFilterChange('status', e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Priority Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                        </label>
                        <select
                            value={filter.priority}
                            onChange={(e) => handleFilterChange('priority', e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">All Priorities</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Clear Filters */}
                    {(filter.status || filter.priority || sort.field !== 'created_at' || sort.order !== 'DESC') && (
                        <div className="flex items-end">
                            <button
                                onClick={clearFilters}
                                className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Sort Options */}
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-700">Sort by:</span>

                    <button
                        onClick={() => handleSortChange('created_at')}
                        className={`px-3 py-1 text-sm rounded-md border ${sort.field === 'created_at'
                                ? 'bg-blue-100 text-blue-700 border-blue-300'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        Date Created
                        {sort.field === 'created_at' && (
                            <span className="ml-1">
                                {sort.order === 'ASC' ? '↑' : '↓'}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => handleSortChange('due_date')}
                        className={`px-3 py-1 text-sm rounded-md border ${sort.field === 'due_date'
                                ? 'bg-blue-100 text-blue-700 border-blue-300'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        Due Date
                        {sort.field === 'due_date' && (
                            <span className="ml-1">
                                {sort.order === 'ASC' ? '↑' : '↓'}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => handleSortChange('title')}
                        className={`px-3 py-1 text-sm rounded-md border ${sort.field === 'title'
                                ? 'bg-blue-100 text-blue-700 border-blue-300'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        Title
                        {sort.field === 'title' && (
                            <span className="ml-1">
                                {sort.order === 'ASC' ? '↑' : '↓'}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => handleSortChange('priority')}
                        className={`px-3 py-1 text-sm rounded-md border ${sort.field === 'priority'
                                ? 'bg-blue-100 text-blue-700 border-blue-300'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        Priority
                        {sort.field === 'priority' && (
                            <span className="ml-1">
                                {sort.order === 'ASC' ? '↑' : '↓'}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskFilters;
