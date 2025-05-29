import { http } from 'msw'

const users: any = [
  { email: 'jasmin@gmail.com', password: '123456', userName: 'Jasmin' }
]

export const handlers = [
  // Register
   http.post('/api/register', async ({ request }: any) => {
    const { email, password, userName } = await request.json()

    const existingUser = users.find(user => user.email === email)
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User already exists' }),
        { status: 400 }
      )
    }

    // Add new user to the array
    users.push({ email, password, userName })

    return new Response(
      JSON.stringify({ message: 'User registered successfully' }),
      { status: 201 }
    )
  }),


  // Login
   http.post('/api/login', async ({ request }: any) => {
    const { email, password } = await request.json()

    const user = users.find(u => u.email === email && u.password === password)
    if (!user) {
      return new Response(
        JSON.stringify({ message: 'Invalid email or password' }),
        { status: 401 }
      )
    }

    return new Response(
      JSON.stringify({
        message: 'Login successful',
        token: 'mock-token-123',
        user: { email: user.email, userName: user.userName }
      }),
      { status: 200 }
    )
  }),
]
