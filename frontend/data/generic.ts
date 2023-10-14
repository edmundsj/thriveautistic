import {Database} from "@/supabase";

export type Insert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type Row<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']

export interface Item {
  id: number | string;
  title: string;
}

export interface StringItem {
  id: string,
  title: string,
}

export interface AuthoredItem extends Item {
  author: string;
}

export function getItemById<T extends Item>({items, id}:{items:T[], id: Item['id']}) {
  return items.find(item => item.id == id) || null;
}

type IndexedObject<T> = {
  [key: string]: Set<T>;
  [key: number]: Set<T>;
};

export function unionOfSetsFromKeys<T> (
  {keys, setObject}:{setObject: IndexedObject<T>,
  keys: Array<string | number>}
) {
  const resultSet = new Set<T>();

  keys.forEach((key) => {
    const setForKey = setObject[key];
    if (setForKey) {
      setForKey.forEach((value) => {
        resultSet.add(value);
      });
    }
  });

  return resultSet;
}