import {
  FormFieldBlueprint,
  createFormField,
} from '@backstage/plugin-scaffolder-react/alpha';
import {
  FieldExtensionComponentProps,
  makeFieldSchema,
} from '@backstage/plugin-scaffolder-react';

export const ExampleField = ({
  onChange,
  required,
  formData,
}: FieldExtensionComponentProps<string>) => {
  // TODO: Replace with your custom field component
  return (
    <input
      type="text"
      onChange={e => onChange(e.target.value)}
      value={formData ?? ''}
      required={required}
    />
  );
};

export const ExampleFieldExtension = FormFieldBlueprint.make({
  name: 'example',
  params: {
    field: async () =>
      createFormField({
        name: 'ExampleField',
        component: ExampleField,
        // Uncomment to add validation:
        // validation: async (value, validation, { apiHolder }) => {
        //   if (!value) validation.addError('Field is required');
        // },
        // Uncomment to define schema for the Custom Field Explorer preview:
        // schema: makeFieldSchema({
        //   output: z => z.string(),
        // }),
      }),
  },
});
