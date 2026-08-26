import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldExtensionComponentProps } from '@backstage/plugin-scaffolder-react';
import { ExampleField } from './ExampleFieldExtension';

describe('ExampleField', () => {
  it('should render the field and handle changes', async () => {
    const onChange = jest.fn();

    // The component only reads a few of the props, so build a partial set and
    // widen it to the full field extension props type.
    const props = {
      onChange,
      rawErrors: [],
      required: false,
      formData: '',
    } as unknown as FieldExtensionComponentProps<string>;

    render(<ExampleField {...props} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test');

    expect(onChange).toHaveBeenCalled();
  });
});
