// javascript for create.html
const form = document.querySelector('form');

export const createPost = async (e) =>{
    
    e.preventDefault();                                                     

    const doc = {
        name: form.title.value,
        description: form.body.value,
        type: form.createselect.value,
        amount: parseInt(form.amount.value)
    }

    await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        body: JSON.stringify(doc),
        headers: {'Content-Type': 'application/json'}
    })
    window.location.replace('/index.html')

    // return;
}

form.addEventListener('submit', createPost);