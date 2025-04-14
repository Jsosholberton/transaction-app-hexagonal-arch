import { setSeederFactory } from "typeorm-extension";
import { ProductModel } from "../models/product.model";

export default setSeederFactory(ProductModel, (faker) => {
  const product = new ProductModel();
  product.name = faker.commerce.productName();
  product.price = parseFloat(faker.commerce.price());
  product.description = faker.commerce.productDescription();
  product.imageUrl = faker.image.url({ height: 500, width: 500 });
  product.stock = faker.number.int({ min: 10, max: 100 });

  return product;
});