const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const PDFDocument = require('pdfkit')

const server = http.createServer((req, res) => {
    const caminho = url.parse(req.url).pathname

    function servirArquivo(caminhoRelativo, tipoConteudo) {
        const caminhoAbsoluto = path.join(__dirname, '..', caminhoRelativo)
        fs.readFile(caminhoAbsoluto, (err, data) => {
            if (err) {
                res.writeHead(404)
                res.end('Nao foi possivel encontrar o arquivo')
                return
            }
            res.writeHead(200, { 'Content-Type': tipoConteudo })
            res.end(data)
        })
    }

    if (caminho.endsWith('.html')) {
        servirArquivo(`/${caminho}`, 'text/html')
    } else if (caminho.endsWith('.css')) {
        servirArquivo(`/${caminho}`, 'text/css')
    } else if (caminho.endsWith('.js')) {
        servirArquivo(`/${caminho}`, 'text/javascript')
    } else if (caminho.endsWith('.json')) {
        servirArquivo(`/${caminho}`, 'application/json')
    }

    else if (caminho === '/gerarPdf' && req.method === 'POST') {
        let body = ''

        req.on('data', chunk => {
            body += chunk
        })

        req.on('end', () => {
            const data = JSON.parse(body)

            const pdf = new PDFDocument()
            pdf.fontSize(20)

            pdf.text(`Nome proprietário: ${data.nomeProp}`).moveDown(1.5)
            pdf.text(`Telefone do cliente: ${data.telefone}`).moveDown(1.5)
            pdf.text(`Modelo do veículo: ${data.modelo}`).moveDown(1.5)
            pdf.text(`Tipo de veículo: ${data.tipoCad}`).moveDown(1.5)
            pdf.text(`Placa do veículo: ${data.placa}`).moveDown(1.5)
            pdf.text(`Hora da entrada: ${data.horaEntrada}`).moveDown(1.5)
            pdf.text(`Hora da saída: ${data.horaSaida}`).moveDown(1.5)
            pdf.text(`Preço fixo: ${data.precoFixo}`).moveDown(1.5)
            pdf.text(`Preco por hora: ${data.precoHora}`).moveDown(1.5)
            pdf.text(`Total pago: ${data.precoTotal}`).moveDown(1.5)


            res.writeHead(200, {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=comprovante.pdf'
            })

            pdf.pipe(res)
            pdf.end()
        })
    }

    else if (caminho === '/cadastro' && req.method == 'POST' || caminho === '/comprovante' && req.method == 'POST') {

        if (caminho === '/comprovante' && req.method == 'POST') {
            caminhoArquivo = path.join(__dirname, '../JSON/comprovantes.json')
        }
        else {
            caminhoArquivo = path.join(__dirname, '../JSON/cadastros.json')
        }
        let body = ''

        req.on('data', (chunk) => {
            body += chunk
        })

        req.on('end', () => {
            fs.readFile(caminhoArquivo, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end('false')
                    return
                }

                let arquivoJson = JSON.parse(data || '[]')
                let dados = JSON.parse(body)

                arquivoJson.push(dados)

                fs.writeFile(caminhoArquivo, JSON.stringify(arquivoJson, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500)
                        res.end('false')
                    } else {
                        res.writeHead(200)
                        res.end('true')
                    }
                })
            })
        })
    }

    else if (caminho === '/excluirComprovante' && req.method == 'DELETE' || caminho === '/excluirDados' && req.method == 'DELETE') {

        if (caminho === '/excluirComprovante') {
            caminhoArquivo = path.join(__dirname, '../JSON/comprovantes.json')
        }
        else if (caminho === '/excluirDados') {
            caminhoArquivo = path.join(__dirname, '../JSON/cadastros.json')
        }
        let body = ''

        req.on('data', (chunk) => {
            body += chunk
        })

        req.on('end', () => {
            const { placa } = JSON.parse(body)

            fs.readFile(caminhoArquivo, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end('false')
                    return
                }

                let arquivoJson = JSON.parse(data || '[]')

                const buscar = arquivoJson.findIndex(cadastro => cadastro.placa === placa)
                if (buscar !== -1) {
                    arquivoJson.splice(buscar, 1)
                }

                fs.writeFile(caminhoArquivo, JSON.stringify(arquivoJson, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500)
                        res.end('false')
                    } else {
                        res.writeHead(200)
                        res.end('true')
                    }
                })
            })
        })
    }

    else if (caminho === '/preco' && req.method == 'PUT' || caminho === '/tipoVeiculo' && req.method == 'PUT') {

        if (caminho === '/preco') {
            caminhoArquivo = path.join(__dirname, '../JSON/precos.json')
        }
        else if (caminho === '/tipoVeiculo') {
            caminhoArquivo = path.join(__dirname, '../JSON/tiposVeiculo.json')
        }
        let body = ''

        req.on('data', (chunk) => {
            body += chunk
        })

        req.on('end', () => {
            fs.readFile(caminhoArquivo, (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end('false')
                    return
                }

                let arquivoJson = JSON.parse(data || '[]')
                let dados = JSON.parse(body)

                arquivoJson = arquivoJson.map(obj => {
                    if (obj.id == dados.id) {
                        return dados
                    } else {
                        return obj
                    }
                })

                fs.writeFile(caminhoArquivo, JSON.stringify(arquivoJson, null, 2), (err) => {
                    if (err) {
                        res.writeHead(500)
                        res.end('false')
                    } else {
                        res.writeHead(200)
                        res.end('true')
                    }
                })
            })
        })
    }
})
server.listen(5500, () => console.log('Servidor rodando na porta 5500'))