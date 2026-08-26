import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExampleField } from './ExampleFieldExtension';

describe('ExampleField', () => {
  it('should render the field and handle changes', async () => {
    const onChange = jest.fn();

    render(
      <ExampleField
        onChange={onChange}
        rawErrors={[]}
        required={false}
        formData=""
      />,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'test');

    expect(onChange).toHaveBeenCalled();
  });
});
