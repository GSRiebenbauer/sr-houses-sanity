// app/api/sendMail/route.ts
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface BookingRequest {
  guestName: string
  guestEmail: string
  checkinDate: string
  checkoutDate: string
  numberOfGuests: number
  guestMessage: string
}

export async function POST(request: Request) {
  try {
    const body: BookingRequest = await request.json()
    const {
      guestName,
      guestEmail,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      guestMessage,
    } = body

    // Send notification email to the booking team
    const { data, error } = await resend.emails.send({
      from: 'SR Houses Booking <booking@sr-houses.co>',
      to: process.env.BOOKING_EMAIL || 'booking@sr-houses.co',
      replyTo: guestEmail,
      subject: `New Booking Request from ${guestName}`,
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #fafafa;">
          <div style="background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <h1 style="color: #1a1a1a; font-size: 24px; font-weight: 500; margin: 0 0 30px 0; padding-bottom: 20px; border-bottom: 1px solid #eee;">
              New Booking Request
            </h1>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
              <tr>
                <td style="padding: 12px 0; color: #666; font-size: 14px; width: 140px;">Guest Name</td>
                <td style="padding: 12px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${guestName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #666; font-size: 14px;">Email</td>
                <td style="padding: 12px 0; color: #1a1a1a; font-size: 14px;">
                  <a href="mailto:${guestEmail}" style="color: #1a1a1a; text-decoration: none;">${guestEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #666; font-size: 14px;">Check-in</td>
                <td style="padding: 12px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${checkinDate}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #666; font-size: 14px;">Check-out</td>
                <td style="padding: 12px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${checkoutDate}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #666; font-size: 14px;">Guests</td>
                <td style="padding: 12px 0; color: #1a1a1a; font-size: 14px; font-weight: 500;">${numberOfGuests}</td>
              </tr>
            </table>
            
            <div style="background-color: #f8f8f8; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
              <p style="color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px 0;">Message</p>
              <p style="color: #1a1a1a; font-size: 14px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${guestMessage || 'No message provided'}</p>
            </div>
            
            <p style="color: #999; font-size: 12px; margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #eee;">
              Reply directly to this email to respond to the guest.
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Send confirmation email to the guest
    await resend.emails.send({
      from: 'SR Houses <booking@sr-houses.co>',
      to: guestEmail,
      subject: 'Your Booking Request - SR Houses',
      html: `
        <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #fafafa;">
          <div style="background-color: #ffffff; border-radius: 8px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
            <h1 style="color: #1a1a1a; font-size: 24px; font-weight: 500; margin: 0 0 20px 0;">
              Thank You, ${guestName}
            </h1>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
              We have received your booking request and will get back to you shortly.
            </p>
            
            <div style="background-color: #f8f8f8; border-radius: 6px; padding: 24px; margin-bottom: 30px;">
              <h2 style="color: #1a1a1a; font-size: 14px; font-weight: 500; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.5px;">
                Your Request Details
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Check-in</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; text-align: right; font-weight: 500;">${checkinDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Check-out</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; text-align: right; font-weight: 500;">${checkoutDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 14px;">Guests</td>
                  <td style="padding: 8px 0; color: #1a1a1a; font-size: 14px; text-align: right; font-weight: 500;">${numberOfGuests}</td>
                </tr>
              </table>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 0;">
              If you have any questions, please don't hesitate to contact us.
            </p>
            
            <p style="color: #999; font-size: 12px; margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #eee;">
              SR Houses
            </p>
          </div>
        </div>
      `,
    })

    return NextResponse.json(
      { message: 'Booking request sent successfully', id: data?.id },
      { status: 200 },
    )
  } catch (error: any) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 },
    )
  }
}
