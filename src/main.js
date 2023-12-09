const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {
	try {
		// const newArtist = await prisma.artist.create({
		// 	data: {
		// 		name: 'Osinachi Kalu',
		// 		email: 'sinach@sinachmusic.com',
		// 		songs: {
		// 			create: {
		// 				title: 'I Know Who I Am',
		// 			},
		// 		},
		// 	},
		// });

		// console.log('Created new artist: ', newArtist)

		const allArtists = await prisma.artist.findMany({
			include: { songs: true },
		})
		console.log('All artists: ')
		console.dir(allArtists, { depth: null })
	} catch (error) {
		if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
			console.error('Email already exists in the database.');
			// Handle duplicate email error here
		} else {
			console.error('Error creating artist:', error);
		}
	}
}

main()
	.catch(e => {
		throw e
	})
	.finally(async () => {
		await prisma.$disconnect()
	});
