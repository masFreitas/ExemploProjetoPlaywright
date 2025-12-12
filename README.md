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
 
**Relatório Allure (instalação e uso)**
- **O que é:** Allure é uma ferramenta de relatórios que gera relatórios HTML ricos a partir dos resultados de execução de testes (com anexos como screenshots, logs e steps).

**1) Pré-requisitos (Windows)**
- Ter o Node.js e `npm` instalados (já exigido para este projeto).
- Instalar o binário do Allure CLI (opções):
  - Via npm (local ao projeto):
```powershell
npm install --save-dev allure-commandline
```
  - Ou globalmente (se preferir usar o comando `allure` diretamente):
```powershell
npm install -g allure-commandline
```
  - Alternativas no Windows: `choco install allure.commandline` (Chocolatey) ou `scoop install allure` (Scoop), se você usar esses gerenciadores.

**2) Instalar adaptador Allure para Playwright**
- No projeto, adicione o pacote que integra Playwright com Allure:
```powershell
npm install --save-dev allure-playwright
```

Observação: alguns setups usam outros adaptadores, mas `allure-playwright` é conveniente para coletar resultados compatíveis com Allure.

**3) Configurar `playwright.config.js`**
- Ative o reporter do Allure e configure pasta de saída (`allure-results`). Exemplo mínimo:
```js
// playwright.config.js
module.exports = {
  reporter: [ ['list'], ['allure-playwright'] ],
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
};
```

Se preferir, passe opções ao reporter (ver documentação do `allure-playwright`).

**4) Scripts úteis no `package.json`**
- Adicione (ou adapte) scripts para facilitar a geração e abertura do relatório:
```json
"scripts": {
  "test": "npx playwright test",
  "test:allure": "npx playwright test",
  "allure:generate": "npx allure generate allure-results --clean -o allure-report",
  "allure:open": "npx allure open allure-report",
  "allure:serve": "npx allure serve allure-results"
}
```

Explicação rápida:
- `test:allure` executa os testes (com o reporter configurado gravando em `allure-results`).
- `allure:generate` gera o site estático em `allure-report` a partir de `allure-results`.
- `allure:open` abre o relatório gerado no navegador.
- `allure:serve` gera e serve o relatório automaticamente (útil para checagens rápidas).

**5) Exemplo completo de fluxo (PowerShell)**
```powershell
# 1) Executar testes (gera artefatos em "allure-results")
npx playwright test

# 2) Gerar relatório estático
npx allure generate allure-results --clean -o allure-report

# 3) Abrir relatório no navegador
npx allure open allure-report

# OU (servidor temporário)
npx allure serve allure-results
```

**6) Anexando screenshots / vídeos / logs**
- Configure captura automática no `playwright.config.js` (`screenshot`, `video`). Os arquivos gerados na pasta padrão serão referenciados pelo `allure-playwright`.
- Para anexos manuais em testes, pode-se usar a API do Allure ou do Playwright para anexar arquivos (depende do adaptador). O `allure-playwright` já insere steps e anexos básicos automaticamente.

**7) Observações e melhores práticas**
- Limpe `allure-results` antes de gerar novo relatório quando fizer execuções locais repetidas (`--clean`).
- Mantenha `allure-report` gerado fora do controle de versão (adicione ao `.gitignore`).
- Para CI, gere o relatório via script e publique os artefatos ou use um job para servir os relatórios.