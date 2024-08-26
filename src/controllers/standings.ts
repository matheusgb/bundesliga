import { Controller, Get } from '@overnightjs/core';
import { AddPerformanceField } from '@src/services/standings';
import { Request, Response } from 'express';

@Controller('standings')
export class StandingsController {
  @Get('')
  public async getStandings(_: Request, res: Response) {
    const performanceService = new AddPerformanceField();
    const response = await performanceService.calculatePerformanceField();
    res.send(response);
  }
}
