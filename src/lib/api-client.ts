// src/lib/api-client.ts
// A local storage-based API client to replace Supabase
import mockData from '@/lib/mock-data';
// Importing only the types that are actually used
import type { User } from '@/types/database';

class LocalStorageClient {
  private prefix = 'echoniq_';

  constructor() {
    this.initializeDataIfNeeded();
  }

  private initializeDataIfNeeded() {
    // Check if data exists in localStorage, if not, initialize with mock data
    if (typeof window !== 'undefined' && !localStorage.getItem(`${this.prefix}initialized`)) {
      try {
        // Initialize all data collections
        this.saveData('artists', mockData.getArtists());
        this.saveData('releases', mockData.getReleases());
        this.saveData('blog_posts', mockData.getBlogPosts());
        this.saveData('blog_categories', mockData.getBlogCategories());
        this.saveData('genres', mockData.getGenres());
        this.saveData('studio_services', mockData.getStudioServices());

        // Create a default admin user
        this.saveData('users', [
          {
            id: 'admin',
            email: 'admin@echoniq.com',
            name: 'Admin',
            role: 'admin',
            password: 'admin123', // In a real app, this would be hashed
            created_at: new Date().toISOString(),
          },
        ]);

        // Mark as initialized
        localStorage.setItem(`${this.prefix}initialized`, 'true');
      } catch (error) {
        console.error('Error initializing data:', error);
      }
    }
  }

  private saveData(key: string, data: unknown) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(`${this.prefix}${key}`, JSON.stringify(data));
      } catch (error) {
        console.error(`Error saving data to ${key}:`, error);
      }
    }
  }

  private getData(key: string): unknown[] {
    if (typeof window === 'undefined') {
      // Return empty array when running on server
      return [];
    }

    try {
      const data = localStorage.getItem(`${this.prefix}${key}`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error getting data from ${key}:`, error);
      return [];
    }
  }

  // Typesafe comparison helper function
  private compareValues(a: unknown, b: unknown, ascending: boolean): number {
    // If both values are strings, use string comparison
    if (typeof a === 'string' && typeof b === 'string') {
      return ascending ? a.localeCompare(b) : b.localeCompare(a);
    }

    // If both values are numbers, use numeric comparison
    if (typeof a === 'number' && typeof b === 'number') {
      return ascending ? a - b : b - a;
    }

    // Convert to strings for other types
    const strA = String(a || '');
    const strB = String(b || '');
    return ascending ? strA.localeCompare(strB) : strB.localeCompare(strA);
  }

  // Table-like API similar to Supabase
  from(table: string) {
    // Use function capture instead of aliasing this
    const getData = this.getData.bind(this);
    const saveData = this.saveData.bind(this);
    const _prefix = this.prefix;
    const compareValues = this.compareValues.bind(this);

    const filters: Record<string, unknown> = {};
    let orderColumn: string | null = null;
    let orderAscending = true;
    let limitCount: number | null = null;
    let columnSelection: string | string[] | null = null;

    const query = {
      select: (columns?: string | string[]) => {
        columnSelection = columns || null;
        return query;
      },

      eq: (column: string, value: unknown) => {
        filters[column] = value;
        return query;
      },

      order: (column: string, { ascending = true } = {}) => {
        orderColumn = column;
        orderAscending = ascending;
        return query;
      },

      limit: (count: number) => {
        limitCount = count;
        return query;
      },

      single: () => {
        // Apply filters
        let filteredData = getData(table) as Record<string, unknown>[];

        // Apply filters
        Object.keys(filters).forEach((key) => {
          filteredData = filteredData.filter((item) => item[key] === filters[key]);
        });

        // Return the first item or null
        return {
          data: filteredData.length > 0 ? filteredData[0] : null,
          error: null,
        };
      },

      insert: (items: Record<string, unknown>[]) => {
        try {
          const existingData = getData(table) as Record<string, unknown>[];

          // Generate IDs and add timestamps for new items
          const itemsWithIds = items.map((item) => ({
            id: item.id || `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
            created_at: item.created_at || new Date().toISOString(),
            updated_at: item.updated_at || new Date().toISOString(),
            ...item,
          }));

          // Add the new items
          const newData = [...existingData, ...itemsWithIds];

          // Save back to localStorage
          saveData(table, newData);

          return {
            data: itemsWithIds,
            error: null,
          };
        } catch (error) {
          return {
            data: null,
            error: { message: error instanceof Error ? error.message : 'Unknown error' },
          };
        }
      },

      update: (updates: Record<string, unknown>) => {
        try {
          const existingData = getData(table) as Record<string, unknown>[];

          // Apply filters to find items to update
          let itemsToUpdate = existingData;
          Object.keys(filters).forEach((key) => {
            itemsToUpdate = itemsToUpdate.filter((item) => item[key] === filters[key]);
          });

          // Update matched items
          const updatedData = existingData.map((item) => {
            const shouldUpdate = itemsToUpdate.some((updateItem) => updateItem.id === item.id);

            if (shouldUpdate) {
              return {
                ...item,
                ...updates,
                updated_at: new Date().toISOString(),
              };
            }

            return item;
          });

          // Save back to localStorage
          saveData(table, updatedData);

          return {
            data: itemsToUpdate.map((item) => ({ ...item, ...updates })),
            error: null,
          };
        } catch (error) {
          return {
            data: null,
            error: { message: error instanceof Error ? error.message : 'Unknown error' },
          };
        }
      },

      delete: () => {
        try {
          const existingData = getData(table) as Record<string, unknown>[];

          // Apply filters to find items to delete
          let itemsToDelete = existingData;
          Object.keys(filters).forEach((key) => {
            itemsToDelete = itemsToDelete.filter((item) => item[key] === filters[key]);
          });

          // Delete matched items
          const remainingData = existingData.filter(
            (item) => !itemsToDelete.some((deleteItem) => deleteItem.id === item.id)
          );

          // Save back to localStorage
          saveData(table, remainingData);

          return {
            data: itemsToDelete,
            error: null,
          };
        } catch (error) {
          return {
            data: null,
            error: { message: error instanceof Error ? error.message : 'Unknown error' },
          };
        }
      },

      execute: () => {
        // Get the base data
        let result = getData(table) as Record<string, unknown>[];

        // Apply filters
        Object.keys(filters).forEach((key) => {
          result = result.filter((item) => item[key] === filters[key]);
        });

        // Apply ordering
        if (orderColumn !== null) {
          result.sort((a, b) => {
            // Fix TypeScript error by checking orderColumn isn't null
            if (!orderColumn) return 0;

            const colA = a[orderColumn];
            const colB = b[orderColumn];

            // Use type-safe comparison
            return compareValues(colA, colB, orderAscending);
          });
        }

        // Apply limit
        if (limitCount !== null) {
          result = result.slice(0, limitCount);
        }

        // Apply column selection (simplified implementation)
        if (columnSelection) {
          if (Array.isArray(columnSelection)) {
            // Safe to use columnSelection here since we've checked it's not null
            // and is an array
            const columns = columnSelection; // Store in a local const to satisfy TypeScript
            result = result.map((item) => {
              const newItem: Record<string, unknown> = {};
              columns.forEach((col: string) => {
                newItem[col] = item[col];
              });
              return newItem;
            });
          } else if (typeof columnSelection === 'string') {
            // Handle single column selection
            const column = columnSelection; // Store in a local const
            result = result.map((item) => ({
              [column]: item[column],
            }));
          }
        }

        return {
          data: result,
          error: null,
        };
      },

      then: (callback: (result: { data: unknown[]; error: unknown }) => void) => {
        const result = query.execute();
        callback(result);
        return Promise.resolve(result);
      },
    };

    return query;
  }

  // Helper function to convert API user to proper User type
  private convertApiUserToUser(apiUser: any): User | null {
    if (!apiUser) return null;

    // Extract and validate the role
    const roleStr = apiUser.role ? String(apiUser.role) : undefined;
    let validRole: 'admin' | 'user' | undefined = undefined;

    // Only assign valid role values
    if (roleStr === 'admin' || roleStr === 'user') {
      validRole = roleStr;
    }

    return {
      id: String(apiUser.id || ''),
      email: String(apiUser.email || ''),
      role: validRole,
      name: apiUser.name ? String(apiUser.name) : undefined,
      created_at: apiUser.created_at ? String(apiUser.created_at) : new Date().toISOString(),
    };
  }

  // Auth methods
  auth = {
    signUp: async ({ email, password }: { email: string; password: string }) => {
      try {
        if (typeof window === 'undefined') {
          return { user: null, error: { message: 'Cannot sign up on server side' } };
        }

        const users = this.getData('users') as Record<string, unknown>[];

        // Check if user already exists
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
          return { user: null, error: { message: 'User already exists' } };
        }

        // Create new user
        const newUser = {
          id: `user_${Date.now()}`,
          email,
          role: 'user' as const, // Use const assertion to preserve literal type
          created_at: new Date().toISOString(),
        };

        // Save user (in a real app, we would hash the password)
        const updatedUsers = [...users, { ...newUser, password }];
        this.saveData('users', updatedUsers);

        // Save session
        const session = {
          user: newUser,
          access_token: `token_${Date.now()}`,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        };
        localStorage.setItem(`${this.prefix}session`, JSON.stringify(session));

        return { user: this.convertApiUserToUser(newUser), error: null };
      } catch (error) {
        return {
          user: null,
          error: { message: error instanceof Error ? error.message : 'Unknown error' },
        };
      }
    },

    signIn: async ({ email, password }: { email: string; password: string }) => {
      try {
        if (typeof window === 'undefined') {
          return { user: null, error: { message: 'Cannot sign in on server side' } };
        }

        const users = this.getData('users') as Record<string, unknown>[];

        // Find user with matching email and password
        const user = users.find((u) => u.email === email && u.password === password);

        if (!user) {
          return { user: null, error: { message: 'Invalid login credentials' } };
        }

        // Create session
        const sessionUser = {
          id: user.id,
          email: user.email,
          role: user.role,
          created_at: user.created_at || new Date().toISOString(), // Ensure created_at is available
        };
        const session = {
          user: sessionUser,
          access_token: `token_${Date.now()}`,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
        };
        localStorage.setItem(`${this.prefix}session`, JSON.stringify(session));

        return { user: this.convertApiUserToUser(sessionUser), error: null };
      } catch (error) {
        return {
          user: null,
          error: { message: error instanceof Error ? error.message : 'Unknown error' },
        };
      }
    },

    signOut: async () => {
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem(`${this.prefix}session`);
        } catch (error) {
          console.error('Error during sign out:', error);
        }
      }
      return { error: null };
    },

    getSession: () => {
      try {
        if (typeof window === 'undefined') {
          return { data: { session: null }, error: null };
        }

        const sessionData = localStorage.getItem(`${this.prefix}session`);
        if (!sessionData) return { data: { session: null }, error: null };

        const session = JSON.parse(sessionData);

        // Check if session has expired
        if (new Date(session.expires_at) < new Date()) {
          localStorage.removeItem(`${this.prefix}session`);
          return { data: { session: null }, error: null };
        }

        return { data: { session }, error: null };
      } catch (error) {
        return {
          data: { session: null },
          error: { message: error instanceof Error ? error.message : 'Unknown error' },
        };
      }
    },

    getUser: () => {
      try {
        if (typeof window === 'undefined') {
          return { data: { user: null }, error: null };
        }

        const sessionData = localStorage.getItem(`${this.prefix}session`);
        if (!sessionData) return { data: { user: null }, error: null };

        const session = JSON.parse(sessionData);

        // Check if session has expired
        if (new Date(session.expires_at) < new Date()) {
          localStorage.removeItem(`${this.prefix}session`);
          return { data: { user: null }, error: null };
        }

        return {
          data: { user: this.convertApiUserToUser(session.user) },
          error: null,
        };
      } catch (error) {
        return {
          data: { user: null },
          error: { message: error instanceof Error ? error.message : 'Unknown error' },
        };
      }
    },
  };
}

const apiClient = new LocalStorageClient();
export default apiClient;
