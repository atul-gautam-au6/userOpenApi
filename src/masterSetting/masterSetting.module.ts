import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryController } from './controller/category.controller';
import { CriticalHistoryController } from './controller/criticalhistory.controller';
import { CriticalMedicalConditionController } from './controller/criticalmedicalcondition.controller';
import { HealthConditionController } from './controller/healthcondition.controller';
import { LocationController } from './controller/location.controller';
import { LogoController } from './controller/logo.controller';
import { MedicineController } from './controller/medicines.controller';
import { MoodController } from './controller/mood.controller';
import { RelationController } from './controller/relationMapping.controller';
import { SpecializationController } from './controller/specialization.controller';
import { TreatmentController } from './controller/treatment.controller';
import categorySchema from './schema/category.schema';
import criticalhistorySchema from './schema/criticalhistory';
import criticalmedicalconditionSchema from './schema/criticalmedicalcondition';
import healthConditionSchema from './schema/healthcondition.schema';
import locationSchema from './schema/location.schema';
import logoSchema from './schema/logo.schema';
import medicinesSchema from './schema/medicines.schema';
import moodSchema from './schema/mood.schema';
import relationSchema from './schema/relation.schema';
import specializationSchema from './schema/specialization.schema';
import TreatmentSchema from './schema/treatment.schema';

import { CategoryService } from './services/category.service';
import { CriticalHistorySevice } from './services/criticahistory.service';
import { criticalmedicalconditionSevice } from './services/criticalmedicalcondition.service';
import { HealthConditionService } from './services/healthcondition.service';
import { LocationService } from './services/location.service';
import { LogoService } from './services/logo.service';
import { MedicinesService } from './services/medicines.service';
import { MoodService } from './services/mood.service';
import { RelationService } from './services/relation.service';
import { SpecializationService } from './services/specialization.service';
import { TreatmentService } from './services/treatment.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'location',
        schema: locationSchema,
      },
      {
        name: 'relation',
        schema: relationSchema,
      },
      {
        name: 'specialization',
        schema: specializationSchema,
      },
      {
        name: 'category',
        schema: categorySchema,
      },
      {
        name: 'logo',
        schema: logoSchema,
      },
      {
        name: 'mood',
        schema: moodSchema,
      },
      {
        name: 'criticalmedicalcondition',
        schema: criticalmedicalconditionSchema,
      },
      {
        name: 'criticalhistory',
        schema: criticalhistorySchema,
      },
      {
        name: 'healthcondition',
        schema: healthConditionSchema,
      },
      {
        name: 'Treatment',
        schema: TreatmentSchema,
      },
      {
        name: 'medicines',
        schema: medicinesSchema,
      },
    ]),
  ],
  providers: [
    LocationService,
    RelationService,
    CategoryService,
    LogoService,
    SpecializationService,
    MoodService,
    criticalmedicalconditionSevice,
    CriticalHistorySevice,
    HealthConditionService,
    TreatmentService,
    MedicinesService,
  ],
  controllers: [
    LocationController,
    RelationController,
    CategoryController,
    LogoController,
    SpecializationController,
    MoodController,
    CriticalMedicalConditionController,
    CriticalHistoryController,
    HealthConditionController,
    TreatmentController,
    MedicineController,
  ],
  exports: [
    LocationService,
    RelationService,
    CategoryService,
    LogoService,
    MoodService,
    criticalmedicalconditionSevice,
    CriticalHistorySevice,
    HealthConditionService,
    TreatmentService,
  ],
})
export class MasterSettingModule {}
