const alphabet = "abcdefghijklmnopqrstuvwxyz".split('')

const vowels = "aeiou".split('')
const consonants = alphabet.filter((letter) => !vowels.includes(letter))

const noDoubleVowels = "iu".split('')
const noDoubleConsonants = "hjqrvwxyz".split('')

function newWord(length = 0): string {
    if (length === 0)
        length = Math.floor(Math.random() * 5) + 3
    
    let word = "";

    let vowelsCount = Math.floor(Math.random() * 3)
    
    for (let i = 0; i < length; ++i) {
        if (vowelsCount === 0) {
            const consonant = consonants[Math.floor(Math.random() * consonants.length)]
            word += consonant
            if (i !== 0 && i !== length - 1 && !noDoubleConsonants.includes(consonant) && Math.random() < 0.2)
                word += consonant

            vowelsCount = Math.floor(Math.random() * 2) + 1
        } else {
            let vowel: string
            do {
                vowel = vowels[Math.floor(Math.random() * vowels.length)]
            } while ((noDoubleVowels.includes(vowel) || i === 0 || i === length - 1) && vowel === word.slice(-1))
            
            word += vowel
            --vowelsCount
        }
    }

    return word;
}

function generateSentence(commonWords: string[], length = 0): string {
    if (length === 0)
        length = Math.floor(Math.random() * 10) + 3
    
    let sentence = ""

    let nextComma = 2
    let endedWithComma = false

    for (let i = 0; i < length; ++i) {
        let word: string
        if (Math.random() < 0.5)
            word = newWord()
        else
            word = commonWords[Math.floor(Math.random() * commonWords.length)]
        
        if (i === 0)
            word = word.charAt(0).toUpperCase() + word.slice(1)

        if (nextComma <= 0 && Math.random() < 0.3) {
            sentence += word + ", "
            endedWithComma = true

            nextComma = 2
        } else {
            sentence += word + " "
            endedWithComma = false

            --nextComma
        }
    }
    
    if (endedWithComma)
        sentence = sentence.slice(0, -2)
    else
        sentence = sentence.slice(0, -1)

    if (Math.random() < 0.2) {
        if (Math.random() < 0.5)
            return sentence + '!'
        else
            return sentence + '?'
    } else {
        return sentence + '.'
    }
}

function generateText(commonWords: string[], length = 0): string {
    if (length === 0)
        length = Math.floor(Math.random() * 4) + 1
    
    let text = "";

    for (let i = 0; i < length; ++i) {
        const sentence = generateSentence(commonWords)
        text += sentence + " "
    }

    return text.slice(0, -1)
}

const languagesDiv = document.getElementById("languages") as HTMLDivElement
const selectedLanguageLabel = document.getElementById("selectedLanguage") as HTMLLabelElement
const languageTextDiv = document.getElementById("languageText") as HTMLDivElement

const newLanguageButton = document.getElementById("newLanguage") as HTMLButtonElement
const newTextButton = document.getElementById("newText") as HTMLButtonElement
const removeLanguageButton = document.getElementById("removeLanguage") as HTMLButtonElement

const languages: Record<string, string[]> = {}
const languageCommonWords: Record<string, string[]> = {}

const languageNames: string[] = []
const languageButtons: Record<string, HTMLButtonElement> = {}

let languageCount = 0
let selectedLanguage = ""

function newCommonWords(): string[] {
    let commonWords: string[] = []

    for (let i = 0; i < 3; ++i) commonWords.push(newWord(3))
    for (let i = 0; i < 3; ++i) commonWords.push(newWord(4))
    for (let i = 0; i < 3; ++i) commonWords.push(newWord(5))

    return commonWords
}

function newLanguage() {
    let language = newWord((Math.random() * 5) + 5)
    language = language.charAt(0).toUpperCase() + language.slice(1)

    languages[language] = []
    languageCommonWords[language] = newCommonWords()  
    
    languageNames.push(language)

    const languageButton = document.createElement("button")
    languageButton.textContent = language

    selectedLanguageLabel.innerText = language

    languageButton.addEventListener("click", () => {
        selectLanguage(language)
    })

    languageButtons[language] = languageButton
    languagesDiv.appendChild(languageButton)
    
    ++languageCount
    if (languageCount > 1)
        removeLanguageButton.disabled = false

    selectLanguage(language)
}

function selectLanguage(language: string) {
    const previousbutton = languageButtons[selectedLanguage]
    if (previousbutton)
        previousbutton.classList.remove("selected")

    selectedLanguage = language
    languageButtons[language].classList.add("selected")

    selectedLanguageLabel.innerText = language

    while (languageTextDiv.firstChild)
        languageTextDiv.removeChild(languageTextDiv.firstChild)

    for (let i = languages[selectedLanguage].length - 1; i >= 0; --i) {
        const label = document.createElement("p")
        label.textContent = languages[selectedLanguage][i]

        languageTextDiv.appendChild(label)
    }
}

function removeLanguage(language: string) {
    const languageIndex = languageNames.indexOf(language)

    delete languages[language]
    delete languageCommonWords[language]

    languageNames.splice(languageIndex, 1)

    languageButtons[language].remove()
    delete languageButtons[language]
    
    if (languageIndex === languageCount - 1)
        selectedLanguage = languageNames[languageIndex - 1]
    else
        selectedLanguage = languageNames[languageIndex]
    
    --languageCount
    if (languageCount <= 1)
        removeLanguageButton.disabled = true

    selectLanguage(selectedLanguage)
}

function newText() {
    const text = generateText(languageCommonWords[selectedLanguage])
    languages[selectedLanguage].push(text)

    const label = document.createElement("p")
    label.textContent = text

    languageTextDiv.insertBefore(label, languageTextDiv.firstChild)
}

newLanguageButton.addEventListener("click", newLanguage)

newTextButton.addEventListener("click", newText)

removeLanguageButton.addEventListener("click", () => {
    removeLanguage(selectedLanguage)
})

newLanguage()
