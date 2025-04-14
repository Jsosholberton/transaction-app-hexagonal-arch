import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DeliveryRepository } from "../../../application/ports/delivery.repository";
import { Delivery } from "../../../domain/entities/delivery.entity";
import { DeliveryModel } from "../models/delivery.model";

@Injectable()
export class DeliveryRepositoryAdapter implements DeliveryRepository {
  constructor(
    @InjectRepository(DeliveryModel)
    private readonly repo: Repository<DeliveryModel>,
  ) {
  }

  async create(delivery: Delivery): Promise<Delivery> {
    const model = this.repo.create(DeliveryModel.fromDomain(delivery));

    const saved = await this.repo.save(model);

    return DeliveryModel.toDomain(saved);
  }

  async findByTransactionId(id: string): Promise<Delivery | null> {
    const delivery = await this.repo.findOneBy({ id });

    if (!delivery) return null;

    return DeliveryModel.toDomain(delivery);
  }
}
