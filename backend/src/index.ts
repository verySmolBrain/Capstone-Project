import { build } from '@Source/app'

const start = async () => {
  const app = await build({ logger: true })

  try {
    await app.listen({ port: 3001 })
    console.log('Server started')
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

start()
