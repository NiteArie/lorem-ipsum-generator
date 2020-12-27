import { LoremIpsum } from 'lorem-ipsum';

const app = (() => {
    const _paragraphInput = document.querySelector(".container__form__input");
    const _minWordInput = document.querySelector(".container__form__advance__min-word");
    const _maxWordInput = document.querySelector(".container__form__advance__max-word");
    const _minSentenceInput = document.querySelector(".container__form__advance__min-sentence");
    const _maxSentenceInput = document.querySelector(".container__form__advance__max-sentence");
    const _form = document.querySelector(".container__form");
    const _moreButton = document.querySelector(".container__form__buttons__more");
    const _moreOptions = document.querySelector(".container__form__advance");
    const _alert = document.querySelector(".container__form__alert");
    const _outputContent = document.querySelector(".container__output__content");

    const _errorMessage = "The maximum sentences/paragraph and words/sentence values are 12. Entered value must be positive";

    let _moreState = false;

    let _paragraph = 0;
    let _minWord = 5;
    let _maxWord = 12;
    let _minSentence = 4;
    let _maxSentence = 12;

    initAdvanceInput();

    _form.addEventListener("submit", (event) => {
        event.preventDefault();

        let _paragraphCount = _paragraphInput.value;
        let _minWordCount = _minWordInput.value;
        let _maxWordCount = _maxWordInput.value;
        let _minSentenceCount = _minSentenceInput.value;
        let _maxSentenceCount = _maxSentenceInput.value;

        if (
            validateParagraphInput(_paragraphCount) &&
            validateWordInput(_minWordCount, _maxWordCount) &&
            validateSentenceInput(_minSentenceCount, _maxSentenceCount)
        ) {
            _paragraph = parseInt(_paragraphCount);
            _minWord = parseInt(_minWordCount);
            _maxWord = parseInt(_maxWordCount);
            _minSentence = parseInt(_minSentenceCount);
            _maxSentence = parseInt(_maxSentenceCount);
            outputLoremIpsumText(generateLoremIpsum());
            
        } else {
            displayAlert();
        }
    })

    _moreButton.addEventListener('click', (event) => {
        if ( _moreState ) {
            closeMoreOptions();
            updateMoreButtonContent("More");
        } else {
            openMoreOptions();
            updateMoreButtonContent("Hide");
        }
    })

    function displayAlert() {
        _alert.textContent = _errorMessage;
    }

    function generateLoremIpsum() {
        const lorem = new LoremIpsum({
            sentencesPerParagraph: {
                max: _maxSentence,
                min: _minSentence,
            },
            wordsPerSentence: {
                max: _maxWord,
                min: _minWord,
            }
        });

        return lorem.generateParagraphs(_paragraph);
    }

    function outputLoremIpsumText(text) {
        _outputContent.textContent = text;
    }

    function initAdvanceInput() {
        _minWordInput.value = _minWord;
        _maxWordInput.value = _maxWord;
        _minSentenceInput.value = _minSentence;
        _maxSentenceInput.value = _maxSentence;
    }

    function openMoreOptions() {
        _moreState = true;
        _moreOptions.classList.remove('hidden');
    }

    function closeMoreOptions() {
        _moreState = false;
        _moreOptions.classList.add('hidden');
    }

    function updateMoreButtonContent(content) {
        _moreButton.textContent = content;
    }


    function validateParagraphInput(paragraphCount) {
        return (
            validateIfInputIsANumber(paragraphCount) &&
            validateIfInputIsPositive(paragraphCount)
        );
    }

    function validateWordInput(minWord, maxWord) {
        return (
            validateIfInputIsANumber(minWord) &&
            validateIfInputIsANumber(maxWord) &&
            validateIfInputIsPositive(minWord) &&
            validateIfInputIsPositive(maxWord) &&
            validateMaxLargerThanMin(maxWord, minWord) &&
            validateMaximumInputValue(maxWord)
        );
    }
    
    function validateSentenceInput(minSentence, maxSentence) {
        return (
            validateIfInputIsANumber(minSentence) &&
            validateIfInputIsANumber(maxSentence) &&
            validateIfInputIsPositive(minSentence) &&
            validateIfInputIsPositive(maxSentence) &&
            validateMaxLargerThanMin(maxSentence, minSentence) &&
            validateMaximumInputValue(maxSentence)
        );
    }

    function validateIfInputIsANumber(text) {
        return !isNaN(parseInt(text, 10))
    }

    function validateIfInputIsPositive(text) {
        return parseInt(text, 10) >= 0
    }

    function validateMaxLargerThanMin(max, min) {
        return (
            parseInt(max, 10) >= parseInt(min, 10)
        );
    }

    function validateMaximumInputValue(max) {
        return (
            parseInt(max, 10) <= 12
        );
    }

})()