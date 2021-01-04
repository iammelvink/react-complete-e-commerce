import bcrypt from 'bcryptjs'

const users = [
	// Admin user
	{
		name: 'Melvin Doe',
		email: 'melvin@eg.com',
		password: bcrypt.hashSync('12345', 10), //  10 = num rounds
		isAdmin: true,
	},
	// Standard users
	{
		name: 'Belle Doe',
		email: 'belle@eg.com',
		password: bcrypt.hashSync('12345', 10), //  10 = num rounds
	},
	{
		name: 'Mike Doe',
		email: 'mike@eg.com',
		password: bcrypt.hashSync('12345', 10), //  10 = num rounds
	},
]

export default users
