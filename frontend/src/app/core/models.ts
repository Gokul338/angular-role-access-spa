export type Role =
  'General User' |
  'Admin';


export interface User {
  id: number;
  userId: string;
  name: string;
  email: string;
  role: Role;
}


export interface RecordItem {
  id: number;
  ownerId: string;
  title: string;
  category: string;
  status: string;
  value: string;
}