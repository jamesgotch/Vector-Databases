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

document.getElementById('similarityButton').addEventListener('click', async () => {
    const text1 = document.getElementById('textInput').value;
    const text2 = document.getElementById('textInput2').value;
    if (!text1 || !text2) {
        alert('Please enter text in both inputs');
        return;
    }
    try {
        const params = new URLSearchParams({ text1: text1, text2: text2 });
        const response = await fetch(`/similarity?${params.toString()}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        document.getElementById('output').innerHTML = '<pre>Cosine Similarity: ' + Number(data).toFixed(4) + '</pre>';
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').innerHTML = '<p>Error: ' + error.message + '</p>';
    }
});