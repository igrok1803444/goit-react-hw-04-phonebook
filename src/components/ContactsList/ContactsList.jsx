import { List, DeleteButton } from './ContactsList.styled';
export const ContactsList = ({ deleteHandler, contacts }) => {
  return (
    <List>
      {contacts.map(({ name, id, number }) => (
        <li key={id}>
          {name}: {number}
          <DeleteButton type="button" onClick={() => deleteHandler(id)}>
            delete
          </DeleteButton>
        </li>
      ))}
    </List>
  );
};
