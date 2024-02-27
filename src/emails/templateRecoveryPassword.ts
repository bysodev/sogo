export const templateRecoveryPassword = (
  signin_url: string,
  username: string
) => {
  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <title></title>
        <style type="text/css" rel="stylesheet" media="all">
          /* Base ------------------------------ */
    
          @import url('https://fonts.googleapis.com/css?family=Inter:400,700&display=swap');
          body {
            width: 100% !important;
            height: 100%;
            margin: 0;
            -webkit-text-size-adjust: none;
          }
    
          a {
            color: #9333ea;
          }
    
          a img {
            border: none;
          }
    
          td {
            word-break: break-word;
          }
    
          .preheader {
            display: none !important;
            visibility: hidden;
            /* mso-hide: all; */
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
          }
          /* Type ------------------------------ */
    
          body,
          td,
          th {
            font-family: 'Inter', Helvetica, Arial, sans-serif;
          }
    
          h1 {
            margin-top: 0;
            color: #333333;
            font-size: 22px;
            font-weight: bold;
            text-align: left;
          }
    
          h2 {
            margin-top: 0;
            color: #333333;
            font-size: 16px;
            font-weight: bold;
            text-align: left;
          }
    
          h3 {
            margin-top: 0;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
            text-align: left;
          }
    
          td,
          th {
            font-size: 16px;
          }
    
          p,
          ul,
          ol,
          blockquote {
            margin: 0.4em 0 1.1875em;
            font-size: 16px;
            line-height: 1.625;
          }
    
          p.sub {
            font-size: 13px;
          }
          /* Utilities ------------------------------ */
    
          .align-right {
            text-align: right;
          }
    
          .align-left {
            text-align: left;
          }
    
          .align-center {
            text-align: center;
          }
          /* Buttons ------------------------------ */
    
          .button {
            background-color: #9333ea;
            border-top: 10px solid #9333ea;
            border-right: 18px solid #9333ea;
            border-bottom: 10px solid #9333ea;
            border-left: 18px solid #9333ea;
            display: inline-block;
            color: #fff !important;
            text-decoration: none;
            border-radius: 0.375rem;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
            -webkit-text-size-adjust: none;
            box-sizing: border-box;
            margin: 0 auto;
          }
    
          @media only screen and (max-width: 500px) {
            .button {
              width: 100% !important;
              text-align: center !important;
            }
          }
          /* Attribute list ------------------------------ */
    
          .attributes {
            margin: 0 0 21px;
          }
    
          .attributes_content {
            background-color: #f4f4f7;
            padding: 16px;
          }
    
          .attributes_item {
            padding: 0;
          }
          /* Related Items ------------------------------ */
    
          .related {
            width: 100%;
            margin: 0;
            padding: 25px 0 0 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
    
          .related_item {
            padding: 10px 0;
            color: #cbcccf;
            font-size: 15px;
            line-height: 18px;
          }
    
          .related_item-title {
            display: block;
            margin: 0.5em 0 0;
          }
    
          .related_item-thumb {
            display: block;
            padding-bottom: 10px;
          }
    
          .related_heading {
            border-top: 1px solid #cbcccf;
            text-align: center;
            padding: 25px 0 10px;
          }
          /* Data table ------------------------------ */
    
          body {
            background-color: #f2f4f6;
            color: #51545e;
          }
    
          p {
            color: #51545e;
          }
    
          .email-wrapper {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #f2f4f6;
          }
    
          .email-content {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
          /* Masthead ----------------------- */
    
          .email-masthead {
            padding: 25px 0;
            text-align: center;
          }
    
          .email-masthead_logo {
            width: 94px;
          }
    
          .email-masthead_name {
            font-size: 16px;
            font-weight: bold;
            color: #a8aaaf;
            text-decoration: none;
            text-shadow: 0 1px 0 white;
          }
          /* Body ------------------------------ */
    
          .email-body {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
    
          .email-body_inner {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #ffffff;
          }
    
          .email-footer {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            text-align: center;
          }
    
          .email-footer p {
            color: #a8aaaf;
          }
    
          .body-action {
            text-align: center;
            width: 100%;
            margin: 30px auto;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            text-align: center;
          }
    
          .body-sub {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #eaeaec;
          }
    
          .content-cell {
            padding: 45px;
          }
          /*Media Queries ------------------------------ */
    
          @media only screen and (max-width: 600px) {
            .email-body_inner,
            .email-footer {
              width: 100% !important;
            }
          }
    
          @media (prefers-color-scheme: dark) {
            body,
            .email-body,
            .email-body_inner,
            .email-content,
            .email-wrapper,
            .email-masthead,
            .email-footer {
              background-color: #333333 !important;
              color: #fff !important;
            }
            p,
            ul,
            ol,
            blockquote,
            h1,
            h2,
            h3,
            span,
            .purchase_item {
              color: #fff !important;
            }
            .attributes_content {
              background-color: #222 !important;
            }
            .email-masthead_name {
              text-shadow: none !important;
            }
          }
    
          :root {
            color-scheme: light dark;
            /* supported-color-schemes: light dark; */
          }
        </style>
        <!--[if mso]>
          <style type="text/css">
            .f-fallback {
              font-family: Arial, sans-serif;
            }
          </style>
        <![endif]-->
      </head>
      <body>
        <span class="preheader">This link will expire in 10 min.</span>
        <table
          class="email-wrapper"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
        >
          <tr>
            <td align="center">
              <table
                class="email-content"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
              >
                <tr>
                  <td class="email-masthead">
                    <a class="f-fallback email-masthead_name">
                      Plataforma de Lenguaje de Señas Ecuatoriano - SoGo Sign
                    </a>
                  </td>
                </tr>
                <!-- Email Body -->
                <tr>
                  <td
                    class="email-body"
                    width="570"
                    cellpadding="0"
                    cellspacing="0"
                  >
                    <table
                      class="email-body_inner"
                      align="center"
                      width="570"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <!-- Body content -->
                      <tr>
                        <td class="content-cell">
                          <div class="f-fallback">
                            <div style="display: flex; justify-content:center;">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 140 142" class="mx-auto mb-6" height="80" width="80"><path d="M128.006 112.91l-7.858 8.065c-13.856 13.855-32.053 20.679-50.045 20.679v.207c-18.197-.207-36.395-7.031-50.25-20.886C9.098 110.015 2.274 96.366 0 82.098h23.781c1.861 8.271 6.204 16.13 12.615 22.333v.207c9.099 9.306 21.507 13.855 33.707 13.855 8.686 0 17.164-2.274 24.609-7.031L11.994 28.744l7.858-8.064C33.708 7.03 51.905 0 70.103 0c17.992 0 36.189 6.824 50.045 20.68 10.96 10.96 17.784 24.815 19.852 38.877h-23.575c-2.068-8.065-6.203-16.13-12.614-22.334-9.306-9.512-21.714-14.062-33.708-14.062-8.685 0-17.37 2.481-24.815 7.031l82.718 82.718z"></path></svg>
                            </div>
                            <p>
                            Presiona sobre el siguiente botón para iniciar el proceso de recuperación de clave.<br />
                            </p>
                            <!-- Action -->
                            <table
                              class="body-action"
                              align="center"
                              width="100%"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation"
                            >
                              <tr>
                                <td align="center">
                                  <!-- Border based button
               https://litmus.com/blog/a-guide-to-bulletproof-buttons-in-email-design -->
                                  <table
                                    width="100%"
                                    border="0"
                                    cellspacing="0"
                                    cellpadding="0"
                                    role="presentation"
                                  >
                                    <tr>
                                      <td style="display: grid;">
                                        <a
                                          href="${signin_url}"
                                          class="f-fallback button"
                                          target="_blank"
                                          >Recuperar clave</a
                                        >
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            <p>
                              Para iniciar sesión posteriomente utiliza el usuario: <strong>${username}</strong>.
                            </p>
                            <!-- Sub copy -->
                            <table class="body-sub" role="presentation">
                              <tr>
                                <td>
                                  <p class="f-fallback sub">
                                    Si tienes problemas con el botón de arriba,
                                    copia y pega la siguiente URL en tu navegador.
                                  </p>
                                  <p class="f-fallback sub">${signin_url}</p>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table
                      class="email-footer"
                      align="center"
                      width="570"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <tr>
                        <td class="content-cell" align="center">
                          <p class="f-fallback sub align-center">
                            &copy; 2023- 2024 SogoSign.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
};
