"use client";

import { useState } from "react";

interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

const PROVINCES = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Nova Scotia", "Ontario",
  "Prince Edward Island", "Quebec", "Saskatchewan",
  "Northwest Territories", "Nunavut", "Yukon",
];

const emptyAddress: Omit<Address, "id"> = {
  label: "",
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  province: "Ontario",
  postalCode: "",
  country: "Canada",
  phone: "",
  isDefault: false,
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editing, setEditing] = useState<Omit<Address, "id"> | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  function startAdd() {
    setEditing({ ...emptyAddress, isDefault: addresses.length === 0 });
    setEditId(null);
  }

  function startEdit(addr: Address) {
    setEditing({ ...addr });
    setEditId(addr.id);
  }

  function cancel() {
    setEditing(null);
    setEditId(null);
  }

  function save() {
    if (!editing) return;
    if (editId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editId ? { ...editing, id: editId } : a))
      );
    } else {
      const newAddr: Address = {
        ...editing,
        id: "addr_" + Math.random().toString(36).substring(2, 8),
      };
      if (newAddr.isDefault) {
        setAddresses((prev) => [
          ...prev.map((a) => ({ ...a, isDefault: false })),
          newAddr,
        ]);
      } else {
        setAddresses((prev) => [...prev, newAddr]);
      }
    }
    cancel();
  }

  function remove(id: string) {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
  }

  function updateField(field: string, value: string | boolean) {
    setEditing((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary-700">
            Addresses
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your shipping and billing addresses.
          </p>
        </div>
        {!editing && (
          <button
            onClick={startAdd}
            className="rounded bg-sage-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
          >
            Add Address
          </button>
        )}
      </div>

      {/* Edit / Add form */}
      {editing && (
        <div className="mt-6 rounded-lg border border-cream-100 p-5">
          <h2 className="font-display text-lg font-semibold text-primary-700">
            {editId ? "Edit Address" : "New Address"}
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                Label
              </label>
              <input
                type="text"
                value={editing.label}
                onChange={(e) => updateField("label", e.target.value)}
                placeholder="e.g. Home, Office"
                className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                First Name
              </label>
              <input
                type="text"
                value={editing.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                Last Name
              </label>
              <input
                type="text"
                value={editing.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                Address Line 1
              </label>
              <input
                type="text"
                value={editing.address1}
                onChange={(e) => updateField("address1", e.target.value)}
                className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                Address Line 2
              </label>
              <input
                type="text"
                value={editing.address2}
                onChange={(e) => updateField("address2", e.target.value)}
                placeholder="Apt, Suite, Unit (optional)"
                className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                City
              </label>
              <input
                type="text"
                value={editing.city}
                onChange={(e) => updateField("city", e.target.value)}
                className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                Province
              </label>
              <select
                value={editing.province}
                onChange={(e) => updateField("province", e.target.value)}
                className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
              >
                {PROVINCES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                Postal Code
              </label>
              <input
                type="text"
                value={editing.postalCode}
                onChange={(e) => updateField("postalCode", e.target.value)}
                placeholder="A1A 1A1"
                className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-neutral-900">
                Phone
              </label>
              <input
                type="tel"
                value={editing.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="+1 (416) 555-0123"
                className="w-full rounded border border-cream-100 px-4 py-2.5 text-sm outline-none focus:border-gold-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={editing.isDefault}
                  onChange={(e) => updateField("isDefault", e.target.checked)}
                  className="accent-gold-500"
                />
                Set as default address
              </label>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button
              onClick={save}
              className="rounded bg-sage-700 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
            >
              {editId ? "Update" : "Save"} Address
            </button>
            <button
              onClick={cancel}
              className="rounded border border-cream-100 px-5 py-2.5 text-sm font-medium text-neutral-500 transition-colors hover:bg-cream-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Address list */}
      {addresses.length === 0 && !editing ? (
        <div className="mt-8 rounded-lg border border-cream-100 p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-neutral-500/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          <p className="mt-3 text-sm text-neutral-500">
            No saved addresses yet. Add your first address to speed up checkout.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`rounded-lg border p-5 ${
                addr.isDefault ? "border-gold-500 bg-cream-50" : "border-cream-100"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-primary-700">
                    {addr.label || "Address"}
                    {addr.isDefault && (
                      <span className="ml-2 rounded-full bg-gold-500 px-2 py-0.5 text-xs text-white">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="mt-2 text-sm text-neutral-700">
                    {addr.firstName} {addr.lastName}
                  </p>
                  <p className="text-sm text-neutral-500">{addr.address1}</p>
                  {addr.address2 && (
                    <p className="text-sm text-neutral-500">{addr.address2}</p>
                  )}
                  <p className="text-sm text-neutral-500">
                    {addr.city}, {addr.province} {addr.postalCode}
                  </p>
                  <p className="text-sm text-neutral-500">{addr.country}</p>
                  {addr.phone && (
                    <p className="mt-1 text-sm text-neutral-500">{addr.phone}</p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => startEdit(addr)}
                  className="text-xs font-medium text-gold-500 hover:text-gold-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(addr.id)}
                  className="text-xs font-medium text-red-500 hover:text-red-400"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
