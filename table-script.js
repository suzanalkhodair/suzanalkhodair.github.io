// Replace sample objects with your 1,000 terms
const database = [
    { abbrev: "HTML", term: "HyperText Markup Language", arabic: "لغة ترميز النصوص التشعبية", notes: "Standard language for web pages" },
    { abbrev: "CSS", term: "Cascading Style Sheets", arabic: "صفحات الطرز المتتالية", notes: "Used for styling web pages" },
    // Add remaining 1k terms here
];

const rowsPerPage = 15;
let currentPage = 1;
let filteredData = [...database];

function displayTable() {
    const tbody = document.getElementById("tableBody");
    tbody.innerHTML = "";

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedItems = filteredData.slice(startIndex, endIndex);

    paginatedItems.forEach(item => {
        const row = `<tr>
            <td><b>${item.abbrev}</b></td>
            <td>${item.term}</td>
            <td class="db-arabic-col">${item.arabic}</td>
            <td>${item.notes}</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    updatePaginationControls();
}

function updatePaginationControls() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
    document.getElementById("pageInfo").innerText = `Page ${currentPage} of ${totalPages}`;
    
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === totalPages;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayTable();
    }
}

function nextPage() {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayTable();
    }
}

document.getElementById("searchBar").addEventListener("input", function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();

    filteredData = database.filter(item => {
        return item.abbrev.toLowerCase().includes(searchTerm) ||
               item.term.toLowerCase().includes(searchTerm) ||
               item.arabic.includes(searchTerm) ||
               item.notes.toLowerCase().includes(searchTerm);
    });

    currentPage = 1;
    displayTable();
});

// Run on page load
displayTable();
