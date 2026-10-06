import fs from 'fs';
import path from 'path';

const file = path.join(__dirname, '../data/db.json');


export interface User {
  id: number;
  userId: string;
  password: string;
  name: string;
  email: string;
  role: 'General User' | 'Admin';
}


export interface RecordItem {
  id: number;
  ownerId: string;
  title: string;
  category: string;
  status: string;
  value: string;
}


export class DbService {

  private read() {
    return JSON.parse(
      fs.readFileSync(file, 'utf8')
    ) as {
      users: User[];
      records: RecordItem[];
    };
  }


  private write(data: any) {
    fs.writeFileSync(
      file,
      JSON.stringify(data, null, 2)
    );
  }


  users() {
    return this.read().users;
  }


  records() {
    return this.read().records;
  }


  addUser(user: User) {
    const data = this.read();

    data.users.push(user);

    this.write(data);

    return user;
  }


  deleteUser(id: number) {
    const data = this.read();

    data.users = data.users.filter(
      u => u.id !== id
    );

    this.write(data);
  }
}


export const db = new DbService();