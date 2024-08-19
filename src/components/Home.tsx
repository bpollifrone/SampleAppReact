import * as React from "react";
import "./Home.css";
import { Customer, CustomersApi } from '../api/CustomersApi';

interface HomeProps {
  client: CustomersApi;
}
const Home = ({client}: HomeProps) => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function getData() {
      try {
        setCustomers(await client.getCustomers());
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [client]);

  return (
    <>
      <h1>Customers</h1>

      <div className="Actions AddNew">
        <button type="button"><a href="/edit">Add new</a></button>
      </div>

      <div className="Customers">
        {customers.map((c: Customer) => {
          return (
            <div className="Customer" key={c.id}>
              <div><span className="FieldName">First Name:</span>{c.firstName}</div>
              <div><span className="FieldName">Last Name:</span>{c.lastName}</div>
              <div><span className="FieldName">Age:</span>{c.age}</div>
              <div><span className="FieldName">Email:</span>{c.email}</div>
              <div><span className="FieldName">Phone:</span>{c.phoneNumber}</div>
              <div><span className="FieldName">Birthday:</span>{c.birthday}</div>
              <div><span className="FieldName">Favorite Color:</span>{c.favoriteColor}</div>
              <div><span className="FieldName">Photo URL:</span>{c.photoURL}</div>
              <div className="Actions">
                <button type="button"><a href={`/edit/${c.id}`}>Edit</a></button>
              </div>
            </div>
          );
        })}
        {loading && <div className="Loading">Loading Data...</div>}
      </div>

      {error && (
        <div className="Error">{error}</div>
      )}
    </>
  );
};

export default Home;
