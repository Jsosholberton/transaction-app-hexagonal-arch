import { DataSource } from "typeorm";
import { runSeeders, Seeder } from "typeorm-extension";

import productFactory from "../factories/product.factory";
import ProductSeeder from "./product.seeder";

export default class InitSeeder implements Seeder {

  public async run(
    dataSource: DataSource,
  ): Promise<any> {

    await runSeeders(dataSource, {
      seeds: [ProductSeeder],
      factories: [productFactory],
    });
  }
}