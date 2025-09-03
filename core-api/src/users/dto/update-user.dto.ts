export class UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  // Note: email, password, role should be updated separately for security
}
