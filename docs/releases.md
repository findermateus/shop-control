# Branches e Releases

Este documento detalha o fluxo de branches e releases para o projeto, incluindo as diferenças entre releases de _hotfix_ e de _feature_.  
O projeto será executado em **8 sprints de duas semanas cada**. A **primeira sprint** será reservada exclusivamente para a **reafirmação e validação final dos requisitos**. As **sete sprints seguintes** serão destinadas ao **desenvolvimento**, seguindo a fila de prioridades definida pelo Product Owner.

## Branches Principais

- **main**: Branch principal onde as versões estáveis são integradas e liberadas.
- **developers/**: Branches dedicadas a _features_ específicas, criadas conforme a necessidade de integração de uma nova funcionalidade.

## Fluxo de Releases

### Hotfix Releases

- _Pull Requests_ (PRs) para _hotfixes_ são liberados assim que:
  - Passam pela aprovação de pelo menos um revisor.
  - São validados pela equipe de QA.
- Após a aprovação e o QA, o _merge_ do _hotfix_ é feito diretamente na **main** para uma liberação rápida da correção.

### Feature Releases

- Cada _feature_ é associada a uma branch específica na estrutura **developers/**, criada a partir da **main**.

  - **Exemplo de branch para feature**: `developers/INTEGRACAO`

- Os cards de tarefas associados à _feature_ são liberados para essa branch de _feature_ (`developers/INTEGRACAO`).

- Quando todas as tarefas relacionadas ao card "pai" da _feature_ são concluídas e aprovadas, a branch de _feature_ (`developers/INTEGRACAO`) é **mergeada na main** para lançamento.

## Para mais informações de nomenclatura de PRs e branches

- [Pull Requests](./patterns/pull-requests.md)
