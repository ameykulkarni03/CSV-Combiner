let fileData = [];

document.getElementById('fileInput').addEventListener('change', function (event) {
    const files = event.target.files; // FileList object
    const selectedFilesList = document.getElementById('selectedFilesList');

    for (const file of files) {
        // Store the file in the fileData array.
        fileData.push(file);

        // Create list item and remove button elements for each file.
        const listItem = document.createElement('li');
        listItem.textContent = file.name;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function () {
            const index = fileData.indexOf(file);
            if (index !== -1) {
                fileData.splice(index, 1); // Remove the file from the array.
            }
            selectedFilesList.removeChild(listItem);
        });

        // Add the list item to the selected files list.
        listItem.appendChild(removeButton);
        selectedFilesList.appendChild(listItem);
    }
});

document.getElementById('combineButton').addEventListener('click', function () {
    if (fileData.length < 2) {
        alert('Please select at least two CSV files to combine.');
        return;
    }

    const loadingIcon = document.getElementById('loadingIcon');
    loadingIcon.style.display = 'block';

    const formData = new FormData();
    for (const file of fileData) {
        formData.append('csvFile[]', file);
    }

    fetch('combine.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        const loadingIcon = document.getElementById('loadingIcon');
        loadingIcon.style.display = 'none';

        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.style.display = 'block';
    })
    .catch(error => {
        console.error('Error combining CSV files:', error);
    });
});
