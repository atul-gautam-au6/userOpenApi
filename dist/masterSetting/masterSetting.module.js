"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterSettingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const category_controller_1 = require("./controller/category.controller");
const criticalhistory_controller_1 = require("./controller/criticalhistory.controller");
const criticalmedicalcondition_controller_1 = require("./controller/criticalmedicalcondition.controller");
const healthcondition_controller_1 = require("./controller/healthcondition.controller");
const location_controller_1 = require("./controller/location.controller");
const logo_controller_1 = require("./controller/logo.controller");
const medicines_controller_1 = require("./controller/medicines.controller");
const mood_controller_1 = require("./controller/mood.controller");
const relationMapping_controller_1 = require("./controller/relationMapping.controller");
const specialization_controller_1 = require("./controller/specialization.controller");
const treatment_controller_1 = require("./controller/treatment.controller");
const category_schema_1 = require("./schema/category.schema");
const criticalhistory_1 = require("./schema/criticalhistory");
const criticalmedicalcondition_1 = require("./schema/criticalmedicalcondition");
const healthcondition_schema_1 = require("./schema/healthcondition.schema");
const location_schema_1 = require("./schema/location.schema");
const logo_schema_1 = require("./schema/logo.schema");
const medicines_schema_1 = require("./schema/medicines.schema");
const mood_schema_1 = require("./schema/mood.schema");
const relation_schema_1 = require("./schema/relation.schema");
const specialization_schema_1 = require("./schema/specialization.schema");
const treatment_schema_1 = require("./schema/treatment.schema");
const category_service_1 = require("./services/category.service");
const criticahistory_service_1 = require("./services/criticahistory.service");
const criticalmedicalcondition_service_1 = require("./services/criticalmedicalcondition.service");
const healthcondition_service_1 = require("./services/healthcondition.service");
const location_service_1 = require("./services/location.service");
const logo_service_1 = require("./services/logo.service");
const medicines_service_1 = require("./services/medicines.service");
const mood_service_1 = require("./services/mood.service");
const relation_service_1 = require("./services/relation.service");
const specialization_service_1 = require("./services/specialization.service");
const treatment_service_1 = require("./services/treatment.service");
let MasterSettingModule = class MasterSettingModule {
};
MasterSettingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: 'location',
                    schema: location_schema_1.default,
                },
                {
                    name: 'relation',
                    schema: relation_schema_1.default,
                },
                {
                    name: 'specialization',
                    schema: specialization_schema_1.default,
                },
                {
                    name: 'category',
                    schema: category_schema_1.default,
                },
                {
                    name: 'logo',
                    schema: logo_schema_1.default,
                },
                {
                    name: 'mood',
                    schema: mood_schema_1.default,
                },
                {
                    name: 'criticalmedicalcondition',
                    schema: criticalmedicalcondition_1.default,
                },
                {
                    name: 'criticalhistory',
                    schema: criticalhistory_1.default,
                },
                {
                    name: 'healthcondition',
                    schema: healthcondition_schema_1.default,
                },
                {
                    name: 'Treatment',
                    schema: treatment_schema_1.default,
                },
                {
                    name: 'medicines',
                    schema: medicines_schema_1.default,
                },
            ]),
        ],
        providers: [
            location_service_1.LocationService,
            relation_service_1.RelationService,
            category_service_1.CategoryService,
            logo_service_1.LogoService,
            specialization_service_1.SpecializationService,
            mood_service_1.MoodService,
            criticalmedicalcondition_service_1.criticalmedicalconditionSevice,
            criticahistory_service_1.CriticalHistorySevice,
            healthcondition_service_1.HealthConditionService,
            treatment_service_1.TreatmentService,
            medicines_service_1.MedicinesService,
        ],
        controllers: [
            location_controller_1.LocationController,
            relationMapping_controller_1.RelationController,
            category_controller_1.CategoryController,
            logo_controller_1.LogoController,
            specialization_controller_1.SpecializationController,
            mood_controller_1.MoodController,
            criticalmedicalcondition_controller_1.CriticalMedicalConditionController,
            criticalhistory_controller_1.CriticalHistoryController,
            healthcondition_controller_1.HealthConditionController,
            treatment_controller_1.TreatmentController,
            medicines_controller_1.MedicineController,
        ],
        exports: [
            location_service_1.LocationService,
            relation_service_1.RelationService,
            category_service_1.CategoryService,
            logo_service_1.LogoService,
            mood_service_1.MoodService,
            criticalmedicalcondition_service_1.criticalmedicalconditionSevice,
            criticahistory_service_1.CriticalHistorySevice,
            healthcondition_service_1.HealthConditionService,
            treatment_service_1.TreatmentService,
        ],
    })
], MasterSettingModule);
exports.MasterSettingModule = MasterSettingModule;
//# sourceMappingURL=masterSetting.module.js.map