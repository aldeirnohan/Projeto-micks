const connection = require('./connection')

async function selectLivros(){
    const [rows] = await connection.query('SELECT * FROM livro;');
    return rows;
}

async function selectLivro(id){
    const sql = ('SELECT * FROM livro WHERE id=?');
    
    return (await connection.query(sql, [id]))[0][0];
}

async function findLivro(nome){
    const sql = ('SELECT * FROM livro WHERE nome=?');
    
    return (await connection.query(sql, [nome]))[0][0];
}

async function insertLivro(livro){
    const sql = 'INSERT INTO livro(nome,editora,anoPublicacao) VALUES (?,?,?);';
    const values = [livro.nome, livro.editora, livro.anoPublicacao];
    return await connection.query(sql, values);
}

async function updateLivro(id, livro){
    const sql = 'UPDATE livro SET nome=?, editora=?, anoPublicacao=? WHERE id=?';
    const values = [livro.nome, livro.editora, livro.anoPublicacao, id];
    return await connection.query(sql, values);
}

async function deleteLivro(id){
    const sql = 'DELETE FROM livro where id=?;';
    return await connection.query(sql, [id]);
}
  
module.exports = {selectLivros, selectLivro, findLivro, insertLivro, updateLivro, deleteLivro}