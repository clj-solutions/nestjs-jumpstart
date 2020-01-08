import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUser1578474500828 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: "created_at",
            type: "timestamptz",
            default: "now()",
            isNullable: false
          },
          {
            name: "updated_at",
            type: "timestamptz",
            default: "now()",
            isNullable: false
          },
          {
            name: "email",
            type: "varchar",
            isNullable: false,
            isUnique: true
          },
          {
            name: "first_name",
            type: "varchar",
            isNullable: false
          },
          {
            name: "last_name",
            type: "varchar",
            isNullable: false
          },
          {
            name: "passwordsHash",
            type: "varchar",
            isNullable: false
          }
        ]
      }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable("users")
    }

}
