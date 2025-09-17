// src/app/(auth)/login/page.tsx
"use client";

import { useEffect, useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/lib/redux/authSlice";
import type { RootState, AppDispatch } from "@/lib/store";

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { user, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(login({ email, password }));

      if (result.meta.requestStatus === "fulfilled" && result.payload) {
        const role = result.payload.role.toLowerCase();
        router.push(role === "admin" ? "/dashboard/admin" : "/dashboard/user");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user.role.toLowerCase();
      router.push(role === "admin" ? "/dashboard/admin" : "/dashboard/user");
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
