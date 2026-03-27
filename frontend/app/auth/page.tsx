"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"

// TODO: Replace with your backend URL
const API_BASE = "http://localhost:3000"

type AuthResponse = {
  token: string
  user: unknown
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

async function postJson<TResponse>(
  path: string,
  body: Record<string, unknown>
): Promise<TResponse> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })

  const contentType = res.headers.get("content-type") ?? ""
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => "")

  if (!res.ok) {
    const message =
      (data &&
        typeof data === "object" &&
        ("message" in data || "error" in data || "detail" in data) &&
        (String((data as any).message ?? (data as any).error ?? (data as any).detail) ||
          "")) ||
      (typeof data === "string" && data) ||
      `Request failed (${res.status})`
    throw new Error(message)
  }

  return data as TResponse
}

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"signin" | "signup">("signin")

  const [fullName, setFullName] = useState("")
  const [accountType, setAccountType] = useState<"user" | "society">("user")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const title = useMemo(() => (mode === "signin" ? "Sign In" : "Sign Up"), [mode])

  const validate = () => {
    const trimmedEmail = email.trim()
    const trimmedName = fullName.trim()

    if (mode === "signup" && !trimmedName) return "Full name is required."
    if (!trimmedEmail) return "Email is required."
    if (!isValidEmail(trimmedEmail)) return "Please enter a valid email."
    if (!password) return "Password is required."
    if (password.length < 6) return "Password must be at least 6 characters."
    if (mode === "signup") {
      if (!confirmPassword) return "Confirm password is required."
      if (password !== confirmPassword) return "Passwords do not match."
    }
    return null
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)
    try {
      const payload =
        mode === "signup"
          ? { name: fullName.trim(), email: email.trim(), password, accountType }
          : { email: email.trim(), password }

      const data =
        mode === "signup"
          ? await postJson<AuthResponse>("/api/auth/register", payload)
          : await postJson<AuthResponse>("/api/auth/login", payload)

      localStorage.setItem("hd_token", data.token)
      localStorage.setItem("hd_current_user", JSON.stringify(data.user))

      router.push("/")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const switchMode = (nextMode: "signin" | "signup") => {
    setMode(nextMode)
    setError(null)
    setPassword("")
    setConfirmPassword("")
  }

  return (
    <main className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="text-3xl font-bold tracking-tight text-orange-500">
            TCD Events
          </div>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Welcome back. Please enter your details."
              : "Create your account to get started."}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
            <button
              type="button"
              onClick={() => switchMode("signin")}
              className={[
                "rounded-md px-3 py-2 text-sm font-medium transition",
                mode === "signin"
                  ? "bg-background text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
              aria-pressed={mode === "signin"}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={[
                "rounded-md px-3 py-2 text-sm font-medium transition",
                mode === "signup"
                  ? "bg-background text-foreground shadow"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
              aria-pressed={mode === "signup"}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Account type</div>
                  <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
                    <button
                      type="button"
                      onClick={() => setAccountType("user")}
                      className={[
                        "rounded-md px-3 py-2 text-sm font-medium transition",
                        accountType === "user"
                          ? "bg-background text-foreground shadow"
                          : "text-muted-foreground hover:text-foreground",
                      ].join(" ")}
                      aria-pressed={accountType === "user"}
                    >
                      User
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccountType("society")}
                      className={[
                        "rounded-md px-3 py-2 text-sm font-medium transition",
                        accountType === "society"
                          ? "bg-background text-foreground shadow"
                          : "text-muted-foreground hover:text-foreground",
                      ].join(" ")}
                      aria-pressed={accountType === "society"}
                    >
                      Society
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="fullName">
                    Full name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    autoComplete="name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Jane Doe"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                placeholder="••••••••"
              />
            </div>

            {mode === "signup" && (
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="confirmPassword">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="••••••••"
                />
              </div>
            )}

            {error && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/70 border-t-transparent" />
                  {mode === "signin" ? "Signing in..." : "Creating account..."}
                </span>
              ) : mode === "signin" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => switchMode("signin")}
                  className="font-medium text-foreground underline underline-offset-4"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

