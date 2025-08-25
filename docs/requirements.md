## Requisitos Funcionais (RF)

### Ver produtos

- **RF01**: O sistema deve permitir que qualquer usuário visualize a lista de produtos disponíveis.
- **RF02**: O sistema deve exibir nome, preço, imagem e descrição de cada produto.
- **RF03**: O sistema deve permitir a filtragem de produtos por nome, categoria ou faixa de preço.
- **RF04**: O sistema deve emitir em tela, uma listagem dos 10 produtos mais vendidos no intervalo de uma semana.

### Admin - Gerenciar produtos

- **RF05**: O sistema deve permitir que o administrador adicione novos produtos ao catálogo.
- **RF06**: O sistema deve permitir que o administrador edite as informações de um produto existente.
- **RF07**: O sistema deve permitir que o administrador remova produtos do catálogo.
- **RF08**: O sistema deve permitir que o administrador atualize a quantidade disponível em estoque.
- **RF09**: O sistema deve alertar o administrador quando a quantidade de um produto atingir o nível mínimo de estoque configurado.
- **RF10**: O sistema deve registrar um histórico de movimentações de estoque (entradas e saídas) com data, hora, quantidade e responsável.

### Compra pelo site

- **RF11**: O sistema deve permitir que o usuário adicione produtos ao carrinho de compras.
- **RF12**: O sistema deve permitir que o usuário remova itens do carrinho.
- **RF13**: O sistema deve calcular automaticamente o total da compra.
- **RF14**: O sistema deve permitir que o usuário finalize a compra com dados de entrega e pagamento.
- **RF15**: O sistema deve gerar um pedido após a conclusão da compra.
- **RF16**: O sistema deve verificar a disponibilidade de estoque antes de confirmar a compra, bloqueando a compra de itens esgotados.
- **RF17**: O sistema deve integrar um gateway de pagamento seguro (ex.: PayPal, Stripe, PagSeguro) para processar transações.

### Sistema de login

- **RF18**: O sistema deve permitir que usuários se cadastrem com nome, e-mail e senha.
- **RF19**: O sistema deve permitir login com e-mail e senha.
- **RF20**: O sistema deve validar credenciais e liberar acesso ao painel do usuário após login bem-sucedido.
- **RF21**: O sistema deve permitir login de administradores com permissões adicionais.
- **RF22**: O sistema deve permitir o usuário redefinir sua senha.

---

## Requisitos Não Funcionais (RNF)

- **RNF01**: O sistema deve estar disponível 99% do tempo, exceto em períodos programados de manutenção.
- **RNF02**: O tempo de resposta para qualquer ação do usuário não deve exceder 2 segundos.
- **RNF03**: O sistema deve utilizar conexão segura (HTTPS) para proteger os dados da aplicação.
- **RNF04**: As senhas dos usuários devem ser armazenadas com criptografia.
- **RNF05**: O sistema deve suportar pelo menos 500 usuários simultâneos sem perda de desempenho.
- **RNF06**: A interface do sistema deve ser responsiva, funcionando em dispositivos móveis e desktops.
- **RNF07**: O sistema deve seguir as boas práticas de acessibilidade para navegação por teclado e leitores de tela.
