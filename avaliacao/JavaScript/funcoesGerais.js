function formatarData(datas) {

    const data = new Date(datas)

    var dia = data.getDate().toString().padStart(2, '0')
    var mes = (data.getMonth() + 1).toString().padStart(2, '0')
    var ano = data.getFullYear()
    var hora = data.getHours().toString().padStart(2, '0')
    var minuto = data.getMinutes().toString().padStart(2, '0')

    return `${dia}/${mes}/${ano} - ${hora}:${minuto}`
}

function formatarNumeros(numero) {
    const valorFormatado = numero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    return valorFormatado
}

function carregamento(URL) {

    return fetch(URL, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .catch(error => { console.error('Erro ao buscar informações', error) })
}

async function salvarDados(url, obj) {

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        return res.ok
    } catch (erro) {
        throw new Error('Erro:' + erro)
    }
}

async function editarDados(URL, objEdit) {

    try {
        const res = await fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objEdit)
        })
        return res.ok
    } catch (erro) {
        throw new Error('Erro:' + erro)
    }
}

async function excluirDados(url, obj) {

    try {
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        return res.ok
    } catch (erro) {
        throw new Error('Erro:' + erro)
    }

}