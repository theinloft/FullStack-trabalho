import { Request, Response } from "express";
import { PedidoService } from "../service/pedido-service";
import { ok } from "assert";

export class PedidoController {
    private service: PedidoService;

    constructor(service: PedidoService) {
        this.service = service;
    }

     inserir = async(req: Request, res: Response): Promise<void> => {
        const pedido = req.body;
        
        try {
            const novoPedido = await this.service.inserir(pedido);
            res.status(201).json(novoPedido);
        }
        catch(err: any) {
            res.status(err.id).json({ error: err.msg});
        }
    }

    listar = async (_req: Request, res: Response): Promise<void> => {
        const listaPedidos = await this.service.listar();
        res.json(listaPedidos);
    }

    buscarPorId = async (req: Request, res: Response): Promise<void> => {
        const id = (req.params.id as string);

        try{
            const pedido = await this.service.buscarPorId(id);
            res.json(pedido);

        } catch (err: any) {
            res.status(err.id).json({ error: err.msg});            
        }
    }

    // atualizar = async (req: Request, res: Response): Promise<void> => {
    //     const id = +req.params.id;
    //     let produto = req.body;
    //     try{
    //         res.json(await this.service.atualizar(id, produto));
    //     } catch(err: any) {
    //         res.status(err.id).json(err);
    //     }
    // }

    // deletar = async (req: Request, res: Response): Promise<void> => {
    //     const id = +req.params.id;
    //     try {
    //         res.json(await this.service.deletar(id));
    //     } catch(err: any) {
    //         res.status(err.id).json(err);
    //     }
    // }
}