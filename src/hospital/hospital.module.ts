import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HospitalController } from "./controller/hospital.controller";
import { HospitalService } from "./services/hospital.service";
import hospitalSchema from "./schemas/hospital.schema";
import { ResourcesService } from "src/resources/resources.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "hospital",
        schema: hospitalSchema,
      },
    ]),
  ],
  providers: [HospitalController, HospitalService, ResourcesService],
  controllers: [HospitalController],
  exports: [HospitalService],
})
export class HospitalModule {}
