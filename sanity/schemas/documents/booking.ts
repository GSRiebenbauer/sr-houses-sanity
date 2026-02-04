import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'bookingSummary',
      title: 'Booking Summary',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'from',
      title: 'From',
      type: 'date',
    }),
    defineField({
      name: 'to',
      title: 'To',
      type: 'date',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'persons',
      title: 'Persons',
      type: 'number',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Canceled', value: 'canceled' },
          { title: 'Confirmed', value: 'confirmed' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'status',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      const statusLabel = subtitle
        ? `Status: ${subtitle.charAt(0).toUpperCase() + subtitle.slice(1)}`
        : 'No Status'
      return {
        title: title || 'No Name',
        subtitle: statusLabel,
      }
    },
  },
})
