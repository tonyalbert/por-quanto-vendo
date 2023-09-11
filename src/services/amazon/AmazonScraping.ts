import axios from 'axios';
import cheerio from 'cheerio';

const amazonScrapingFunction = async function scrapAmazonProducts(pesquisa: string) {
  try {
    const url: string = `https://www.amazon.com.br/s?k=${pesquisa}`;

    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const valores: number[] = [];

    $('.a-price-whole').each((index, element) => {
      if (index < 5) {
        const valorStr = $(element).text().replace('.', '');
        const valor = parseInt(valorStr);
        console.log(valor);
        valores.push(valor);
      }
    });

    const valorTotal = valores.reduce((a, b) => a + b, 0);
    const media = valorTotal / valores.length;

    const maiorValor = valores.sort((a, b) => b - a)[0];
    const menorValor = valores.sort((a, b) => a - b)[0];

    return {
      media: media.toFixed(2),
      maiorValor: maiorValor.toFixed(2),
      menorValor: menorValor.toFixed(2),
      produtosObservados: valores.length
    };

  } catch (error) {
    console.error('Erro ao fazer a solicitação HTTP:', error);
  }
}

export default amazonScrapingFunction