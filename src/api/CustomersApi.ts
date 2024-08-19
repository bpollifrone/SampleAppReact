export interface CustomerData {
  firstName?: string;
  lastName: string;
  age?: number | null;
  email?: string;
  phoneNumber?: string;
  birthday?: string;
  favoriteColor?: string;
  photoURL?: string;
}

export interface Customer extends CustomerData {
  id: number;
}

const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/customers`;

export class CustomersApi {
  async getCustomers(): Promise<Customer[]> {
    const resp = await fetch(API_ENDPOINT);
    if (!resp.ok) {
      throw new Error(`Response status: ${resp.status}`);
    }

    return resp.json() as unknown as Customer[];
  }

  async getCustomer(id: number): Promise<Customer> {
    const resp = await fetch(`${API_ENDPOINT}/${id}`);
    if (!resp.ok) {
      throw new Error(`Response status: ${resp.status}`);
    }

    return resp.json() as unknown as Customer;
  }

  async addCustomer(customer: CustomerData): Promise<Customer> {
    const resp = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    if (!resp.ok) {
      throw new Error(`Response status: ${resp.status}`);
    }

    return resp.json() as unknown as Customer;
  }

  async editCustomer(customer: Customer): Promise<string | null> {
    const resp = await fetch(`${API_ENDPOINT}/${customer.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });

    return resp.ok ? null : resp.statusText;
  }

  async deleteCustomer(id: number): Promise<string | null> {
    const resp = await fetch(`${API_ENDPOINT}/${id}`, {
      method: "DELETE",
    });

    return resp.ok ? null : resp.statusText;
  }
}
