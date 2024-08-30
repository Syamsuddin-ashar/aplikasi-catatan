// Mendapatkan catatan yang tersimpan dari localStorage, atau membuat array kosong jika belum ada catatan
const notes = JSON.parse(localStorage.getItem('notes')) || [];

// Fungsi untuk menyimpan catatan baru
function saveNote() {
    // Mendapatkan nilai dari input judul dan konten catatan
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;

    // Memeriksa apakah input judul dan konten tidak kosong
    if (title && content) {
        // Membuat objek catatan baru dengan judul, konten, dan ID unik berdasarkan timestamp saat ini
        const note = {
            title,
            content,
            id: Date.now() // Menggunakan timestamp sebagai ID catatan
        };

        // Menambahkan catatan baru ke dalam array notes
        notes.push(note);

        // Menyimpan kembali array notes ke dalam localStorage dalam format JSON
        localStorage.setItem('notes', JSON.stringify(notes));

        // Memperbarui tampilan daftar catatan di halaman
        displayNotes();

        // Mengosongkan editor catatan setelah menyimpan
        clearEditor();
    } else {
        // Menampilkan peringatan jika judul atau konten kosong
        alert("Please enter both a title and content for the note.");
    }
}

// Fungsi untuk menampilkan daftar catatan di halaman
function displayNotes() {
    // Mendapatkan elemen list di mana catatan akan ditampilkan
    const noteList = document.getElementById('notes');
    
    // Mengosongkan isi elemen list sebelum menambahkan catatan yang baru
    noteList.innerHTML = '';

    // Looping melalui array notes untuk membuat elemen list untuk setiap catatan
    notes.forEach(note => {
        // Membuat elemen <li> untuk setiap catatan
        const noteItem = document.createElement('li');
        noteItem.classList.add('note-item'); // Menambahkan kelas CSS untuk styling

        // Membuat elemen <h3> untuk judul catatan
        const noteTitle = document.createElement('h3');
        noteTitle.textContent = note.title; // Mengisi elemen dengan judul catatan

        // Membuat elemen <p> untuk konten catatan
        const noteContent = document.createElement('p');
        noteContent.textContent = note.content; // Mengisi elemen dengan konten catatan

        // Menambahkan elemen judul dan konten ke dalam elemen <li> catatan
        noteItem.appendChild(noteTitle);
        noteItem.appendChild(noteContent);

        // Menambahkan elemen catatan ke dalam list catatan di halaman
        noteList.appendChild(noteItem);
    });
}

// Fungsi untuk mengosongkan input di editor catatan
function clearEditor() {
    // Mengosongkan nilai input judul dan konten
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
}

// Menambahkan event listener ke tombol "Save Note" untuk memanggil fungsi saveNote saat diklik
document.getElementById('save-note').addEventListener('click', saveNote);

// Memanggil fungsi displayNotes saat halaman pertama kali dimuat untuk menampilkan catatan yang sudah ada
displayNotes();
