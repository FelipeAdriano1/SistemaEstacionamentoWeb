async function exibirComprovantes() {

    const data = await carregamento('http://localhost:5500/JSON/comprovantes.json')

    let html = '<option value="Vazio">Escolha um comprovante</option>'
    for (let comprovantes of data) {
        html += `<option value="${comprovantes.nome}">${comprovantes.nome}</option>`

        document.getElementById('selectComprovante').innerHTML = html
    }

    document.getElementById('selectComprovante').addEventListener('change', function () {

        const compSeleciondo = this.value

        const comprovanteSelecionado = data.find(comprovantes => comprovantes.nome === compSeleciondo)

        document.getElementById('nomeProp').value = comprovanteSelecionado.nome
        document.getElementById('telefone').value = comprovanteSelecionado.telefone
        document.getElementById('nomeVeiculo').value = comprovanteSelecionado.modelo
        document.getElementById('placaCarro').value = comprovanteSelecionado.placa
        document.getElementById('horaEntrada').value = formatarData(comprovanteSelecionado.horaEntrada)
        document.getElementById('tipoCad').value = comprovanteSelecionado.tipoCad
        document.getElementById('horaSaida').value = formatarData(comprovanteSelecionado.horaSaida)
        document.getElementById('precoFixo').value = formatarNumeros(comprovanteSelecionado.precoFixo)
        document.getElementById('precoHora').value = formatarNumeros(comprovanteSelecionado.precoHora)
        document.getElementById('precoTotal').value = formatarNumeros(comprovanteSelecionado.precoTotal)
    })

    document.getElementById('buttonImprimir').addEventListener('click', function () {

        const nomeProp = document.getElementById('nomeProp').value
        const telefone = document.getElementById('telefone').value
        const modelo = document.getElementById('nomeVeiculo').value
        const horaEntrada = document.getElementById('horaEntrada').value
        const tipoCad = document.getElementById('tipoCad').value
        const placa = document.getElementById('placaCarro').value
        const horaSaida = document.getElementById('horaSaida').value
        const precoTotal = document.getElementById('precoTotal').value
        const precoHora = document.getElementById('precoHora').value
        const precoFixo = document.getElementById('precoFixo').value

        if (!nomeProp || !telefone || !modelo || !tipoCad || !placa || !horaEntrada || !precoFixo || !precoHora || !precoTotal || !horaSaida) {
            alert('Por favor, selecione um comprovante')
            return
        }

        const dataImprimir = {
            nomeProp,
            telefone,
            modelo,
            horaEntrada,
            tipoCad,
            placa,
            horaSaida,
            precoTotal,
            precoHora,
            precoFixo
        }
        buttonImprimir(dataImprimir)
    })
}

function buttonExcluir() {

    var placaCarro = document.getElementById('placaCarro').value

    if (placaCarro && placaCarro.trim() !== '') {

        var placa = placaCarro

        const obj = {
            placa: placa
        }

        excluirDados('http://localhost:5500/excluirComprovante', obj)
    }
    else { alert('Selecione um comprovante para exluir !') }
}

async function buttonImprimir(data) {

    try {

        const req = await fetch('http://localhost:5500/gerarPdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (!req.ok) {
            throw new Error('Erro ao gerar PDF')
        }

        const blob = await req.blob()

        const download = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = download
        a.download = 'comprovante.pdf'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(download)
        a.remove()
    } catch (erro) { console.error(erro) }
}