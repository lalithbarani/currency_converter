document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('currency-form');
    const amountInput = document.getElementById('amount');
    const fromSelect = document.getElementById('from');
    const toSelect = document.getElementById('to');
    const resultDiv = document.getElementById('result');

    // Fetch currency codes and populate the select elements
    fetch('currencies.php')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data);
            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                optionFrom.value = currency;
                optionFrom.text = currency;
                fromSelect.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = currency;
                optionTo.text = currency;
                toSelect.appendChild(optionTo);
            });
        });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const amount = amountInput.value;
        const from = fromSelect.value;
        const to = toSelect.value;
        
        if (amount <= 0) {
            resultDiv.textContent = 'Please enter a valid amount.';
            return;
        }

        fetch(`convert.php?amount=${amount}&from=${from}&to=${to}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    resultDiv.textContent = `Error: ${data.error}`;
                } else {
                    resultDiv.textContent = `${amount} ${from} = ${data.result} ${to}`;
                }
            });
    });
});
