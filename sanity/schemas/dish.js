import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name of Dish',
      type: 'string',
      validation: (Role) => Role.required(),
    }),
    defineField({
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'price',
      title: 'Price of the Dish in PKRs',
      type: 'number',
    }),
    defineField({
      name: 'serve',
      title: 'Serving quantity of Dish',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image of the Dish',
      type: 'image',
    }),
  ],
})
