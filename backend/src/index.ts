import { build } from '@Source/app'

const start = async () => {
  const app = await build({
    logger: {
      level: 'trace',
    },
  })

  try {
    const host = process.env.HOST || 'localhost'

    await app.listen({ port: 3001, host: host })
    console.log('Server started')
  } catch (error) {
    console.error('Error starting server:', error)
    process.exit(1)
  }
}

start()
