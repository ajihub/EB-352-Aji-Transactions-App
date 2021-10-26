
const subDetailscontainer = document.getElementById('sub-details');
const deleteBtn = document.getElementById('delete-btn');

export const showDetails = async(id) =>{

    const res = await fetch('http://localhost:3000/transactions/'+id);
    const transacData = await res.json();

    const template = `
    <h2>Title: ${transacData.name}</h2>
    <p>Description: ${transacData.description}</p>
    <p>This transaction is an ${transacData.type}</p>
    <p>Amount: $${transacData.amount}</p>
     `

    subDetailscontainer.innerHTML = template;

    deleteBtn.addEventListener('click', async (e)=>{
        const res = await fetch('http://localhost:3000/transactions/'+id, {
            method: 'DELETE'
        })
        window.location.replace('/index.html')
    })
}