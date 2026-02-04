'use client'

export default function SendEmailButton() {
  async function sendEmail() {
    try {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestName: 'John Doe',
          guestEmail: 'gleb.savelev111@gmail.com',
          checkinDate: '2023-05-01',
          checkoutDate: '2023-05-07',
          numberOfGuests: 4,
          guestMessage: "We can't wait to stay at SR House on Paros!",
        }),
      })

      if (response.ok) {
        alert('Email sent successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to send email: ${error.error}`)
      }
    } catch (error) {
      alert('Error sending email')
      console.error(error)
    }
  }

  return <button onClick={sendEmail}>Send Email</button>
}
