# Projeto de Testes E2E com Playwright, Page Object Model e Allure Report

## Visão Geral

Este repositório contém um projeto de exemplo para testes end-to-end (E2E) utilizando **Playwright** com **JavaScript**, aplicando o padrão **Page Object Model (POM)** para organização e reutilização de ações e seletores, e gerando relatórios detalhados com **Allure Report**.

### Objetivos
- Demonstrar uma estrutura escalável de automação com Playwright usando POM.
- Facilitar a manutenção e evolução dos testes com separação de responsabilidades.
- Gerar relatórios ricos com evidências, como *steps*, screenshots e vídeos (em falhas).

---

## Tecnologias e Ferramentas

- **Playwright**: Framework de automação para testes E2E multi-browser.
- **JavaScript (Node.js)**: Linguagem base do projeto.
- **Allure Report**: Relatórios HTML com detalhamento de execução, anexos e histórico.

---

## Estrutura do Projeto

- **`package.json`**: Dependências e scripts (execução dos testes e geração de relatórios).
- **`playwright.config.js`**: Configurações do Playwright (timeouts, *reporters*, browsers, evidências, etc.).
- **`pages/`**: Implementação do padrão Page Object.
  - **`BasePage.js`**: Classe base com utilitários, ações e elementos comuns (ex.: acessar menus, validar mensagens...).
  - **`LoginPage.js`**: Ações, validações e elementos relacionadas ao fluxo de login.
  - **`ProductPage.js`**: Ações, validações e elementos relacionadas a produtos.
- **`tests/e2e/`**: Testes E2E.
  - **`login.spec.js`**: Cenários do fluxo de login.
  - **`produtos.spec.js`**: Cenários da funcionalidade de produtos.

---

## Organização dos seletores

**Obs:** Atualmente, os seletores estão definidos dentro de cada classe Page Object em `pages/`. Em aplicações maiores, com grande volume de seletores, é recomendado criar uma estrutura dedicada apenas a seletores (por página), por exemplo em uma pasta `locators/` ou `selectors/`. Isso melhora a visualização e manutenção, evitando que os arquivos de *page* fiquem extensos e com responsabilidades misturadas.

Exemplo de estrutura:
- `pages/`
  - `LoginPage.js`
- `locators/`
  - `LoginLocators.js`

Exemplo de arquivo de seletores (`locators/LoginLocators.js`):
```js
export class LoginLocators {
  constructor(page) {
    this.inputEmail = page.locator('form', { hasText: 'Login' }).getByPlaceholder('Email Address');
    this.inputSenha = page.getByRole('textbox', { name: 'Password' });
    this.btnLogin = page.getByRole('button', { name: 'Login' });
    this.btnLogout = page.getByRole('link', { name: ' Logout' });
    this.msgErroLogin = page.locator('form', { hasText: 'Your email or password is incorrect!' });
  }
}
```

Exemplo de uso no `pages/LoginPage.js`:
```js
import { LoginLocators } from '../locators/LoginLocators';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.locators = new LoginLocators(page);
  }

  async realizarLogin(email, senha) {
    await this.locators.inputEmail.fill(email);
    await this.locators.inputSenha.fill(senha);
    await this.locators.btnLogin.click();
  }
}
```

---

## Pré-requisitos

- **Node.js**: recomendado Node >= 16.
- **npm** (ou `pnpm`/`yarn` conforme preferência).
- **Java (JDK)**: recomendado JDK >= 8 (necessário para uso do Allure CLI em alguns ambientes).

---

## Instalação (Windows PowerShell)

```powershell
# Instalar dependências do projeto
npm install

# Instalar browsers do Playwright
npx playwright install
```

---

## Executando os testes

### Executar toda a suíte
```powershell
npx playwright test
```

### Executar um spec específico
```powershell
npx playwright test tests/e2e/login.spec.js
```

### Executar em modo debug (inspeção passo a passo)
```powershell
npx playwright test --debug
```

### Executar com navegador aberto (headed)
```powershell
npx playwright test --headed
```

### Abrir relatório HTML padrão do Playwright
```powershell
npx playwright show-report
```

---

## Como os testes estão organizados (Page Object Model)

Neste projeto:
- Os testes em `tests/e2e/` descrevem cenários e validações.
- As páginas em `pages/` encapsulam interações com a UI, como preenchimento de campos, cliques e validações específicas.
- Isso reduz duplicação e facilita mudanças na UI, pois ajustes tendem a ser concentrados no Page Object.

### Exemplo de Page (`pages/LoginPage.js`)
```js
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage {
    constructor(page) {
        this.page = page;

        // Seletores da página de login (ex: input de email, senha, botões, mensagens de erro, etc.)

        this.inputEmail = page.locator('form', { hasText: 'Login' }).getByPlaceholder('Email Address');
        this.inputSenha = page.getByRole('textbox', { name: 'Password' });
        this.btnLogin = page.getByRole('button', { name: 'Login' });
        this.btnLogout = page.getByRole('link', { name: ' Logout' });
        this.msgErroLogin = page.locator('form', { hasText: 'Your email or password is incorrect!' });
    }

    // Métodos para interagir com a página de login (ex: preencher campos, clicar em botões, validar mensagens, etc.)

    async preencherEmail(email) {
        await expect(this.inputEmail).toBeVisible();
        await this.inputEmail.fill(email);
    }

    async preencherSenha(senha) {
        await this.inputSenha.fill(senha);
    }

    async clicarBotaoLogin() {
        await this.btnLogin.click();
    }

    async verificarLoginComSucesso() {
        await expect(this.btnLogout).toBeVisible();
    }

    async verificarMensagemErro() {
        await expect(this.msgErroLogin).toBeVisible();
    }

    // Método que combina as ações de login, para facilitar a reutilização nos testes

    async realizarLogin(email, senha) {
        const basePage = new BasePage(this.page);
        await basePage.acessarLogin();
        await expect(this.inputEmail).toBeVisible();
        await this.inputEmail.fill(email);
        await this.inputSenha.fill(senha);
        await this.btnLogin.click();
    }
}
```

### Exemplo de Test (`tests/e2e/login.spec.js`)
```js
import { test, expect } from '@playwright/test';
import { BasePage, LoginPage } from '../../pages/BasePage'

test.describe('Login', () => {

  // Executado antes de cada teste

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Testes das funcionalidades de login, como login com sucesso, login com dados inválidos, etc.

  test('Realizar login com sucesso', async ({ page }) => {

    // Instância da página de login, para utilizar seus métodos e seletores
    const loginPage = new LoginPage(page);
    
    // Método reutilizável para realizar o login e verificar o sucesso
    await loginPage.realizarLogin('erro@erro.com', 'senha-errada');
    await loginPage.verificarLoginComSucesso();
  });

  test('Realizar login com dados inválidos', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    // Método reutilizável para realizar o login e verificar a mensagem de erro
    await loginPage.realizarLogin('erro@erro.com', 'senha-errada');
    await loginPage.verificarMensagemErro();
  });

});
```

---

## Adicionando novos testes

1. Crie um novo arquivo em `tests/e2e/` terminando com `.spec.js`.
2. Reutilize Pages existentes sempre que possível.
3. Caso surjam novos fluxos, crie/estenda classes em `pages/`.
4. Use descrições claras em `describe` e `test` para melhorar legibilidade e relatórios.

---

## Allure Report (instalação e uso)

### O que é
O **Allure Report** é uma ferramenta de relatórios que gera páginas HTML ricas a partir dos resultados de execução, incluindo:
- organização por suíte e caso de teste
- *steps* e evidências
- anexos (screenshots, vídeos e logs)
- detalhamento de falhas

---

### 1) Instalar Allure CLI

Opção local no projeto:
```powershell
npm install --save-dev allure-commandline
```

Ou global (caso prefira usar `allure` diretamente):
```powershell
npm install -g allure-commandline
```

---

### 2) Instalar adaptador Allure para Playwright
```powershell
npm install --save-dev allure-playwright
```

---

### 3) Configurar o `playwright.config.js`

Exemplo mínimo:
```js
module.exports = {
  reporter: [['list'], ['allure-playwright']],
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  }
};
```

---

### 4) Scripts recomendados no `package.json`

```json
"scripts": {
  "test": "npx playwright test",
  "test:allure": "npx playwright test",
  "allure:generate": "npx allure generate allure-results --clean -o allure-report",
  "allure:open": "npx allure open allure-report",
  "allure:serve": "npx allure serve allure-results"
}
```

---

### 5) Fluxo completo (PowerShell)

```powershell
# 1) Executar testes (gera artefatos em "allure-results")
npx playwright test

# 2) Gerar relatório estático
npx allure generate allure-results --clean -o allure-report

# 3) Abrir relatório no navegador
npx allure open allure-report

# Alternativa (gera e serve automaticamente)
npx allure serve allure-results
```

---

### 6) Evidências (screenshots e vídeos)
- A captura automática é configurada em `playwright.config.js` via `use.screenshot` e `use.video`.
- O `allure-playwright` referencia automaticamente os artefatos gerados e os associa aos testes.

---

### 7) Boas práticas
- Use `--clean` ao gerar o relatório para evitar misturar resultados antigos.
- Adicione `allure-results/` e `allure-report/` ao `.gitignore` para não versionar artefatos.
- Em CI, execute os testes, gere os relatórios e publique os artefatos como evidência do pipeline.

## Links úteis
- [Playwright Page Object Model - Site Oficial](https://playwright.dev/docs/pom)
- [Mastering Playwright: Best Practices for Web Automation with the Page Object Model - Medium](https://medium.com/%40lucgagan/mastering-playwright-best-practices-for-web-automation-with-the-page-object-model-3541412b03d1)