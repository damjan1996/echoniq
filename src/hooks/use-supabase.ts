import { PostgrestError, User } from '@supabase/supabase-js';
import { useState, useEffect, useCallback } from 'react';

import { tables, queryDefaults } from '@/config/supabase';
import supabase from '@/lib/supabase/client';

// Define valid table names
type TableName =
  | 'releases'
  | 'artists'
  | 'genres'
  | 'tracks'
  | 'blog_posts'
  | 'blog_categories'
  | 'studio_services'
  | 'studio_bookings'
  | 'contact_submissions'
  | 'newsletter_subscribers'
  | 'authors'
  | 'artist_releases';

// Define type mapping for tables
interface TableTypes {
  releases: {
    id?: string;
    created_at?: string;
    updated_at?: string;
    title: string;
    slug: string;
    release_date: string;
    catalog_number?: string | null;
    cover_image?: string | null;
    description?: string | null;
    tracklist?: unknown | null;
    links?: unknown | null;
    is_published?: boolean;
    is_featured?: boolean;
    seo_title?: string | null;
    seo_description?: string | null;
    seo_keywords?: string | null;
  };
  artists: {
    id?: string;
    created_at?: string;
    updated_at?: string;
    name: string;
    slug: string;
    bio?: string | null;
    genre?: string | null;
    location?: string | null;
    formed_year?: number | null;
    disbanded_year?: number | null;
    profile_image?: string | null;
    banner_image?: string | null;
    links?: unknown | null;
    is_published?: boolean;
    is_featured?: boolean;
    is_active?: boolean;
    seo_title?: string | null;
    seo_description?: string | null;
    seo_keywords?: string | null;
  };
  artist_releases: {
    id?: string;
    artist_id: string;
    release_id: string;
    is_primary?: boolean;
  };
  // Add other table types as needed following the same pattern
  genres: Record<string, unknown>;
  tracks: Record<string, unknown>;
  blog_posts: Record<string, unknown>;
  blog_categories: Record<string, unknown>;
  studio_services: Record<string, unknown>;
  studio_bookings: Record<string, unknown>;
  contact_submissions: Record<string, unknown>;
  newsletter_subscribers: Record<string, unknown>;
  authors: Record<string, unknown>;
}

interface QueryOptions<_TData> {
  columns?: string;
  filter?: Record<string, unknown>;
  eq?: Record<string, unknown>;
  neq?: Record<string, unknown>;
  gt?: Record<string, unknown>;
  gte?: Record<string, unknown>;
  lt?: Record<string, unknown>;
  lte?: Record<string, unknown>;
  like?: Record<string, unknown>;
  ilike?: Record<string, unknown>;
  in?: Record<string, unknown[]>;
  contains?: Record<string, unknown>;
  order?: {
    column: string;
    ascending?: boolean;
  };
  limit?: number;
  offset?: number;
  single?: boolean;
  range?: {
    from: number;
    to: number;
  };
  joins?: Array<{
    table: string;
    column: string;
    foreignTable: string;
    foreignColumn: string;
  }>;
  count?: 'exact' | 'planned' | 'estimated';
}

interface MutationOptions {
  returning?: 'minimal' | 'representation';
}

interface SupabaseHookState<TData> {
  data: TData | null;
  error: PostgrestError | Error | null;
  count: number | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

/**
 * Helper function to build select string with joins
 */
function buildSelectString(options: {
  columns?: string;
  joins?: Array<{
    table: string;
    column: string;
    foreignTable: string;
    foreignColumn: string;
  }>;
}): string {
  if (options.columns) return options.columns;

  if (options.joins && options.joins.length > 0) {
    // Build a select string with all joins
    return `*,${options.joins.map((join) => `${join.foreignTable}(*)`).join(',')}`;
  }

  return '*';
}

/**
 * Hook for fetching data from Supabase
 *
 * @param tableName - Name of the table to query
 * @param options - Query options
 * @param enabled - Whether to enable the query (default: true)
 * @returns Query state and refetch function
 */
export function useSupabaseQuery<TData = unknown>(
  tableName: TableName,
  options: QueryOptions<TData> = {},
  enabled = true
) {
  const [state, setState] = useState<SupabaseHookState<TData[]>>({
    data: null,
    error: null,
    count: null,
    isLoading: enabled,
    isError: false,
    isSuccess: false,
  });

  /**
   * Execute the query
   */
  const executeQuery = useCallback(async () => {
    if (!enabled) return;

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Build the select string with all joins
      const selectString = buildSelectString(options);

      // Start building the query
      let query = supabase.from(tableName).select(selectString, { count: options.count });

      // Apply filters
      if (options.filter) {
        query = query.filter(
          Object.keys(options.filter).join(','),
          'eq',
          Object.values(options.filter)
        );
      }

      // Apply exact equality - Typing handled with type assertion
      if (options.eq) {
        for (const [key, value] of Object.entries(options.eq)) {
          // Use type assertion for Supabase query methods
          query = (query as unknown).eq(key, value);
        }
      }

      // Apply not equal - Typing handled with type assertion
      if (options.neq) {
        for (const [key, value] of Object.entries(options.neq)) {
          // Use type assertion for Supabase query methods
          query = (query as unknown).neq(key, value);
        }
      }

      // Apply greater than - Typing handled with type assertion
      if (options.gt) {
        for (const [key, value] of Object.entries(options.gt)) {
          // Use type assertion for Supabase query methods
          query = (query as unknown).gt(key, value);
        }
      }

      // Apply greater than or equal
      if (options.gte) {
        for (const [key, value] of Object.entries(options.gte)) {
          // Use type assertion for Supabase query methods
          query = (query as unknown).gte(key, value);
        }
      }

      // Apply less than
      if (options.lt) {
        for (const [key, value] of Object.entries(options.lt)) {
          // Use type assertion for Supabase query methods
          query = (query as unknown).lt(key, value);
        }
      }

      // Apply less than or equal
      if (options.lte) {
        for (const [key, value] of Object.entries(options.lte)) {
          // Use type assertion for Supabase query methods
          query = (query as unknown).lte(key, value);
        }
      }

      // Apply like
      if (options.like) {
        for (const [key, value] of Object.entries(options.like)) {
          // Use type assertion for Supabase query methods
          query = (query as unknown).like(key, value);
        }
      }

      // Apply ilike (case insensitive)
      if (options.ilike) {
        for (const [key, value] of Object.entries(options.ilike)) {
          // Use type assertion for Supabase query methods
          query = (query as unknown).ilike(key, value);
        }
      }

      // Apply in array
      if (options.in) {
        for (const [key, value] of Object.entries(options.in)) {
          // Use type assertion for Supabase query methods
          query = (query as unknown).in(key, value);
        }
      }

      // Apply contains (for jsonb columns)
      if (options.contains) {
        for (const [key, value] of Object.entries(options.contains)) {
          // Use type assertion for Supabase query methods
          query = (query as unknown).contains(key, value);
        }
      }

      // Apply ordering
      if (options.order) {
        query = (query as unknown).order(options.order.column, {
          ascending: options.order.ascending !== false,
        });
      } else if (queryDefaults.defaultSort[tableName as keyof typeof queryDefaults.defaultSort]) {
        const defaultSort =
          queryDefaults.defaultSort[tableName as keyof typeof queryDefaults.defaultSort];
        query = (query as unknown).order(defaultSort.column, { ascending: defaultSort.ascending });
      }

      // Apply pagination
      if (options.limit) {
        query = query.limit(options.limit);
      } else {
        query = query.limit(queryDefaults.pageSize);
      }

      if (options.offset) {
        query = query.range(
          options.offset,
          options.offset + (options.limit || queryDefaults.pageSize) - 1
        );
      } else if (options.range) {
        query = query.range(options.range.from, options.range.to);
      }

      // Execute the query
      if (options.single) {
        const { data, error, count } = await query.single();

        if (error) {
          throw error;
        }

        setState({
          data: data ? [data as TData] : [],
          error: null,
          count: count || 1,
          isLoading: false,
          isError: false,
          isSuccess: true,
        });
      } else {
        const { data, error, count } = await query;

        if (error) {
          throw error;
        }

        setState({
          data: data as TData[],
          error: null,
          count: count || null,
          isLoading: false,
          isError: false,
          isSuccess: true,
        });
      }
    } catch (error) {
      setState({
        data: null,
        error: error as PostgrestError | Error,
        count: null,
        isLoading: false,
        isError: true,
        isSuccess: false,
      });
      console.error('Error fetching data from Supabase:', error);
    }
  }, [tableName, options, enabled]);

  // Execute query on mount and when dependencies change
  useEffect(() => {
    executeQuery();
  }, [executeQuery]);

  return {
    ...state,
    refetch: executeQuery,
  };
}

/**
 * Hook for getting a single item from Supabase by ID
 *
 * @param tableName - Name of the table to query
 * @param id - ID of the item to fetch
 * @param options - Query options
 * @param enabled - Whether to enable the query (default: true)
 * @returns Query state and refetch function
 */
export function useSupabaseItem<TData = unknown>(
  tableName: TableName,
  id: string | null | undefined,
  options: Omit<QueryOptions<TData>, 'single'> = {},
  enabled = true
) {
  const effectiveEnabled = enabled && !!id;

  const [state, setState] = useState<SupabaseHookState<TData>>({
    data: null,
    error: null,
    count: null,
    isLoading: effectiveEnabled,
    isError: false,
    isSuccess: false,
  });

  /**
   * Execute the query
   */
  const executeQuery = useCallback(async () => {
    if (!effectiveEnabled) return;

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Build the select string with all joins
      const selectString = buildSelectString(options);

      // Use type assertion to handle TypeScript limitations with Supabase API
      const { data, error } = await (supabase.from(tableName).select(selectString) as unknown)
        .eq('id', id as string)
        .single();

      if (error) {
        throw error;
      }

      setState({
        data: data as TData,
        error: null,
        count: 1,
        isLoading: false,
        isError: false,
        isSuccess: true,
      });
    } catch (error) {
      setState({
        data: null,
        error: error as PostgrestError | Error,
        count: null,
        isLoading: false,
        isError: true,
        isSuccess: false,
      });
      console.error(`Error fetching item with ID ${id} from ${tableName}:`, error);
    }
  }, [tableName, id, options, effectiveEnabled]);

  // Execute query on mount and when dependencies change
  useEffect(() => {
    executeQuery();
  }, [executeQuery]);

  return {
    ...state,
    refetch: executeQuery,
  };
}

/**
 * Hook for getting a single item from Supabase by slug
 *
 * @param tableName - Name of the table to query
 * @param slug - Slug of the item to fetch
 * @param options - Query options
 * @param enabled - Whether to enable the query (default: true)
 * @returns Query state and refetch function
 */
export function useSupabaseItemBySlug<TData = unknown>(
  tableName: TableName,
  slug: string | null | undefined,
  options: Omit<QueryOptions<TData>, 'single'> = {},
  enabled = true
) {
  const effectiveEnabled = enabled && !!slug;

  const [state, setState] = useState<SupabaseHookState<TData>>({
    data: null,
    error: null,
    count: null,
    isLoading: effectiveEnabled,
    isError: false,
    isSuccess: false,
  });

  /**
   * Execute the query
   */
  const executeQuery = useCallback(async () => {
    if (!effectiveEnabled) return;

    setState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Build the select string with all joins
      const selectString = buildSelectString(options);

      // Use type assertion to handle TypeScript limitations with Supabase API
      const { data, error } = await (supabase.from(tableName).select(selectString) as unknown)
        .eq('slug', slug as string)
        .single();

      if (error) {
        throw error;
      }

      setState({
        data: data as TData,
        error: null,
        count: 1,
        isLoading: false,
        isError: false,
        isSuccess: true,
      });
    } catch (error) {
      setState({
        data: null,
        error: error as PostgrestError | Error,
        count: null,
        isLoading: false,
        isError: true,
        isSuccess: false,
      });
      console.error(`Error fetching item with slug ${slug} from ${tableName}:`, error);
    }
  }, [tableName, slug, options, effectiveEnabled]);

  // Execute query on mount and when dependencies change
  useEffect(() => {
    executeQuery();
  }, [executeQuery]);

  return {
    ...state,
    refetch: executeQuery,
  };
}

/**
 * Hook for creating a new item in Supabase
 *
 * @returns Mutation state and function
 */
export function useSupabaseCreate() {
  const [state, setState] = useState<{
    data: unknown | null;
    error: PostgrestError | Error | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    data: null,
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  /**
   * Create a new item
   * @param tableName - The table to insert into
   * @param data - The data to insert
   * @param options - Additional options
   */
  const createItem = useCallback(
    async <T extends TableName>(
      tableName: T,
      data: TableTypes[T],
      _options: MutationOptions = {}
    ) => {
      setState({
        data: null,
        error: null,
        isLoading: true,
        isError: false,
        isSuccess: false,
      });

      try {
        // Use type assertion for Supabase insert operation
        const response = await (supabase.from(tableName) as unknown).insert(data).select('*');

        if (response.error) {
          throw response.error;
        }

        setState({
          data: response.data?.[0],
          error: null,
          isLoading: false,
          isError: false,
          isSuccess: true,
        });

        return response.data?.[0];
      } catch (error) {
        setState({
          data: null,
          error: error as PostgrestError | Error,
          isLoading: false,
          isError: true,
          isSuccess: false,
        });
        console.error(`Error creating item in ${tableName}:`, error);
        throw error;
      }
    },
    []
  );

  return {
    ...state,
    createItem,
  };
}

/**
 * Hook for updating an item in Supabase
 *
 * @returns Mutation state and function
 */
export function useSupabaseUpdate() {
  const [state, setState] = useState<{
    data: unknown | null;
    error: PostgrestError | Error | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    data: null,
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  /**
   * Update an item
   * @param tableName - The table to update
   * @param id - The ID of the item to update
   * @param data - The data to update
   * @param options - Additional options
   */
  const updateItem = useCallback(
    async <T extends TableName>(
      tableName: T,
      id: string,
      data: Partial<TableTypes[T]>,
      _options: MutationOptions = {}
    ) => {
      setState({
        data: null,
        error: null,
        isLoading: true,
        isError: false,
        isSuccess: false,
      });

      try {
        // Use type assertion for Supabase update operation
        const response = await (supabase.from(tableName) as unknown)
          .update(data)
          .eq('id', id)
          .select();

        if (response.error) {
          throw response.error;
        }

        setState({
          data: response.data?.[0],
          error: null,
          isLoading: false,
          isError: false,
          isSuccess: true,
        });

        return response.data?.[0];
      } catch (error) {
        setState({
          data: null,
          error: error as PostgrestError | Error,
          isLoading: false,
          isError: true,
          isSuccess: false,
        });
        console.error(`Error updating item in ${tableName}:`, error);
        throw error;
      }
    },
    []
  );

  return {
    ...state,
    updateItem,
  };
}

/**
 * Hook for deleting an item from Supabase
 *
 * @returns Mutation state and function
 */
export function useSupabaseDelete() {
  const [state, setState] = useState<{
    data: boolean;
    error: PostgrestError | Error | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
  }>({
    data: false,
    error: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
  });

  /**
   * Delete an item
   */
  const deleteItem = useCallback(async (tableName: TableName, id: string) => {
    setState({
      data: false,
      error: null,
      isLoading: true,
      isError: false,
      isSuccess: false,
    });

    try {
      // Use type assertion for Supabase delete operation
      const response = await (supabase.from(tableName) as unknown).delete().eq('id', id);

      if (response.error) {
        throw response.error;
      }

      setState({
        data: true,
        error: null,
        isLoading: false,
        isError: false,
        isSuccess: true,
      });

      return true;
    } catch (error) {
      setState({
        data: false,
        error: error as PostgrestError | Error,
        isLoading: false,
        isError: true,
        isSuccess: false,
      });
      console.error(`Error deleting item from ${tableName}:`, error);
      throw error;
    }
  }, []);

  return {
    ...state,
    deleteItem,
  };
}

/**
 * Hook for authentication with Supabase
 *
 * @returns Authentication state and functions
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Set up initial user
    const setInitialUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        setUser(user);
      } catch (error) {
        console.error('Error getting user:', error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    setInitialUser();

    // Subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error signing out:', error);
      setError(error as Error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    error,
    signIn,
    signOut,
    supabase,
  };
}

/**
 * Complete hook for Supabase operations
 */
export function useSupabase() {
  const { createItem } = useSupabaseCreate();
  const { updateItem } = useSupabaseUpdate();
  const { deleteItem } = useSupabaseDelete();

  // Direct access to Supabase client
  const client = supabase;

  // Table definitions
  const tableConfig = tables;

  return {
    client,
    tables: tableConfig,
    query: useSupabaseQuery,
    getItem: useSupabaseItem,
    getItemBySlug: useSupabaseItemBySlug,
    createItem,
    updateItem,
    deleteItem,
  };
}

export default useSupabase;
