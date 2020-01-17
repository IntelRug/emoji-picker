const emojis = {
    'Positive': [
        '0x1F600',
        '0x1F601',
        '0x1F602',
        '0x1F603',
        '0x1F604',
        '0x1F605',
        '0x1F606',
        '0x1F607',
        '0x1F608',
        '0x1F609',
        '0x1F60A',
        '0x1F60B',
        '0x1F60E',
        '0x1F60D',
        '0x1F618',
        '0x1F617',
        '0x1F619',
        '0x1F61A',
        '0x1F642',
        '0x1F917',
        '0x1F929',
    ],
    'Neutral': [
        '0x1F928',
        '0x1F610',
        '0x1F611',
        '0x1F636',
        '0x1F644',
        '0x1F60F',
        '0x1F623',
        '0x1F625',
        '0x1F62E',
        '0x1F910',
        '0x1F62F',
        '0x1F62A',
        '0x1F62B',
        '0x1F634',
        '0x1F914',
        '0x1F60C',
        '0x1F61B',
        '0x1F61C',
        '0x1F61D',
        '0x1F924',
        '0x1F612',
        '0x1F613',
        '0x1F614',
        '0x1F615',
        '0x1F643',
        '0x1F911',
        '0x1F632',
    ],
    'Negative': [
        '0x2639 0xFE0F',
        '0x1F641',
        '0x1F616',
        '0x1F61E',
        '0x1F61F',
        '0x1F624',
        '0x1F622',
        '0x1F62D',
        '0x1F626',
        '0x1F627',
        '0x1F628',
        '0x1F629',
        '0x1F92F',
        '0x1F62C',
        '0x1F630',
        '0x1F631',
        '0x1F633',
        '0x1F62A',
        '0x1F635',
        '0x1F621',
        '0x1F620',
        '0x1F92C',
    ],
};

function emojiFromCode(code) {
    return String.fromCodePoint(...code.split(' ').map(part => parseInt(part, 16)));
}

function createElement(classes, value) {
    const element = document.createElement('div');
    element.classList.add(classes);
    if (value) {
        element.innerHTML = value;
    }
    return element;
}

window.onload = () => {
    const emojiContainer = document.querySelector('.js-emoji-container');
    const textarea = document.querySelector('.js-emoji-textarea');
    const button = document.querySelector('.js-emoji-button');

    if (!emojiContainer || !textarea || !button) return;

    const emojiPicker = createElement('emoji-picker');
    emojiContainer.appendChild(emojiPicker);

    function open() {
        emojiPicker.classList.add('emoji-picker_active');
    }
    
    function close() {
        emojiPicker.classList.remove('emoji-picker_active');
    }

    function toggle() {
        if (emojiPicker.classList.contains('emoji-picker_active')) {
            close();
        } else {
            open();
        }
    }

    button.onclick = toggle;

    document.addEventListener('click', (event) => {
        if (
            !emojiPicker.contains(event.target)
            && !button.contains(event.target)
            ) {
            close();
        }
    });

    const groups = Object.keys(emojis);
    groups.forEach((group) => {
        const groupElement = createElement('emoji-picker__group');
        const groupTitleElement = createElement('emoji-picker__group-title', group);

        emojis[group].forEach((emoji) => {
            const emojiElement = createElement('emoji-picker__item', emojiFromCode(emoji));
            groupElement.appendChild(emojiElement);

            emojiElement.onclick = () => {
                textarea.value += emojiFromCode(emoji);
            };
        });

        emojiPicker.appendChild(groupTitleElement);
        emojiPicker.appendChild(groupElement);
    });
};