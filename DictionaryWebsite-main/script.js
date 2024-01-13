const input = document.querySelector('input');
const btn = document.querySelector('button');
const results = document.querySelector('.results')


// https://api.dictionaryapi.dev/api/v2/entries/en/{word}

const getData = async( word)=>{
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => res.json())

    return res[0]
}

const createCard=async()=>{
    const data = await getData(input.value)

    console.log(data);

    let partOfSpeech = []

    for(let i=0;i<data.meanings.length-1 ;i++){
        partOfSpeech.push(data.meanings[i].partOfSpeech)
    }

    results.innerHTML = `
    <div class="card">
                <div class="property">
                    <span>Word:</span>
                    <span>${data.word}</span>
                </div>
                <div class="property">
                    <span>Phonetics:</span>
                    <span>${data.phonetic}</span>
                </div>
                <div class="property">
                    <span>
                    <audio controls src='${data.phonetics[0].audio}'></audio>
                    </span>
                </div>
                <div class="property">
                    <span>Definition:</span>
                    <span>${data.meanings[0].definitions[0].definition}</span>
                </div>
                <div class="property">
                    <span>Example:</span>
                    <span>${data.meanings[0].definitions[0].example}</span>
                </div>
                <div class="property">
                    <span>Part of speech:</span>
                    <span>${partOfSpeech.map(e=>e).join(' , ')}</span>
                </div> 
            </div>
    `
}


btn.addEventListener('click', createCard)

// createCard('poor')

