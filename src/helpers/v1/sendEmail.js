const env = require("./env");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const mailer = {
  inboxGmailRegist: (email, codeverify) => {
    try {
      const inboxGmail = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title></title>
          <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
          <style type="text/css">
            body {
              margin: 0;
              padding: 0;
            }
      
            table,
            td,
            tr {
              vertical-align: top;
              border-collapse: collapse;
            }
      
            * {
              line-height: inherit;
            }
      
            a[x-apple-data-detectors="true"] {
              color: inherit !important;
              text-decoration: none !important;
            }
          </style>
          <style type="text/css" id="media-query">
            @media (max-width: 560px) {
              .block-grid,
              .col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
              }
      
              .block-grid {
                width: 100% !important;
              }
      
              .col {
                width: 100% !important;
              }
      
              .col > div {
                margin: 0 auto;
              }
      
              img.fullwidth,
              img.fullwidthOnMobile {
                max-width: 100% !important;
              }
      
              .no-stack .col {
                min-width: 0 !important;
                display: table-cell !important;
              }
      
              .no-stack.two-up .col {
                width: 50% !important;
              }
      
              .no-stack .col.num2 {
                width: 16.6% !important;
              }
      
              .no-stack .col.num3 {
                width: 25% !important;
              }
      
              .no-stack .col.num4 {
                width: 33% !important;
              }
      
              .no-stack .col.num5 {
                width: 41.6% !important;
              }
      
              .no-stack .col.num6 {
                width: 50% !important;
              }
      
              .no-stack .col.num7 {
                width: 58.3% !important;
              }
      
              .no-stack .col.num8 {
                width: 66.6% !important;
              }
      
              .no-stack .col.num9 {
                width: 75% !important;
              }
      
              .no-stack .col.num10 {
                width: 83.3% !important;
              }
      
              .video-block {
                max-width: none !important;
              }
      
              .mobile_hide {
                min-height: 0px;
                max-height: 0px;
                max-width: 0px;
                display: none;
                overflow: hidden;
                font-size: 0px;
              }
      
              .desktop_hide {
                display: block !important;
                max-height: none !important;
              }
            }
          </style>
        </head>
      
        <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: transparent">
          <table
            class="nl-container"
            style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; background-color: transparent; width: 100%"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            width="100%"
            bgcolor="transparent"
            valign="top"
          >
            <tbody>
              <tr style="vertical-align: top" valign="top">
                <td style="word-break: break-word; vertical-align: top" valign="top">
                  <div style="padding-top: 30px; padding-bottom: 30px; background-color: #eaf8f8; overflow: hidden">
                    <div class="block-grid" style="min-width: 320px; max-width: 540px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; width: 100%; background-color: #ffffff">
                      <div style="border-collapse: collapse; display: table; width: 100%; background-color: #ffffff">
                        <div class="col num12" style="min-width: 320px; max-width: 540px; display: table-cell; vertical-align: top; width: 540px">
                          <div style="width: 100% !important">
                            <div
                              style="
                                border-top: 0px solid transparent;
                                border-left: 0px solid transparent;
                                border-bottom: 0px solid transparent;
                                border-right: 0px solid transparent;
                                padding-top: 0px;
                                padding-bottom: 0px;
                                padding-right: 0px;
                                padding-left: 0px;
                              "
                            >
                              <div>
                                <div style="margin-top: 20px; font-family: 'Montserrat'">
                                  <p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 38px; margin: 0"><span style="font-size: 38px; color: #48bdbd">Point Of Sales</span></p>
                                </div>
                              </div>
                              <div>
                                <div style="font-size: 12px; color: #393d47; font-family: 'Montserrat'">
                                  <p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 13px; margin: 0"><span style="font-size: 13px; color: #808080">serving the best food and drink</span></p>
                                </div>
                              </div>
                              <div class="img-container center fixedwidth" align="center">
                                <p align="center" style="letter-spacing: 5px; font-size: 60px; font-family: Montserrat; height: auto; width: 100%; max-width: 351px; display: block" width="351">${codeverify}</p>
                              </div>
      
                              <div>
                                <p style="margin-top: 20px; margin-bottom: -5px; color: #393d47; text-align: center; font-family: Montserrat">
                                  <strong><span style="font-size: 13px">Masukkan code verifikasi ke account POS kamu</span></strong>
                                </p>
                              </div>
      
                              <div>
                                <p style="margin-bottom: 20px; font-family: 'Montserrat'; text-align: center; color: #808080; font-size: 12px">harap untuk tidak membagikan account</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
      `;

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          // ENV
          user: env.EMAILGMAIL,
          pass: env.PASSGMAIL,
        },
      });
      let mailOptions = {
        from: '"Point Of Sales" <no-reply@gmail.com>',
        replyTo: "muhamad.rikoarafi@gmail.com",
        to: email,
        subject: `Register account`,
        html: inboxGmail,
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          res.send("Nodemailer error");
        }
      });
    } catch (error) {
      failed(res, [], "Internal server error");
    }
  },
  inboxChangeEmail: (email) => {
    try {
      const hash = jwt.sign(email, env.JWTREGISTER_USERS);
      const URL = `${env.URLPOSTMAN}/api/v1/users/verify/${hash}`;
      const inboxGmail = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
                    
                    <head>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                        <meta name="viewport" content="width=device-width">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <title></title>
                        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
                        <style type="text/css">
                            body {
                                margin: 0;
                                padding: 0;
                            }
                    
                            table,
                            td,
                            tr {
                                vertical-align: top;
                                border-collapse: collapse;
                            }
                    
                            * {
                                line-height: inherit;
                            }
                    
                            a[x-apple-data-detectors=true] {
                                color: inherit !important;
                                text-decoration: none !important;
                            }
                        </style>
                        <style type="text/css" id="media-query">
                            @media (max-width: 560px) {
                    
                                .block-grid,
                                .col {
                                    min-width: 320px !important;
                                    max-width: 100% !important;
                                    display: block !important;
                                }
                    
                                .block-grid {
                                    width: 100% !important;
                                }
                    
                                .col {
                                    width: 100% !important;
                                }
                    
                                .col>div {
                                    margin: 0 auto;
                                }
                    
                                img.fullwidth,
                                img.fullwidthOnMobile {
                                    max-width: 100% !important;
                                }
                    
                                .no-stack .col {
                                    min-width: 0 !important;
                                    display: table-cell !important;
                                }
                    
                                .no-stack.two-up .col {
                                    width: 50% !important;
                                }
                    
                                .no-stack .col.num2 {
                                    width: 16.6% !important;
                                }
                    
                                .no-stack .col.num3 {
                                    width: 25% !important;
                                }
                    
                                .no-stack .col.num4 {
                                    width: 33% !important;
                                }
                    
                                .no-stack .col.num5 {
                                    width: 41.6% !important;
                                }
                    
                                .no-stack .col.num6 {
                                    width: 50% !important;
                                }
                    
                                .no-stack .col.num7 {
                                    width: 58.3% !important;
                                }
                    
                                .no-stack .col.num8 {
                                    width: 66.6% !important;
                                }
                    
                                .no-stack .col.num9 {
                                    width: 75% !important;
                                }
                    
                                .no-stack .col.num10 {
                                    width: 83.3% !important;
                                }
                    
                                .video-block {
                                    max-width: none !important;
                                }
                    
                                .mobile_hide {
                                    min-height: 0px;
                                    max-height: 0px;
                                    max-width: 0px;
                                    display: none;
                                    overflow: hidden;
                                    font-size: 0px;
                                }
                    
                                .desktop_hide {
                                    display: block !important;
                                    max-height: none !important;
                                }
                            }
                        </style>
                    </head>
                    
                    <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: transparent;">
                        <table class="nl-container" style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse;  background-color: transparent; width: 100%;" cellpadding="0" cellspacing="0" role="presentation" width="100%" bgcolor="transparent" valign="top">
                            <tbody>
                                <tr style="vertical-align: top;" valign="top">
                                    <td style="word-break: break-word; vertical-align: top;" valign="top">
                                        <div style="padding-top:30px; padding-bottom:30px; background-color:#eaf8f8;overflow:hidden">
                                            <div class="block-grid " style="min-width: 320px; max-width: 540px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; width: 100%; background-color: #ffffff;">
                                                <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                                                    <div class="col num12" style="min-width: 320px; max-width: 540px; display: table-cell; vertical-align: top; width: 540px;">
                                                        <div style="width:100% !important;">
                                                            <div style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                                                <div>
                                                                    <div style=" margin-top:20px ; font-family:'Montserrat'">
                                                                        <p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 38px;  margin: 0;"><span style="font-size: 38px; color: #48bdbd;">Point Of Sales</span></p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div style="font-size: 12px; color: #393d47; font-family: 'Montserrat';">
                                                                        <p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 13px;margin: 0;"><span style="font-size: 13px; color: #808080;">serving the best food and drink</span></p>
                                                                    </div>
                                                                </div>
                                                                <div class=" img-container center fixedwidth" align="center" >
                                                                    <img align="center" border="0" src="https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/594595_576305/oke/5482%20%281%29.png"  style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 351px; display: block;" width="351">
                                                                </div>
                                                                
                                                                <div >
                                                                        <p style="margin-top:20px; margin-bottom:-5px; color: #393d47; text-align: center; font-family: Montserrat;"><strong><span style="font-size: 13px;">Klik tombol Activasi untuk mengaktifkan account kamu.</span></strong></p>
                                                                </div>
                                                                
                                                            
                                                                <div >
                                                                        <p style="font-family: 'Montserrat'; text-align: center;  color: #808080; font-size: 12px;">harap untuk tidak membagikan account</p>
                                                                </div>
                                                                <div class="button-container" align="center" style="margin-top:20px; margin-bottom:20px; padding-right:10px;padding-bottom:10px;padding-left:10px;"><a href="${URL}" target="_blank" style="-webkit-text-size-adjust: none; text-decoration: none; display: block; color: #ffffff; background-color: #48bdbd; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: 30%; width: 25%; padding-top: 5px; padding-bottom: 5px; font-family:Montserrat; text-align: center; word-break: keep-all;"><span style="padding-left:5px;padding-right:5px;font-size:13px;display:inline-block;"><span style="font-size: 16px; line-height: 2;  "><span style="font-size: 13px;" >Activasi</span></span></span></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </body>
                    
                    </html>`;
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          // ENV
          user: env.EMAILGMAIL,
          pass: env.PASSGMAIL,
        },
      });
      let mailOptions = {
        from: '"Point Of Sales" <no-reply@gmail.com>',
        replyTo: "muhamad.rikoarafi@gmail.com",
        to: email,
        subject: `Change email`,
        html: inboxGmail,
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          res.send("Nodemailer error");
        }
      });
    } catch (error) {
      failed(res, [], "Internal server error");
    }
  },
  inboxGmailResetPass: (email, codeverify) => {
    try {
      const inboxGmail = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="width=device-width" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <title></title>
          <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
          <style type="text/css">
            body {
              margin: 0;
              padding: 0;
            }
      
            table,
            td,
            tr {
              vertical-align: top;
              border-collapse: collapse;
            }
      
            * {
              line-height: inherit;
            }
      
            a[x-apple-data-detectors="true"] {
              color: inherit !important;
              text-decoration: none !important;
            }
          </style>
          <style type="text/css" id="media-query">
            @media (max-width: 560px) {
              .block-grid,
              .col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
              }
      
              .block-grid {
                width: 100% !important;
              }
      
              .col {
                width: 100% !important;
              }
      
              .col > div {
                margin: 0 auto;
              }
      
              img.fullwidth,
              img.fullwidthOnMobile {
                max-width: 100% !important;
              }
      
              .no-stack .col {
                min-width: 0 !important;
                display: table-cell !important;
              }
      
              .no-stack.two-up .col {
                width: 50% !important;
              }
      
              .no-stack .col.num2 {
                width: 16.6% !important;
              }
      
              .no-stack .col.num3 {
                width: 25% !important;
              }
      
              .no-stack .col.num4 {
                width: 33% !important;
              }
      
              .no-stack .col.num5 {
                width: 41.6% !important;
              }
      
              .no-stack .col.num6 {
                width: 50% !important;
              }
      
              .no-stack .col.num7 {
                width: 58.3% !important;
              }
      
              .no-stack .col.num8 {
                width: 66.6% !important;
              }
      
              .no-stack .col.num9 {
                width: 75% !important;
              }
      
              .no-stack .col.num10 {
                width: 83.3% !important;
              }
      
              .video-block {
                max-width: none !important;
              }
      
              .mobile_hide {
                min-height: 0px;
                max-height: 0px;
                max-width: 0px;
                display: none;
                overflow: hidden;
                font-size: 0px;
              }
      
              .desktop_hide {
                display: block !important;
                max-height: none !important;
              }
            }
          </style>
        </head>
      
        <body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: transparent">
          <table
            class="nl-container"
            style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; background-color: transparent; width: 100%"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            width="100%"
            bgcolor="transparent"
            valign="top"
          >
            <tbody>
              <tr style="vertical-align: top" valign="top">
                <td style="word-break: break-word; vertical-align: top" valign="top">
                  <div style="padding-top: 30px; padding-bottom: 30px; background-color: #eaf8f8; overflow: hidden">
                    <div class="block-grid" style="min-width: 320px; max-width: 540px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; margin: 0 auto; width: 100%; background-color: #ffffff">
                      <div style="border-collapse: collapse; display: table; width: 100%; background-color: #ffffff">
                        <div class="col num12" style="min-width: 320px; max-width: 540px; display: table-cell; vertical-align: top; width: 540px">
                          <div style="width: 100% !important">
                            <div
                              style="
                                border-top: 0px solid transparent;
                                border-left: 0px solid transparent;
                                border-bottom: 0px solid transparent;
                                border-right: 0px solid transparent;
                                padding-top: 0px;
                                padding-bottom: 0px;
                                padding-right: 0px;
                                padding-left: 0px;
                              "
                            >
                              <div>
                                <div style="margin-top: 20px; font-family: 'Montserrat'">
                                  <p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 38px; margin: 0"><span style="font-size: 38px; color: #48bdbd">Point Of Sales</span></p>
                                </div>
                              </div>
                              <div>
                                <div style="font-size: 12px; color: #393d47; font-family: 'Montserrat'">
                                  <p style="text-align: center; line-height: 1.2; word-break: break-word; font-size: 13px; margin: 0"><span style="font-size: 13px; color: #808080">serving the best food and drink</span></p>
                                </div>
                              </div>
                              <div class="img-container center fixedwidth" align="center">
                                <p align="center" style="letter-spacing: 5px; font-size: 60px; font-family: Montserrat; height: auto; width: 100%; max-width: 351px; display: block" width="351">${codeverify}</p>
                              </div>
      
                              <div>
                                <p style="margin-top: 20px; margin-bottom: -5px; color: #393d47; text-align: center; font-family: Montserrat">
                                  <strong><span style="font-size: 13px">Masukkan code verifikasi ke account POS kamu</span></strong>
                                </p>
                              </div>
      
                              <div>
                                <p style="margin-bottom: 20px; font-family: 'Montserrat'; text-align: center; color: #808080; font-size: 12px">harap untuk tidak membagikan account</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
      `;
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          // ENV
          user: env.EMAILGMAIL,
          pass: env.PASSGMAIL,
        },
      });
      let mailOptions = {
        from: '"Point Of Sales" <no-reply@gmail.com>',
        replyTo: "muhamad.rikoarafi@gmail.com",
        to: email,
        subject: `Change password`,
        html: inboxGmail,
      };
      transporter.sendMail(mailOptions, (err) => {
        if (err) throw err;
      });
    } catch (error) {
      failed(res, [], "Internal server error");
    }
  },
};
module.exports = mailer;
