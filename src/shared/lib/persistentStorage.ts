type Serializer<T> = {
  stringify: (value: T) => string
  parse: (raw: string) => T
}

export class PersistentStorage<T> {
  constructor(
    private key: string,
    private fallback: T,
    private serializer: Serializer<T> = JSON as unknown as Serializer<T>
  ) {}

  get(): T {
    try {
      if (typeof window === 'undefined') return this.fallback

      const raw = localStorage.getItem(this.key)

      return raw ? this.serializer.parse(raw) : this.fallback
    } catch {
      return this.fallback
    }
  }

  set(value: T): void {
    try {
      if (typeof window === 'undefined') return

      localStorage.setItem(this.key, this.serializer.stringify(value))
    } catch {}
  }

  clear(): void {
    try {
      if (typeof window === 'undefined') return

      localStorage.removeItem(this.key)
    } catch {}
  }
}