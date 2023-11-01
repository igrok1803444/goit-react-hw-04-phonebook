import { Label, Form, SubmitButton } from './AddContactForm.styled';

export const AddContactForm = ({ addFunction }) => {
  return (
    <Form
      onSubmit={event => {
        event.preventDefault();
        addFunction({
          name: event.target.name.value,
          number: event.target.number.value,
        });
        event.target.reset();
      }}
    >
      <Label>
        {' '}
        Name:
        <input type="text" name="name" required />
      </Label>
      <Label>
        {' '}
        Phone:
        <input
          type="tel"
          name="number"
          required
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
          placeholder="000-00-00"
        />
      </Label>
      <SubmitButton type="submit">Add contact</SubmitButton>
    </Form>
  );
};
