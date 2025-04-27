// src/lib/api.ts
/**
 * This is a replacement for Supabase client operations
 * providing a simplified API client with localStorage persistence
 */

// Type for database entities
interface Entity {
  id: string;
  [key: string]: unknown;
}

// Type for query options (prefixed with underscore to indicate unused but kept for reference)
interface _QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  order?: 'asc' | 'desc';
  eq?: Record<string, unknown>;
  neq?: Record<string, unknown>;
  gt?: Record<string, unknown>;
  gte?: Record<string, unknown>;
  lt?: Record<string, unknown>;
  lte?: Record<string, unknown>;
  like?: Record<string, unknown>;
  ilike?: Record<string, unknown>;
  in?: Record<string, unknown[]>;
  filters?: Record<string, unknown>;
}

// Simple database-like class
class LocalDatabase {
  private tables: Record<string, Entity[]> = {};
  private storageKey = 'echoniq-db';

  constructor() {
    this.loadFromStorage();
  }

  // Load data from localStorage
  private loadFromStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        const storedData = localStorage.getItem(this.storageKey);
        if (storedData) {
          this.tables = JSON.parse(storedData);
        }
      } catch (error) {
        console.error('Error loading data from localStorage:', error);
        this.tables = {};
      }
    }
  }

  // Save data to localStorage
  private saveToStorage(): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.storageKey, JSON.stringify(this.tables));
      } catch (error) {
        console.error('Error saving data to localStorage:', error);
      }
    }
  }

  // Initialize a table if it doesn't exist
  private initTable(table: string): void {
    if (!this.tables[table]) {
      this.tables[table] = [];
    }
  }

  // Generate a simple UUID v4-like ID
  private generateId(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Create a query builder for a table
  public from(table: string) {
    this.initTable(table);

    // Apply filter functions
    const applyEq = (data: Entity[], key: string, value: unknown): Entity[] => {
      return data.filter((item) => item[key] === value);
    };

    // Defined but unused filter functions with appropriate underscore prefix
    const _applyNeq = (data: Entity[], key: string, value: unknown): Entity[] => {
      return data.filter((item) => item[key] !== value);
    };

    const _applyGt = (data: Entity[], key: string, value: unknown): Entity[] => {
      return data.filter((item) => {
        const itemValue = item[key];
        return typeof itemValue === 'number' && typeof value === 'number' && itemValue > value;
      });
    };

    const _applyLt = (data: Entity[], key: string, value: unknown): Entity[] => {
      return data.filter((item) => {
        const itemValue = item[key];
        return typeof itemValue === 'number' && typeof value === 'number' && itemValue < value;
      });
    };

    const _applyIlike = (data: Entity[], key: string, value: unknown): Entity[] => {
      if (typeof value !== 'string') return data;
      const regex = new RegExp(value.replace(/%/g, '.*'), 'i');
      return data.filter((item) => {
        const itemValue = item[key];
        return typeof itemValue === 'string' && regex.test(itemValue);
      });
    };

    // Query builder object
    return {
      select: (_columns: string = '*') => {
        return {
          single: () => {
            const items = this.tables[table];
            return Promise.resolve({
              data: items.length > 0 ? items[0] : null,
              error: null,
            });
          },
          eq: (column: string, value: unknown) => {
            return {
              single: () => {
                const filtered = applyEq(this.tables[table], column, value);
                return Promise.resolve({
                  data: filtered.length > 0 ? filtered[0] : null,
                  error: null,
                });
              },
              execute: () => {
                const filtered = applyEq(this.tables[table], column, value);
                return Promise.resolve({
                  data: filtered,
                  error: null,
                  count: filtered.length,
                });
              },
            };
          },
          // Other filter methods would be implemented similarly
          execute: () => {
            return Promise.resolve({
              data: this.tables[table],
              error: null,
              count: this.tables[table].length,
            });
          },
        };
      },
      insert: (data: Record<string, unknown> | Record<string, unknown>[]) => {
        try {
          const dataArray = Array.isArray(data) ? data : [data];
          const newItems = dataArray.map((item) => {
            const newItem = { ...item, id: item.id || this.generateId() } as Entity;
            return newItem;
          });

          this.tables[table] = [...this.tables[table], ...newItems];
          this.saveToStorage();

          return {
            select: (_columns: string = '*') => {
              return Promise.resolve({
                data: newItems,
                error: null,
              });
            },
            single: () => {
              return Promise.resolve({
                data: newItems.length > 0 ? newItems[0] : null,
                error: null,
              });
            },
          };
        } catch (error) {
          console.error('Error inserting data:', error);
          return {
            select: () =>
              Promise.resolve({
                data: null,
                error: { message: error instanceof Error ? error.message : 'Unknown error' },
              }),
            single: () =>
              Promise.resolve({
                data: null,
                error: { message: error instanceof Error ? error.message : 'Unknown error' },
              }),
          };
        }
      },
      update: (data: Record<string, unknown>) => {
        return {
          eq: (column: string, value: unknown) => {
            try {
              const index = this.tables[table].findIndex((item) => item[column] === value);
              if (index !== -1) {
                this.tables[table][index] = { ...this.tables[table][index], ...data };
                this.saveToStorage();
              }

              return Promise.resolve({
                data: index !== -1 ? [this.tables[table][index]] : [],
                error: null,
              });
            } catch (error) {
              console.error('Error updating data:', error);
              return Promise.resolve({
                data: null,
                error: { message: error instanceof Error ? error.message : 'Unknown error' },
              });
            }
          },
          select: () => {
            return Promise.resolve({
              data: [],
              error: null,
            });
          },
        };
      },
      delete: () => {
        return {
          eq: (column: string, value: unknown) => {
            try {
              const prevLength = this.tables[table].length;
              this.tables[table] = this.tables[table].filter((item) => item[column] !== value);
              this.saveToStorage();

              return Promise.resolve({
                data: null,
                error: null,
                count: prevLength - this.tables[table].length,
              });
            } catch (error) {
              console.error('Error deleting data:', error);
              return Promise.resolve({
                data: null,
                error: { message: error instanceof Error ? error.message : 'Unknown error' },
                count: 0,
              });
            }
          },
        };
      },
      // Additional query builder methods with unused params prefixed with _
      order: (_column: string, _options?: { ascending?: boolean }) => {
        // This is a stub and should be implemented for actual sorting functionality
        return this; // For chaining
      },
      limit: (_count: number) => {
        // This is a stub and should be implemented for actual limiting functionality
        return this; // For chaining
      },
      range: (_from: number, _to: number) => {
        // This is a stub and should be implemented for actual range selection
        return this; // For chaining
      },
    };
  }

  // Mock auth methods
  public auth = {
    getUser: () => {
      return Promise.resolve({
        data: { user: null },
        error: null,
      });
    },
    getSession: () => {
      return Promise.resolve({
        data: { session: null },
        error: null,
      });
    },
    signInWithPassword: () => {
      return Promise.resolve({
        data: { user: null, session: null },
        error: null,
      });
    },
    signInWithOtp: () => {
      return Promise.resolve({
        data: { user: null, session: null },
        error: null,
      });
    },
    signUp: () => {
      return Promise.resolve({
        data: { user: null, session: null },
        error: null,
      });
    },
    signOut: () => {
      return Promise.resolve({
        error: null,
      });
    },
    onAuthStateChange: (_callback: () => void) => {
      return {
        data: {
          subscription: {
            unsubscribe: () => {
              // Intentionally empty
            },
          },
        },
      };
    },
    updateUser: () => {
      return Promise.resolve({
        data: { user: null },
        error: null,
      });
    },
    resetPasswordForEmail: () => {
      return Promise.resolve({
        data: {},
        error: null,
      });
    },
  };
}

// Create and export the API client
const apiClient = new LocalDatabase();
export default apiClient;
