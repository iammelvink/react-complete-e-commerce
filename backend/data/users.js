import bcrypt from 'bcryptjs'

const users = [
	// Admin user
	{
		name: 'Melvin Doe',
		email: 'melvin@eg.com',
		password: bcrypt.hashSync('12345', 20),
		isAdmin: true,
	},
	// Standard users
	{
		name: 'Belle Doe',
		email: 'belle@eg.com',
		password: bcrypt.hashSync('12345', 20),
	},
	{
		name: 'Mike Doe',
		email: 'mike@eg.com',
		password: bcrypt.hashSync('12345', 20),
	},
]

export default users
