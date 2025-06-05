// import { IncomingForm } from 'formidable'
// import { Readable } from 'stream'
// import nodemailer from 'nodemailer'

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// function streamToNodeReadable(stream) {
//   return Readable.from(WebReadableToAsyncIterable(stream))
// }

// async function* WebReadableToAsyncIterable(stream) {
//   const reader = stream.getReader()
//   try {
//     while (true) {
//       const { done, value } = await reader.read()
//       if (done) break
//       yield value
//     }
//   } finally {
//     reader.releaseLock()
//   }
// }

// export async function POST(req) {
//   const form = new IncomingForm()

//   const nodeReq = Object.assign(streamToNodeReadable(req.body), {
//     headers: Object.fromEntries(req.headers),
//     method: req.method,
//     url: '', // Not used by formidable but required
//   })

//   return new Promise((resolve, reject) => {
//     form.parse(nodeReq, async (err, fields, files) => {
//       if (err) {
//         console.error('Form parse error:', err)
//         return resolve(new Response(JSON.stringify({ message: 'Form parse error' }), { status: 500 }))
//       }

//       const { name, email, phone } = fields
//       const photo = files?.photo?.[0]

//       const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: Number(process.env.SMTP_PORT),
//         secure: false,
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASS,
//         },
//       })

//       const mailOptions = {
//         from: `"Website Contact" <${process.env.SMTP_USER}>`,
//         to: process.env.SMTP_TO,
//         subject: 'New Contact Form Submission',
//         text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}`,
//         attachments: photo
//           ? [
//               {
//                 filename: photo.originalFilename,
//                 path: photo.filepath,
//               },
//             ]
//           : [],
//       }

//       try {
//         await transporter.sendMail(mailOptions)
//         return resolve(new Response(JSON.stringify({ message: 'Email sent successfully' }), { status: 200 }))
//       } catch (error) {
//         console.error('Email send error:', error)
//         return resolve(new Response(JSON.stringify({ message: 'Email sending failed' }), { status: 500 }))
//       }
//     })
//   })
// }
