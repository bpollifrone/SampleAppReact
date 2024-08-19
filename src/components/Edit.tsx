import * as React from "react";
import { Customer, CustomerData, CustomersApi } from "../api/CustomersApi";
import "./Edit.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HexColorPicker } from "react-colorful";
import { ColorsApi } from "../api/ColorsApi";

interface EditProps {
    id?: number;
    client: CustomersApi;
}

const Edit = ({ id, client }: EditProps) => {
    const [customer, setCustomer] = React.useState<Customer | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [showPicker, setShowPicker] = React.useState<boolean>(false);
    const [colorName, setColorName] = React.useState<string | null>(null);

    const submitForm = (e: any) => {
        e.preventDefault();
        setError(null);

        let c: CustomerData = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            age: parseInt(e.target.age.value),
            email: e.target.email.value,
            phoneNumber: e.target.phoneNumber.value,
            favoriteColor: e.target.favoriteColor.value,
            photoURL: e.target.photoURL.value,
        };

        let birthday = e.target.birthday.value;
        if (birthday) {
            c.birthday = new Date(birthday).toISOString().split("T")[0];
        }

        setLoading(true);

        if (id) {
            client.editCustomer({ ...c, id: id }).then((error) => {
                setError(error);
                if (!error) {
                    window.location.href = "/";
                } else {
                    setLoading(false);
                }
            });
        } else {
            try {
                client.addCustomer(c).then(() => {
                    window.location.href = "/";
                });
            } catch (error) {
                setError((error as Error).message);
                setLoading(false);
            }
        }
    };

    const onDeleteClick = (id: number) => {
        setError(null);
        setLoading(false);
        client.deleteCustomer(id).then((error) => {
            setError(error);
            if (!error) {
                window.location.href = "/";
            } else {
                setLoading(true);
            }
        });
    };

    const onColorPicked = async (hex: string) => {
      const client: ColorsApi = new ColorsApi();
      try {
        const colorName = await client.getColorName(hex); 
        setColorName(colorName);
      } catch (error) {
        setError((error as Error).message);
      }
    }

    React.useEffect(() => {
        // If we are adding instead of editing, don't fetch
        if (!id) {
            return;
        }

        async function getData() {
            try {
                const c = await client.getCustomer(id as number);
                setCustomer(c);
                setColorName(c?.favoriteColor ?? null);
            } catch (error) {
                setError((error as Error).message);
            }
        }

        getData().then(() => setLoading(false));
    }, [id, client]);

    return (
        <>
            <a href="/">Home</a>
            <hr />
            <h1>{id ? "Edit" : "Add"} Customer</h1>

            <form className="Customer" onSubmit={submitForm}>
                <label className="FieldName" htmlFor="firstName">
                    First Name:
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    defaultValue={customer?.firstName ?? ""}
                />

                <label className="FieldName" htmlFor="lastName">
                    Last Name:
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    defaultValue={customer?.lastName ?? ""}
                />

                <label className="FieldName" htmlFor="age">
                    Age:
                </label>
                <input
                    type="number"
                    id="age"
                    name="age"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    required
                    defaultValue={customer?.age ?? ""}
                />

                <label className="FieldName" htmlFor="email">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    defaultValue={customer?.email ?? ""}
                />

                <label className="FieldName" htmlFor="phoneNumber">
                    Phone:
                </label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    required
                    defaultValue={customer?.phoneNumber ?? ""}
                />

                <label className="FieldName" htmlFor="birthday">
                    Birthday:
                </label>
                <div className="DateInput">
                    <DatePicker
                        autoComplete="off"
                        name="birthday"
                        selected={
                            customer?.birthday
                                ? new Date(customer?.birthday)
                                : null
                        }
                    />
                </div>

                <label className="FieldName" htmlFor="favoriteColor">
                    Favorite Color:
                </label>
                <div className="ColorInput">
                    <input
                        type="text"
                        id="favoriteColor"
                        name="favoriteColor"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        value={colorName ?? ''}
                        onChange={(e) => setColorName(e.target.value)}
                    />
                    <button type="button" onClick={() => setShowPicker(true)}>Pick your color</button>
                    {showPicker && <HexColorPicker onChange={onColorPicked} />}
                </div>

                <label className="FieldName" htmlFor="photoURL">
                    Photo URL:
                </label>
                <input
                    type="url"
                    id="photoURL"
                    name="photoURL"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    defaultValue={customer?.photoURL ?? ""}
                />

                <div className="Actions">
                    <button type="submit" disabled={loading}>
                        Submit
                    </button>
                    {id && customer && (
                        <button
                            type="button"
                            className="Delete"
                            disabled={loading}
                            onClick={() => onDeleteClick(id)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </form>

            {error && <div className="Error">{error}</div>}
        </>
    );
};

export default Edit;
