import bodyParser from 'body-parser';
import './util/moduleAlias';
import { Server } from '@overnightjs/core';
import { StandingsController } from './controllers/standings';
import { Application } from 'express';

export class SetupServer extends Server {
  constructor(private port = 3000) {
    super();
  }

  private setupExpress(): void {
    this.app.use(bodyParser.json());
  }

  private setupControllers(): void {
    const standingsController = new StandingsController();
    this.addControllers([standingsController]);
  }

  public getApp(): Application {
    return this.app;
  }

  public init(): void {
    this.setupExpress();
    this.setupControllers();
  }
}
