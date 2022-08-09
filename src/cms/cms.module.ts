import { Module } from "@nestjs/common";
import { CmsService } from "./service/cms.service";
import { CmsController } from "./controller/cms.controller";
import { MongooseModule } from "@nestjs/mongoose";
import cmsSchema from "./schema/cms.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "cms",
        schema: cmsSchema,
      },
    ]),
  ],
  providers: [CmsService],
  controllers: [CmsController],
  exports: [CmsService],
})
export class CmsModule {}
