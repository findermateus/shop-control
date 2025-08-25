## Justificativa da Arquitetura Escolhida

Para este projeto, foi escolhida a **arquitetura em camadas**, composta pelas camadas de **apresentação**, **negócios** e **dados**. Essa escolha está diretamente alinhada com os **requisitos funcionais (RF)** e **não funcionais (RNF)** especificados.

### Camada de Apresentação
A camada de apresentação é responsável por exibir a interface ao usuário, permitindo:

- A visualização dos produtos,
- O uso do carrinho de compras,
- A interação com o sistema de login,

conforme descrito nos requisitos **RF01 a RF16**. Essa camada será construída com uma interface **responsiva e acessível**, atendendo aos requisitos **RNF06** (responsividade) e **RNF07** (acessibilidade).

### Camada de Negócios
A camada de negócios concentra toda a **lógica da aplicação**, como:

- Controle de estoque,
- Criação e edição de produtos por administradores,
- Processamento das compras,
- Autenticação de usuários.

Essa separação entre lógica e apresentação garante a **manutenibilidade e escalabilidade do sistema** (conforme **RNF05**), além de facilitar futuras atualizações.

### Camada de Dados
A camada de dados é responsável por gerenciar o **armazenamento seguro** das informações, incluindo dados de:

- Produtos,
- Usuários,
- Pedidos.

Essa estrutura garante requisitos como:

- **Alta disponibilidade** (**RNF01**),
- **Criptografia de senhas** (**RNF04**),
- **Conexão segura via HTTPS** (**RNF03**),
- **Bom desempenho em tempo de resposta** (**RNF02**) e **uso simultâneo** (**RNF05**).

---

Portanto, essa modelagem em camadas promove **modularidade**, **organização** e **flexibilidade**, tornando o sistema mais simples de evoluir e manter, enquanto assegura o cumprimento dos requisitos funcionais e não funcionais do projeto.

