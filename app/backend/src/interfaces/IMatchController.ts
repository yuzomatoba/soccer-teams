import { Request, Response } from 'express';

export interface IMatchController {
  findAll(req: Request, res: Response): Promise<Response | void>;
  endMatch(req: Request, res: Response): Promise<Response>;
  matchInProgress(req: Request, res: Response): Promise<Response>;
  newMatch(req: Request, res: Response): Promise<Response | void>;
}
