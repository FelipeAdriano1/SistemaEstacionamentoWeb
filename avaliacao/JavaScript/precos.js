async function exibirPrecos() {

    const precos = await carregamento('http://localhost:5500/JSON/precos.json')

    var id = 0

    for (preco of precos) {
        document.getElementById('precoHora').value = preco.precoHora
        document.getElementById('precoFixo').value = preco.precoFixo

        id = preco.id
    }

    document.getElementById('buttonEditPreco').addEventListener('click', function () {
        const precoFixo = document.getElementById('precoHora').value
        const precoHora = document.getElementById('precoFixo').value

        if (!precoHora || !precoFixo) {
            alert('Por favor, preencha todos os campos do formulário.')
            return
        }
        salvarPrecos(id)
    })
}

function salvarPrecos(id) {

    var precoFixo = Number(document.getElementById("precoFixo").value)
    var precoHora = Number(document.getElementById('precoHora').value)
    var idPreco = id

    precoHoraFracionado = (precoHora / 60).toFixed(2)

    Number(precoHoraFracionado)

    const obj = {
        id: idPreco,
        precoFixo: precoFixo,
        precoHora: precoHora,
        precoPorMinuto: precoHoraFracionado
    }

    for(let prop in obj){
        if(!obj[prop]){
            alert('Por favor preencha todos os campos para alterar os preços')
            return
        }
    }

    editarDados('http://localhost:5500/preco', obj)
}