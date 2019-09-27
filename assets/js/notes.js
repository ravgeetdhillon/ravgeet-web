function searchNotes() {
    notes_holder.forEach(note => {
        note_text = note.innerText.toLowerCase();
        if (!( note_text.includes( search.value.trim() ) )) {
            note.classList.add('d-none');
        }
        else if (note.classList.contains('d-none')) {
            note.classList.remove('d-none');
        }
    });
}


var notes_holder = document.querySelectorAll('#notes-holder .note');

var search = document.getElementsByName('search')[0];
search.addEventListener('keyup', searchNotes);
