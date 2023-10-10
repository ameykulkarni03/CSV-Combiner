<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $combinedCsv = '';

    if (isset($_FILES['csvFile']['tmp_name'])) {
        foreach ($_FILES['csvFile']['tmp_name'] as $tmpName) {
            if (($handle = fopen($tmpName, 'r')) !== false) {
                while (($data = fgetcsv($handle)) !== false) {
                    $combinedCsv .= implode(',', $data) . "\n";
                }
                fclose($handle);
            }
        }

        $combinedCsvFileName = 'combined.csv';
        file_put_contents($combinedCsvFileName, $combinedCsv);

        // Provide the combined CSV file for download.
        header('Content-Type: application/csv');
        header('Content-Disposition: attachment; filename="' . $combinedCsvFileName . '"');
        readfile($combinedCsvFileName);
    } else {
        echo 'No CSV files were uploaded.';
    }
} else {
    echo 'Invalid request.';
}
?>
