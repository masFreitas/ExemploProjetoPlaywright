**Visão Geral**
- **Descrição:**: Projeto de exemplo usando Playwright para testes end-to-end (E2E) em JavaScript.
- **Objetivo:**: Demonstrar estrutura de testes com padrão Page Object (POM) e executar testes automatizados com Playwright.

**Estrutura do Projeto**
- **`package.json`**: Define dependências e scripts do projeto.
- **`playwright.config.js`**: Configuração do Playwright (projetos, timeouts, reporter, etc.).
- **`pages/`**: Contém as classes Page Object usadas pelos testes.
  - **`BasePage.js`**: Classe base com utilitários e ações comuns entre páginas.
  - **`LoginPage.js`**: Implementa ações e seletores da página de login.
  - **`ProductPage.js`**: Implementa ações e seletores da página de produtos.
- **`tests/e2e/`**: Contém os specs de teste E2E.
  - **`login.spec.js`**: Testes relacionados ao fluxo de login.
  - **`produtos.spec.js`**: Testes relacionados à funcionalidade de produtos.

**Pré-requisitos**
- **Node.js**: Recomendado Node >= 16 (ver `engines` no `package.json` se existir).
- **npm** (ou `pnpm`/`yarn` conforme preferência).

**Instalação (Windows - PowerShell)**
```powershell
# Instalar dependências
npm install

# Instalar navegadores do Playwright (apenas se necessário)
npx playwright install
```

**Executando Testes**
- **Executar toda suíte**:
```powershell
npx playwright test
```
- **Executar um arquivo de teste específico**:
```powershell
npx playwright test tests/e2e/login.spec.js
```
- **Executar em modo interativo / debug**:
```powershell
npx playwright test --debug
```
- **Executar no navegador com interface (headed)**:
```powershell
npx playwright test --headed
```
- **Executar com geração de relatório HTML**:
```powershell
npx playwright show-report
```

**Como os testes estão organizados (Padrão Page Object)**
- Os testes usam classes em `pages/` para abstrair interações com a UI.
- Um spec importa uma Page (por exemplo, `LoginPage`) e chama métodos que representam ações do usuário (ex.: `loginPage.login(email, senha)`).

**Adicionar novos testes**
- Criar um novo arquivo em `tests/e2e/` terminando com `.spec.js`.
- Criar/estender uma classe em `pages/` se surgirem novos fluxos de UI.
- Use descrições claras nos `describe`/`it` para facilitar leitura dos relatórios.