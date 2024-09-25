
let users = []; 

module.exports = class userController {
  static async createUser(req, res) {
    const { cpf, email, password, name } = req.body;

    if (!cpf || !email || !password || !name) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(cpf) || cpf.length !== 11) {
      return res.status(400).json({ error: "CPF inválido. Deve conter exatamente 11 dígitos numéricos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }

    // Verifica se já existe um usuário com o mesmo CPF
    const existingUser = users.find(user => user.cpf === cpf);
    if (existingUser) {
      return res.status(400).json({ error: "CPF já cadastrado" });
    }

    // Cria e adiciona novo usuário
    const newUser = { cpf, email, password, name };
    users.push(newUser);

    return res.status(201).json({ message: "Usuário criado com sucesso", user: newUser });
  }


  static async getAllUsers(req, res) {
    return res.status(200).json({ message: "Obtendo todos os usuários", users });
  }


  static async updateUser(req, res) {
    //desestrutura e recupera os dados enviados via corpo da requisito
    const { cpf, email, password, name } = req.body;

    //validar se todos os campos foram preenchidos 
    if(!cpf || !email || !password|| !name){
        return res.status(400).json({error: "todos os campos devem ser preenchido"});
 }  
    //procurar o indice do usuario Array 'users' pelo cpf
  const userIndex = users.findIndex(user => user.cpf === cpf)
    //se o usuario nao for encontrado userIndex equivale -1
  if(userIndex === -1){
    return res.status(400).json({error: "usuario nao encontrado"});
  }
  //atualiza os dados do usuario no Array "users"
  users[userIndex] = {cpf,email,password,name}

  return res.status(200).json({message:"usuario atualizado",user:users[userIndex]})
}

  static async deleteUser(req, res) {
  //obtem o parametro 'id' da requisição, que é o cpf do user a ssr deletado
  const userId = req.params.cpf 

  //procurar o indice do usuario Array 'users' pelo cpf
  const userIndex = users.findIndex(user => user.cpf === userId)
  //se o usuario nao for encontrado userIndex equivale -1
  if(userIndex === -1){
    return res.status(400).json({error: "usuario nao encontrado"});
}
  //removendo o usario do Array 'users'
  users.splice(userIndex,1);

  return res.status(200).json({message:"usuario apagado"});
}
};