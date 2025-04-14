import { MigrationInterface, QueryRunner } from "typeorm";

export class BackendMigration1744581246308 implements MigrationInterface {
    name = 'BackendMigration1744581246308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "price" numeric NOT NULL, "stock" integer NOT NULL, "imageUrl" character varying, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fdb2f3ad8115da4c7718109a6eb" UNIQUE ("email"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "totalAmount" integer NOT NULL, "quantity" integer NOT NULL, "status" character varying NOT NULL, "wompiTransactionId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, "customerId" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deliveries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "trackingNumber" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "transactionId" uuid, CONSTRAINT "REL_e070c3b27ee2b3f2097b9c6eb5" UNIQUE ("transactionId"), CONSTRAINT "PK_a6ef225c5c5f0974e503bfb731f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_5642b5bed5c9404a1424df580f1" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_52a272e6c6a006922bc80d7e197" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deliveries" ADD CONSTRAINT "FK_e070c3b27ee2b3f2097b9c6eb58" FOREIGN KEY ("transactionId") REFERENCES "transactions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deliveries" DROP CONSTRAINT "FK_e070c3b27ee2b3f2097b9c6eb58"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_52a272e6c6a006922bc80d7e197"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_5642b5bed5c9404a1424df580f1"`);
        await queryRunner.query(`DROP TABLE "deliveries"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
