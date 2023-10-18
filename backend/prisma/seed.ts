// import { PrismaClient } from '@prisma/client'

// // Brain owns 4 pieces of Exodia
// // Jin owns the final piece of Exodia
// // Goomba owns Blue-Eyes White Dragon and Bellsprout

// const prisma = new PrismaClient()

// async function main() {
//   // linked to brains token
//   const brain = await prisma.user.create({
//     data: {
//       id: '4be5aa5e-4245-46e6-84ed-ed2c410e7c83',
//       profile: {
//         create: {
//           name: 'brain',
//           description: 'im such a goomba',
//           image: 'thisisaurl',
//           collection: {
//             create: [
//               {
//                 id: '1',
//                 name: 'Right Arm Of The Forbidden One',
//               },
//               {
//                 id: '2',
//                 name: 'Left Arm Of The Forbidden One',
//               },
//               {
//                 id: '3',
//                 name: 'Right Leg Of The Forbidden One',
//               },
//               {
//                 id: '4',
//                 name: 'Left Leg Of The Forbidden One',
//               },
//             ],
//           },
//           achievements: {},
//           sales: {},
//           purchases: {},
//           reputation: 0,
//         },
//       },
//     },
//   })
//   // linked to rums token
//   const goomba = await prisma.user.create({
//     data: {
//       id: '50f678ab-e4a2-4066-83ee-f87d2156adbf',
//       profile: {
//         create: {
//           name: 'goomba',
//           description: 'im such a brain',
//           image: 'thisisaurlaswell',
//           collection: {
//             create: [
//               {
//                 id: '6',
//                 name: 'Blue-Eyes White Dragon',
//               },
//               {
//                 id: '69',
//                 name: 'Bellsprout',
//               },
//             ],
//           },
//           achievements: {},
//           sales: {},
//           purchases: {},
//           reputation: 69,
//         },
//       },
//     },
//   })
//   // linked to teewins token
//   const jin = await prisma.user.create({
//     data: {
//       id: '6e4fbc17-c6f5-431b-8a97-565d671cfb88',
//       profile: {
//         create: {
//           name: 'jin',
//           description: 'inktober',
//           image: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
//           collection: {
//             create: [
//               {
//                 id: '5',
//                 name: 'Exodia The Forbidden One',
//               },
//             ],
//           },
//           achievements: {},
//           sales: {},
//           purchases: {},
//           reputation: 5,
//         },
//       },
//     },
//   })
//   console.log(brain, goomba, jin)
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })
