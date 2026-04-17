document.getElementById('embedButton').addEventListener('click', async () => {
    const text = document.getElementById('textInput').value;
    if (!text) {
        alert('Please enter some text');
        return;
    }
    try {
        const response = await fetch('/embed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('output').innerHTML = '<pre>' + JSON.stringify(data.vector, null, 2) + '</pre>';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').innerHTML = '<p>Error: ' + error.message + '</p>';
    }
});