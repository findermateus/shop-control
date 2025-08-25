# Modelagem da Arquitetura com Módulos/Containers

A arquitetura do sistema foi estruturada com base no modelo em **camadas**, utilizando três containers principais: **Interface Web**, **API REST** e **Banco de Dados**. Essa abordagem segue o modelo C4, no nível de Containers, e organiza o sistema em componentes independentes que se comunicam entre si.

---

## 1. Interface Web (Frontend - Camada de Apresentação)

**Responsabilidade**: Interação com o usuário final

**Funções**:
- Visualização de produtos (RF01, RF02, RF03)
- Manipulação do carrinho (RF08, RF09, RF10)
- Tela de login e cadastro (RF13 a RF16)

**Tecnologia sugerida**: Next.js

**Comunicação**: Envia requisições para a API REST via HTTP/HTTPS

---

## 2. API REST (Backend - Camada de Negócios)

**Responsabilidade**: Processamento da lógica da aplicação

**Funções**:
- Cadastro, edição e exclusão de produtos (RF04 a RF07)
- Processamento de pedidos (RF11, RF12)
- Autenticação e autorização de usuários (RF14 a RF16)
- Integração com meio de pagamento

**Tecnologia sugerida**: TypeScript

**Comunicação**:
- Recebe requisições da Interface Web
- Interage com o Banco de Dados

---

## 3. Banco de Dados (Camada de Dados)

**Responsabilidade**: Armazenamento seguro e persistente das informações

**Funções**:
- Armazenamento de produtos, usuários, pedidos, credenciais, etc.

**Tecnologia sugerida**: MySQL

**Requisitos não funcionais atendidos**:
- **RNF01** - Alta disponibilidade
- **RNF02** - Desempenho
- **RNF03** - Conexão segura (HTTPS)
- **RNF04** - Criptografia de senhas
- **RNF05** - Suporte a múltiplos usuários

---

## Diagrama de Containers

**Usuário**  
Acessa o sistema via navegador  
Interage com a Interface Web  

⬇️

**Interface Web (Next.js)**  
**Responsabilidades**:
- Visualização de produtos (RF01–RF03)
- Carrinho de compras (RF08–RF10)
- Login e cadastro (RF13–RF16)

**Características**:
- Interface responsiva e acessível (RNF06, RNF07)
- Comunicação com API via HTTP/HTTPS

⬇️

**API REST (TypeScript)**  
**Responsabilidades**:
- Regras de negócio centralizadas
- Gerenciamento de produtos (RF04–RF07)
- Processamento de pedidos (RF11–RF12)
- Autenticação e autorização (RF14–RF16)
- Integração com meios de pagamento

**Comunicação**:
- Recebe requisições da Interface Web
- Interage com o Banco de Dados

⬇️

**Banco de Dados (MySQL)**  
**Responsabilidades**:
- Armazenamento de produtos, usuários, pedidos e credenciais

**Requisitos atendidos**:
- **RNF01**: Alta disponibilidade
- **RNF02**: Desempenho
- **RNF03**: Conexão segura
- **RNF04**: Criptografia
- **RNF05**: Multiusuário
