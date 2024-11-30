import { useClerk } from '@clerk/tanstack-start'
import { useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

// Add clerk to Window to avoid type errors
declare global {
  interface Window {
    google: any
  }
}

export function CustomGoogleOneTap({ children }: { children: React.ReactNode }) {
  const clerk = useClerk()
  const router = useRouter()

  useEffect(() => {
    // Will show the One Tap UI after two seconds
    const timeout = setTimeout(() => oneTap(), 2000)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const oneTap = () => {
    const { google } = window
    if (google) {
      google.accounts.id.initialize({
        // Add your Google Client ID here.
        client_id: '414499273779-8gfvr23736r1tl8fbu960sa44rpv5mtd.apps.googleusercontent.com',
        callback: async (response: any) => {
          // Here we call our provider with the token provided by Google
          call(response.credential)
        },
      })

      // Display the One Tap UI, and log any errors that occur.
      return google.accounts.id.prompt((notification: any) => {
        console.log('Notification ::', notification)
        if (notification.isNotDisplayed()) {
          console.log('getNotDisplayedReason ::', notification.getNotDisplayedReason())
        } else if (notification.isSkippedMoment()) {
          console.log('getSkippedReason  ::', notification.getSkippedReason())
        } else if (notification.isDismissedMoment()) {
          console.log('getDismissedReason ::', notification.getDismissedReason())
        }
      })
    }
  }

  const call = async (token: any) => {
    try {
      const res = await clerk.authenticateWithGoogleOneTap({
        token,
      })

      await clerk.handleGoogleOneTapCallback(res, {
        signInFallbackRedirectUrl: '/',
      })
    } catch (error) {
      router.navigate({ to: '/' })
    }
  }

  return (
    <>
      <script src="https://accounts.google.com/gsi/client" async defer>
        {children}
      </script>
    </>
  )
} 