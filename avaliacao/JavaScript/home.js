async function cardPrecos() {
    const preco = await carregamento('http://localhost:5500/JSON/precos.json')
    const cadastro = await carregamento('http://localhost:5500/JSON/cadastros.json')
    var tipo = await carregamento('http://localhost:5500/JSON/tiposVeiculo.json')

    for (precos of preco) {
        document.getElementById('precoFixo').value = precos.precoFixo
        document.getElementById('precoHora').value = precos.precoHora
    }

    let quantMoto = 0
    let quantCarro = 0
    let quantCaminhao = 0

    for (let cad = 0; cad < cadastro.length; cad++) {

        if (cadastro[cad].tipoCad == 'Moto') {
            quantMoto++
        }
        else if (cadastro[cad].tipoCad == 'Carro') {
            quantCarro++
        }
        else if (cadastro[cad].tipoCad == 'Caminhao') {
            quantCaminhao++
        }
    }

    document.getElementById('quantMoto').value = quantMoto
    document.getElementById('quantCarro').value = quantCarro
    document.getElementById('quantCaminhao').value = quantCaminhao

    let quantMotoDisp = 0
    let quantCarroDisp = 0
    let quantCaminhaoDisp = 0

    for (tip of tipo) {

        if (tip.tipo == 'Moto') {
            quantMotoDisp = tip.quantDisponivel
        }
        else if (tip.tipo == 'Carro') {
            quantCarroDisp = tip.quantDisponivel
        }
        else if (tip.tipo == 'Caminhao') {
            quantCaminhaoDisp = tip.quantDisponivel
        }
    }

    document.getElementById('quantMotoDisp').value = quantMotoDisp
    document.getElementById('quantCarroDisp').value = quantCarroDisp
    document.getElementById('quantCaminhaoDisp').value = quantCaminhaoDisp
}