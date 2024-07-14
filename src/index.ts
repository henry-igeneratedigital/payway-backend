import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { cors } from 'hono/cors'
import { csrf } from 'hono/csrf'
import { trimTrailingSlash } from 'hono/trailing-slash'

const app = new Hono()
const apiBaseUrl = 'https://api.payway.com.au/rest/v1'
const allowedOrigin = process.env.ALLOWED_ORIGIN

app.use(csrf())
app.use(trimTrailingSlash())

app.use('/api/*', basicAuth({
  username: 'test',
  password: 'test',
}))

app.use('/api/*', cors({
  origin: [allowedOrigin ?? '*']
}))

app.get('/', (c) => {
  c.status(200)
  return c.body('Success')
})

app.post('/api/payment', async (c) => {
  const body = await c.req.json()
  const { singleUseTokenId, customerNumber, 
    transactionType, principalAmount, currency, merchantId } = body

  console.log(singleUseTokenId);

  const resp = await fetch(apiBaseUrl + '/transactions', {
    method: 'POST',
    body: JSON.stringify({
      singleUseTokenId,
      customerNumber,
      transactionType,
      principalAmount,
      currency,
      merchantId
    }),
    headers: {
      Authorization: 'Basic VDE4Nzc5X1NFQ184Y3MzcXBnNTVicmdnczN3bXcyN3R3Y3dqbm0zN2I3a3BwdTd4OWl5ODk0Y3dqN2pnNmVyOGk1aGI3cTI6',
      'Content-Type': 'application/x-www-form-urlencoded'
    }    
  })

  return c.body(resp.body)
})

const port = 8787
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
