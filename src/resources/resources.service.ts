import { Injectable } from '@nestjs/common';
import { SentMessageInfo, SendMailOptions } from 'nodemailer';
import mailjet from 'node-mailjet';

const nodemailer = require('nodemailer');

@Injectable()
export class ResourcesService {
  /**
   *
   * @param mailOptions
   * @returns
   */
  async sendMail(mailOptions: SendMailOptions): Promise<SentMessageInfo> {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      service: process.env.MAILER_SERVICE,
      port: 587,
      secure: false, // true for 465, false for other ports
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

  /**
   *
   * @param param0
   * @returns
   */

  async sendMailjet(): Promise<any> {
    // const request = await mailjet;
    //   .connect(`${process.env.mailjetSTR1}`, `${process.env.mailjetSTR2}`)
    //   .post('send', { version: 'v3.1' })
    //   .request({
    //     Messages: [
    //       {
    //         From: {
    //           Email: `${process.env.mailjetEmail}`,
    //           Name: `${process.env.mailjetName}`,
    //         },
    //         To: [
    //           {
    //             Email: `${email}`,
    //             Name: `${name}`,
    //           },
    //         ],
    //         // Subject: `${Subject}`,
    //         // TextPart: `${textpart}`,
    //         // HTMLPart: `${htmlpart}` || `${msg}`,
    //       },
    //     ],
    //   });
    // // (email = ''), (name = '');
    // return request;
  }

  /**
   * @description pagination default data
   * @param page page number
   * @param size size of page
   * @param search search any key word
   * @returns size, skip, search
   */
  async paginationUsable(
    page: number,
    size: number,
    search: string,
  ): Promise<Object> {
    if (!page || page == 0) {
      page = 1;
    }
    if (!search) {
      search = '';
    }
    if (!size || size < 10) {
      size = 10;
    }
    // const limit = parseInt(size);
    const skip = (page - 1) * size;
    return {
      limit: size,
      skip,
      search,
    };
  }

  /**
   *
   * @param otp randoom 4 digit number
   * @returns ui for otp
   */
  async otpService(otp: number): Promise<Object> {
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

  async generateNotification(): Promise<Object> {
    const seq = (Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1);

    return seq;
  }
}
