import { Request, Response } from "express";
import amazonScrapingFunction from "../services/amazon/AmazonScraping";


export default async function amazonScraping(req: Request, res: Response) {
    if (!req.params.produto) {
        return res.status(400).json({
            message: 'Produto não informado'
        });
    }

    var { produto } = req.params;

    var produtoFormatado = produto.toLowerCase().replace(' ', '+');
    
    const valores = await amazonScrapingFunction(produtoFormatado);

    res.status(200).json({
        data: {
            produto: produto,
            valores: valores
        }
    });
}