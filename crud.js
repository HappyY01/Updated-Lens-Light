/**
 * LENS & LIGHT CONTEST 2025 - CRUD OPERATIONS
 * Admin Panel for Managing Contest Entries
 */

// Local storage key
const STORAGE_KEY = 'lensLightContestEntries';

// DOM elements
let elements = {};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin panel initializing...');
    initializeElements();
    initializeEventListeners();
    const entries = loadEntries();
    console.log('Loaded entries:', entries);
    renderTable();
    console.log('Admin panel initialized successfully');
});

/**
 * Initialize DOM element references
 */
function initializeElements() {
    elements = {
        form: document.getElementById('crudForm'),
        idInput: document.getElementById('entry-id'),
        nameInput: document.getElementById('crud-name'),
        deptInput: document.getElementById('crud-dept'),
        titleInput: document.getElementById('crud-title'),
        submitBtn: document.getElementById('submit-btn'),
        cancelBtn: document.getElementById('cancel-btn'),
        formTitle: document.getElementById('form-title'),
        tableBody: document.getElementById('table-body'),
        noDataMsg: document.getElementById('no-data-msg'),
        entryCount: document.getElementById('entry-count')
    };
}

/**
 * Initialize event listeners
 */
function initializeEventListeners() {
    if (elements.form) {
        elements.form.addEventListener('submit', handleSubmit);
    }

    if (elements.cancelBtn) {
        elements.cancelBtn.addEventListener('click', resetForm);
    }

    // Add input listeners for error clearing
    [elements.nameInput, elements.deptInput, elements.titleInput].forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorId = this.id.replace('crud-', 'crud') + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        }
    });
}

/**
 * Load entries from localStorage
 */
function loadEntries() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error loading entries:', error);
        return [];
    }
}

/**
 * Save entries to localStorage
 */
function saveEntries(entries) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
        return true;
    } catch (error) {
        console.error('Error saving entries:', error);
        showToast('Failed to save entries', 'error');
        return false;
    }
}

/**
 * Handle form submission (Add/Update)
 */
function handleSubmit(e) {
    e.preventDefault();

    // Validate inputs
    const name = elements.nameInput.value.trim();
    const dept = elements.deptInput.value.trim();
    const title = elements.titleInput.value.trim();
    const id = elements.idInput.value;

    let isValid = true;

    if (!name || name.length < 2) {
        setError(elements.nameInput, 'crudNameError', 'Name is required (min 2 characters)');
        isValid = false;
    }

    if (!dept || dept.length < 2) {
        setError(elements.deptInput, 'crudDeptError', 'Department is required');
        isValid = false;
    }

    if (!title || title.length < 2) {
        setError(elements.titleInput, 'crudTitleError', 'Photo title is required');
        isValid = false;
    }

    if (!isValid) {
        showToast('Please fill all required fields', 'error');
        return;
    }

    // Get current entries
    const entries = loadEntries();

    if (id) {
        // Update existing entry
        const index = entries.findIndex(entry => entry.id === parseInt(id));
        if (index !== -1) {
            entries[index] = {
                id: parseInt(id),
                name,
                dept,
                title,
                updatedAt: new Date().toISOString()
            };
            showToast('Entry updated successfully', 'success');
        }
    } else {
        // Add new entry
        const newEntry = {
            id: Date.now(),
            name,
            dept,
            title,
            createdAt: new Date().toISOString()
        };
        entries.push(newEntry);
        showToast('Entry added successfully', 'success');
    }

    // Save and render
    if (saveEntries(entries)) {
        renderTable();
        resetForm();
    }
}

/**
 * Render entries table
 */
function renderTable() {
    const entries = loadEntries();
    
    console.log('Rendering table with', entries.length, 'entries');

    // Update entry count
    if (elements.entryCount) {
        elements.entryCount.textContent = entries.length;
    }

    // Show/hide no data message
    if (entries.length === 0) {
        console.log('No entries - showing no-data message');
        if (elements.noDataMsg) {
            elements.noDataMsg.style.display = 'block';
        }
        if (elements.tableBody) {
            elements.tableBody.innerHTML = '';
            // Hide the table when there's no data
            const table = elements.tableBody.closest('table');
            if (table) {
                table.style.display = 'none';
            }
        }
        return;
    }

    console.log('Entries found - showing table');
    if (elements.noDataMsg) {
        elements.noDataMsg.style.display = 'none';
    }
    
    // Show the table
    if (elements.tableBody) {
        const table = elements.tableBody.closest('table');
        if (table) {
            table.style.display = 'table';
        }
    }

    // Render table rows
    if (elements.tableBody) {
        elements.tableBody.innerHTML = entries.map(entry => `
            <tr>
                <td>${escapeHtml(entry.name)}</td>
                <td>${escapeHtml(entry.dept)}</td>
                <td>${escapeHtml(entry.title)}</td>
                <td class="actions-column">
                    <button 
                        onclick="editEntry(${entry.id})" 
                        class="action-btn edit-btn"
                        title="Edit entry"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                    </button>
                    <button 
                        onclick="deleteEntry(${entry.id})" 
                        class="action-btn delete-btn"
                        title="Delete entry"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}

/**
 * Edit entry
 */
window.editEntry = function(id) {
    const entries = loadEntries();
    const entry = entries.find(e => e.id === id);

    if (!entry) {
        showToast('Entry not found', 'error');
        return;
    }

    // Populate form
    elements.idInput.value = entry.id;
    elements.nameInput.value = entry.name;
    elements.deptInput.value = entry.dept;
    elements.titleInput.value = entry.title;

    // Update UI
    elements.formTitle.textContent = 'Edit Entry';
    elements.submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Update Entry</span>
    `;
    elements.cancelBtn.style.display = 'inline-flex';

    // Scroll to form
    elements.form.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/**
 * Delete entry
 */
window.deleteEntry = function(id) {
    if (!confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
        return;
    }

    const entries = loadEntries();
    const filteredEntries = entries.filter(entry => entry.id !== id);

    if (saveEntries(filteredEntries)) {
        showToast('Entry deleted successfully', 'success');
        renderTable();
    }
};

/**
 * Reset form to initial state
 */
function resetForm() {
    if (elements.form) {
        elements.form.reset();
    }

    elements.idInput.value = '';
    elements.formTitle.textContent = 'Add New Entry';
    elements.submitBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>Add Entry</span>
    `;
    elements.cancelBtn.style.display = 'none';

    // Clear any errors
    [elements.nameInput, elements.deptInput, elements.titleInput].forEach(input => {
        if (input) {
            input.classList.remove('error');
        }
    });

    ['crudNameError', 'crudDeptError', 'crudTitleError'].forEach(id => {
        const errorElement = document.getElementById(id);
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
}

/**
 * Set error on input
 */
function setError(input, errorId, message) {
    if (input) {
        input.classList.add('error');
    }
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    // Create container if it doesn't exist
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' 
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
    
    toast.innerHTML = `${icon}<span>${message}</span>`;
    container.appendChild(toast);

    // Remove after 4 seconds
    setTimeout(() => {
        toast.classList.add('removing');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
