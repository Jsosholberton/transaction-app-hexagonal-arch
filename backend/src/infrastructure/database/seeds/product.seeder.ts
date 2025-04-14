import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { ProductModel } from "../models/product.model";

export default class ProductSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(ProductModel);

    const data = {
      name: "Product 1",
      price: 100,
      description: "Description for product 1",
      stock: 10,
      imageUrl: "https://picsum.photos/500/500",
    } as ProductModel;

    const product = await repository.findOneBy({ name: data.name });

    // Insert only one record with this username.
    if (!product) {
      await repository.insert([data]);
    }

    // ---------------------------------------------------

    const userFactory = await factoryManager.get(ProductModel);

    // Insert only one record.
    await userFactory.save();

    // Insert many records in database.
    await userFactory.saveMany(40);
  }
}