import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { paginationUsable } from 'src/config/email.validator';
import { Medicines } from '../interface/medicines.interface';

@Injectable()
export class MedicinesService {
  constructor(
    @InjectModel('medicines') private readonly MedicinesModal: Model<Medicines>,
  ) {}

  async insertMedicine(
    MedicineName: string,
    Manufacturer: string,
    Salt: string,
    status: boolean,
  ) {
    console.log(MedicineName, 'iside servie');
    try {
      const newMedicine = new this.MedicinesModal({
        MedicineName: MedicineName,
        Manufacturer: Manufacturer,
        Salt: Salt,
        status: status,
      });

      await newMedicine.save();
      return newMedicine;
    } catch (error) {
      throw new NotFoundException('could not insert');
    }
  }

  async getAllMedicines(page: number, pageSize: number) {
    const { limit, skip, search } = paginationUsable(page, pageSize, '');

    try {
      const MedicineList = await this.MedicinesModal.find({})
        .sort({ MedicineName: 'asc', _id: 'desc' })
        .limit(limit)
        .skip(skip);

      const count = await this.MedicinesModal.count().exec();
      return {
        data: MedicineList,
        TotalCount: count,
      };
    } catch (error) {
      return {};
    }
  }
  async updateMedicine(
    id: string,
    MedicineName: string,
    Manufacturer: string,
    Salt: string,
    status: boolean,
  ) {
    try {
      const updatedMedicine = await this.MedicinesModal.findById(id);
      if (MedicineName) {
        updatedMedicine.MedicineName = MedicineName;
      }
      if (Manufacturer) {
        updatedMedicine.Manufacturer = Manufacturer;
      }
      if (Salt) {
        updatedMedicine.Salt = Salt;
      }
      if (status) {
        updatedMedicine.status = status;
      }
      updatedMedicine.save();
      return updatedMedicine;
    } catch (error) {
      throw new NotFoundException('Could not found Data');
    }
  }
  async getMedicineByid(id: string) {
    const result = await this.MedicinesModal.findById(id);
    return result;
  }
}
