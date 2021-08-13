import * as bcrypt from 'bcrypt';

export async function hashPassword(rawPassword: string): Promise<string> {
  if (!rawPassword) return;

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(rawPassword, salt);

  return hashedPassword;
}

export async function comparePassword(
  rawPassword: string,
  passwordHashed: string,
): Promise<boolean> {
  return bcrypt.compare(rawPassword, passwordHashed);
}
