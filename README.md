# Webscraping for Pricing
> This is a project for completion of course work of Brazilian University **Unicesumar**, also most of documentation is in Brazilian Portuguese. However it is ready for production.

## Como instalar?
```bash
$ npm install
```

## Uso da API de exemplo?
```bash
$ npm run build
$ cd example/
$ npm install
$ node index.js
```

## Comando para rodar no modo CLI
```bash
$ ts-node src/cli.ts
```

## Usando como biblioteca
Esse software pode ser usado como biblioteca em outros sistema, o uso é bastante simples, está disponível alguns parâmetros.

| parâmetros       | tipos              | descrição                                                                            |
|------------------|--------------------|--------------------------------------------------------------------------------------|
| ecommerceOptions | Array<String>      | Array contendo nome dos web scrapping que deseja usar, contido na pasta e-commerce   |
| searchFor        | String             | Nome dos produtos a serem pesquisados, podendo ser múltiplos usando ; para separação |
| restrictName     | Boolean [optional] | Limita a pesquisa somente items fornecido pelo `searchFor`, ignorando similares        |
