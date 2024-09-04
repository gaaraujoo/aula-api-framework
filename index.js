const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')
const swaggerUI = require("swagger-ui-express")
const app = express()
const PORT = 3000

app.use(express.json())
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(require('./swagger.json')) )

let alunos = [
    {id: 1, nome: 'Gabriel'},
    {id: 2, nome: 'Pedro'}
]

app.get('/api/alunos', (req, res) => {
    res.json(alunos)
})

app.get('/api/alunos/getByName/:nome', (req, res) => {
    const {nome} = req.params
    const index = alunos.findIndex(a => a.nome === nome)

    if(index > -1){
        res.json(alunos[index])
    } else {
        res.status(404).json({message: 'Aluno não encontrado'})
    }
})

app.post('/api/alunos', (req, res) => {
    const novoAluno = {id: alunos.length + 1, ...req.body}
    alunos.push(novoAluno)
    res.status(201).json(novoAluno)
})

app.put('/api/alunos/:id', (req, res) => {
    const{id} = req.params
    console.log('---id', id)
    const alunoIndex = alunos.findIndex (a => a.id === Number(id))
    console.log('---aluno index', alunoIndex)

    if (alunoIndex > -1) {
        alunos[alunoIndex] = {id: id, ...req.body}
        res.json(alunos[alunoIndex])
    } else {
        res.status(404).json({message: 'Aluno não encontrado'})
    }
})

app.delete('/api/alunos/:id', (req,res) => {
    const {id} = req.params
    const alunoIndex = alunos.findIndex (aluno => aluno.id === Number(id))
    console.log('aluno index:', alunoIndex)
    console.log('ID:', id)
    
    if (alunoIndex === -1) {
        res.status(404).json({message: 'Aluno não encontrado'})
    } else {
        alunos.splice(alunoIndex, 1)
        res.status(204).send()
    }
})

app.listen(PORT,() =>{
    console.log(`servidor rodando na porta ${PORT}`)
})

