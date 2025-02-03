import './globals.css'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={``}>
      <body>{children}</body>
    </html>
  )
}
