import { Router } from 'express';
import { db } from '../services/db.service';

const router = Router();

const delay = (ms: number) =>
  new Promise(r =>
    setTimeout(
      r,
      Math.max(0, Math.min(ms, 5000))
    )
  );

router.post('/login', async (req, res) => {
  const { userId, password, role } = req.body;

  await delay(Number(req.query.delay) || 0);

  const user = db.users().find(
    u =>
      u.userId === userId &&
      u.password === password &&
      u.role === role
  );

  if (!user) {
    return res.status(401).json({
      message: 'Invalid User ID, password, or role'
    });
  }

  const { password: _, ...safe } = user;

  res.json({
    user: safe,
    token: `demo-${user.id}-${Date.now()}`
  });
});


router.get('/users', async (req, res) => {
  await delay(Number(req.query.delay) || 0);

  res.json(
    db.users().map(({ password, ...u }) => u)
  );
});


router.get('/users/:userId/records', async (req, res) => {
  await delay(Number(req.query.delay) || 0);

  const all = db.records();

  res.json(
    req.params.userId === 'admin01'
      ? all
      : all.filter(
          r => r.ownerId === req.params.userId
        )
  );
});


router.post('/users', async (req, res) => {
  await delay(Number(req.query.delay) || 0);

  const {
    userId,
    password,
    name,
    email,
    role
  } = req.body;

  if (
    !userId ||
    !password ||
    !name ||
    !email ||
    !role
  ) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }

  if (
    db.users().some(
      u => u.userId === userId
    )
  ) {
    return res.status(409).json({
      message: 'User ID already exists'
    });
  }

  const user = db.addUser({
    id: Date.now(),
    userId,
    password,
    name,
    email,
    role
  });

  const { password: _, ...safe } = user;

  res.status(201).json(safe);
});


router.delete('/users/:id', async (req, res) => {
  await delay(Number(req.query.delay) || 0);

  db.deleteUser(
    Number(req.params.id)
  );

  res.json({
    message: 'User deleted'
  });
});


export default router;