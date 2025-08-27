import { PrismaClient, Tech } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.projectImage.deleteMany();
    await prisma.project.deleteMany();
    await prisma.techStack.deleteMany();
    await prisma.owner.deleteMany();


    const owners = await Promise.all(
        Array.from({ length: 3 }).map((_, i) =>
            prisma.owner.create({
                data: {
                    name: `Owner ${i + 1}`,
                    email: `owner${i + 1}@mail.com`,
                    avatarUrl: `https://picsum.photos/seed/owner${i + 1}/200/200`,
                },
            })
        )
    );


    const techs = await Promise.all(
        [Tech.React, Tech.NextJS, Tech.NestJS, Tech.PostgreSQL, Tech.Docker].map(
            (t) => prisma.techStack.create({ data: { name: t } })
        )
    );


    for (const owner of owners) {
        for (let i = 1; i <= 2; i++) {
            const project = await prisma.project.create({
                data: {
                    ownerId: owner.id,
                    title: `Project ${i} by ${owner.name}`,
                    description: `Description for project ${i}`,
                    imageUrl: `https://picsum.photos/seed/${owner.id}-${i}/400/200`,
                    link: `https://example.com/${owner.id}-${i}`,
                    techStacks: {
                        connect: [
                            { id: techs[Math.floor(Math.random() * techs.length)].id },
                        ],
                    },
                },
            });

            await Promise.all(
                Array.from({ length: 2 }).map((_, j) =>
                    prisma.projectImage.create({
                        data: {
                            projectId: project.id,
                            url: `https://picsum.photos/seed/${project.id}-${j}/600/400`,
                            description: `Image ${j + 1} for ${project.title}`,
                        },
                    })
                )
            );
        }
    }
}

main()
    .then(async () => {
        console.log('✅ Database seeded!');
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error('❌ Error seeding:', e);
        await prisma.$disconnect();
        process.exit(1);
    });
