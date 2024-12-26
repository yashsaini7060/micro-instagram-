import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateUserAndPost1640000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "256",
          },
          {
            name: "mobileNumber",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "address",
            type: "text",
          },
          {
            name: "postCount",
            type: "int",
            default: 0,
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "post",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "title",
            type: "text",
          },
          {
            name: "description",
            type: "text",
          },
          {
            name: "userId",
            type: "int",
          },
          {
            name: "images",
            type: "text",
            isArray: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "post",
      new TableForeignKey({
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("post");
    await queryRunner.dropTable("user");
  }
}
