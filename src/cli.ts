import prompts from "prompts";
import ecommerces from "./ecommerce/index";
import writeXLSX from "./writeXLSX";
import tccWebScrapping from "./index";

/**
 * Iniciar CLI interface
 */
async function init() {
  const stores = Object.keys(ecommerces);

  const { ecommerceOptions, output, searchFor, restrictName } = await prompts([
    {
      instructions: false,
      type: "multiselect",
      name: "ecommerceOptions",
      message: "Selecione os e-commerces",
      choices: stores.map((x) => ({ title: x, value: x, selected: true })),
      min: 1,
      hint: "- Aperte espaço para selecionar. Enter para continuar",
    },
    {
      initial: "Tênis Nike; Tênis Adidas",
      type: "text",
      name: "searchFor",
      message: `Qual nome do produto que deseja procurar? Para múltiplos use ;`,
    },
    {
      initial: false,
      type: "toggle",
      name: "restrictName",
      message: "Ignorar produtos similares?",
      active: "sim",
      inactive: "não",
    },
    {
      type: "select",
      name: "output",
      message: "Selecione um formato para saida",
      choices: [
        { title: "Excel", description: "Gerar arquivo excel", value: "xlsx" },
        { title: "JSON", description: "Saida JSON no console", value: "json" },
      ],
      initial: 0,
    },
  ]);

  let fileXLSX;
  if (output === "xlsx") {
    const { file } = await prompts<string>({
      initial: "Relatório",
      type: "text",
      name: "file",
      message: `Qual nome do arquivo que será gerado?`,
      format: (val: string) => `${val}.xlsx`,
    });

    fileXLSX = file;
  }

  console.info("Iniciando pesquisa...\n");
  const result = await tccWebScrapping({ ecommerceOptions, searchFor, restrictName });

  if (fileXLSX) {
    writeXLSX(result, fileXLSX);
  } else {
    console.log(result);
  }
}

init().catch(console.error);
