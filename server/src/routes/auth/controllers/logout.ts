import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RefreshToken } from '@models/refreshTokenModel';

export const handleLogout = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const userId = req.body.userId;

  try {
    await RefreshToken.deleteMany({ userId });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};