const express = require('express');
const schema = require('../db/schema');
const db = require('../db/repository');
const { id } = require('../db/schema');
const { json } = require('express');

const router = express.Router();

/* capturando todos os livros */
router.get('/', async (req, res) => {
  try {
    const alllivros = await db.selectLivros();
    console.log('2');

    res.json(alllivros);
  } catch (error) {
    console.log(error);
    
    res.status(400);
  }
});

/* capturando livro especifico */
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const livro = await db.selectLivro(id);

    if (!livro) {
      const error = new Error('Livro não existe!');
      return next(error);
    }

    res.json(livro);
  } catch (error) {
    next(error);
  }
});

/* Criando um novo livro */
router.post('/', async (req, res, next) => {
  try {
    const { nome, editora, anoPublicacao } = req.body;

    const result = await schema.validateAsync({ nome, editora, anoPublicacao });

    const livro = await db.findLivro(nome);

    // Livro ja existe
    if (livro) {
      const error = new Error('Livro ja existe!');
      res.status(409); // conflict error
      return next(error);
    }

    const newlivro = await db.insertLivro({
        nome,
        editora,
        anoPublicacao,
    });

    res.status(201).json(newlivro);
  } catch (error) {
    next(error);
  }
});

/* Atualizando livro especifico */
router.put('/', async (req, res, next) => {
  try {
    const { id, nome, editora, anoPublicacao } = req.body;
    const result = await schema.validateAsync({ nome, editora, anoPublicacao });

    const livro = await db.selectLivro(id);

    // Livro nao existe
    if (!livro) {
      return res.json({'efhuaeffau': 'efushs'});
    }

    const updatedlivro = await db.updateLivro(id, { 
      nome,
      editora,
      anoPublicacao, 
    });

    res.json(updatedlivro);
  } catch (error) {
    next(error);
  }
});

/* Deletando livro especifico */
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const livro = await db.selectLivro(id);

    // Livro nao existe
    if (!livro) {
      return next();
    }
    await db.deleteLivro(id);

    res.json({
      message: 'O livro foi deletado',
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;