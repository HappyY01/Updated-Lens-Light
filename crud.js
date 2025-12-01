document.addEventListener("DOMContentLoaded", function() {
    const crudForm = document.getElementById("crudForm");
    const nameIn = document.getElementById("crud-name");
    const deptIn = document.getElementById("crud-dept");
    const titleIn = document.getElementById("crud-title");
    const idIn = document.getElementById("entry-id");
    const tableBody = document.getElementById("table-body");
    const noData = document.getElementById("no-data-msg");
    const submitBtn = document.getElementById("submit-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const formTitle = document.getElementById("form-title");

    let entries = JSON.parse(localStorage.getItem("contestEntries")) || [];
    render();

    crudForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = idIn.value;
        const entry = {
            id: id ? Number(id) : Date.now(),
            name: nameIn.value.trim(),
            dept: deptIn.value.trim(),
            title: titleIn.value.trim()
        };

        if (id) {
            const idx = entries.findIndex(x => x.id == id);
            if (idx !== -1) entries[idx] = entry;
            alert("Updated!");
        } else {
            entries.push(entry);
            alert("Added!");
        }
        save(); reset();
    });

    function render() {
        tableBody.innerHTML = "";
        if (entries.length === 0) noData.style.display = "block";
        else {
            noData.style.display = "none";
            entries.forEach(e => {
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${e.name}</td><td>${e.dept}</td><td>${e.title}</td>
                <td><button onclick="edit(${e.id})" class="action-btn edit-btn"><i class="fa-solid fa-pen"></i></button>
                <button onclick="del(${e.id})" class="action-btn delete-btn"><i class="fa-solid fa-trash"></i></button></td>`;
                tableBody.appendChild(tr);
            });
        }
    }

    window.del = (id) => { if(confirm("Delete?")) { entries = entries.filter(e => e.id !== id); save(); } };
    
    window.edit = (id) => {
        const e = entries.find(x => x.id === id);
        if(e) {
            nameIn.value = e.name; deptIn.value = e.dept; titleIn.value = e.title; idIn.value = e.id;
            submitBtn.textContent = "Update"; submitBtn.style.backgroundColor = "#f0ad4e";
            formTitle.innerHTML = "Edit Entry"; cancelBtn.style.display = "inline-block";
        }
    };

    cancelBtn.onclick = reset;

    function reset() {
        crudForm.reset(); idIn.value = "";
        submitBtn.textContent = "Add Entry"; submitBtn.style.backgroundColor = "";
        formTitle.innerHTML = "Add New Entry"; cancelBtn.style.display = "none";
    }

    function save() { localStorage.setItem("contestEntries", JSON.stringify(entries)); render(); }
});