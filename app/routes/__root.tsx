// app/routes/__root.tsx
import {
    Outlet,
    ScrollRestoration,
    createRootRoute,
  } from '@tanstack/react-router'
  import { Meta, Scripts } from '@tanstack/start'
  import type { ReactNode } from 'react'
  import { ClerkProvider, GoogleOneTap } from '@clerk/tanstack-start'
import { CustomGoogleOneTap } from '../components/GoogleOneTap'
  
  export const Route = createRootRoute({
    head: () => ({
      meta: [
        {
          charSet: 'utf-8',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          title: 'TanStack Start Starter',
        },
      ],
    }),
    component: RootComponent,
  })
  
  function RootComponent() {
    return (
      <RootDocument>
        <Outlet />
      </RootDocument>
    )
  }
  
  function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
      <ClerkProvider>
        <CustomGoogleOneTap>
        <button>Sign in with Google</button>
        </CustomGoogleOneTap>
        <html>
          <head>
            <Meta />
          </head>
          <body>
            {children}
            <ScrollRestoration />
            <Scripts />
          </body>
        </html>
      </ClerkProvider>
    )
  }