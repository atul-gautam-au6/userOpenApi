"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourcesService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require('nodemailer');
let ResourcesService = class ResourcesService {
    async sendMail(mailOptions) {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILER_HOST,
            service: process.env.MAILER_SERVICE,
            port: 587,
            secure: false,
            tls: {
                rejectUnauthorized: false,
            },
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD,
            },
        });
        return await transporter.sendMail(mailOptions);
    }
    async sendMailjet() {
    }
    async paginationUsable(page, size, search) {
        if (!page || page == 0) {
            page = 1;
        }
        if (!search) {
            search = '';
        }
        if (!size || size < 10) {
            size = 10;
        }
        const skip = (page - 1) * size;
        return {
            limit: size,
            skip,
            search,
        };
    }
    async otpService(otp) {
        const temp = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
    <div style="margin:50px auto;width:70%;padding:20px 0">
      <div style="border-bottom:1px solid #eee">
        <a
          href=""
          style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"
        >
          THIP-The healthy india project
        </a>
      </div>
      <p style="font-size:1.1em">Hi,</p>
      <p>Use the following OTP to complete your Sign Up procedures</p>
      <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">
        ${otp}
      </h2>
      <p style="font-size:0.9em;">
        Regards,
        <br />
        THIP
      </p>
      <hr style="border:none;border-top:1px solid #eee" />
      <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
        <p>THIP-The healthy india project</p>
        <p>Wellness and Fitness Services</p>
        <p>85078-85079</p>
      </div>
    </div>
  </div>`;
        return temp;
    }
    async generateNotification() {
        const seq = (Math.floor(Math.random() * 10000) + 10000)
            .toString()
            .substring(1);
        return seq;
    }
};
ResourcesService = __decorate([
    (0, common_1.Injectable)()
], ResourcesService);
exports.ResourcesService = ResourcesService;
//# sourceMappingURL=resources.service.js.map