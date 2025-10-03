function createScreenFlash() {
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    document.body.appendChild(flash);

    setTimeout(() => {
        document.body.removeChild(flash);
    }, 300);
}

function startLoadingSequence() {
    setTimeout(() => {

        document.getElementById('loadingScreen').classList.add('hidden');

        const jumpScreen = document.getElementById('jumpScreen');
        jumpScreen.style.display = 'flex';

        createScreenFlash();

        setTimeout(() => {
            jumpScreen.style.display = 'none';
            document.getElementById('mainContent').classList.add('visible');
        }, 800);
    }, 3000);
}

function setupCardInteractions() {
    document.querySelectorAll('.tokenomics-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0px)';
        });
    });
}

function setupCopyButton() {
    const copyBtn = document.querySelector('.copy-btn');
    const caPlaceholder = document.querySelector('.ca-placeholder');

    if (copyBtn && caPlaceholder) {
        const contractText = caPlaceholder.textContent.trim();

        if (contractText !== 'Coming Soon...') {
            copyBtn.disabled = false;
        }

        copyBtn.addEventListener('click', async () => {
            if (copyBtn.disabled) return;

            try {
                await navigator.clipboard.writeText(contractText);

                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                copyBtn.style.background = '#4CAF50';

                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.background = 'var(--primary-orange)';
                }, 2000);

            } catch (err) {
                console.error('Failed to copy text: ', err);

            }
        });
    }
}

function updateContractAddress(newAddress) {
    const caPlaceholder = document.querySelector('.ca-placeholder');
    const copyBtn = document.querySelector('.copy-btn');

    if (caPlaceholder && copyBtn) {
        caPlaceholder.textContent = newAddress;
        copyBtn.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    startLoadingSequence();
    setupCardInteractions();
    setupCopyButton();
});